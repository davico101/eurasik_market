import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PersonalizedRecommendations = () => {
  const navigate = useNavigate();

  const recommendations = [
    {
      id: 1,
      title: "Ticket to Ride: Europa",
      image: "https://images.unsplash.com/photo-1611891487122-207579d67d98?w=300&h=200&fit=crop",
      price: 42.99,
      originalPrice: 55.00,
      discount: 22,
      rating: 4.8,
      reviewCount: 156,
      seller: "@coleccionista",
      condition: "Muy bueno",
      reason: "Basado en tus juegos favoritos"
    },
    {
      id: 2,
      title: "Splendor: Edición Deluxe",
      image: "https://images.pexels.com/photos/4691567/pexels-photo-4691567.jpeg?w=300&h=200&fit=crop",
      price: 38.50,
      originalPrice: null,
      discount: null,
      rating: 4.6,
      reviewCount: 89,
      seller: "@juegos_premium",
      condition: "Como nuevo",
      reason: "Popular en tu área"
    },
    {
      id: 3,
      title: "7 Wonders: Duel",
      image: "https://images.pixabay.com/photo/2018/05/05/15/06/board-game-3377395_1280.jpg?w=300&h=200&fit=crop",
      price: 25.00,
      originalPrice: 32.00,
      discount: 22,
      rating: 4.9,
      reviewCount: 203,
      seller: "@boardgame_lover",
      condition: "Bueno",
      reason: "Recomendado por BoardGameGeek"
    }
  ];

  const handleGameClick = (gameId) => {
    navigate('/game-detail-and-bidding', { state: { gameId } });
  };

  const handleAddToWatchlist = (e, gameId) => {
    e.stopPropagation();
    console.log('Added to watchlist:', gameId);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Recomendado para ti
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/game-search-and-browse')}
          className="text-primary hover:text-primary/80"
        >
          Ver más
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </Button>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((game) => (
          <div
            key={game.id}
            className="bg-card rounded-xl border border-border overflow-hidden shadow-warm hover:shadow-warm-lg transition-shadow duration-200 cursor-pointer"
            onClick={() => handleGameClick(game.id)}
          >
            {/* Image */}
            <div className="relative h-32 overflow-hidden">
              <Image
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover"
              />
              {/* Discount Badge */}
              {game.discount && (
                <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-lg">
                  <span className="font-data text-xs font-medium">
                    -{game.discount}%
                  </span>
                </div>
              )}
              {/* Watchlist Button */}
              <button
                onClick={(e) => handleAddToWatchlist(e, game.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200"
                aria-label="Añadir a lista de seguimiento"
              >
                <Icon name="Heart" size={16} className="text-muted-foreground hover:text-primary" />
              </button>
            </div>

            {/* Content */}
            <div className="p-3">
              {/* Recommendation Reason */}
              <div className="flex items-center space-x-1 mb-2">
                <Icon name="Sparkles" size={12} className="text-primary" />
                <span className="font-caption text-xs text-primary">
                  {game.reason}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-body font-medium text-sm text-card-foreground mb-2 line-clamp-2">
                {game.title}
              </h3>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-2">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                  <span className="font-data text-xs font-medium text-card-foreground">
                    {game.rating}
                  </span>
                </div>
                <span className="font-caption text-xs text-muted-foreground">
                  ({game.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-data text-lg font-semibold text-primary">
                  €{game.price.toFixed(2)}
                </span>
                {game.originalPrice && (
                  <span className="font-data text-sm text-muted-foreground line-through">
                    €{game.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Seller and Condition */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-caption text-muted-foreground">
                  {game.seller}
                </span>
                <span className="font-body text-card-foreground">
                  {game.condition}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;