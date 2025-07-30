import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const GameSearchSection = ({ selectedGame, onGameSelect, onManualEntry }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);

  // Mock BoardGameGeek API data
  const mockBGGData = [
    {
      id: 1,
      name: "Catan",
      year: 2015,
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=300&fit=crop",
      description: "En Catan, los jugadores intentan ser el jugador dominante en la isla de Catan construyendo asentamientos, ciudades y caminos.",
      minPlayers: 3,
      maxPlayers: 4,
      playingTime: 75,
      complexity: 2.3
    },
    {
      id: 2,
      name: "Ticket to Ride",
      year: 2004,
      image: "https://images.unsplash.com/photo-1611891487122-207579d67d98?w=300&h=300&fit=crop",
      description: "Un juego de aventuras ferroviarias donde los jugadores coleccionan cartas de vagones de tren para reclamar rutas ferroviarias.",
      minPlayers: 2,
      maxPlayers: 5,
      playingTime: 60,
      complexity: 1.8
    },
    {
      id: 3,
      name: "Azul",
      year: 2017,
      image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=300&h=300&fit=crop",
      description: "Los jugadores compiten como artistas decorando las paredes del Palacio Real de Évora.",
      minPlayers: 2,
      maxPlayers: 4,
      playingTime: 45,
      complexity: 2.1
    },
    {
      id: 4,
      name: "Wingspan",
      year: 2019,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      description: "Un juego de construcción de motor sobre aves para 1-5 jugadores.",
      minPlayers: 1,
      maxPlayers: 5,
      playingTime: 70,
      complexity: 2.4
    },
    {
      id: 5,
      name: "Splendor",
      year: 2014,
      image: "https://images.unsplash.com/photo-1566694271453-390536dd1f0d?w=300&h=300&fit=crop",
      description: "Los jugadores son comerciantes del Renacimiento que intentan comprar minas de gemas, medios de transporte y tiendas.",
      minPlayers: 2,
      maxPlayers: 4,
      playingTime: 30,
      complexity: 1.8
    }
  ];

  useEffect(() => {
    if (searchQuery.length >= 2) {
      setIsSearching(true);
      // Simulate API delay
      const timer = setTimeout(() => {
        const filtered = mockBGGData.filter(game =>
          game.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleGameSelect = (game) => {
    onGameSelect(game);
    setSearchQuery(game.name);
    setSearchResults([]);
  };

  const handleManualEntry = () => {
    setShowManualEntry(true);
    onManualEntry();
  };

  const handleClearSelection = () => {
    onGameSelect(null);
    setSearchQuery('');
    setShowManualEntry(false);
  };

  if (selectedGame && !showManualEntry) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Juego Seleccionado
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearSelection}
            iconName="X"
            iconPosition="left"
          >
            Cambiar
          </Button>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex space-x-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={selectedGame.image}
                alt={selectedGame.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-body font-medium text-foreground mb-1">
                {selectedGame.name} ({selectedGame.year})
              </h4>
              <p className="font-caption text-sm text-muted-foreground mb-2 line-clamp-2">
                {selectedGame.description}
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>{selectedGame.minPlayers}-{selectedGame.maxPlayers} jugadores</span>
                <span>{selectedGame.playingTime} min</span>
                <span>Complejidad: {selectedGame.complexity}/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          Buscar Juego
        </h3>
        <p className="font-caption text-sm text-muted-foreground mb-4">
          Busca tu juego en BoardGameGeek para obtener información automática
        </p>
      </div>

      <div className="relative">
        <Input
          type="search"
          placeholder="Escribe el nombre del juego..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isSearching ? (
            <Icon name="Loader2" size={16} className="animate-spin text-muted-foreground" />
          ) : (
            <Icon name="Search" size={16} className="text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-popover border border-border rounded-lg shadow-warm max-h-64 overflow-y-auto">
          {searchResults.map((game) => (
            <button
              key={game.id}
              onClick={() => handleGameSelect(game)}
              className="w-full p-3 text-left hover:bg-muted/50 transition-colors duration-200 border-b border-border last:border-b-0"
            >
              <div className="flex space-x-3">
                <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-body font-medium text-popover-foreground mb-1">
                    {game.name} ({game.year})
                  </h4>
                  <p className="font-caption text-xs text-muted-foreground line-clamp-1">
                    {game.minPlayers}-{game.maxPlayers} jugadores • {game.playingTime} min
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {searchQuery.length >= 2 && searchResults.length === 0 && !isSearching && (
        <div className="text-center py-6">
          <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="font-body text-sm text-muted-foreground mb-3">
            No se encontraron juegos con "{searchQuery}"
          </p>
          <Button
            variant="outline"
            onClick={handleManualEntry}
            iconName="Plus"
            iconPosition="left"
          >
            Agregar manualmente
          </Button>
        </div>
      )}

      {/* Manual Entry Option */}
      {!searchQuery && (
        <div className="text-center py-6 border-2 border-dashed border-border rounded-lg">
          <Icon name="Plus" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="font-body text-sm text-muted-foreground mb-3">
            ¿No encuentras tu juego?
          </p>
          <Button
            variant="outline"
            onClick={handleManualEntry}
            iconName="Edit"
            iconPosition="left"
          >
            Agregar información manualmente
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameSearchSection;