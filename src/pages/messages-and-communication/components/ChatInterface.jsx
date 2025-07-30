import React, { useRef, useEffect } from 'react';
        import Icon from '../../../components/AppIcon';
        import SystemMessage from './SystemMessage';

        const ChatInterface = ({ messages, activeConversation, typingUsers, currentUserId }) => {
          const messagesEndRef = useRef(null);

          useEffect(() => {
            scrollToBottom();
          }, [messages, typingUsers]);

          const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          };

          const formatMessageTime = (timestamp) => {
            const date = new Date(timestamp);
            return date.toLocaleTimeString('es-ES', { 
              hour: '2-digit', 
              minute: '2-digit' 
            });
          };

          const formatMessageDate = (timestamp) => {
            const date = new Date(timestamp);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            if (date.toDateString() === today.toDateString()) {
              return 'Hoy';
            } else if (date.toDateString() === yesterday.toDateString()) {
              return 'Ayer';
            } else {
              return date.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
              });
            }
          };

          const shouldShowDateSeparator = (currentMessage, previousMessage) => {
            if (!previousMessage) return true;
            
            const currentDate = new Date(currentMessage.timestamp).toDateString();
            const previousDate = new Date(previousMessage.timestamp).toDateString();
            
            return currentDate !== previousDate;
          };

          const shouldGroupMessage = (currentMessage, previousMessage) => {
            if (!previousMessage) return false;
            if (currentMessage.senderId !== previousMessage.senderId) return false;
            if (currentMessage.senderId === 'system') return false;
            
            const timeDiff = new Date(currentMessage.timestamp) - new Date(previousMessage.timestamp);
            return timeDiff < 300000; // 5 minutes
          };

          const isSystemMessage = (message) => message.senderId === 'system';
          const isOwnMessage = (message) => message.senderId === currentUserId;

          return (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
              {messages?.map((message, index) => {
                const previousMessage = messages[index - 1];
                const showDateSeparator = shouldShowDateSeparator(message, previousMessage);
                const groupWithPrevious = shouldGroupMessage(message, previousMessage);

                return (
                  <div key={message.id}>
                    {/* Date Separator */}
                    {showDateSeparator && (
                      <div className="flex items-center justify-center my-6">
                        <div className="bg-muted px-3 py-1 rounded-full">
                          <span className="font-caption text-xs text-muted-foreground">
                            {formatMessageDate(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* System Message */}
                    {isSystemMessage(message) ? (
                      <SystemMessage message={message} />
                    ) : (
                      /* Regular Message */
                      <div className={`flex ${isOwnMessage(message) ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex space-x-2 max-w-xs md:max-w-md ${isOwnMessage(message) ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          {/* Avatar */}
                          {!groupWithPrevious && !isOwnMessage(message) && (
                            <img
                              src={activeConversation?.user?.avatar}
                              alt={activeConversation?.user?.name}
                              className="w-8 h-8 rounded-full object-cover shrink-0"
                            />
                          )}
                          
                          {groupWithPrevious && !isOwnMessage(message) && (
                            <div className="w-8 shrink-0" />
                          )}

                          {/* Message Bubble */}
                          <div className={`
                            relative px-4 py-2 rounded-2xl
                            ${isOwnMessage(message)
                              ? 'bg-primary text-primary-foreground rounded-br-md'
                              : 'bg-card border border-border text-foreground rounded-bl-md'
                            }
                            ${groupWithPrevious 
                              ? (isOwnMessage(message) ? 'rounded-tr-2xl' : 'rounded-tl-2xl')
                              : ''
                            }
                          `}>
                            <p className="font-body text-sm leading-relaxed">
                              {message.text}
                            </p>

                            {/* Attachments */}
                            {message.attachments?.length > 0 && (
                              <div className="mt-2 space-y-2">
                                {message.attachments.map((attachment, idx) => (
                                  <div key={idx} className="relative">
                                    {attachment.type === 'image' ? (
                                      <img
                                        src={attachment.url}
                                        alt={attachment.name}
                                        className="max-w-full h-auto rounded-lg"
                                      />
                                    ) : (
                                      <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
                                        <Icon name="Paperclip" size={16} />
                                        <span className="font-caption text-xs truncate">
                                          {attachment.name}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Timestamp */}
                            {!groupWithPrevious && (
                              <div className={`
                                absolute -bottom-5 text-xs font-caption text-muted-foreground
                                ${isOwnMessage(message) ? 'right-0' : 'left-0'}
                              `}>
                                {formatMessageTime(message.timestamp)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {typingUsers?.length > 0 && (
                <div className="flex justify-start">
                  <div className="flex space-x-2 max-w-xs">
                    <img
                      src={activeConversation?.user?.avatar}
                      alt={activeConversation?.user?.name}
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                    <div className="bg-card border border-border px-4 py-2 rounded-2xl rounded-bl-md">
                      <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="font-caption text-xs text-muted-foreground ml-2">
                          {typingUsers[0]} está escribiendo...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Scroll Anchor */}
              <div ref={messagesEndRef} />
            </div>
          );
        };

        export default ChatInterface;