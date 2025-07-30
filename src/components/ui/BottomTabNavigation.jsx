import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      label: 'Inicio',
      path: '/marketplace-dashboard',
      icon: 'Home',
      tooltip: 'Ver subastas y recomendaciones'
    },
    {
      label: 'Explorar',
      path: '/game-search-and-browse',
      icon: 'Search',
      tooltip: 'Buscar y explorar juegos'
    },
    {
      label: 'Vender',
      path: '/game-listing-creation',
      icon: 'Plus',
      tooltip: 'Crear nueva publicación'
    },
    {
      label: 'Mensajes',
      path: '/messages-and-communication',
      icon: 'MessageCircle',
      tooltip: 'Ver mensajes y comunicaciones'
    },
    {
      label: 'Perfil',
      path: '/user-profile-and-settings',
      icon: 'User',
      tooltip: 'Ver perfil y configuración'
    }
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-pb">
      <div className="flex items-center justify-around px-4 py-2 max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => handleTabClick(tab.path)}
            className={`
              flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-2 py-1 rounded-lg
              transition-all duration-200 ease-out
              ${isActive(tab.path) 
                ? 'text-primary bg-primary/10 transform scale-105' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }
            `}
            title={tab.tooltip}
            aria-label={tab.tooltip}
          >
            <Icon 
              name={tab.icon} 
              size={20} 
              className={`mb-1 transition-colors duration-200 ${
                isActive(tab.path) ? 'text-primary' : 'text-current'
              }`}
            />
            <span className={`
              text-xs font-caption leading-tight
              ${isActive(tab.path) ? 'font-medium text-primary' : 'text-current'}
            `}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;