import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const [isWatched, setIsWatched] = useState(game.isWatched || false);

  const handleCardClick = () => {
    navigate('/game-detail-and-bidding', { state: { gameId: game.id } });
  };

  const handleWatchToggle = (e) => {
    e.stopPropagation();
    setIsWatched(!isWatched);
  };

  const handleQuickBid = (e) => {
    e.stopPropagation();
    // Quick bid functionality
  };

  const getTimeRemainingColor = (timeRemaining) => {
    if (timeRemaining.includes('h') && parseInt(timeRemaining) < 2) {
      return 'text-error';
    } else if (timeRemaining.includes('h') && parseInt(timeRemaining) < 6) {
      return 'text-warning';
    }
    return 'text-muted-foreground';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <div 
      className="bg-card rounded-lg border border-border shadow-warm hover:shadow-warm-lg transition-all duration-300 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <Image
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Watch Button */}
        <button
          onClick={handleWatchToggle}
          className={`
            absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all duration-200
            ${isWatched 
              ? 'bg-error/90 text-error-foreground' 
              : 'bg-black/20 text-white hover:bg-black/40'
            }
          `}
          aria-label={isWatched ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <Icon 
            name={isWatched ? "Heart" : "Heart"} 
            size={16} 
            className={isWatched ? 'fill-current' : ''} 
          />
        </button>

        {/* Auction Badge */}
        {game.isAuction && (
          <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            Subasta
          </div>
        )}

        {/* Condition Badge */}
        <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-caption">
          {game.condition}
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Title */}
        <h3 className="font-body font-medium text-sm text-card-foreground mb-2 line-clamp-2 leading-tight">
          {game.title}
        </h3>

        {/* Price and Bid Info */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="font-data text-lg font-semibold text-primary">
              {formatPrice(game.currentPrice)}
            </span>
            {game.isAuction && game.bidCount > 0 && (
              <p className="font-caption text-xs text-muted-foreground">
                {game.bidCount} puja{game.bidCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          
          {/* Time Remaining */}
          {game.timeRemaining && (
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} className={getTimeRemainingColor(game.timeRemaining)} />
              <span className={`font-caption text-xs font-medium ${getTimeRemainingColor(game.timeRemaining)}`}>
                {game.timeRemaining}
              </span>
            </div>
          )}
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center">
              <Icon name="User" size={12} className="text-muted-foreground" />
            </div>
            <span className="font-caption text-xs text-muted-foreground">
              {game.seller}
            </span>
          </div>
          
          {/* Location */}
          {game.location && (
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={12} className="text-muted-foreground" />
              <span className="font-caption text-xs text-muted-foreground">
                {game.location}
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        {game.isAuction ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleQuickBid}
            className="w-full"
            iconName="Gavel"
            iconPosition="left"
            iconSize={14}
          >
            Puja Rápida
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={handleCardClick}
            className="w-full"
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
          >
            Ver Detalles
          </Button>
        )}
      </div>
    </div>
  );
};

export default GameCard;