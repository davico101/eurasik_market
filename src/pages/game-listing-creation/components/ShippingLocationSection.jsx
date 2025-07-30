import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ShippingLocationSection = ({ shippingData, onUpdate }) => {
  const provinceOptions = [
    { value: 'madrid', label: 'Madrid' },
    { value: 'barcelona', label: 'Barcelona' },
    { value: 'valencia', label: 'Valencia' },
    { value: 'sevilla', label: 'Sevilla' },
    { value: 'zaragoza', label: 'Zaragoza' },
    { value: 'malaga', label: 'Málaga' },
    { value: 'murcia', label: 'Murcia' },
    { value: 'palmas', label: 'Las Palmas' },
    { value: 'bilbao', label: 'Bilbao' },
    { value: 'alicante', label: 'Alicante' }
  ];

  const shippingMethodOptions = [
    { value: 'correos', label: 'Correos', description: 'Servicio postal nacional' },
    { value: 'seur', label: 'SEUR', description: 'Entrega rápida' },
    { value: 'mrw', label: 'MRW', description: 'Mensajería profesional' },
    { value: 'ups', label: 'UPS', description: 'Servicio internacional' },
    { value: 'dhl', label: 'DHL', description: 'Express y estándar' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ ...shippingData, [field]: value });
  };

  const handleCheckboxChange = (field, checked) => {
    onUpdate({ ...shippingData, [field]: checked });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          Ubicación y Envío
        </h3>
        <p className="font-caption text-sm text-muted-foreground">
          Configura las opciones de entrega y ubicación
        </p>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h4 className="font-body font-medium text-foreground">Ubicación</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Provincia"
            options={provinceOptions}
            value={shippingData.province || ''}
            onChange={(value) => handleInputChange('province', value)}
            placeholder="Selecciona provincia"
            required
          />

          <Input
            type="text"
            label="Ciudad"
            placeholder="Ej: Madrid"
            value={shippingData.city || ''}
            onChange={(e) => handleInputChange('city', e.target.value)}
            required
          />
        </div>

        <Input
          type="text"
          label="Código postal"
          placeholder="28001"
          value={shippingData.postalCode || ''}
          onChange={(e) => handleInputChange('postalCode', e.target.value)}
          maxLength={5}
          pattern="[0-9]{5}"
        />
      </div>

      {/* Delivery Options */}
      <div className="space-y-4">
        <h4 className="font-body font-medium text-foreground">Opciones de entrega</h4>

        <div className="space-y-3">
          <Checkbox
            label="Entrega en persona"
            description="Permite que el comprador recoja el juego en persona"
            checked={shippingData.allowPickup || false}
            onChange={(e) => handleCheckboxChange('allowPickup', e.target.checked)}
          />

          <Checkbox
            label="Envío por correo"
            description="Enviarás el juego por servicio postal"
            checked={shippingData.allowShipping || false}
            onChange={(e) => handleCheckboxChange('allowShipping', e.target.checked)}
          />
        </div>
      </div>

      {/* Shipping Details */}
      {shippingData.allowShipping && (
        <div className="space-y-4 bg-muted/20 rounded-lg p-4">
          <h5 className="font-body font-medium text-foreground">Detalles de envío</h5>

          <Select
            label="Método de envío preferido"
            options={shippingMethodOptions}
            value={shippingData.shippingMethod || ''}
            onChange={(value) => handleInputChange('shippingMethod', value)}
            placeholder="Selecciona método"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              label="Coste de envío ($)"
              placeholder="0.00"
              value={shippingData.shippingCost || ''}
              onChange={(e) => handleInputChange('shippingCost', e.target.value)}
              min="0"
              step="0.50"
            />

            <Input
              type="number"
              label="Tiempo de envío (días)"
              placeholder="3"
              value={shippingData.shippingDays || ''}
              onChange={(e) => handleInputChange('shippingDays', e.target.value)}
              min="1"
              max="30"
            />
          </div>

          <div className="space-y-3">
            <Checkbox
              label="Envío gratuito"
              description="El coste de envío está incluido en el precio"
              checked={shippingData.freeShipping || false}
              onChange={(e) => handleCheckboxChange('freeShipping', e.target.checked)}
            />

            <Checkbox
              label="Seguro de envío"
              description="Incluir seguro para proteger el paquete"
              checked={shippingData.shippingInsurance || false}
              onChange={(e) => handleCheckboxChange('shippingInsurance', e.target.checked)}
            />
          </div>
        </div>
      )}

      {/* Pickup Details */}
      {shippingData.allowPickup && (
        <div className="space-y-4 bg-muted/20 rounded-lg p-4">
          <h5 className="font-body font-medium text-foreground">Detalles de recogida</h5>

          <Input
            type="text"
            label="Zona de recogida"
            description="Área o barrio donde puede recogerse"
            placeholder="Ej: Centro, Metro Sol"
            value={shippingData.pickupArea || ''}
            onChange={(e) => handleInputChange('pickupArea', e.target.value)}
          />

          <div>
            <label className="block font-body font-medium text-sm text-foreground mb-2">
              Horarios disponibles
            </label>
            <textarea
              placeholder="Ej: Lunes a viernes 18:00-20:00, Sábados 10:00-14:00"
              value={shippingData.pickupSchedule || ''}
              onChange={(e) => handleInputChange('pickupSchedule', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            />
          </div>
        </div>
      )}

      {/* Shipping Tips */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Icon name="Truck" size={16} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-body text-sm text-accent-foreground mb-2">
              <strong>Consejos de envío:</strong>
            </p>
            <ul className="font-caption text-xs text-accent-foreground/80 space-y-1">
              <li>• Empaqueta bien para proteger los componentes</li>
              <li>• Usa materiales de relleno para evitar movimiento</li>
              <li>• Considera el peso y tamaño para calcular costes</li>
              <li>• Proporciona número de seguimiento al comprador</li>
              <li>• La entrega en persona genera más confianza</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingLocationSection;