import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    location: '',
    bio: '',
    gamingInterests: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mock credentials for testing
  const mockCredentials = {
    email: "usuario@ejemplo.com",
    password: "MiPassword123!",
    displayName: "JugadorPro",
    location: "Madrid, España"
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial
    };
  };

  const passwordStrength = validatePassword(formData.password);

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

    // Email validation
    if (!formData.email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (!passwordStrength.isValid) {
      newErrors.password = 'La contraseña no cumple los requisitos de seguridad';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Display name validation
    if (!formData.displayName) {
      newErrors.displayName = 'El nombre de usuario es obligatorio';
    } else if (formData.displayName.length < 3) {
      newErrors.displayName = 'Mínimo 3 caracteres';
    }

    // Location validation
    if (!formData.location) {
      newErrors.location = 'La ubicación es obligatoria';
    }

    // Terms validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      console.log('Usuario registrado:', formData);
      navigate('/marketplace-dashboard');
    } catch (error) {
      setErrors({ submit: 'Error al crear la cuenta. Inténtalo de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    const validCount = Object.values(passwordStrength).filter(Boolean).length - 1; // -1 for isValid
    if (validCount <= 2) return 'text-error';
    if (validCount <= 3) return 'text-warning';
    return 'text-success';
  };

  const getPasswordStrengthText = () => {
    const validCount = Object.values(passwordStrength).filter(Boolean).length - 1;
    if (validCount <= 2) return 'Débil';
    if (validCount <= 3) return 'Media';
    return 'Fuerte';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <Input
        label="Correo electrónico"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="tu@email.com"
        error={errors.email}
        required
        className="w-full"
      />

      {/* Password */}
      <div className="relative">
        <Input
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Crea una contraseña segura"
          error={errors.password}
          required
          className="w-full pr-12"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
        </button>
      </div>

      {/* Password Strength Indicator */}
      {formData.password && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-caption text-sm text-muted-foreground">
              Seguridad de la contraseña:
            </span>
            <span className={`font-caption text-sm font-medium ${getPasswordStrengthColor()}`}>
              {getPasswordStrengthText()}
            </span>
          </div>
          <div className="space-y-1">
            {[
              { key: 'minLength', text: 'Mínimo 8 caracteres' },
              { key: 'hasUpper', text: 'Una mayúscula' },
              { key: 'hasLower', text: 'Una minúscula' },
              { key: 'hasNumber', text: 'Un número' },
              { key: 'hasSpecial', text: 'Un carácter especial' }
            ].map(({ key, text }) => (
              <div key={key} className="flex items-center space-x-2">
                <Icon 
                  name={passwordStrength[key] ? "Check" : "X"} 
                  size={14} 
                  className={passwordStrength[key] ? "text-success" : "text-muted-foreground"} 
                />
                <span className={`font-caption text-xs ${passwordStrength[key] ? "text-success" : "text-muted-foreground"}`}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirm Password */}
      <div className="relative">
        <Input
          label="Confirmar contraseña"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Repite tu contraseña"
          error={errors.confirmPassword}
          required
          className="w-full pr-12"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
        </button>
      </div>

      {/* Display Name */}
      <Input
        label="Nombre de usuario"
        type="text"
        name="displayName"
        value={formData.displayName}
        onChange={handleInputChange}
        placeholder="¿Cómo quieres que te llamen?"
        error={errors.displayName}
        description="Este será tu nombre público en la plataforma"
        required
        className="w-full"
      />

      {/* Location */}
      <Input
        label="Ubicación"
        type="text"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        placeholder="Ciudad, Región"
        error={errors.location}
        description="Para facilitar intercambios locales"
        required
        className="w-full"
      />

      {/* Optional Profile Section */}
      <div className="pt-4 border-t border-border">
        <h3 className="font-body font-medium text-foreground mb-4">
          Perfil opcional
        </h3>
        
        {/* Bio */}
        <div className="mb-4">
          <label className="block font-body text-sm font-medium text-foreground mb-2">
            Sobre ti
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Cuéntanos un poco sobre ti y tu pasión por los juegos de mesa..."
            rows={3}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            maxLength={200}
          />
          <p className="font-caption text-xs text-muted-foreground mt-1">
            {formData.bio.length}/200 caracteres
          </p>
        </div>

        {/* Gaming Interests */}
        <Input
          label="Intereses de juego"
          type="text"
          name="gamingInterests"
          value={formData.gamingInterests}
          onChange={handleInputChange}
          placeholder="Estrategia, Familiar, Cooperativo..."
          description="Ayuda a otros usuarios a conocer tus preferencias"
          className="w-full"
        />
      </div>

      {/* Terms and Conditions */}
      <div className="pt-4">
        <Checkbox
          name="acceptTerms"
          checked={formData.acceptTerms}
          onChange={handleInputChange}
          error={errors.acceptTerms}
          label={
            <span className="font-caption text-sm text-foreground">
              Acepto los{' '}
              <button
                type="button"
                className="text-primary hover:text-primary/80 underline"
                onClick={() => {}}
              >
                términos y condiciones
              </button>
              {' '}y la{' '}
              <button
                type="button"
                className="text-primary hover:text-primary/80 underline"
                onClick={() => {}}
              >
                política de privacidad
              </button>
            </span>
          }
          required
        />
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <p className="font-caption text-sm text-error">
              {errors.submit}
            </p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        loading={isLoading}
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
      </Button>

      {/* Mock Credentials Info */}
      <div className="bg-muted/30 border border-border rounded-lg p-4 mt-6">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="font-body text-sm font-medium text-foreground mb-2">
              Credenciales de prueba:
            </p>
            <div className="space-y-1 font-caption text-xs text-muted-foreground">
              <p>Email: {mockCredentials.email}</p>
              <p>Contraseña: {mockCredentials.password}</p>
              <p>Usuario: {mockCredentials.displayName}</p>
              <p>Ubicación: {mockCredentials.location}</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;