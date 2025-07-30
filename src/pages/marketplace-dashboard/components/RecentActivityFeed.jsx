import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentActivityFeed = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'bid_outbid',
      title: 'Te han superado en una puja',
      description: 'Alguien pujó $47.00 por "Catan: Edición Especial"',
      gameTitle: 'Catan: Edición Especial',
      gameImage: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=100&h=100&fit=crop',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      actionText: 'Pujar ahora',
      actionIcon: 'TrendingUp',
      priority: 'high'
    },
    {
      id: 2,
      type: 'message',
      title: 'Nuevo mensaje',
      description: '@maria_games te envió un mensaje sobre "Wingspan"',
      gameTitle: 'Wingspan: Expansión Europea',
      gameImage: 'https://images.pexels.com/photos/4691567/pexels-photo-4691567.jpeg?w=100&h=100&fit=crop',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      actionText: 'Responder',
      actionIcon: 'MessageCircle',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'auction_ending',
      title: 'Subasta terminando pronto',
      description: '"Azul: Pabellón de Verano" termina en 45 minutos',
      gameTitle: 'Azul: Pabellón de Verano',
      gameImage: 'https://images.pixabay.com/photo/2018/05/05/15/06/board-game-3377395_1280.jpg?w=100&h=100&fit=crop',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      actionText: 'Ver subasta',
      actionIcon: 'Clock',
      priority: 'high'
    },
    {
      id: 4,
      type: 'bid_won',
      title: '¡Ganaste una subasta!',
      description: 'Felicidades, ganaste "7 Wonders: Duel" por $25.00',
      gameTitle: '7 Wonders: Duel',
      gameImage: 'https://images.unsplash.com/photo-1611891487122-207579d67d98?w=100&h=100&fit=crop',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      actionText: 'Ver detalles',
      actionIcon: 'Trophy',
      priority: 'success'
    },
    {
      id: 5,
      type: 'new_listing',
      title: 'Nuevo juego disponible',
      description: 'Un juego de tu lista de deseos está disponible',
      gameTitle: 'Gloomhaven: Mandíbulas del León',
      gameImage: 'https://images.pexels.com/photos/4691567/pexels-photo-4691567.jpeg?w=100&h=100&fit=crop',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      actionText: 'Ver juego',
      actionIcon: 'Eye',
      priority: 'medium'
    }
  ];

  const filters = [
    { id: 'all', label: 'Todas', count: activities.length },
    { id: 'bids', label: 'Pujas', count: activities.filter(a => a.type.includes('bid')).length },
    { id: 'messages', label: 'Mensajes', count: activities.filter(a => a.type === 'message').length },
    { id: 'auctions', label: 'Subastas', count: activities.filter(a => a.type.includes('auction')).length }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => {
        switch (filter) {
          case 'bids':
            return activity.type.includes('bid');
          case 'messages':
            return activity.type === 'message';
          case 'auctions':
            return activity.type.includes('auction');
          default:
            return true;
        }
      });

  const getActivityIcon = (type, priority) => {
    const iconMap = {
      bid_outbid: 'TrendingDown',
      bid_won: 'Trophy',
      message: 'MessageCircle',
      auction_ending: 'Clock',
      new_listing: 'Plus'
    };

    const colorMap = {
      high: 'text-error',
      success: 'text-success',
      medium: 'text-primary',
      low: 'text-muted-foreground'
    };

    return {
      name: iconMap[type] || 'Bell',
      color: colorMap[priority] || 'text-muted-foreground'
    };
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) {
      return `hace ${minutes}m`;
    } else {
      return `hace ${hours}h`;
    }
  };

  const handleActivityClick = (activity) => {
    if (activity.type.includes('bid') || activity.type.includes('auction')) {
      navigate('/game-detail-and-bidding', { state: { gameId: activity.id } });
    } else if (activity.type === 'message') {
      console.log('Navigate to messages');
    } else {
      navigate('/game-detail-and-bidding', { state: { gameId: activity.id } });
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Actividad Reciente
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary/80"
        >
          Ver todo
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-muted/30 rounded-lg p-1">
        {filters.map((filterOption) => (
          <button
            key={filterOption.id}
            onClick={() => setFilter(filterOption.id)}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-body transition-colors duration-200 ${
              filter === filterOption.id
                ? 'bg-background text-foreground shadow-warm-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {filterOption.label}
            {filterOption.count > 0 && (
              <span className={`ml-1 text-xs ${
                filter === filterOption.id ? 'text-primary' : 'text-muted-foreground'
              }`}>
                ({filterOption.count})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {filteredActivities.map((activity) => {
          const activityIcon = getActivityIcon(activity.type, activity.priority);
          
          return (
            <div
              key={activity.id}
              className="bg-card rounded-lg border border-border p-4 hover:bg-muted/20 transition-colors duration-200 cursor-pointer"
              onClick={() => handleActivityClick(activity)}
            >
              <div className="flex items-start space-x-3">
                {/* Activity Icon */}
                <div className={`w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center shrink-0 ${
                  activity.priority === 'high' ? 'bg-error/10' : 
                  activity.priority === 'success' ? 'bg-success/10' : 'bg-primary/10'
                }`}>
                  <Icon 
                    name={activityIcon.name} 
                    size={16} 
                    className={activityIcon.color}
                  />
                </div>

                {/* Game Image */}
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={activity.gameImage}
                    alt={activity.gameTitle}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-body font-medium text-sm text-card-foreground mb-1">
                        {activity.title}
                      </h3>
                      <p className="font-caption text-xs text-muted-foreground mb-2 line-clamp-2">
                        {activity.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="font-caption text-xs text-muted-foreground">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-xs font-caption text-primary hover:text-primary/80 p-0 h-auto"
                        >
                          {activity.actionText}
                          <Icon name={activity.actionIcon} size={12} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredActivities.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Bell" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
          <p className="font-body text-muted-foreground">
            No hay actividad reciente en esta categoría
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentActivityFeed;