
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { getChatCompletion, ChatMessage } from '@/services/geminiService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize chat with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          text: 'Hello! I\'m the Krishak AI assistant. I can help you with agricultural questions, farming advice, crop management, and more. How can I assist you today?',
          isUser: false,
          timestamp: new Date(),
        }
      ]);
    }
  }, [messages.length]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Convert messages to format required by Gemini API
      const chatHistory: ChatMessage[] = [
        {
          role: 'system',
          content: 'You are a helpful AI assistant for Krishak AI, a platform focused on agriculture. Your name is AgriBot. You provide assistance with farming, crop management, weather analysis, and agricultural techniques. Keep responses concise, practical, and focused on agriculture. Be friendly and supportive to farmers. You have expertise in farming practices in Nepal and South Asia.'
        }
      ];
      
      // Only include the last 10 messages to avoid token limits
      const recentMessages = messages.slice(-10);
      recentMessages.forEach(msg => {
        chatHistory.push({
          role: msg.isUser ? 'user' : 'assistant' as const,
          content: msg.text
        });
      });
      
      // Add current user message
      chatHistory.push({
        role: 'user' as const,
        content: userMessage.text
      });

      // Get AI response from Gemini API
      const aiResponse = await getChatCompletion(chatHistory);

      // Add AI response to chat
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in chat flow:', error);
      
      // Show error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format timestamp for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <div className="relative">
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
            size="icon"
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
          
          {/* Animated Farmer Character */}
          <div className="absolute -top-16 -left-8 animate-bounce">
            <div className="relative w-16 h-16">
              {/* Farmer Character */}
              <div className="w-full h-full relative">
                {/* Hat */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-yellow-600 rounded-full"></div>
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-yellow-700 rounded-full"></div>
                
                {/* Head */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-orange-200 rounded-full border-2 border-orange-300">
                  {/* Eyes */}
                  <div className="absolute top-2 left-1.5 w-1 h-1 bg-black rounded-full"></div>
                  <div className="absolute top-2 right-1.5 w-1 h-1 bg-black rounded-full"></div>
                  {/* Smile */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-1.5 border-b-2 border-brown-600 rounded-full"></div>
                </div>
                
                {/* Body */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-lg"></div>
                
                {/* Waving Hand */}
                <div className="absolute top-6 right-1 w-2 h-2 bg-orange-200 rounded-full animate-pulse transform rotate-12"></div>
              </div>
              
              {/* Speech Bubble */}
              <div className="absolute -top-8 -left-4 bg-white rounded-lg px-2 py-1 shadow-lg border animate-fade-in">
                <div className="text-xs font-medium text-gray-800">Need help? 👋</div>
                <div className="absolute bottom-0 left-4 transform translate-y-full">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="w-96 h-[600px] shadow-xl animate-fade-in bg-white rounded-2xl overflow-hidden flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <p className="font-medium text-sm">Chat with Krishak AI</p>
                <p className="text-xs text-blue-100">Your agricultural assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {/* Welcome Section with Farmer Character */}
          <div className="bg-gradient-to-b from-blue-50 to-white p-4 border-b flex-shrink-0">
            <div className="flex items-center gap-3">
              {/* Static Farmer Character in Chat */}
              <div className="w-12 h-12 relative flex-shrink-0">
                {/* Hat */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-2.5 bg-yellow-600 rounded-full"></div>
                <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1.5 bg-yellow-700 rounded-full"></div>
                
                {/* Head */}
                <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-7 h-7 bg-orange-200 rounded-full border border-orange-300">
                  {/* Eyes */}
                  <div className="absolute top-1.5 left-1 w-1 h-1 bg-black rounded-full"></div>
                  <div className="absolute top-1.5 right-1 w-1 h-1 bg-black rounded-full"></div>
                  {/* Smile */}
                  <div className="absolute top-3.5 left-1/2 transform -translate-x-1/2 w-2.5 h-1 border-b border-amber-700 rounded-full"></div>
                </div>
                
                {/* Body */}
                <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-5 h-4 bg-blue-600 rounded"></div>
              </div>
              
              <div>
                <p className="font-medium text-blue-800">Welcome to Krishak AI! 🌾</p>
                <p className="text-sm text-blue-600">Ask me anything about farming and agriculture</p>
              </div>
            </div>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-0">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isUser && (
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 max-w-xs shadow-sm">
                      <p className="text-sm text-gray-800 whitespace-pre-line">{message.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatTime(message.timestamp)}</p>
                    </div>
                  </div>
                )}
                {message.isUser && (
                  <div className="bg-blue-500 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-xs shadow-sm">
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs text-blue-100 mt-1 text-right">{formatTime(message.timestamp)}</p>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                    <div className="flex space-x-2 items-center">
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Fixed at bottom */}
          <div className="border-t bg-white p-4 flex-shrink-0">
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about farming..."
                className="flex-1 bg-transparent text-sm outline-none placeholder-gray-500 py-1"
                disabled={isLoading}
              />
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="icon"
                  className="h-8 w-8 bg-blue-500 hover:bg-blue-600 rounded-full disabled:opacity-50"
                >
                  <Send className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ChatBot;
