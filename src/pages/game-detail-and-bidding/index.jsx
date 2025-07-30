import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import AuctionStatusBar from '../../components/ui/AuctionStatusBar';
import ImageCarousel from './components/ImageCarousel';
import GameHeader from './components/GameHeader';
import GameTabs from './components/GameTabs';
import BiddingPanel from './components/BiddingPanel';

const GameDetailAndBidding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isWatched, setIsWatched] = useState(false);
  const [showAuctionBar, setShowAuctionBar] = useState(false);

  // Mock game data
  const gameData = {
    id: 1,
    title: "Catan: Edición Especial 25º Aniversario",
    currentPrice: 45.50,
    isAuction: true,
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000 + 15 * 60 * 1000), // 2h 15m from now
    bidCount: 12,
    condition: "Muy bueno",
    images: [
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611891487122-207579d67d98?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
    ],
    description: `Edición especial del 25º aniversario de Catan con componentes premium y arte exclusivo.\n\nIncluye fichas de madera de alta calidad, cartas con acabado lino y tablero con ilustraciones conmemorativas. El juego está en excelente estado, apenas usado unas pocas veces.\n\nPerfecto para coleccionistas o para aquellos que quieren disfrutar de Catan con la mejor calidad posible.`,
    bggRating: 7.2,
    bggRank: 15,
    players: "3-4",
    playTime: "60-90",
    age: 10,
    complexity: 3,
    language: "Español",
    edition: "25º Aniversario",
    publisher: "Devir"
  };

  const sellerData = {
    name: "Carlos Martínez",
    rating: 4.8,
    reviewCount: 47,
    memberSince: "Marzo 2022",
    completedSales: 89,
    responseTime: "< 1 hora",
    location: "Madrid, España"
  };

  const biddingHistory = [
    {
      bidder: "@maria_games",
      amount: 45.50,
      timestamp: "hace 3 minutos"
    },
    {
      bidder: "@boardgamer23",
      amount: 43.00,
      timestamp: "hace 12 minutos"
    },
    {
      bidder: "@coleccionista_madrid",
      amount: 40.50,
      timestamp: "hace 25 minutos"
    },
    {
      bidder: "@juegos_vintage",
      amount: 38.00,
      timestamp: "hace 1 hora"
    },
    {
      bidder: "@catan_lover",
      amount: 35.50,
      timestamp: "hace 2 horas"
    }
  ];

  const minimumBid = gameData.currentPrice + 0.50;

  useEffect(() => {
    // Show auction status bar for auction items
    if (gameData.isAuction) {
      const timer = setTimeout(() => {
        setShowAuctionBar(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameData.isAuction]);

  const handleToggleWatchlist = (watched) => {
    setIsWatched(watched);
    // Here you would typically make an API call to update the watchlist
    console.log(watched ? 'Added to watchlist' : 'Removed from watchlist');
  };

  const handlePlaceBid = async (amount) => {
    console.log(`Placing bid: €${amount.toFixed(2)}`);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update game data with new bid (in real app, this would come from server)
    gameData.currentPrice = amount;
    gameData.bidCount += 1;
    
    // Add to bidding history
    biddingHistory.unshift({
      bidder: "@tu_usuario",
      amount: amount,
      timestamp: "ahora"
    });
    
    // Show success message or update UI
    alert(`¡Puja realizada! €${amount.toFixed(2)}`);
  };

  const handleBuyNow = async () => {
    console.log(`Buying now: €${gameData.currentPrice.toFixed(2)}`);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('¡Compra realizada con éxito!');
    navigate('/marketplace-dashboard');
  };

  const handleMakeOffer = async () => {
    console.log('Making offer');
    // In a real app, this would open a modal or navigate to offer page
    alert('Función de ofertas próximamente disponible');
  };

  const handleAuctionBid = (amount) => {
    if (amount) {
      handlePlaceBid(amount);
    } else {
      // Open expanded bidding panel
      console.log('Opening expanded bidding panel');
    }
  };

  const handleExpandAuctionBar = (expanded) => {
    console.log('Auction bar expanded:', expanded);
  };

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader />
      
      <main className="pb-32 lg:pb-20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-8 lg:space-y-0">
            {/* Left Column - Images and Mobile Content */}
            <div className="space-y-6">
              <ImageCarousel 
                images={gameData.images} 
                gameTitle={gameData.title} 
              />
              
              {/* Mobile Game Header */}
              <div className="lg:hidden">
                <GameHeader
                  title={gameData.title}
                  currentPrice={gameData.currentPrice}
                  isAuction={gameData.isAuction}
                  endTime={gameData.endTime}
                  bidCount={gameData.bidCount}
                  condition={gameData.condition}
                  onWatchlist={isWatched}
                  onToggleWatchlist={handleToggleWatchlist}
                />
              </div>

              {/* Mobile Bidding Panel */}
              <div className="lg:hidden">
                <BiddingPanel
                  isAuction={gameData.isAuction}
                  currentPrice={gameData.currentPrice}
                  minimumBid={minimumBid}
                  onPlaceBid={handlePlaceBid}
                  onBuyNow={handleBuyNow}
                  onMakeOffer={handleMakeOffer}
                />
              </div>
            </div>

            {/* Right Column - Game Info and Desktop Bidding */}
            <div className="space-y-6">
              {/* Desktop Game Header */}
              <div className="hidden lg:block">
                <GameHeader
                  title={gameData.title}
                  currentPrice={gameData.currentPrice}
                  isAuction={gameData.isAuction}
                  endTime={gameData.endTime}
                  bidCount={gameData.bidCount}
                  condition={gameData.condition}
                  onWatchlist={isWatched}
                  onToggleWatchlist={handleToggleWatchlist}
                />
              </div>

              {/* Desktop Bidding Panel */}
              <div className="hidden lg:block">
                <BiddingPanel
                  isAuction={gameData.isAuction}
                  currentPrice={gameData.currentPrice}
                  minimumBid={minimumBid}
                  onPlaceBid={handlePlaceBid}
                  onBuyNow={handleBuyNow}
                  onMakeOffer={handleMakeOffer}
                />
              </div>
            </div>
          </div>

          {/* Game Tabs - Full Width */}
          <div className="mt-8">
            <GameTabs
              gameData={gameData}
              sellerData={sellerData}
              biddingHistory={biddingHistory}
            />
          </div>
        </div>
      </main>

      {/* Auction Status Bar */}
      {gameData.isAuction && (
        <AuctionStatusBar
          isVisible={showAuctionBar}
          gameTitle={gameData.title}
          currentBid={gameData.currentPrice}
          timeRemaining="2h 15m"
          bidCount={gameData.bidCount}
          onBid={handleAuctionBid}
          onExpand={handleExpandAuctionBar}
        />
      )}

      <BottomTabNavigation />
    </div>
  );
};

export default GameDetailAndBidding;