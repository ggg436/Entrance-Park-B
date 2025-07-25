import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Paperclip,
  Image as ImageIcon,
  LayoutGrid,
  Sparkles,
  Plus,
  MessageSquareText,
  Edit,
  List,
  Lightbulb,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getChatCompletion, ChatMessage } from '@/services/geminiService';
import { useUserProfile } from '@/hooks/useUserProfile';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  created: Date;
  lastUpdated: Date;
}

interface PromptSuggestion {
  icon: React.ElementType;
  title: string;
  description: string;
  tags?: string[];
}

// Define createNewConversation outside of component body to avoid dependency issues
const createNewConversation = (
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>,
  conversations: Conversation[],
  setActiveConversationId: React.Dispatch<React.SetStateAction<string | null>>,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setShowEmptyState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const newConversation: Conversation = {
    id: Date.now().toString(),
    title: 'New conversation',
    messages: [],
    created: new Date(),
    lastUpdated: new Date()
  };
  setConversations([newConversation, ...conversations]);
  setActiveConversationId(newConversation.id);
  setMessages([]);
  setShowEmptyState(true);
  return newConversation.id; // Return the ID for use in other contexts
};

const ChatPage: React.FC = () => {
  const { profile } = useUserProfile();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Memoize createNewConversation implementation to avoid recreation on each render
  const handleCreateNewConversation = React.useCallback(() => {
    createNewConversation(
      setConversations,
      conversations,
      setActiveConversationId,
      setMessages,
      setShowEmptyState
    );
  }, [conversations]);

  const promptSuggestions: PromptSuggestion[] = [
    {
      icon: MessageSquareText,
      title: "Job search advice",
      description: "Help me optimize my job search strategy",
    },
    {
      icon: MessageSquareText,
      title: "Resume feedback",
      description: "How can I improve my resume?",
    },
    {
      icon: Edit,
      title: "Interview preparation",
      description: "Common interview questions for software developers",
    },
    {
      icon: List,
      title: "Skill development",
      description: "Skills I should develop for a career in data science",
    },
    {
      icon: Lightbulb,
      title: "Networking tips",
      description: "Effective professional networking strategies",
    },
    {
      icon: User,
      title: "Career transition",
      description: "How to transition from marketing to product management",
    },
  ];

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize - This will run only once when component mounts
    initializeChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Define initialization function
  const initializeChat = () => {
    // Load conversations from localStorage
    const savedConversations = localStorage.getItem('chatConversations');
    if (savedConversations) {
      try {
        const parsed = JSON.parse(savedConversations);
        const conversationsWithDates = parsed.map((conv: any) => ({
          ...conv,
          created: new Date(conv.created),
          lastUpdated: new Date(conv.lastUpdated),
          messages: conv.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setConversations(conversationsWithDates);
        
        // If there are existing conversations, activate the most recent one
        if (conversationsWithDates.length > 0) {
          // Sort by last updated and pick the most recent one
          const sortedConversations = [...conversationsWithDates].sort(
            (a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime()
          );
          const mostRecent = sortedConversations[0];
          setActiveConversationId(mostRecent.id);
          setMessages(mostRecent.messages);
          setShowEmptyState(mostRecent.messages.length === 0);
        } else {
          // If no conversations exist, create a new one
          createNewConversation(
            setConversations,
            [],
            setActiveConversationId,
            setMessages,
            setShowEmptyState
          );
        }
      } catch (e) {
        console.error('Failed to parse saved conversations', e);
        // Create a new conversation if parsing fails
        createNewConversation(
          setConversations,
          [],
          setActiveConversationId,
          setMessages,
          setShowEmptyState
        );
      }
    } else {
      // No saved conversations, create a new one
      createNewConversation(
        setConversations,
        [],
        setActiveConversationId,
        setMessages,
        setShowEmptyState
      );
    }
  };

  useEffect(() => {
    // When active conversation changes, load its messages
    if (activeConversationId) {
      const conversation = conversations.find(c => c.id === activeConversationId);
      if (conversation) {
        setMessages(conversation.messages);
        setShowEmptyState(false);
      }
    } else {
      setMessages([]);
      setShowEmptyState(true);
    }
  }, [activeConversationId, conversations]);

  // Save conversations when they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('chatConversations', JSON.stringify(conversations));
    }
  }, [conversations]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const deleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(conversations.filter(c => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
      setMessages([]);
      setShowEmptyState(true);
    }
  };

  const updateConversationTitle = (id: string, firstUserMessage: string) => {
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === id 
          ? {
              ...conv,
              title: firstUserMessage.substring(0, 30) + (firstUserMessage.length > 30 ? '...' : ''),
              lastUpdated: new Date()
            }
          : conv
      )
    );
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    // If no active conversation or showing empty state, create a new one
    if (!activeConversationId || showEmptyState) {
      if (!activeConversationId) {
        const newConversation: Conversation = {
          id: Date.now().toString(),
          title: input.substring(0, 30) + (input.length > 30 ? '...' : ''),
          messages: [userMessage],
          created: new Date(),
          lastUpdated: new Date()
        };
        setConversations([newConversation, ...conversations]);
        setActiveConversationId(newConversation.id);
      } else {
        // Update existing conversation
        updateConversationTitle(activeConversationId, input);
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === activeConversationId 
              ? { ...conv, messages: [userMessage], lastUpdated: new Date() }
              : conv
          )
        );
      }
      setShowEmptyState(false);
    } else {
      // Add message to existing conversation
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === activeConversationId 
            ? { 
                ...conv, 
                messages: [...conv.messages, userMessage],
                lastUpdated: new Date()
              }
            : conv
        )
      );
    }

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Convert messages to format required by Gemini API
      const chatHistory: ChatMessage[] = [
        {
          role: 'system',
          content: 'You are CareerBoost AI, a helpful career assistant for job seekers. You help users with job searching, resume building, interview preparation, and career advice. Be friendly, professional, and concise. Focus on being helpful and provide actionable advice. Your responses should be tailored to the career development domain.'
        }
      ];
      
      // Add conversation history (limit to last 10 messages)
      const currentMessages = [...messages, userMessage];
      currentMessages.slice(-10).forEach(msg => {
        chatHistory.push({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        });
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
      
      // Update conversation
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === activeConversationId 
            ? { 
                ...conv, 
                messages: [...conv.messages, userMessage, assistantMessage],
                lastUpdated: new Date()
              }
            : conv
        )
      );
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
      
      // Update conversation
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === activeConversationId 
            ? { 
                ...conv, 
                messages: [...conv.messages, userMessage, errorMessage],
                lastUpdated: new Date()
              }
            : conv
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    // Focus the input
    const inputElement = document.getElementById('chat-input');
    if (inputElement) {
      inputElement.focus();
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

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString(undefined, { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  // Update the main container to ensure it fits perfectly with borders
  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gray-50 flex flex-col overflow-hidden">
        <div className="p-4 border-b">
          <Button 
            onClick={handleCreateNewConversation}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> New Chat
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          {conversations.length > 0 ? (
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div 
                  key={conversation.id}
                  onClick={() => setActiveConversationId(conversation.id)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer",
                    activeConversationId === conversation.id 
                      ? "bg-blue-100 text-blue-700" 
                      : "hover:bg-gray-100"
                  )}
                >
                  <div className="flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span className="text-sm font-medium truncate max-w-[150px]">
                      {conversation.title}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 opacity-60 hover:opacity-100"
                    onClick={(e) => deleteConversation(conversation.id, e)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm p-4 text-center">
              <MessageSquare className="h-8 w-8 mb-2" />
              <p>No conversations yet</p>
              <p>Start a new chat to begin</p>
            </div>
          )}
        </div>
        
        {/* User Profile */}
        <div className="p-4 border-t">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profile?.photoURL || "/placeholder.svg"} alt="User Avatar" />
              <AvatarFallback>{profile?.displayName?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <p className="text-sm font-medium">{profile?.displayName || 'User'}</p>
              <p className="text-xs text-gray-500">{profile?.userType || 'User'}</p>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {showEmptyState ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <Sparkles className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">CareerBoost AI</h1>
            <p className="text-gray-600 mb-8">Your career assistant powered by AI</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mb-10">
              {promptSuggestions.map((prompt, index) => (
                <div 
                  key={index} 
                  className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-colors"
                  onClick={() => handlePromptClick(prompt.description)}
                >
                  <div className="flex items-center mb-2">
                    <div className="p-1.5 rounded-md bg-blue-100">
                      <prompt.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <h3 className="ml-2 font-medium text-gray-900">{prompt.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{prompt.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`flex gap-4 max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' ? 'bg-blue-600' : 'bg-blue-100'
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
                        className={`rounded-xl p-4 ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
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
                  <div className="flex gap-4 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="bg-gray-100 rounded-xl p-4">
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

            {/* Input Area - Adjusted padding to ensure perfect fit */}
            <div className="py-3 px-4 border-t bg-white flex-shrink-0">
              <div className="relative max-w-4xl mx-auto mb-1">
                <div className="relative flex items-center w-full bg-white rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 shadow-sm">
                  <Input
                    id="chat-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Message CareerBoost AI..."
                    className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-4 py-3 text-base"
                  />
                  <div className="flex items-center space-x-2 pr-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:bg-gray-100">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:bg-gray-100">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:bg-gray-100">
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading}
                      className="h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-1 mb-0">
                  CareerBoost AI can provide general career advice but may not have all the latest job market information.
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ChatPage; 