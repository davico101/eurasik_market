import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import Icon from '../../../components/AppIcon';

const GameGrid = ({ games, loading, onLoadMore, hasMore }) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000 &&
        hasMore &&
        !loading &&
        !isLoadingMore
      ) {
        setIsLoadingMore(true);
        onLoadMore().finally(() => setIsLoadingMore(false));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, isLoadingMore, onLoadMore]);

  const SkeletonCard = () => (
    <div className="bg-card rounded-lg border border-border animate-pulse">
      <div className="aspect-square bg-muted rounded-t-lg"></div>
      <div className="p-3 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-3 bg-muted rounded w-1/2"></div>
        <div className="h-8 bg-muted rounded"></div>
      </div>
    </div>
  );

  if (loading && games.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (!loading && games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          No se encontraron juegos
        </h3>
        <p className="font-body text-muted-foreground max-w-md">
          Intenta ajustar tus filtros de búsqueda o explora diferentes categorías para encontrar el juego perfecto.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="font-body text-sm text-muted-foreground">
          {games.length} juego{games.length !== 1 ? 's' : ''} encontrado{games.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
        
        {/* Loading More Skeletons */}
        {isLoadingMore && Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={`loading-${index}`} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && !isLoadingMore && (
        <div className="flex justify-center pt-8">
          <button
            onClick={() => {
              setIsLoadingMore(true);
              onLoadMore().finally(() => setIsLoadingMore(false));
            }}
            className="flex items-center space-x-2 px-6 py-3 bg-card border border-border rounded-lg text-sm font-body text-foreground hover:bg-muted/50 transition-colors duration-200"
          >
            <Icon name="ChevronDown" size={16} />
            <span>Cargar más juegos</span>
          </button>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && games.length > 0 && (
        <div className="flex justify-center pt-8">
          <p className="font-caption text-sm text-muted-foreground">
            Has visto todos los juegos disponibles
          </p>
        </div>
      )}
    </div>
  );
};

export default GameGrid;