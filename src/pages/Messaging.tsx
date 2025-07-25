import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Search, ChevronLeft, MoreHorizontal, Plus, MessageSquare, Users, ShoppingBag, Clock, Video, Phone, Info, Archive, Camera, Image, Mic } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { auth, db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp, 
  where, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc,
  Timestamp,
  setDoc 
} from 'firebase/firestore';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type User = {
  id: string;
  displayName: string;
  photoURL: string;
  online?: boolean;
};

type Message = {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Timestamp;
};

type Chat = {
  id: string;
  participants: string[];
  participantNames: Record<string, string>;
  participantPhotos?: Record<string, string>;
  lastMessage: string;
  lastMessageTime: Timestamp;
  unreadCounts?: Record<string, number>;
};

const Messaging = () => {
  const { t } = useTranslation();
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [newChatDialogOpen, setNewChatDialogOpen] = useState(false);
  const [searchUserTerm, setSearchUserTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = auth.currentUser;

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      if (!currentUser) return;

      try {
        const usersQuery = query(collection(db, 'users'));
        const querySnapshot = await getDocs(usersQuery);
        
        const usersList: User[] = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          // Don't include current user in the list
          if (doc.id !== currentUser.uid) {
            usersList.push({
              id: doc.id,
              displayName: userData.displayName || 'Unknown User',
              photoURL: userData.photoURL || '',
              online: userData.online || false
            });
          }
        });
        
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
      }
    };

    fetchUsers();
  }, [currentUser]);

  // Fetch chats for current user
  useEffect(() => {
    const fetchChats = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        const chatsQuery = query(
          collection(db, 'chats'),
          where('participants', 'array-contains', currentUser.uid)
        );
        
        const unsubscribe = onSnapshot(chatsQuery, async (snapshot) => {
          const chatsList: Chat[] = [];
          
          for (const docChange of snapshot.docChanges()) {
            const chatData = docChange.doc.data() as Chat;
            chatData.id = docChange.doc.id;
            
            // Ensure participant names are populated
            if (!chatData.participantNames) {
              chatData.participantNames = {};
              chatData.participantPhotos = {};
              
              for (const participantId of chatData.participants) {
                if (participantId === currentUser.uid) {
                  chatData.participantNames[participantId] = 'You';
                  chatData.participantPhotos[participantId] = currentUser.photoURL || '';
                } else {
                  // Fetch user info
                  const userDoc = await getDoc(doc(db, 'users', participantId));
                  if (userDoc.exists()) {
                    const userData = userDoc.data();
                    chatData.participantNames[participantId] = userData.displayName || 'Unknown User';
                    chatData.participantPhotos[participantId] = userData.photoURL || '';
                  } else {
                    chatData.participantNames[participantId] = 'Unknown User';
                  }
                }
              }
              
              // Update the chat document with names
              await updateDoc(doc(db, 'chats', docChange.doc.id), {
                participantNames: chatData.participantNames,
                participantPhotos: chatData.participantPhotos
              });
            }
            
            // Handle different types of changes
            if (docChange.type === 'added' || docChange.type === 'modified') {
              chatsList.push(chatData);
            }
          }
          
          // Sort chats by most recent message
          chatsList.sort((a, b) => {
            if (!a.lastMessageTime && !b.lastMessageTime) return 0;
            if (!a.lastMessageTime) return 1;
            if (!b.lastMessageTime) return -1;
            return b.lastMessageTime.toMillis() - a.lastMessageTime.toMillis();
          });
          
          setChats(chatsList);
          setLoading(false);
        });
        
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching chats:', error);
        toast.error('Failed to load chats');
        setLoading(false);
      }
    };
    
    fetchChats();
  }, [currentUser]);

  // Load messages for selected chat
  useEffect(() => {
    if (selectedChat && currentUser) {
      setLoadingMessages(true);
      
      const messagesQuery = query(
        collection(db, `chats/${selectedChat.id}/messages`),
        orderBy('timestamp', 'asc')
      );
      
      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const messagesList: Message[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          messagesList.push({
            id: doc.id,
            text: data.text,
            senderId: data.senderId,
            senderName: data.senderId === currentUser.uid ? 'You' : 
                         (selectedChat.participantNames[data.senderId] || 'Unknown User'),
            timestamp: data.timestamp
          } as Message);
        });
        
        setMessages(messagesList);
        setLoadingMessages(false);
        
        // If there are unread messages for the current user, mark them as read
        if (selectedChat.unreadCounts && selectedChat.unreadCounts[currentUser.uid] > 0) {
          const unreadUpdate = { [`unreadCounts.${currentUser.uid}`]: 0 };
          updateDoc(doc(db, 'chats', selectedChat.id), unreadUpdate)
            .catch(error => console.error('Error updating read status:', error));
        }
      });
      
      return () => unsubscribe();
    }
  }, [selectedChat, currentUser]);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (message.trim() === '' || !selectedChat || !currentUser) return;

    try {
      // Add message to Firestore
      await addDoc(collection(db, `chats/${selectedChat.id}/messages`), {
        text: message,
        senderId: currentUser.uid,
        timestamp: serverTimestamp()
      });
      
      // Update the last message and timestamp in the chat document
      const otherUser = selectedChat.participants.find(id => id !== currentUser.uid);
      const unreadUpdate = otherUser ? { [`unreadCounts.${otherUser}`]: (selectedChat.unreadCounts?.[otherUser] || 0) + 1 } : {};
      
      await updateDoc(doc(db, 'chats', selectedChat.id), {
        lastMessage: message,
        lastMessageTime: serverTimestamp(),
        ...unreadUpdate
      });
      
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const startNewChat = async (userId: string) => {
    if (!currentUser) return;
    
    try {
      // Check if a chat already exists between these users
      const chatsQuery = query(
        collection(db, 'chats'),
        where('participants', 'array-contains', currentUser.uid)
      );
      
      const querySnapshot = await getDocs(chatsQuery);
      let existingChat: Chat | null = null;
      
      querySnapshot.forEach(doc => {
        const chatData = doc.data() as Chat;
        if (chatData.participants.includes(userId)) {
          existingChat = { ...chatData, id: doc.id };
        }
      });
      
      if (existingChat) {
        // Chat already exists, just select it
        setSelectedChat(existingChat);
      } else {
        // Create a new chat
        const targetUser = users.find(user => user.id === userId);
        if (!targetUser) {
          toast.error('User not found');
          return;
        }
        
        const chatData = {
          participants: [currentUser.uid, userId],
          participantNames: {
            [currentUser.uid]: currentUser.displayName || 'You',
            [userId]: targetUser.displayName
          },
          participantPhotos: {
            [currentUser.uid]: currentUser.photoURL || '',
            [userId]: targetUser.photoURL || ''
          },
          lastMessage: '',
          lastMessageTime: serverTimestamp(),
          unreadCounts: {
            [currentUser.uid]: 0,
            [userId]: 0
          }
        };
        
        const chatRef = await addDoc(collection(db, 'chats'), chatData);
        setSelectedChat({ ...chatData, id: chatRef.id } as Chat);
      }
      
      setNewChatDialogOpen(false);
    } catch (error) {
      console.error('Error creating chat:', error);
      toast.error('Failed to create chat');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: Timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate();
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
      return formatTime(timestamp);
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredChats = searchTerm 
    ? chats.filter(chat => {
        const otherParticipantId = chat.participants.find(p => p !== currentUser?.uid);
        const otherParticipantName = chat.participantNames[otherParticipantId || ''] || '';
        return otherParticipantName.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : chats;

  const filteredUsers = searchUserTerm
    ? users.filter(user => 
        user.displayName.toLowerCase().includes(searchUserTerm.toLowerCase()))
    : users;

  const getOtherParticipant = (chat: Chat) => {
    if (!currentUser) return null;
    const otherParticipantId = chat.participants.find(p => p !== currentUser.uid);
    return users.find(u => u.id === otherParticipantId);
  };

  return (
    <div className="p-0 h-[calc(100vh-64px)] flex flex-col overflow-hidden bg-white">
      {/* Main messaging container with 3-column layout */}
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* Left sidebar - Navigation */}
        <div className="w-[70px] md:w-[80px] border-r flex flex-col items-center py-4 bg-white">
          <div className="mb-6">
            <Avatar className="h-12 w-12 bg-gradient-to-br from-blue-400 to-blue-600">
              <AvatarImage src="/logo.png" />
              <AvatarFallback className="text-white text-lg">M</AvatarFallback>
            </Avatar>
          </div>
          
          <nav className="flex flex-col items-center space-y-6 text-gray-500">
            <div className="flex flex-col items-center text-blue-500">
              <MessageSquare className="h-6 w-6" />
              <span className="text-xs mt-1">Chat</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-6 w-6" />
              <span className="text-xs mt-1">People</span>
            </div>
            <div className="flex flex-col items-center">
              <ShoppingBag className="h-6 w-6" />
              <span className="text-xs mt-1">Shop</span>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-6 w-6" />
              <span className="text-xs mt-1">Request</span>
            </div>
            <div className="flex flex-col items-center">
              <Archive className="h-6 w-6" />
              <span className="text-xs mt-1">Archive</span>
            </div>
          </nav>
          
          <div className="mt-auto">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser?.photoURL || ''} />
              <AvatarFallback>{currentUser?.displayName?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        
        {/* Middle column - Chat list */}
        <div className={`${selectedChat && window.innerWidth < 768 ? 'hidden' : 'flex'} w-full md:w-[320px] flex-col border-r`}>
          <div className="p-4 border-b flex justify-between items-center">
            <h1 className="text-2xl font-bold">Chats</h1>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="p-2">
            <div className="relative mb-2">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search messenger..."
                className="pl-10 py-2 h-10 text-sm rounded-full bg-gray-100 border-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm">{t('common.loading')}...</p>
              </div>
            ) : (
              <div className="space-y-0">
                {filteredChats.length === 0 ? (
                  <div className="text-center p-4 text-gray-500">
                    <p className="text-sm">{t('messaging.noChats')}</p>
                  </div>
                ) : (
                  filteredChats.map((chat) => {
                    const otherParticipantId = chat.participants.find(p => p !== currentUser?.uid);
                    const unreadCount = chat.unreadCounts?.[currentUser?.uid || ''] || 0;
                    const isActive = selectedChat?.id === chat.id;
                    
                    return (
                      <div 
                        key={chat.id}
                        className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition-colors ${
                          isActive ? 'bg-blue-100 hover:bg-blue-100' : ''
                        }`}
                        onClick={() => setSelectedChat(chat)}
                      >
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={chat.participantPhotos?.[otherParticipantId || ''] || ''} />
                            <AvatarFallback>{chat.participantNames[otherParticipantId || '']?.charAt(0) || '?'}</AvatarFallback>
                          </Avatar>
                          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                            getOtherParticipant(chat)?.online ? 'bg-green-500' : 'bg-gray-400'
                          }`}></span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium truncate">
                              {chat.participantNames[otherParticipantId || ''] || 'Unknown'}
                            </h3>
                            <span className="text-xs text-gray-500 ml-1 flex-shrink-0">
                              {chat.lastMessageTime ? formatDate(chat.lastMessageTime) : ''}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {chat.lastMessage || 'Start a conversation'}
                          </p>
                        </div>
                        
                        {unreadCount > 0 && (
                          <Badge className="bg-blue-600 hover:bg-blue-700 rounded-full px-1.5 min-h-[20px] min-w-[20px]">{unreadCount}</Badge>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Right column - Chat area */}
        <div className={`${!selectedChat && window.innerWidth < 768 ? 'hidden' : 'flex'} flex-1 flex-col h-full`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-3 border-b bg-white">
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden h-8 w-8 rounded-full"
                    onClick={() => setSelectedChat(null)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage 
                        src={selectedChat.participantPhotos?.[selectedChat.participants.find(p => p !== currentUser?.uid) || ''] || ''} 
                      />
                      <AvatarFallback>
                        {selectedChat.participantNames[selectedChat.participants.find(p => p !== currentUser?.uid) || '']?.charAt(0) || '?'}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">
                      {selectedChat.participantNames[selectedChat.participants.find(p => p !== currentUser?.uid) || ''] || 'Unknown'}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center">
                      {getOtherParticipant(selectedChat)?.online ? 'Active now' : 'Offline'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Info className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 bg-white">
                {loadingMessages ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-sm">{t('common.loading')}...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-sm text-gray-500">{t('messaging.noMessages')}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => {
                      const isCurrentUser = msg.senderId === currentUser?.uid;
                      return (
                        <div 
                          key={msg.id} 
                          className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                          {!isCurrentUser && (
                            <Avatar className="h-8 w-8 mr-2 self-end">
                              <AvatarImage 
                                src={selectedChat.participantPhotos?.[msg.senderId] || ''} 
                              />
                              <AvatarFallback>{msg.senderName.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div className={`max-w-[75%] ${
                            isCurrentUser 
                              ? 'bg-blue-500 text-white rounded-[18px] rounded-tr-sm' 
                              : 'bg-gray-200 text-gray-800 rounded-[18px] rounded-tl-sm'
                          } px-4 py-2`}>
                            <p className="break-words">{msg.text}</p>
                          </div>
                          
                          {isCurrentUser && (
                            <Avatar className="h-8 w-8 ml-2 self-end">
                              <AvatarImage src={currentUser?.photoURL || ''} />
                              <AvatarFallback>{currentUser?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="p-3 border-t bg-white flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Plus className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Camera className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Image className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Mic className="h-5 w-5" />
                  </Button>
                </div>
                
                <Input
                  placeholder="Message..."
                  className="flex-1 rounded-full border-gray-200 focus:border-blue-500 bg-gray-100 border-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                
                <Button 
                  onClick={handleSendMessage}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  disabled={!message.trim()}
                >
                  <Send className={`h-5 w-5 ${message.trim() ? 'text-blue-500' : 'text-gray-400'}`} />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="bg-blue-100 rounded-full p-6 mb-6">
                <MessageSquare className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">Your Messages</h3>
              <p className="text-gray-500 mb-6 max-w-md">
                Send private messages to a friend or group
              </p>
              <Dialog open={newChatDialogOpen} onOpenChange={setNewChatDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-full px-6 py-2 bg-blue-500 hover:bg-blue-600">
                    Send Message
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl max-w-sm">
                  <DialogHeader>
                    <DialogTitle>New Message</DialogTitle>
                  </DialogHeader>
                  <div className="relative mb-3">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      placeholder="Search for people"
                      className="pl-10 py-2 rounded-full border-gray-200 focus:border-blue-500"
                      value={searchUserTerm}
                      onChange={(e) => setSearchUserTerm(e.target.value)}
                    />
                  </div>
                  <div className="max-h-[250px] overflow-y-auto">
                    {filteredUsers.length === 0 ? (
                      <p className="text-center text-gray-500 py-3">No users found</p>
                    ) : (
                      <div className="space-y-1">
                        {filteredUsers.map((user) => (
                          <div 
                            key={user.id}
                            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-all"
                            onClick={() => startNewChat(user.id)}
                          >
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.photoURL} />
                              <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium">{user.displayName}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messaging; 