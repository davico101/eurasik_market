import React, { useState } from 'react';
        import Icon from '../../../components/AppIcon';

        const QuickResponses = ({ onSelect }) => {
          const [isExpanded, setIsExpanded] = useState(false);

          const quickResponses = [
            { text: '¡Hola! Me interesa tu juego.', category: 'greeting' },
            { text: '¿Está disponible?', category: 'availability' },
            { text: '¿Cuál es el estado del juego?', category: 'condition' },
            { text: '¿Incluye todas las piezas?', category: 'condition' },
            { text: '¿Aceptas ofertas?', category: 'negotiation' },
            { text: '¿Haces envíos?', category: 'shipping' },
            { text: '¿Podemos quedar en persona?', category: 'meetup' },
            { text: 'Gracias por tu tiempo.', category: 'closing' },
            { text: 'Te confirmo la compra.', category: 'confirm' },
            { text: 'Lo siento, ya no me interesa.', category: 'decline' }
          ];

          const handleResponseSelect = (response) => {
            onSelect(response.text);
            setIsExpanded(false);
          };

          const visibleResponses = isExpanded ? quickResponses : quickResponses.slice(0, 4);

          return (
            <div className="px-4 py-2 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-caption text-xs text-muted-foreground">
                  Respuestas rápidas
                </span>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  <Icon 
                    name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                  />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {visibleResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleResponseSelect(response)}
                    className="px-3 py-1.5 bg-muted hover:bg-muted/70 text-foreground rounded-full text-sm font-caption transition-colors duration-200 border border-border hover:border-primary/50"
                  >
                    {response.text}
                  </button>
                ))}
              </div>
            </div>
          );
        };

        export default QuickResponses;