import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Welcome Message */}
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl text-foreground mb-2">
          ¡Bienvenido de vuelta!
        </h1>
        <p className="font-body text-muted-foreground">
          Inicia sesión para acceder a tu cuenta
        </p>
      </div>

      {/* Features Preview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="ShoppingBag" size={20} className="text-primary" />
          </div>
          <span className="font-caption text-xs text-muted-foreground text-center">
            Comprar
          </span>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="ArrowLeftRight" size={20} className="text-secondary" />
          </div>
          <span className="font-caption text-xs text-muted-foreground text-center">
            Intercambiar
          </span>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Gavel" size={20} className="text-accent" />
          </div>
          <span className="font-caption text-xs text-muted-foreground text-center">
            Subastar
          </span>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-4 text-xs font-caption text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} className="text-success" />
            <span>Seguro</span>
          </div>
          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} className="text-primary" />
            <span>+5,000 usuarios</span>
          </div>
          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-warning" />
            <span>4.8/5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;