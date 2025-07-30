import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AuthenticationLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === '/user-login';
  const isRegistrationPage = location.pathname === '/user-registration';

  const handleAlternativeAction = () => {
    if (isLoginPage) {
      navigate('/user-registration');
    } else if (isRegistrationPage) {
      navigate('/user-login');
    }
  };

  const getAlternativeText = () => {
    if (isLoginPage) {
      return '¿No tienes cuenta? Regístrate';
    } else if (isRegistrationPage) {
      return '¿Ya tienes cuenta? Inicia sesión';
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Simplified Header */}
      <header className="w-full py-6 px-4">
        <div className="max-w-md mx-auto flex flex-col items-center space-y-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-warm">
              <Icon name="Gamepad2" size={28} className="text-primary-foreground" />
            </div>
            <div className="text-center">
              <h1 className="font-heading font-bold text-2xl text-foreground">
                BoardGame Exchange
              </h1>
              <p className="font-caption text-sm text-muted-foreground">
                Intercambia tus juegos favoritos
              </p>
            </div>
          </div>

          {/* Alternative Action Link */}
          {(isLoginPage || isRegistrationPage) && (
            <Button
              variant="link"
              onClick={handleAlternativeAction}
              className="text-sm font-body text-primary hover:text-primary/80"
            >
              {getAlternativeText()}
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-xl shadow-warm border border-border p-6">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4">
        <div className="max-w-md mx-auto text-center">
          <p className="font-caption text-xs text-muted-foreground">
            © 2025 BoardGame Exchange. Todos los derechos reservados.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <Button
              variant="link"
              className="text-xs font-caption text-muted-foreground hover:text-foreground p-0 h-auto"
            >
              Términos
            </Button>
            <Button
              variant="link"
              className="text-xs font-caption text-muted-foreground hover:text-foreground p-0 h-auto"
            >
              Privacidad
            </Button>
            <Button
              variant="link"
              className="text-xs font-caption text-muted-foreground hover:text-foreground p-0 h-auto"
            >
              Ayuda
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthenticationLayout;