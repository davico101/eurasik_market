import React from 'react';
        import Icon from '../../../components/AppIcon';

        const TradingHistory = ({ history, isLoading }) => {
          const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
    });
          };

          const renderStars = (rating) => {
            return Array.from({ length: 5 }, (_, index) => (
              <Icon
                key={index}
                name="Star"
                size={12}
                className={`${
                  index < rating
                    ? 'text-yellow-500 fill-current' :'text-muted-foreground'
                }`}
              />
            ));
          };

          if (isLoading) {
            return (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <Icon name="Loader2" size={24} className="text-primary animate-spin" />
                  <p className="font-body text-muted-foreground">Cargando historial...</p>
                </div>
              </div>
            );
          }

          if (!history?.length) {
            return (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Icon name="Package" size={24} className="text-muted-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  Sin historial aún
                </h3>
                <p className="font-body text-muted-foreground max-w-sm">
                  Cuando realices tu primera transacción, aparecerá aquí tu historial de compras y ventas.
                </p>
              </div>
            );
          }

          return (
            <div className="space-y-4">
              {history.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-card rounded-lg p-6 border border-border hover:shadow-warm-sm transition-shadow duration-200"
                >
                  {/* Transaction Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${transaction.type === 'sold' ?'bg-green-100 text-green-600' :'bg-blue-100 text-blue-600'
                        }
                      `}>
                        <Icon 
                          name={transaction.type === 'sold' ? 'TrendingUp' : 'TrendingDown'} 
                          size={20} 
                        />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-foreground">
                          {transaction.gameTitle}
                        </h4>
                        <p className="font-caption text-sm text-muted-foreground">
                          {transaction.type === 'sold' ? 'Vendido a' : 'Comprado a'} {transaction.buyerSeller}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-heading font-bold text-lg text-foreground">
                        ${transaction.price?.toFixed(2)}
                      </div>
                      <div className="font-caption text-sm text-muted-foreground">
                        {formatDate(transaction.date)}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="font-body text-sm text-muted-foreground">
                      Valoración:
                    </span>
                    <div className="flex items-center space-x-1">
                      {renderStars(transaction.rating)}
                    </div>
                    <span className="font-caption text-sm text-muted-foreground">
                      ({transaction.rating}/5)
                    </span>
                  </div>

                  {/* Review */}
                  {transaction.review && (
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="font-body text-sm text-muted-foreground italic">
                        "{transaction.review}"
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-border">
                    <button className="flex items-center space-x-2 px-3 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200">
                      <Icon name="MessageCircle" size={16} />
                      <span className="font-body text-sm">Contactar</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:bg-muted/50 rounded-lg transition-colors duration-200">
                      <Icon name="MoreHorizontal" size={16} />
                      <span className="font-body text-sm">Más</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Load More Button */}
              <div className="flex justify-center pt-4">
                <button className="flex items-center space-x-2 px-6 py-3 bg-muted hover:bg-muted/70 rounded-lg transition-colors duration-200">
                  <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
                  <span className="font-body text-sm text-muted-foreground">
                    Cargar más transacciones
                  </span>
                </button>
              </div>
            </div>
          );
        };

        export default TradingHistory;