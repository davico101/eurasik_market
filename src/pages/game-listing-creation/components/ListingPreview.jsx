import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ListingPreview = ({ listingData, gameData, photos, shippingData, onEdit, onPublish }) => {
  const primaryPhoto = photos.find(photo => photo.isPrimary) || photos[0];
  const additionalPhotos = photos.filter(photo => !photo.isPrimary);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const getConditionLabel = (condition) => {
    const conditions = {
      'new': 'Nuevo',
      'like-new': 'Como nuevo',
      'good': 'Bueno',
      'fair': 'Regular',
      'poor': 'Malo'
    };
    return conditions[condition] || condition;
  };

  const getConditionColor = (condition) => {
    const colors = {
      'new': 'text-success',
      'like-new': 'text-primary',
      'good': 'text-warning',
      'fair': 'text-warning',
      'poor': 'text-destructive'
    };
    return colors[condition] || 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
            Vista Previa
          </h3>
          <p className="font-caption text-sm text-muted-foreground">
            Así verán tu publicación los compradores
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(1)}
          iconName="Edit"
          iconPosition="left"
        >
          Editar
        </Button>
      </div>

      {/* Preview Card */}
      <div className="bg-card border border-border rounded-xl shadow-warm overflow-hidden">
        {/* Header Image */}
        {primaryPhoto && (
          <div className="aspect-video bg-muted overflow-hidden">
            <Image
              src={primaryPhoto.url}
              alt={gameData.name || 'Juego'}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6">
          {/* Title and Price */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h2 className="font-heading font-semibold text-xl text-card-foreground mb-1">
                {listingData.customTitle || gameData.name || 'Nombre del juego'}
              </h2>
              {gameData.year && (
                <p className="font-caption text-sm text-muted-foreground">
                  Publicado en {gameData.year}
                </p>
              )}
            </div>
            <div className="text-right ml-4">
              {listingData.listingType === 'auction' ? (
                <div>
                  <p className="font-caption text-xs text-muted-foreground">Puja inicial</p>
                  <p className="font-data text-2xl font-bold text-primary">
                    {formatPrice(listingData.startingBid || 0)}
                  </p>
                </div>
              ) : (
                <p className="font-data text-2xl font-bold text-primary">
                  {formatPrice(listingData.price || 0)}
                </p>
              )}
            </div>
          </div>

          {/* Game Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {gameData.minPlayers && gameData.maxPlayers && (
              <div className="text-center">
                <Icon name="Users" size={16} className="text-muted-foreground mx-auto mb-1" />
                <p className="font-caption text-xs text-muted-foreground">Jugadores</p>
                <p className="font-body text-sm text-card-foreground">
                  {gameData.minPlayers}-{gameData.maxPlayers}
                </p>
              </div>
            )}
            
            {gameData.playingTime && (
              <div className="text-center">
                <Icon name="Clock" size={16} className="text-muted-foreground mx-auto mb-1" />
                <p className="font-caption text-xs text-muted-foreground">Duración</p>
                <p className="font-body text-sm text-card-foreground">
                  {gameData.playingTime} min
                </p>
              </div>
            )}

            {listingData.condition && (
              <div className="text-center">
                <Icon name="Package" size={16} className="text-muted-foreground mx-auto mb-1" />
                <p className="font-caption text-xs text-muted-foreground">Estado</p>
                <p className={`font-body text-sm font-medium ${getConditionColor(listingData.condition)}`}>
                  {getConditionLabel(listingData.condition)}
                </p>
              </div>
            )}

            {gameData.complexity && (
              <div className="text-center">
                <Icon name="Brain" size={16} className="text-muted-foreground mx-auto mb-1" />
                <p className="font-caption text-xs text-muted-foreground">Complejidad</p>
                <p className="font-body text-sm text-card-foreground">
                  {gameData.complexity}/5
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          {(gameData.description || listingData.description) && (
            <div className="mb-4">
              <h4 className="font-body font-medium text-card-foreground mb-2">Descripción</h4>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {gameData.description}
                {listingData.description && (
                  <>
                    {gameData.description && <><br /><br /></>}
                    <strong>Notas del vendedor:</strong> {listingData.description}
                  </>
                )}
              </p>
            </div>
          )}

          {/* Additional Photos */}
          {additionalPhotos.length > 0 && (
            <div className="mb-4">
              <h4 className="font-body font-medium text-card-foreground mb-2">Más fotos</h4>
              <div className="grid grid-cols-4 gap-2">
                {additionalPhotos.slice(0, 4).map((photo, index) => (
                  <div key={photo.id} className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={photo.url}
                      alt={`Foto adicional ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {additionalPhotos.length > 4 && (
                  <div className="aspect-square rounded-lg bg-muted/50 flex items-center justify-center">
                    <span className="font-caption text-xs text-muted-foreground">
                      +{additionalPhotos.length - 4}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Shipping Info */}
          <div className="border-t border-border pt-4">
            <h4 className="font-body font-medium text-card-foreground mb-2">Entrega</h4>
            <div className="flex flex-wrap gap-2">
              {shippingData.allowPickup && (
                <div className="flex items-center space-x-1 bg-muted/50 rounded-full px-3 py-1">
                  <Icon name="MapPin" size={12} className="text-primary" />
                  <span className="font-caption text-xs text-card-foreground">
                    Recogida en {shippingData.city || 'persona'}
                  </span>
                </div>
              )}
              {shippingData.allowShipping && (
                <div className="flex items-center space-x-1 bg-muted/50 rounded-full px-3 py-1">
                  <Icon name="Truck" size={12} className="text-primary" />
                  <span className="font-caption text-xs text-card-foreground">
                    Envío {shippingData.freeShipping ? 'gratuito' : `${formatPrice(shippingData.shippingCost || 0)}`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Auction Info */}
          {listingData.listingType === 'auction' && (
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Gavel" size={16} className="text-accent" />
                <span className="font-body font-medium text-accent-foreground">Subasta</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-caption text-xs text-accent-foreground/80">Duración</p>
                  <p className="font-body text-accent-foreground">
                    {listingData.auctionDuration} días
                  </p>
                </div>
                {listingData.reservePrice && (
                  <div>
                    <p className="font-caption text-xs text-accent-foreground/80">Precio reserva</p>
                    <p className="font-body text-accent-foreground">
                      {formatPrice(listingData.reservePrice)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={() => onEdit(1)}
          className="flex-1"
          iconName="Edit"
          iconPosition="left"
        >
          Editar publicación
        </Button>
        <Button
          variant="default"
          onClick={onPublish}
          className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
          iconName="Send"
          iconPosition="left"
        >
          Publicar ahora
        </Button>
      </div>
    </div>
  );
};

export default ListingPreview;