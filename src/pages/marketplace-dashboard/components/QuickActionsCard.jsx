import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsCard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'list-game',
      title: 'Vender Juego',
      description: 'Publica tu juego',
      icon: 'Plus',
      color: 'bg-accent',
      textColor: 'text-accent-foreground',
      action: () => navigate('/game-listing-creation')
    },
    {
      id: 'browse-categories',
      title: 'Explorar',
      description: 'Buscar juegos',
      icon: 'Search',
      color: 'bg-primary',
      textColor: 'text-primary-foreground',
      action: () => navigate('/game-search-and-browse')
    },
    {
      id: 'watchlist',
      title: 'Mi Lista',
      description: 'Juegos guardados',
      icon: 'Heart',
      color: 'bg-secondary',
      textColor: 'text-secondary-foreground',
      action: () => console.log('Navigate to watchlist')
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <h2 className="font-heading font-semibold text-lg text-foreground">
        Acciones Rápidas
      </h2>

      {/* Actions Grid */}
      <div className="grid grid-cols-3 gap-3">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant="ghost"
            onClick={action.action}
            className="h-auto p-4 flex flex-col items-center space-y-2 bg-card border border-border hover:bg-muted/50 transition-colors duration-200"
          >
            <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center`}>
              <Icon 
                name={action.icon} 
                size={24} 
                className={action.textColor}
              />
            </div>
            <div className="text-center">
              <p className="font-body font-medium text-sm text-card-foreground">
                {action.title}
              </p>
              <p className="font-caption text-xs text-muted-foreground">
                {action.description}
              </p>
            </div>
          </Button>
        ))}
      </div>

      {/* Stats Row */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-data text-xl font-semibold text-foreground">
              12
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              Pujas activas
            </p>
          </div>
          <div>
            <p className="font-data text-xl font-semibold text-foreground">
              5
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              En seguimiento
            </p>
          </div>
          <div>
            <p className="font-data text-xl font-semibold text-foreground">
              3
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              Vendiendo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsCard;