import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AuctionStatusBar = ({ 
  isVisible = false, 
  gameTitle = "Catan: Edición Especial",
  currentBid = 45.50,
  timeRemaining = "2h 15m",
  bidCount = 12,
  onBid,
  onExpand 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeRemaining);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      // Simulate countdown timer
      setTimeLeft(prev => {
        const parts = prev.split(' ');
        let hours = parseInt(parts[0].replace('h', ''));
        let minutes = parseInt(parts[1].replace('m', ''));
        
        if (minutes > 0) {
          minutes--;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
        }
        
        return `${hours}h ${minutes}m`;
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [isVisible]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    onExpand && onExpand(!isExpanded);
  };

  const handleBid = () => {
    onBid && onBid();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Compact Status Bar */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-card border-t border-border shadow-warm-lg">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Game Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-body font-medium text-sm text-foreground truncate">
                {gameTitle}
              </h3>
              <div className="flex items-center space-x-3 mt-1">
                <span className="font-data text-lg font-medium text-primary">
                  ${currentBid.toFixed(2)}
                </span>
                <span className="font-caption text-xs text-muted-foreground">
                  {bidCount} pujas
                </span>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} className="text-warning" />
                  <span className="font-caption text-xs text-warning font-medium">
                    {timeLeft}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExpand}
                className="shrink-0"
                aria-label="Expandir detalles"
              >
                <Icon name={isExpanded ? "ChevronDown" : "ChevronUp"} size={16} />
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleBid}
                className="shrink-0 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Pujar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Panel */}
      {isExpanded && (
        <div className="fixed bottom-16 left-0 right-0 z-50 bg-popover border border-border rounded-t-xl shadow-warm-lg max-h-96 overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="font-heading font-semibold text-lg text-popover-foreground mb-1">
                  {gameTitle}
                </h2>
                <p className="font-caption text-sm text-muted-foreground">
                  Estado: Muy bueno • Vendedor: @juancarlos
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleExpand}
                className="shrink-0"
                aria-label="Cerrar"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Bid Information */}
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-caption text-xs text-muted-foreground mb-1">
                    Puja actual
                  </p>
                  <p className="font-data text-2xl font-medium text-primary">
                    ${currentBid.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="font-caption text-xs text-muted-foreground mb-1">
                    Tiempo restante
                  </p>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={16} className="text-warning" />
                    <p className="font-data text-lg font-medium text-warning">
                      {timeLeft}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Bid Options */}
            <div className="mb-4">
              <p className="font-body font-medium text-sm text-popover-foreground mb-3">
                Pujas rápidas
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { amount: currentBid + 1, label: '+$1' },
                  { amount: currentBid + 2.50, label: '+$2.50' },
                  { amount: currentBid + 5, label: '+$5' }
                ].map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => onBid && onBid(option.amount)}
                    className="flex flex-col items-center py-3"
                  >
                    <span className="font-data text-sm font-medium">
                      ${option.amount.toFixed(2)}
                    </span>
                    <span className="font-caption text-xs text-muted-foreground">
                      {option.label}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Bid */}
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder={`Mín. $${(currentBid + 0.50).toFixed(2)}`}
                  min={currentBid + 0.50}
                  step="0.50"
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
              <Button
                variant="default"
                onClick={handleBid}
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-6"
              >
                Pujar
              </Button>
            </div>

            {/* Recent Bids */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="font-body font-medium text-sm text-popover-foreground mb-3">
                Pujas recientes
              </p>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {[
                  { user: '@maria_games', amount: 45.50, time: 'hace 2 min' },
                  { user: '@boardgamer23', amount: 43.00, time: 'hace 8 min' },
                  { user: '@coleccionista', amount: 40.50, time: 'hace 15 min' }
                ].map((bid, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="font-body text-popover-foreground">
                      {bid.user}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="font-data font-medium text-primary">
                        ${bid.amount.toFixed(2)}
                      </span>
                      <span className="font-caption text-xs text-muted-foreground">
                        {bid.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-30 bg-black/20" 
          onClick={handleExpand}
        />
      )}
    </>
  );
};

export default AuctionStatusBar;