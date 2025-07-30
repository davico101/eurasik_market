import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChip = ({ label, count, onRemove, isActive = true }) => {
  return (
    <div className={`
      inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-body whitespace-nowrap
      ${isActive 
        ? 'bg-primary text-primary-foreground' 
        : 'bg-muted text-muted-foreground border border-border'
      }
    `}>
      <span>{label}</span>
      {count && (
        <span className={`
          px-1.5 py-0.5 rounded-full text-xs font-medium
          ${isActive 
            ? 'bg-primary-foreground/20 text-primary-foreground' 
            : 'bg-muted-foreground/20 text-muted-foreground'
          }
        `}>
          {count}
        </span>
      )}
      {onRemove && (
        <button
          onClick={onRemove}
          className={`
            p-0.5 rounded-full hover:bg-black/10 transition-colors duration-200
            ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}
          `}
          aria-label={`Eliminar filtro ${label}`}
        >
          <Icon name="X" size={12} />
        </button>
      )}
    </div>
  );
};

export default FilterChip;