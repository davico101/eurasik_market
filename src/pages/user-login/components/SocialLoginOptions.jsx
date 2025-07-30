import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLoginOptions = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider);
    
    try {
      // Simulate social login API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful social login
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `usuario@${provider}.com`);
      localStorage.setItem('loginProvider', provider);
      
      navigate('/marketplace-dashboard');
    } catch (error) {
      console.error(`Error with ${provider} login:`, error);
      alert(`Error al iniciar sesión con ${provider}. Inténtalo de nuevo.`);
    } finally {
      setLoadingProvider(null);
    }
  };

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Mail',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground font-caption">
            O continúa con
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            type="button"
            onClick={() => handleSocialLogin(provider.id)}
            loading={loadingProvider === provider.id}
            disabled={loadingProvider !== null}
            className={`
              w-full justify-center py-3 font-body font-medium transition-all duration-200
              ${provider.bgColor} ${provider.textColor} border ${provider.borderColor}
              hover:shadow-warm-sm disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <div className="flex items-center justify-center space-x-3">
              <Icon 
                name={provider.icon} 
                size={18} 
                className={loadingProvider === provider.id ? 'animate-spin' : ''} 
              />
              <span>
                {loadingProvider === provider.id 
                  ? `Conectando con ${provider.name}...` 
                  : `Continuar con ${provider.name}`
                }
              </span>
            </div>
          </Button>
        ))}
      </div>

      {/* Demo Notice */}
      <div className="bg-muted/30 rounded-lg p-3 mt-4">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-caption text-xs text-muted-foreground">
              <strong>Modo Demo:</strong> Los botones sociales simulan el proceso de autenticación.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLoginOptions;