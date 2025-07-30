import React from 'react';
        import Icon from '../../../components/AppIcon';

        const SystemMessage = ({ message }) => {
          const getMessageConfig = () => {
            switch (message.type) {
              case 'payment':
                return {
                  icon: 'CreditCard',
                  color: 'text-green-600',
                  bgColor: 'bg-green-50',
                  borderColor: 'border-green-200'
                };
              case 'bid':
                return {
                  icon: 'TrendingUp',
                  color: 'text-blue-600',
                  bgColor: 'bg-blue-50',
                  borderColor: 'border-blue-200'
                };
              case 'shipping':
                return {
                  icon: 'Truck',
                  color: 'text-orange-600',
                  bgColor: 'bg-orange-50',
                  borderColor: 'border-orange-200'
                };
              case 'dispute':
                return {
                  icon: 'AlertTriangle',
                  color: 'text-red-600',
                  bgColor: 'bg-red-50',
                  borderColor: 'border-red-200'
                };
              default:
                return {
                  icon: 'Info',
                  color: 'text-blue-600',
                  bgColor: 'bg-blue-50',
                  borderColor: 'border-blue-200'
                };
            }
          };

          const config = getMessageConfig();

          const formatTimestamp = (timestamp) => {
            const date = new Date(timestamp);
            return date.toLocaleTimeString('es-ES', { 
              hour: '2-digit', 
              minute: '2-digit' 
            });
          };

          const renderMessageContent = () => {
            switch (message.type) {
              case 'payment':
                return (
                  <div className="text-center">
                    <p className="font-body text-sm text-foreground mb-2">
                      {message.text}
                    </p>
                    {message.data?.amount && (
                      <div className="flex items-center justify-center space-x-2">
                        <span className="font-heading font-semibold text-lg text-green-600">
                          €{message.data.amount.toFixed(2)}
                        </span>
                        {message.data?.method && (
                          <span className="font-caption text-xs text-muted-foreground">
                            vía {message.data.method}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );

              case 'bid':
                return (
                  <div className="text-center">
                    <p className="font-body text-sm text-foreground mb-2">
                      Nueva puja recibida
                    </p>
                    {message.data && (
                      <div className="space-y-1">
                        <div className="font-heading font-semibold text-lg text-blue-600">
                          €{message.data.amount.toFixed(2)}
                        </div>
                        <div className="font-caption text-xs text-muted-foreground">
                          por {message.data.bidder}
                        </div>
                      </div>
                    )}
                  </div>
                );

              case 'shipping':
                return (
                  <div className="text-center">
                    <p className="font-body text-sm text-foreground mb-2">
                      {message.text}
                    </p>
                    {message.data?.trackingNumber && (
                      <div className="bg-background rounded-lg p-2 mt-2">
                        <span className="font-caption text-xs text-muted-foreground">
                          Seguimiento: 
                        </span>
                        <span className="font-mono text-xs text-foreground ml-1">
                          {message.data.trackingNumber}
                        </span>
                      </div>
                    )}
                  </div>
                );

              default:
                return (
                  <p className="font-body text-sm text-foreground text-center">
                    {message.text}
                  </p>
                );
            }
          };

          return (
            <div className="flex justify-center my-4">
              <div className={`
                max-w-sm mx-auto p-4 rounded-xl border
                ${config.bgColor} ${config.borderColor}
              `}>
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <Icon 
                    name={config.icon} 
                    size={16} 
                    className={config.color}
                  />
                  <span className={`font-caption text-xs font-medium ${config.color}`}>
                    Actualización del sistema
                  </span>
                </div>

                {renderMessageContent()}

                <div className="text-center mt-3">
                  <span className="font-caption text-xs text-muted-foreground">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>

                {/* Action Buttons for certain message types */}
                {message.type === 'bid' && (
                  <div className="flex space-x-2 mt-3">
                    <button className="flex-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors duration-200">
                      Ver subasta
                    </button>
                    <button className="flex-1 px-3 py-1.5 bg-background text-foreground border border-border rounded-lg text-xs font-medium hover:bg-muted transition-colors duration-200">
                      Contactar
                    </button>
                  </div>
                )}

                {message.type === 'payment' && (
                  <div className="mt-3">
                    <button className="w-full px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-colors duration-200">
                      Ver recibo
                    </button>
                  </div>
                )}

                {message.type === 'shipping' && message.data?.trackingNumber && (
                  <div className="mt-3">
                    <button className="w-full px-3 py-1.5 bg-orange-600 text-white rounded-lg text-xs font-medium hover:bg-orange-700 transition-colors duration-200">
                      Rastrear envío
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        };

        export default SystemMessage;