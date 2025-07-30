import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'ending-soon', label: 'Terminan pronto', icon: 'Clock' },
    { value: 'price-low-high', label: 'Precio: menor a mayor', icon: 'TrendingUp' },
    { value: 'price-high-low', label: 'Precio: mayor a menor', icon: 'TrendingDown' },
    { value: 'newly-listed', label: 'Recién publicados', icon: 'Plus' },
    { value: 'distance', label: 'Distancia', icon: 'MapPin' },
    { value: 'popularity', label: 'Más populares', icon: 'Heart' },
    { value: 'rating', label: 'Mejor valorados', icon: 'Star' }
  ];

  const currentOption = sortOptions.find(option => option.value === currentSort) || sortOptions[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 min-w-[140px] justify-between"
        iconName={isOpen ? "ChevronUp" : "ChevronDown"}
        iconPosition="right"
        iconSize={16}
      >
        <div className="flex items-center space-x-2">
          <Icon name={currentOption.icon} size={16} />
          <span className="hidden sm:inline">{currentOption.label}</span>
          <span className="sm:hidden">Ordenar</span>
        </div>
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-64 bg-popover border border-border rounded-lg shadow-warm-lg z-50 animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="py-2">
            <div className="px-3 py-2 border-b border-border">
              <p className="font-body font-medium text-sm text-popover-foreground">
                Ordenar por
              </p>
            </div>
            
            <div className="py-1">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortSelect(option.value)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 text-sm font-body text-left
                    transition-colors duration-200 hover:bg-muted/50
                    ${currentSort === option.value 
                      ? 'text-primary bg-primary/10' :'text-popover-foreground'
                    }
                  `}
                >
                  <Icon 
                    name={option.icon} 
                    size={16} 
                    className={currentSort === option.value ? 'text-primary' : 'text-muted-foreground'} 
                  />
                  <span className="flex-1">{option.label}</span>
                  {currentSort === option.value && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;