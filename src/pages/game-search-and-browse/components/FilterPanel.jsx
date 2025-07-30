import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, isMobile = false }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    condition: false,
    players: false,
    playtime: false,
    mechanics: false,
    location: false,
    seller: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (category, value, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...(prev[category] || []), value]
        : (prev[category] || []).filter(item => item !== value)
    }));
  };

  const handleRangeChange = (category, field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    if (isMobile) onClose();
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      categories: [],
      priceRange: { min: '', max: '' },
      conditions: [],
      playerCount: { min: '', max: '' },
      playTime: { min: '', max: '' },
      mechanics: [],
      location: '',
      sellerRating: { min: '' }
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const filterSections = [
    {
      key: 'category',
      title: 'Categoría',
      icon: 'Tag',
      content: (
        <div className="space-y-2">
          {[
            'Estrategia', 'Familiar', 'Temático', 'Abstracto', 'Guerra', 
            'Económico', 'Cooperativo', 'Party', 'Cartas', 'Dados'
          ].map(category => (
            <Checkbox
              key={category}
              label={category}
              checked={localFilters.categories?.includes(category) || false}
              onChange={(e) => handleFilterChange('categories', category, e.target.checked)}
            />
          ))}
        </div>
      )
    },
    {
      key: 'price',
      title: 'Rango de Precio',
      icon: 'Euro',
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Mín €"
              value={localFilters.priceRange?.min || ''}
              onChange={(e) => handleRangeChange('priceRange', 'min', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Máx €"
              value={localFilters.priceRange?.max || ''}
              onChange={(e) => handleRangeChange('priceRange', 'max', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            {[
              { label: 'Menos de €20', min: 0, max: 20 },
              { label: '€20 - €50', min: 20, max: 50 },
              { label: '€50 - €100', min: 50, max: 100 },
              { label: 'Más de €100', min: 100, max: 999 }
            ].map(range => (
              <button
                key={range.label}
                onClick={() => {
                  handleRangeChange('priceRange', 'min', range.min);
                  handleRangeChange('priceRange', 'max', range.max);
                }}
                className="w-full text-left px-3 py-2 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors duration-200"
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      key: 'condition',
      title: 'Estado',
      icon: 'Star',
      content: (
        <div className="space-y-2">
          {['Nuevo', 'Como nuevo', 'Muy bueno', 'Bueno', 'Aceptable'].map(condition => (
            <Checkbox
              key={condition}
              label={condition}
              checked={localFilters.conditions?.includes(condition) || false}
              onChange={(e) => handleFilterChange('conditions', condition, e.target.checked)}
            />
          ))}
        </div>
      )
    },
    {
      key: 'players',
      title: 'Número de Jugadores',
      icon: 'Users',
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Mín"
              min="1"
              value={localFilters.playerCount?.min || ''}
              onChange={(e) => handleRangeChange('playerCount', 'min', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Máx"
              min="1"
              value={localFilters.playerCount?.max || ''}
              onChange={(e) => handleRangeChange('playerCount', 'max', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            {[
              { label: '1 jugador (Solo)', min: 1, max: 1 },
              { label: '2 jugadores', min: 2, max: 2 },
              { label: '3-4 jugadores', min: 3, max: 4 },
              { label: '5+ jugadores', min: 5, max: 10 }
            ].map(range => (
              <button
                key={range.label}
                onClick={() => {
                  handleRangeChange('playerCount', 'min', range.min);
                  handleRangeChange('playerCount', 'max', range.max);
                }}
                className="w-full text-left px-3 py-2 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors duration-200"
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      key: 'playtime',
      title: 'Tiempo de Juego',
      icon: 'Clock',
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Mín min"
              value={localFilters.playTime?.min || ''}
              onChange={(e) => handleRangeChange('playTime', 'min', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Máx min"
              value={localFilters.playTime?.max || ''}
              onChange={(e) => handleRangeChange('playTime', 'max', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            {[
              { label: 'Menos de 30 min', min: 0, max: 30 },
              { label: '30-60 min', min: 30, max: 60 },
              { label: '60-120 min', min: 60, max: 120 },
              { label: 'Más de 2 horas', min: 120, max: 999 }
            ].map(range => (
              <button
                key={range.label}
                onClick={() => {
                  handleRangeChange('playTime', 'min', range.min);
                  handleRangeChange('playTime', 'max', range.max);
                }}
                className="w-full text-left px-3 py-2 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors duration-200"
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      key: 'mechanics',
      title: 'Mecánicas',
      icon: 'Settings',
      content: (
        <div className="space-y-2">
          {[
            'Construcción de mazos', 'Colocación de trabajadores', 'Control de área',
            'Gestión de recursos', 'Drafting', 'Roll & Write', 'Cooperativo',
            'Deducción', 'Engine Building', 'Tile Placement'
          ].map(mechanic => (
            <Checkbox
              key={mechanic}
              label={mechanic}
              checked={localFilters.mechanics?.includes(mechanic) || false}
              onChange={(e) => handleFilterChange('mechanics', mechanic, e.target.checked)}
            />
          ))}
        </div>
      )
    },
    {
      key: 'location',
      title: 'Ubicación',
      icon: 'MapPin',
      content: (
        <div className="space-y-3">
          <Input
            type="text"
            placeholder="Ciudad o código postal"
            value={localFilters.location || ''}
            onChange={(e) => handleRangeChange('location', '', e.target.value)}
          />
          <div className="space-y-2">
            {['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao'].map(city => (
              <button
                key={city}
                onClick={() => setLocalFilters(prev => ({ ...prev, location: city }))}
                className="w-full text-left px-3 py-2 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors duration-200"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      key: 'seller',
      title: 'Valoración del Vendedor',
      icon: 'Award',
      content: (
        <div className="space-y-3">
          <Input
            type="number"
            placeholder="Mínimo (1-5)"
            min="1"
            max="5"
            step="0.1"
            value={localFilters.sellerRating?.min || ''}
            onChange={(e) => handleRangeChange('sellerRating', 'min', e.target.value)}
          />
          <div className="space-y-2">
            {[
              { label: '5 estrellas', rating: 5 },
              { label: '4+ estrellas', rating: 4 },
              { label: '3+ estrellas', rating: 3 },
              { label: 'Cualquier valoración', rating: 1 }
            ].map(option => (
              <button
                key={option.label}
                onClick={() => handleRangeChange('sellerRating', 'min', option.rating)}
                className="w-full text-left px-3 py-2 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors duration-200"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )
    }
  ];

  const panelContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Filtros
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Limpiar
          </Button>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Cerrar filtros"
            >
              <Icon name="X" size={20} />
            </Button>
          )}
        </div>
      </div>

      {/* Filter Sections */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {filterSections.map(section => (
            <div key={section.key} className="border border-border rounded-lg">
              <button
                onClick={() => toggleSection(section.key)}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-2">
                  <Icon name={section.icon} size={16} className="text-muted-foreground" />
                  <span className="font-body font-medium text-foreground">
                    {section.title}
                  </span>
                </div>
                <Icon 
                  name={expandedSections[section.key] ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground" 
                />
              </button>
              
              {expandedSections[section.key] && (
                <div className="px-3 pb-3 border-t border-border">
                  <div className="pt-3">
                    {section.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={clearAllFilters}
            className="flex-1"
          >
            Limpiar Todo
          </Button>
          <Button
            variant="default"
            onClick={applyFilters}
            className="flex-1"
          >
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Slide-up Panel */}
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50" 
              onClick={onClose}
            />
            
            {/* Panel */}
            <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-xl max-h-[90vh] animate-in slide-in-from-bottom duration-300">
              {panelContent}
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div className="hidden lg:block w-80 bg-card border-r border-border">
      {panelContent}
    </div>
  );
};

export default FilterPanel;