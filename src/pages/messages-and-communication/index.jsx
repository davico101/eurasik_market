import React, { useState, useEffect, useRef } from 'react';
        import { useNavigate } from 'react-router-dom';
        import ContextualHeader from '../../components/ui/ContextualHeader';
        import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
        import ConversationList from './components/ConversationList';
        import ChatInterface from './components/ChatInterface';
        import MessageComposer from './components/MessageComposer';
        import QuickResponses from './components/QuickResponses';
        
        import Icon from '../../components/AppIcon';

        const MessagesAndCommunication = () => {
          const navigate = useNavigate();
          const [conversations, setConversations] = useState([]);
          const [activeConversation, setActiveConversation] = useState(null);
          const [messages, setMessages] = useState([]);
          const [isLoading, setIsLoading] = useState(true);
          const [isSending, setIsSending] = useState(false);
          const [typingUsers, setTypingUsers] = useState([]);
          const [showMobileChat, setShowMobileChat] = useState(false);
          const messagesEndRef = useRef(null);

          useEffect(() => {
            loadConversations();
          }, []);

          useEffect(() => {
            if (activeConversation) {
              loadMessages(activeConversation.id);
            }
          }, [activeConversation]);

          useEffect(() => {
            scrollToBottom();
          }, [messages]);

          const loadConversations = async () => {
            setIsLoading(true);
            
            // Mock conversations data
            const mockConversations = [
              {
                id: 1,
                user: {
                  id: 2,
                  name: 'María López',
                  avatar: '/api/placeholder/48/48',
                  isOnline: true
                },
                game: {
                  title: 'Wingspan',
                  price: 42.50,
                  image: '/api/placeholder/60/60'
                },
                lastMessage: {
                  text: '¿El juego incluye todas las expansiones?',
                  timestamp: '2025-01-30T13:45:00Z',
                  senderId: 2
                },
                unreadCount: 2,
                updatedAt: '2025-01-30T13:45:00Z'
              },
              {
                id: 2,
                user: {
                  id: 3,
                  name: 'Carlos Ruiz',
                  avatar: '/api/placeholder/48/48',
                  isOnline: false,
                  lastSeen: '2025-01-30T10:30:00Z'
                },
                game: {
                  title: 'Terraforming Mars',
                  price: 67.00,
                  image: '/api/placeholder/60/60'
                },
                lastMessage: {
                  text: 'Perfecto, confirmo la compra',
                  timestamp: '2025-01-30T11:20:00Z',
                  senderId: 1
                },
                unreadCount: 0,
                updatedAt: '2025-01-30T11:20:00Z'
              },
              {
                id: 3,
                user: {
                  id: 4,
                  name: 'Ana García',
                  avatar: '/api/placeholder/48/48',
                  isOnline: true
                },
                game: {
                  title: 'Gloomhaven',
                  price: 120.00,
                  image: '/api/placeholder/60/60'
                },
                lastMessage: {
                  text: 'Sistema: Pago confirmado',
                  timestamp: '2025-01-29T16:15:00Z',
                  senderId: 'system',
                  type: 'payment'
                },
                unreadCount: 0,
                updatedAt: '2025-01-29T16:15:00Z'
              }
            ];

            await new Promise(resolve => setTimeout(resolve, 1000));
            setConversations(mockConversations);
            setIsLoading(false);
          };

          const loadMessages = async (conversationId) => {
            // Mock messages data
            const mockMessages = {
              1: [
                {
                  id: 1,
                  text: '¡Hola! Me interesa tu Wingspan. ¿Está en buen estado?',
                  senderId: 2,
                  timestamp: '2025-01-30T13:00:00Z',
                  type: 'text'
                },
                {
                  id: 2,
                  text: 'Hola María, sí está en perfecto estado. Apenas lo he jugado 3 veces.',
                  senderId: 1,
                  timestamp: '2025-01-30T13:05:00Z',
                  type: 'text'
                },
                {
                  id: 3,
                  text: 'Sistema: Nueva puja recibida por €45.00',
                  senderId: 'system',
                  timestamp: '2025-01-30T13:30:00Z',
                  type: 'bid',
                  data: { amount: 45.00, bidder: 'Pedro M.' }
                },
                {
                  id: 4,
                  text: '¿El juego incluye todas las expansiones?',
                  senderId: 2,
                  timestamp: '2025-01-30T13:45:00Z',
                  type: 'text'
                }
              ],
              2: [
                {
                  id: 1,
                  text: 'Hola, me gustaría comprar tu Terraforming Mars',
                  senderId: 3,
                  timestamp: '2025-01-30T10:00:00Z',
                  type: 'text'
                },
                {
                  id: 2,
                  text: 'Perfecto, confirmo la compra',
                  senderId: 1,
                  timestamp: '2025-01-30T11:20:00Z',
                  type: 'text'
                }
              ],
              3: [
                {
                  id: 1,
                  text: 'Sistema: Pago confirmado por €120.00',
                  senderId: 'system',
                  timestamp: '2025-01-29T16:15:00Z',
                  type: 'payment',
                  data: { amount: 120.00, method: 'PayPal' }
                }
              ]
            };

            setMessages(mockMessages[conversationId] || []);
          };

          const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          };

          const handleSendMessage = async (messageText, attachments = []) => {
            if (!messageText.trim() || !activeConversation) return;

            setIsSending(true);

            const newMessage = {
              id: Date.now(),
              text: messageText,
              senderId: 1, // Current user
              timestamp: new Date().toISOString(),
              type: 'text',
              attachments
            };

            setMessages(prev => [...prev, newMessage]);

            // Update conversation last message
            setConversations(prev =>
              prev.map(conv =>
                conv.id === activeConversation.id
                  ? {
                      ...conv,
                      lastMessage: {
                        text: messageText,
                        timestamp: newMessage.timestamp,
                        senderId: 1
                      },
                      updatedAt: newMessage.timestamp
                    }
                  : conv
              )
            );

            // Simulate sending delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsSending(false);

            // Simulate typing indicator and response (for demo)
            if (Math.random() > 0.5) {
              setTimeout(() => {
                setTypingUsers([activeConversation.user.name]);
                setTimeout(() => {
                  setTypingUsers([]);
                  const response = {
                    id: Date.now() + 1,
                    text: 'Gracias por tu mensaje, te respondo pronto.',
                    senderId: activeConversation.user.id,
                    timestamp: new Date().toISOString(),
                    type: 'text'
                  };
                  setMessages(prev => [...prev, response]);
                }, 2000);
              }, 1000);
            }
          };

          const handleConversationSelect = (conversation) => {
            setActiveConversation(conversation);
            setShowMobileChat(true);
            
            // Mark as read
            setConversations(prev =>
              prev.map(conv =>
                conv.id === conversation.id
                  ? { ...conv, unreadCount: 0 }
                  : conv
              )
            );
          };

          const handleBackToList = () => {
            setActiveConversation(null);
            setShowMobileChat(false);
          };

          const handleArchiveConversation = (conversationId) => {
            setConversations(prev =>
              prev.filter(conv => conv.id !== conversationId)
            );
            
            if (activeConversation?.id === conversationId) {
              setActiveConversation(null);
              setShowMobileChat(false);
            }
          };

          const handleBlockUser = (conversationId) => {
            handleArchiveConversation(conversationId);
            // Here you would also implement the actual blocking logic
          };

          if (isLoading) {
            return (
              <div className="min-h-screen bg-background">
                <ContextualHeader />
                <div className="flex items-center justify-center pt-20">
                  <div className="flex flex-col items-center space-y-4">
                    <Icon name="Loader2" size={32} className="text-primary animate-spin" />
                    <p className="font-body text-muted-foreground">Cargando mensajes...</p>
                  </div>
                </div>
                <BottomTabNavigation />
              </div>
            );
          }

          return (
            <div className="min-h-screen bg-background">
              {/* Header */}
              <ContextualHeader />

              {/* Main Content */}
              <main className="pb-32 md:pb-16">
                <div className="flex h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)]">
                  {/* Conversation List - Always visible on desktop, toggleable on mobile */}
                  <div className={`
                    w-full md:w-80 md:border-r md:border-border bg-card
                    ${showMobileChat ? 'hidden md:block' : 'block'}
                  `}>
                    <ConversationList
                      conversations={conversations}
                      activeConversation={activeConversation}
                      onConversationSelect={handleConversationSelect}
                      onArchive={handleArchiveConversation}
                      onBlock={handleBlockUser}
                    />
                  </div>

                  {/* Chat Interface - Visible when conversation selected */}
                  <div className={`
                    flex-1 flex flex-col
                    ${showMobileChat ? 'block' : 'hidden md:flex'}
                  `}>
                    {activeConversation ? (
                      <>
                        {/* Chat Header - Mobile only */}
                        <div className="md:hidden bg-card border-b border-border p-4">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={handleBackToList}
                              className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                            >
                              <Icon name="ArrowLeft" size={20} />
                            </button>
                            <img
                              src={activeConversation.user.avatar}
                              alt={activeConversation.user.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-heading font-semibold text-foreground">
                                {activeConversation.user.name}
                              </h3>
                              <p className="font-caption text-xs text-muted-foreground">
                                {activeConversation.user.isOnline ? 'En línea' : 'Desconectado'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Messages Area */}
                        <ChatInterface
                          messages={messages}
                          activeConversation={activeConversation}
                          typingUsers={typingUsers}
                          currentUserId={1}
                        />

                        {/* Message Composer */}
                        <div className="border-t border-border bg-card">
                          <QuickResponses onSelect={handleSendMessage} />
                          <MessageComposer
                            onSendMessage={handleSendMessage}
                            isSending={isSending}
                            disabled={!activeConversation}
                          />
                        </div>
                      </>
                    ) : (
                      /* Empty State */
                      <div className="hidden md:flex flex-1 items-center justify-center bg-muted/20">
                        <div className="text-center max-w-sm">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icon name="MessageCircle" size={32} className="text-primary" />
                          </div>
                          <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                            Selecciona una conversación
                          </h3>
                          <p className="font-body text-muted-foreground">
                            Elige una conversación de la lista para comenzar a chatear con otros usuarios.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </main>

              {/* Bottom Navigation */}
              <BottomTabNavigation />
            </div>
          );
        };

        export default MessagesAndCommunication;