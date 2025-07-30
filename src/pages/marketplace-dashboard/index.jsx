import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import AuctionStatusBar from '../../components/ui/AuctionStatusBar';
import FeaturedAuctionsCarousel from './components/FeaturedAuctionsCarousel';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';
import QuickActionsCard from './components/QuickActionsCard';
import RecentActivityFeed from './components/RecentActivityFeed';
import NotificationToast from './components/NotificationToast';
import Icon from '../../components/AppIcon';

const MarketplaceDashboard = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showAuctionBar, setShowAuctionBar] = useState(false);

  // Mock notifications for demo
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'bid',
        title: '¡Nueva puja!',
        message: 'Alguien pujó por "Catan: Edición Especial"',
        actionText: 'Ver subasta',
        action: () => navigate('/game-detail-and-bidding'),
        autoDismiss: true,
        duration: 5000
      }
    ];

    // Simulate real-time notifications
    const timer = setTimeout(() => {
      setNotifications(mockNotifications);
      setShowAuctionBar(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Pull to refresh functionality
  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate API calls
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsRefreshing(false);
    
    // Show success notification
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      title: 'Actualizado',
      message: 'Contenido actualizado correctamente',
      autoDismiss: true,
      duration: 3000
    }]);
  };

  const handleNotificationDismiss = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const handleAuctionBid = (amount) => {
    console.log('Bid placed:', amount);
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      title: 'Puja realizada',
      message: `Tu puja de €${amount?.toFixed(2) || '46.00'} ha sido registrada`,
      autoDismiss: true,
      duration: 4000
    }]);
  };

  const handleAuctionExpand = (isExpanded) => {
    console.log('Auction panel expanded:', isExpanded);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <ContextualHeader />

      {/* Main Content */}
      <main className="pb-32">
        {/* Pull to Refresh Indicator */}
        {isRefreshing && (
          <div className="flex items-center justify-center py-4 bg-primary/10">
            <Icon name="RefreshCw" size={16} className="text-primary animate-spin mr-2" />
            <span className="font-caption text-sm text-primary">
              Actualizando...
            </span>
          </div>
        )}

        {/* Content Container */}
        <div className="px-4 py-6 space-y-8">
          {/* Welcome Section */}
          <div className="text-center">
            <h1 className="font-heading font-bold text-2xl text-foreground mb-2">
              ¡Hola, Juan! 👋
            </h1>
            <p className="font-body text-muted-foreground">
              Descubre juegos increíbles y encuentra las mejores ofertas
            </p>
          </div>

          {/* Featured Auctions Carousel */}
          <FeaturedAuctionsCarousel />

          {/* Quick Actions */}
          <QuickActionsCard />

          {/* Personalized Recommendations */}
          <PersonalizedRecommendations />

          {/* Recent Activity Feed */}
          <RecentActivityFeed />

          {/* Pull to Refresh Area */}
          <div 
            className="flex items-center justify-center py-8 cursor-pointer"
            onClick={handleRefresh}
          >
            <div className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200">
              <Icon name="RefreshCw" size={16} />
              <span className="font-caption text-sm">
                Desliza para actualizar
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Auction Status Bar */}
      <AuctionStatusBar
        isVisible={showAuctionBar}
        gameTitle="Catan: Edición Especial"
        currentBid={45.50}
        timeRemaining="2h 15m"
        bidCount={12}
        onBid={handleAuctionBid}
        onExpand={handleAuctionExpand}
      />

      {/* Bottom Navigation */}
      <BottomTabNavigation />

      {/* Notification Toasts */}
      <NotificationToast
        notifications={notifications}
        onDismiss={handleNotificationDismiss}
      />
    </div>
  );
};

export default MarketplaceDashboard;