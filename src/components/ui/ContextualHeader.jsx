import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ContextualHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getHeaderConfig = () => {
    switch (location.pathname) {
      case '/marketplace-dashboard':
        return {
          title: 'BoardGame Exchange',
          showLogo: true,
          showSearch: false,
          showBack: false,
          actions: [
            { icon: 'Bell', label: 'Notificaciones', onClick: () => {} },
            { icon: 'User', label: 'Perfil', onClick: () => {} }
          ]
        };
      case '/game-search-and-browse':
        return {
          title: 'Explorar Juegos',
          showLogo: false,
          showSearch: true,
          showBack: false,
          actions: [
            { icon: 'Filter', label: 'Filtros', onClick: () => {} },
            { icon: 'Grid3X3', label: 'Vista', onClick: () => {} }
          ]
        };
      case '/game-listing-creation':
        return {
          title: 'Crear Publicación',
          showLogo: false,
          showSearch: false,
          showBack: true,
          actions: [
            { icon: 'Save', label: 'Guardar', onClick: () => {}, variant: 'default' },
            { icon: 'X', label: 'Cancelar', onClick: () => navigate(-1), variant: 'ghost' }
          ]
        };
      case '/game-detail-and-bidding':
        return {
          title: 'Detalles del Juego',
          showLogo: false,
          showSearch: false,
          showBack: true,
          actions: [
            { icon: 'Heart', label: 'Favorito', onClick: () => {} },
            { icon: 'Share', label: 'Compartir', onClick: () => {} }
          ]
        };
      case '/user-profile-and-settings':
        return {
          title: 'Mi Perfil',
          showLogo: false,
          showSearch: false,
          showBack: true,
          actions: [
            { icon: 'Edit', label: 'Editar', onClick: () => {} },
            { icon: 'Settings', label: 'Configuración', onClick: () => {} }
          ]
        };
      case '/messages-and-communication':
        return {
          title: 'Mensajes',
          showLogo: false,
          showSearch: true,
          showBack: true,
          actions: [
            { icon: 'Filter', label: 'Filtrar', onClick: () => {} },
            { icon: 'Archive', label: 'Archivo', onClick: () => {} }
          ]
        };
      default:
        return {
          title: 'BoardGame Exchange',
          showLogo: true,
          showSearch: false,
          showBack: false,
          actions: []
        };
    }
  };

  const config = getHeaderConfig();

  const handleBack = () => {
    navigate(-1);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {config.showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="shrink-0"
              aria-label="Volver"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
          )}
          
          {config.showLogo && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Gamepad2" size={20} className="text-primary-foreground" />
              </div>
              <span className="font-heading font-semibold text-lg text-foreground hidden sm:block">
                BoardGame Exchange
              </span>
            </div>
          )}
          
          {!config.showLogo && !config.showBack && (
            <h1 className="font-heading font-semibold text-lg text-foreground">
              {config.title}
            </h1>
          )}
        </div>

        {/* Center Section - Search */}
        {config.showSearch && (
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Buscar juegos..."
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {config.actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'ghost'}
                size="icon"
                onClick={action.onClick}
                className="shrink-0"
                aria-label={action.label}
              >
                <Icon name={action.icon} size={20} />
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          {config.actions.length > 0 && (
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="shrink-0"
                aria-label="Menú"
              >
                <Icon name="MoreVertical" size={20} />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full right-0 w-48 bg-popover border border-border rounded-lg shadow-warm-lg m-4 z-50">
          <div className="py-2">
            {config.actions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  action.onClick();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-2 text-sm font-body text-popover-foreground hover:bg-muted/50 transition-colors duration-200"
              >
                <Icon name={action.icon} size={16} />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-30 bg-black/20" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default ContextualHeader;