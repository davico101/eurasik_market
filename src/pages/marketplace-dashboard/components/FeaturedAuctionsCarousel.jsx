import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedAuctionsCarousel = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredAuctions = [
    {
      id: 1,
      title: "Catan: Edición Especial",
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
      currentBid: 45.50,
      timeRemaining: "2h 15m",
      bidCount: 12,
      condition: "Muy bueno",
      seller: "@juancarlos"
    },
    {
      id: 2,
      title: "Wingspan: Expansión Europea",
      image: "https://images.pexels.com/photos/4691567/pexels-photo-4691567.jpeg?w=400&h=300&fit=crop",
      currentBid: 32.00,
      timeRemaining: "45m",
      bidCount: 8,
      condition: "Como nuevo",
      seller: "@maria_games"
    },
    {
      id: 3,
      title: "Azul: Pabellón de Verano",
      image: "https://images.pixabay.com/photo/2018/05/05/15/06/board-game-3377395_1280.jpg?w=400&h=300&fit=crop",
      currentBid: 28.75,
      timeRemaining: "1h 30m",
      bidCount: 15,
      condition: "Bueno",
      seller: "@boardgamer23"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredAuctions.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredAuctions.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleGameClick = (gameId) => {
    navigate('/game-detail-and-bidding', { state: { gameId } });
  };

  const handleQuickBid = (e, gameId) => {
    e.stopPropagation();
    // Quick bid functionality
    console.log('Quick bid for game:', gameId);
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Subastas Destacadas
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/game-search-and-browse')}
          className="text-primary hover:text-primary/80"
        >
          Ver todas
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </Button>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-xl">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {featuredAuctions.map((auction) => (
            <div
              key={auction.id}
              className="w-full flex-shrink-0 cursor-pointer"
              onClick={() => handleGameClick(auction.id)}
            >
              <div className="relative bg-card rounded-xl border border-border overflow-hidden shadow-warm">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={auction.image}
                    alt={auction.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Time Badge */}
                  <div className="absolute top-3 right-3 bg-warning/90 backdrop-blur-sm text-warning-foreground px-2 py-1 rounded-lg">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span className="font-data text-xs font-medium">
                        {auction.timeRemaining}
                      </span>
                    </div>
                  </div>
                  {/* Bid Count Badge */}
                  <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded-lg">
                    <span className="font-data text-xs font-medium">
                      {auction.bidCount} pujas
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-body font-medium text-base text-card-foreground mb-2 line-clamp-1">
                    {auction.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-caption text-xs text-muted-foreground mb-1">
                        Puja actual
                      </p>
                      <p className="font-data text-xl font-semibold text-primary">
                        €{auction.currentBid.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-caption text-xs text-muted-foreground mb-1">
                        Estado
                      </p>
                      <p className="font-body text-sm text-card-foreground">
                        {auction.condition}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-caption text-xs text-muted-foreground">
                      Vendedor: {auction.seller}
                    </p>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={(e) => handleQuickBid(e, auction.id)}
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      Pujar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {featuredAuctions.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentSlide ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedAuctionsCarousel;