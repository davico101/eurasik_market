import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SearchSuggestions = ({ suggestions, onSuggestionClick, isVisible }) => {
  if (!isVisible || !suggestions.length) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-warm-lg z-50 max-h-80 overflow-y-auto">
      <div className="py-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors duration-200"
          >
            {suggestion.type === 'game' ? (
              <>
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={suggestion.image}
                    alt={suggestion.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-sm text-popover-foreground truncate">
                    {suggestion.title}
                  </p>
                  <p className="font-caption text-xs text-muted-foreground">
                    {suggestion.year} • {suggestion.players} jugadores
                  </p>
                </div>
                <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Icon name="Search" size={16} className="text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm text-popover-foreground">
                    {suggestion.query}
                  </p>
                  <p className="font-caption text-xs text-muted-foreground">
                    Búsqueda reciente
                  </p>
                </div>
                <Icon name="ArrowUpLeft" size={16} className="text-muted-foreground" />
              </>
            )}
          </button>
        ))}
        
        {/* View All Results */}
        <div className="border-t border-border mt-2 pt-2">
          <button
            onClick={() => onSuggestionClick({ type: 'search', query: suggestions[0]?.query || '' })}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-body text-primary hover:bg-primary/10 transition-colors duration-200"
          >
            <Icon name="Search" size={16} />
            <span>Ver todos los resultados</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;