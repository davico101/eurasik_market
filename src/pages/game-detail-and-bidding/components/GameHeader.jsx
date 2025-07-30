import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GameHeader = ({ 
  title = "",
  currentPrice = 0,
  isAuction = false,
  endTime = null,
  bidCount = 0,
  condition = "",
  onWatchlist = false,
  onToggleWatchlist
}) => {
  const [timeRemaining, setTimeRemaining] = useState("");
  const [isWatched, setIsWatched] = useState(onWatchlist);

  useEffect(() => {
    if (!isAuction || !endTime) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const difference = end - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (days > 0) {
          setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
        } else if (hours > 0) {
          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeRemaining(`${minutes}m ${seconds}s`);
        }
      } else {
        setTimeRemaining("Subasta finalizada");
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [isAuction, endTime]);

  const handleToggleWatchlist = () => {
    setIsWatched(!isWatched);
    onToggleWatchlist && onToggleWatchlist(!isWatched);
  };

  const getConditionColor = (condition) => {
    switch (condition.toLowerCase()) {
      case 'nuevo':
        return 'text-success bg-success/10';
      case 'como nuevo':
        return 'text-success bg-success/10';
      case 'muy bueno':
        return 'text-primary bg-primary/10';
      case 'bueno':
        return 'text-warning bg-warning/10';
      case 'aceptable':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-4">
      {/* Title and Actions */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="font-heading font-bold text-2xl text-foreground leading-tight">
            {title}
          </h1>
          {condition && (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium mt-2 ${getConditionColor(condition)}`}>
              {condition}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleWatchlist}
            className="shrink-0"
            aria-label={isWatched ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            <Icon 
              name={isWatched ? "Heart" : "Heart"} 
              size={20} 
              className={isWatched ? "text-destructive fill-current" : "text-muted-foreground"} 
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            aria-label="Compartir"
          >
            <Icon name="Share" size={20} />
          </Button>
        </div>
      </div>

      {/* Price and Auction Info */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-caption text-sm text-muted-foreground mb-1">
              {isAuction ? "Puja actual" : "Precio"}
            </p>
            <p className="font-data text-3xl font-bold text-primary">
              €{currentPrice.toFixed(2)}
            </p>
            {isAuction && bidCount > 0 && (
              <p className="font-caption text-sm text-muted-foreground mt-1">
                {bidCount} {bidCount === 1 ? 'puja' : 'pujas'}
              </p>
            )}
          </div>
          
          {isAuction && timeRemaining && (
            <div className="text-right">
              <p className="font-caption text-sm text-muted-foreground mb-1">
                Tiempo restante
              </p>
              <div className="flex items-center justify-end space-x-1">
                <Icon 
                  name="Clock" 
                  size={16} 
                  className={timeRemaining.includes("finalizada") ? "text-destructive" : "text-warning"} 
                />
                <p className={`font-data text-lg font-medium ${
                  timeRemaining.includes("finalizada") ? "text-destructive" : "text-warning"
                }`}>
                  {timeRemaining}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameHeader;