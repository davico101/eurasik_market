import React, { useState } from 'react';
        import Icon from '../../../components/AppIcon';

        const ConversationList = ({ 
          conversations, 
          activeConversation, 
          onConversationSelect, 
          onArchive, 
          onBlock 
        }) => {
          const [showActionsFor, setShowActionsFor] = useState(null);

          const formatTimestamp = (timestamp) => {
            const date = new Date(timestamp);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);

            if (diffMins < 1) return 'Ahora';
            if (diffMins < 60) return `${diffMins}m`;
            if (diffHours < 24) return `${diffHours}h`;
            if (diffDays < 7) return `${diffDays}d`;
            
            return date.toLocaleDateString('es-ES', { 
              day: 'numeric', 
              month: 'short' 
            });
          };

          const handleConversationClick = (conversation) => {
            setShowActionsFor(null);
            onConversationSelect(conversation);
          };

          const handleLongPress = (conversationId) => {
            setShowActionsFor(conversationId);
          };

          const isSystemMessage = (message) => {
            return message.senderId === 'system';
          };

          const getSystemMessageIcon = (type) => {
            switch (type) {
              case 'payment':
                return 'CreditCard';
              case 'bid':
                return 'TrendingUp';
              case 'shipping':
                return 'Truck';
              default:
                return 'Info';
            }
          };

          if (!conversations?.length) {
            return (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Icon name="MessageCircle" size={24} className="text-muted-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  No hay mensajes
                </h3>
                <p className="font-body text-muted-foreground max-w-sm">
                  Cuando alguien se interese por tus juegos o te contacte, aparecerán aquí tus conversaciones.
                </p>
              </div>
            );
          }

          return (
            <div className="h-full overflow-y-auto">
              {/* Search Bar */}
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={16} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                  <input
                    type="text"
                    placeholder="Buscar conversaciones..."
                    className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
              </div>

              {/* Conversations List */}
              <div className="divide-y divide-border">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`
                      relative p-4 hover:bg-muted/50 cursor-pointer transition-colors duration-200
                      ${activeConversation?.id === conversation.id ? 'bg-primary/5 border-r-2 border-primary' : ''}
                    `}
                    onClick={() => handleConversationClick(conversation)}
                    onTouchStart={() => handleLongPress(conversation.id)}
                  >
                    <div className="flex items-start space-x-3">
                      {/* User Avatar */}
                      <div className="relative shrink-0">
                        <img
                          src={conversation.user.avatar}
                          alt={conversation.user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conversation.user.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
                        )}
                      </div>

                      {/* Conversation Content */}
                      <div className="flex-1 min-w-0">
                        {/* Header Row */}
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-heading font-semibold text-sm text-foreground truncate">
                            {conversation.user.name}
                          </h4>
                          <div className="flex items-center space-x-2 shrink-0">
                            <span className="font-caption text-xs text-muted-foreground">
                              {formatTimestamp(conversation.lastMessage.timestamp)}
                            </span>
                            {conversation.unreadCount > 0 && (
                              <div className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                                <span className="font-caption text-xs font-medium">
                                  {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Game Context */}
                        <div className="flex items-center space-x-2 mb-2">
                          <img
                            src={conversation.game.image}
                            alt={conversation.game.title}
                            className="w-6 h-6 rounded object-cover"
                          />
                          <span className="font-caption text-xs text-muted-foreground truncate">
                            {conversation.game.title} • €{conversation.game.price.toFixed(2)}
                          </span>
                        </div>

                        {/* Last Message */}
                        <div className="flex items-center space-x-2">
                          {isSystemMessage(conversation.lastMessage) && (
                            <Icon 
                              name={getSystemMessageIcon(conversation.lastMessage.type)}
                              size={12}
                              className="text-primary shrink-0"
                            />
                          )}
                          <p className={`
                            font-body text-sm truncate
                            ${conversation.unreadCount > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}
                            ${isSystemMessage(conversation.lastMessage) ? 'text-primary' : ''}
                          `}>
                            {conversation.lastMessage.text}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions Menu */}
                    {showActionsFor === conversation.id && (
                      <div className="absolute top-0 right-0 bottom-0 bg-card border-l border-border flex items-center space-x-2 px-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onArchive(conversation.id);
                            setShowActionsFor(null);
                          }}
                          className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
                          aria-label="Archivar"
                        >
                          <Icon name="Archive" size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onBlock(conversation.id);
                            setShowActionsFor(null);
                          }}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          aria-label="Bloquear"
                        >
                          <Icon name="UserX" size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="p-4 text-center">
                <button className="text-primary font-body text-sm hover:underline">
                  Cargar más conversaciones
                </button>
              </div>
            </div>
          );
        };

        export default ConversationList;