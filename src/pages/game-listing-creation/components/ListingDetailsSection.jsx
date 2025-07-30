import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ListingDetailsSection = ({ listingData, onUpdate }) => {
  const [listingType, setListingType] = useState(listingData.listingType || 'fixed');

  const conditionOptions = [
    { value: 'new', label: 'Nuevo', description: 'Sin abrir, en perfecto estado' },
    { value: 'like-new', label: 'Como nuevo', description: 'Jugado una o dos veces, excelente estado' },
    { value: 'good', label: 'Bueno', description: 'Usado pero bien cuidado, signos menores de uso' },
    { value: 'fair', label: 'Regular', description: 'Usado con signos visibles de desgaste' },
    { value: 'poor', label: 'Malo', description: 'Muy usado, componentes dañados o faltantes' }
  ];

  const durationOptions = [
    { value: '1', label: '1 día' },
    { value: '3', label: '3 días' },
    { value: '5', label: '5 días' },
    { value: '7', label: '7 días' },
    { value: '10', label: '10 días' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ ...listingData, [field]: value });
  };

  const handleListingTypeChange = (type) => {
    setListingType(type);
    onUpdate({ 
      ...listingData, 
      listingType: type,
      // Clear auction-specific fields when switching to fixed price
      ...(type === 'fixed' && {
        startingBid: '',
        reservePrice: '',
        auctionDuration: ''
      })
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          Detalles de la Publicación
        </h3>
        <p className="font-caption text-sm text-muted-foreground">
          Proporciona información sobre el estado y precio de tu juego
        </p>
      </div>

      {/* Game Condition */}
      <div>
        <Select
          label="Estado del juego"
          description="Sé honesto sobre el estado para generar confianza"
          options={conditionOptions}
          value={listingData.condition || ''}
          onChange={(value) => handleInputChange('condition', value)}
          placeholder="Selecciona el estado"
          required
        />
      </div>

      {/* Listing Type Toggle */}
      <div>
        <label className="block font-body font-medium text-sm text-foreground mb-3">
          Tipo de venta
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={listingType === 'fixed' ? 'default' : 'outline'}
            onClick={() => handleListingTypeChange('fixed')}
            className="justify-center"
            iconName="Tag"
            iconPosition="left"
          >
            Precio fijo
          </Button>
          <Button
            variant={listingType === 'auction' ? 'default' : 'outline'}
            onClick={() => handleListingTypeChange('auction')}
            className="justify-center"
            iconName="Gavel"
            iconPosition="left"
          >
            Subasta
          </Button>
        </div>
      </div>

      {/* Fixed Price Fields */}
      {listingType === 'fixed' && (
        <div>
          <Input
            type="number"
            label="Precio de venta"
            description="Precio en euros (€)"
            placeholder="0.00"
            value={listingData.price || ''}
            onChange={(e) => handleInputChange('price', e.target.value)}
            min="0"
            step="0.50"
            required
          />
        </div>
      )}

      {/* Auction Fields */}
      {listingType === 'auction' && (
        <div className="space-y-4">
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-body text-sm text-accent-foreground">
                  <strong>Modo Subasta:</strong> Los compradores pujarán por tu juego
                </p>
                <p className="font-caption text-xs text-accent-foreground/80 mt-1">
                  Establece un precio inicial atractivo para generar interés
                </p>
              </div>
            </div>
          </div>

          <Input
            type="number"
            label="Puja inicial"
            description="Precio mínimo para comenzar la subasta"
            placeholder="0.00"
            value={listingData.startingBid || ''}
            onChange={(e) => handleInputChange('startingBid', e.target.value)}
            min="0"
            step="0.50"
            required
          />

          <Input
            type="number"
            label="Precio de reserva (opcional)"
            description="Precio mínimo que aceptarás. No será visible para los compradores"
            placeholder="0.00"
            value={listingData.reservePrice || ''}
            onChange={(e) => handleInputChange('reservePrice', e.target.value)}
            min="0"
            step="0.50"
          />

          <Select
            label="Duración de la subasta"
            description="Tiempo que estará activa la subasta"
            options={durationOptions}
            value={listingData.auctionDuration || ''}
            onChange={(value) => handleInputChange('auctionDuration', value)}
            placeholder="Selecciona duración"
            required
          />
        </div>
      )}

      {/* Additional Options */}
      <div className="space-y-4">
        <Input
          type="text"
          label="Título personalizado (opcional)"
          description="Personaliza el título de tu publicación"
          placeholder="Ej: Catan en excelente estado, poco uso"
          value={listingData.customTitle || ''}
          onChange={(e) => handleInputChange('customTitle', e.target.value)}
          maxLength={100}
        />

        <div>
          <label className="block font-body font-medium text-sm text-foreground mb-2">
            Descripción adicional (opcional)
          </label>
          <textarea
            placeholder="Describe detalles específicos, historia del juego, razón de venta, etc."
            value={listingData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            maxLength={500}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          />
          <p className="font-caption text-xs text-muted-foreground mt-1">
            {(listingData.description || '').length}/500 caracteres
          </p>
        </div>
      </div>

      {/* Price Suggestion */}
      {listingData.condition && (
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={16} className="text-warning mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-body text-sm text-foreground mb-1">
                <strong>Sugerencia de precio</strong>
              </p>
              <p className="font-caption text-xs text-muted-foreground">
                {listingData.condition === 'new' && 'Para juegos nuevos, considera 70-80% del precio retail'}
                {listingData.condition === 'like-new' && 'Para juegos como nuevos, considera 60-70% del precio retail'}
                {listingData.condition === 'good' && 'Para juegos en buen estado, considera 40-60% del precio retail'}
                {listingData.condition === 'fair' && 'Para juegos en estado regular, considera 25-40% del precio retail'}
                {listingData.condition === 'poor' && 'Para juegos en mal estado, considera 10-25% del precio retail'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetailsSection;