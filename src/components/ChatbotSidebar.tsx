import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Bot, 
  User,
  Paperclip,
  Image as ImageIcon,
  SmilePlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getChatCompletion, ChatMessage } from '@/services/geminiService';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const ChatbotSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Listen for toggle-chatbot events
  useEffect(() => {
    const handleToggleChat = () => {
      setIsOpen(prev => !prev);
      setIsMinimized(false);
    };
    
    window.addEventListener('toggle-chatbot', handleToggleChat);
    
    return () => {
      window.removeEventListener('toggle-chatbot', handleToggleChat);
    };
  }, []);

  // Initialize with a welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          content: 'Hello! I\'m your CareerBoost AI assistant. How can I help you today?',
          role: 'assistant',
          timestamp: new Date()
        }
      ]);
    }
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Convert messages to format required by Gemini API
      const chatHistory: ChatMessage[] = [
        {
          role: 'system',
          content: 'You are a helpful career assistant named CareerBoost AI. You help users with job searching, resume building, interview preparation, and career advice. Be friendly, professional, and concise. Focus on being helpful and provide actionable advice.'
        }
      ];
      
      // Add conversation history (limit to last 10 messages)
      messages.slice(-10).forEach(msg => {
        chatHistory.push({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        });
      });
      
      // Add current user message
      chatHistory.push({
        role: 'user',
        content: userMessage.content
      });

      // Get AI response
      const response = await getChatCompletion(chatHistory);

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in chat flow:', error);
      
      // Show error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date()
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized && !isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105"
          aria-label="Open chatbot"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 ${
            isMinimized 
              ? 'w-72 h-16' 
              : 'w-96 h-[500px]'
          } flex flex-col`}
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <h3 className="font-medium">CareerBoost AI</h3>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={toggleMinimize}
                className="p-1 hover:bg-blue-500 rounded-md transition-colors"
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button 
                onClick={toggleChat}
                className="p-1 hover:bg-blue-500 rounded-md transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`flex gap-2 max-w-[80%] ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user' ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        {message.role === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div 
                          className={`rounded-2xl p-3 ${
                            message.role === 'user'
                              ? 'bg-blue-600 text-white rounded-tr-none'
                              : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                        <div 
                          className={`text-xs text-gray-500 ${
                            message.role === 'user' ? 'text-right' : 'text-left'
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-2 max-w-[80%]">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-3 bg-white">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 pr-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message..."
                    className="border-0 flex-1 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <div className="flex items-center">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <ImageIcon className="w-5 h-5" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <SmilePlus className="w-5 h-5" />
                    </button>
                    <Button
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading}
                      className="ml-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full h-8 w-8 p-0 flex items-center justify-center"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatbotSidebar; 