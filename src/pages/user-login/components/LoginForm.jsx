import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for testing
  const mockCredentials = {
    email: 'usuario@boardgame.es',
    password: 'BoardGame123!'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Successful login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        navigate('/marketplace-dashboard');
      } else {
        // Failed login
        setErrors({
          general: 'Email o contraseña incorrectos. Usa: usuario@boardgame.es / BoardGame123!'
        });
      }
    } catch (error) {
      setErrors({
        general: 'Error de conexión. Inténtalo de nuevo.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Mock forgot password action
    alert('Se ha enviado un enlace de recuperación a tu email (funcionalidad simulada)');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error */}
      {errors.general && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error shrink-0" />
            <p className="font-body text-sm text-error">
              {errors.general}
            </p>
          </div>
        </div>
      )}

      {/* Email Field */}
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="tu@email.com"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        required
        autoComplete="email"
        className="w-full"
      />

      {/* Password Field */}
      <Input
        label="Contraseña"
        type="password"
        name="password"
        placeholder="Tu contraseña"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
        required
        autoComplete="current-password"
        className="w-full"
      />

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <Checkbox
          label="Recordarme"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleInputChange}
          size="sm"
        />
        
        <Button
          variant="link"
          type="button"
          onClick={handleForgotPassword}
          className="text-sm font-body text-primary hover:text-primary/80 p-0 h-auto"
        >
          ¿Olvidaste tu contraseña?
        </Button>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        loading={isLoading}
        fullWidth
        className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-medium"
      >
        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </Button>
    </form>
  );
};

export default LoginForm;