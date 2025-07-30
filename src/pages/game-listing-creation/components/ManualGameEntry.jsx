import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ManualGameEntry = ({ gameData, onUpdate, onCancel }) => {
  const categoryOptions = [
    { value: 'strategy', label: 'Estrategia' },
    { value: 'family', label: 'Familiar' },
    { value: 'party', label: 'Fiesta' },
    { value: 'cooperative', label: 'Cooperativo' },
    { value: 'card', label: 'Cartas' },
    { value: 'dice', label: 'Dados' },
    { value: 'abstract', label: 'Abstracto' },
    { value: 'thematic', label: 'Temático' },
    { value: 'war', label: 'Guerra' },
    { value: 'economic', label: 'Económico' }
  ];

  const complexityOptions = [
    { value: '1', label: '1 - Muy fácil', description: 'Reglas simples, ideal para principiantes' },
    { value: '2', label: '2 - Fácil', description: 'Pocas reglas, fácil de aprender' },
    { value: '3', label: '3 - Medio', description: 'Complejidad moderada' },
    { value: '4', label: '4 - Difícil', description: 'Reglas complejas, requiere experiencia' },
    { value: '5', label: '5 - Muy difícil', description: 'Extremadamente complejo' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ ...gameData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
            Información del Juego
          </h3>
          <p className="font-caption text-sm text-muted-foreground">
            Completa los detalles manualmente
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Volver a buscar
        </Button>
      </div>

      {/* Basic Information */}
      <div className="space-y-4">
        <Input
          type="text"
          label="Nombre del juego"
          placeholder="Ej: Catan"
          value={gameData.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="number"
            label="Año de publicación"
            placeholder="2023"
            value={gameData.year || ''}
            onChange={(e) => handleInputChange('year', e.target.value)}
            min="1900"
            max={new Date().getFullYear()}
          />

          <Select
            label="Categoría principal"
            options={categoryOptions}
            value={gameData.category || ''}
            onChange={(value) => handleInputChange('category', value)}
            placeholder="Selecciona categoría"
          />
        </div>

        <div>
          <label className="block font-body font-medium text-sm text-foreground mb-2">
            Descripción del juego
          </label>
          <textarea
            placeholder="Describe de qué trata el juego, mecánicas principales, objetivo..."
            value={gameData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            maxLength={500}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          />
          <p className="font-caption text-xs text-muted-foreground mt-1">
            {(gameData.description || '').length}/500 caracteres
          </p>
        </div>
      </div>

      {/* Game Specifications */}
      <div className="space-y-4">
        <h4 className="font-body font-medium text-foreground">Especificaciones</h4>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Input
            type="number"
            label="Jugadores mín."
            placeholder="2"
            value={gameData.minPlayers || ''}
            onChange={(e) => handleInputChange('minPlayers', e.target.value)}
            min="1"
            max="20"
          />

          <Input
            type="number"
            label="Jugadores máx."
            placeholder="4"
            value={gameData.maxPlayers || ''}
            onChange={(e) => handleInputChange('maxPlayers', e.target.value)}
            min="1"
            max="20"
          />

          <Input
            type="number"
            label="Duración (min)"
            placeholder="60"
            value={gameData.playingTime || ''}
            onChange={(e) => handleInputChange('playingTime', e.target.value)}
            min="5"
            max="600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Complejidad"
            options={complexityOptions}
            value={gameData.complexity || ''}
            onChange={(value) => handleInputChange('complexity', value)}
            placeholder="Selecciona complejidad"
          />

          <Input
            type="number"
            label="Edad mínima"
            placeholder="10"
            value={gameData.minAge || ''}
            onChange={(e) => handleInputChange('minAge', e.target.value)}
            min="3"
            max="18"
          />
        </div>
      </div>

      {/* Publisher Information */}
      <div className="space-y-4">
        <h4 className="font-body font-medium text-foreground">Editorial y Diseño</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            label="Editorial"
            placeholder="Ej: Devir"
            value={gameData.publisher || ''}
            onChange={(e) => handleInputChange('publisher', e.target.value)}
          />

          <Input
            type="text"
            label="Diseñador(es)"
            placeholder="Ej: Klaus Teuber"
            value={gameData.designer || ''}
            onChange={(e) => handleInputChange('designer', e.target.value)}
          />
        </div>

        <Input
          type="text"
          label="Idioma de la edición"
          placeholder="Español"
          value={gameData.language || ''}
          onChange={(e) => handleInputChange('language', e.target.value)}
        />
      </div>

      {/* Additional Information */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-body text-sm text-foreground mb-1">
              <strong>Información adicional</strong>
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              Completa todos los campos posibles para que tu publicación sea más atractiva. 
              Los compradores valoran la información detallada y precisa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualGameEntry;