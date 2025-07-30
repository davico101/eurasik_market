import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GameTabs = ({ gameData = {}, sellerData = {}, biddingHistory = [] }) => {
  const [activeTab, setActiveTab] = useState('details');

  const tabs = [
    { id: 'details', label: 'Detalles', icon: 'Info' },
    { id: 'seller', label: 'Vendedor', icon: 'User' },
    { id: 'bidding', label: 'Historial', icon: 'TrendingUp' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-6">
            {/* Game Description */}
            {gameData.description && (
              <div>
                <h3 className="font-body font-semibold text-lg text-foreground mb-3">
                  Descripción
                </h3>
                <p className="font-body text-sm text-foreground leading-relaxed">
                  {gameData.description}
                </p>
              </div>
            )}

            {/* BoardGameGeek Info */}
            {gameData.bggRating && (
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-body font-semibold text-base text-foreground mb-3">
                  Información de BoardGameGeek
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-caption text-xs text-muted-foreground mb-1">
                      Puntuación BGG
                    </p>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={16} className="text-warning fill-current" />
                      <span className="font-data text-sm font-medium text-foreground">
                        {gameData.bggRating}/10
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="font-caption text-xs text-muted-foreground mb-1">
                      Ranking BGG
                    </p>
                    <span className="font-data text-sm font-medium text-foreground">
                      #{gameData.bggRank}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Game Specifications */}
            <div>
              <h3 className="font-body font-semibold text-base text-foreground mb-3">
                Especificaciones
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {gameData.players && (
                  <div>
                    <p className="font-caption text-xs text-muted-foreground mb-1">
                      Jugadores
                    </p>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} className="text-muted-foreground" />
                      <span className="font-body text-sm text-foreground">
                        {gameData.players}
                      </span>
                    </div>
                  </div>
                )}
                {gameData.playTime && (
                  <div>
                    <p className="font-caption text-xs text-muted-foreground mb-1">
                      Duración
                    </p>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} className="text-muted-foreground" />
                      <span className="font-body text-sm text-foreground">
                        {gameData.playTime} min
                      </span>
                    </div>
                  </div>
                )}
                {gameData.age && (
                  <div>
                    <p className="font-caption text-xs text-muted-foreground mb-1">
                      Edad mínima
                    </p>
                    <span className="font-body text-sm text-foreground">
                      {gameData.age}+ años
                    </span>
                  </div>
                )}
                {gameData.complexity && (
                  <div>
                    <p className="font-caption text-xs text-muted-foreground mb-1">
                      Complejidad
                    </p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Circle"
                          size={8}
                          className={i < gameData.complexity ? "text-primary fill-current" : "text-muted-foreground"}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Details */}
            {gameData.language && (
              <div>
                <h3 className="font-body font-semibold text-base text-foreground mb-3">
                  Detalles adicionales
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-caption text-sm text-muted-foreground">Idioma:</span>
                    <span className="font-body text-sm text-foreground">{gameData.language}</span>
                  </div>
                  {gameData.edition && (
                    <div className="flex justify-between">
                      <span className="font-caption text-sm text-muted-foreground">Edición:</span>
                      <span className="font-body text-sm text-foreground">{gameData.edition}</span>
                    </div>
                  )}
                  {gameData.publisher && (
                    <div className="flex justify-between">
                      <span className="font-caption text-sm text-muted-foreground">Editorial:</span>
                      <span className="font-body text-sm text-foreground">{gameData.publisher}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 'seller':
        return (
          <div className="space-y-6">
            {/* Seller Profile */}
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shrink-0">
                <Icon name="User" size={24} className="text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-body font-semibold text-lg text-foreground">
                  {sellerData.name || '@usuario'}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < (sellerData.rating || 4) ? "text-warning fill-current" : "text-muted-foreground"}
                      />
                    ))}
                  </div>
                  <span className="font-caption text-sm text-muted-foreground">
                    ({sellerData.reviewCount || 23} reseñas)
                  </span>
                </div>
                <p className="font-caption text-sm text-muted-foreground mt-1">
                  Miembro desde {sellerData.memberSince || 'Enero 2023'}
                </p>
              </div>
            </div>

            {/* Seller Stats */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-body font-semibold text-base text-foreground mb-3">
                Estadísticas del vendedor
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-caption text-xs text-muted-foreground mb-1">
                    Ventas completadas
                  </p>
                  <span className="font-data text-lg font-medium text-foreground">
                    {sellerData.completedSales || 47}
                  </span>
                </div>
                <div>
                  <p className="font-caption text-xs text-muted-foreground mb-1">
                    Tiempo de respuesta
                  </p>
                  <span className="font-body text-sm text-foreground">
                    {sellerData.responseTime || '< 2 horas'}
                  </span>
                </div>
              </div>
            </div>

            {/* Location */}
            {sellerData.location && (
              <div>
                <h4 className="font-body font-semibold text-base text-foreground mb-3">
                  Ubicación
                </h4>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span className="font-body text-sm text-foreground">
                    {sellerData.location}
                  </span>
                </div>
              </div>
            )}

            {/* Contact Options */}
            <div className="space-y-3">
              <h4 className="font-body font-semibold text-base text-foreground">
                Contactar vendedor
              </h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Enviar mensaje
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  iconName="Phone"
                  iconPosition="left"
                >
                  Ver teléfono
                </Button>
              </div>
            </div>
          </div>
        );

      case 'bidding':
        return (
          <div className="space-y-4">
            <h3 className="font-body font-semibold text-lg text-foreground">
              Historial de pujas
            </h3>
            
            {biddingHistory.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="TrendingUp" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="font-body text-sm text-muted-foreground">
                  Aún no hay pujas para este artículo
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {biddingHistory.map((bid, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      index === 0 ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-body text-sm font-medium text-foreground">
                          {bid.bidder}
                        </p>
                        <p className="font-caption text-xs text-muted-foreground">
                          {bid.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-data text-lg font-medium text-primary">
                        €{bid.amount.toFixed(2)}
                      </p>
                      {index === 0 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium text-success bg-success/10 mt-1">
                          Puja actual
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted/30 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-body transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-warm-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default GameTabs;