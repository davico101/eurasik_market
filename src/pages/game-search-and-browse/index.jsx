import React, { useState, useEffect, useCallback } from 'react';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FilterChip from './components/FilterChip';
import GameGrid from './components/GameGrid';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import SearchSuggestions from './components/SearchSuggestions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const GameSearchAndBrowse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('ending-soon');
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: '', max: '' },
    conditions: [],
    playerCount: { min: '', max: '' },
    playTime: { min: '', max: '' },
    mechanics: [],
    location: '',
    sellerRating: { min: '' }
  });

  // Mock game data
  const mockGames = [
    {
      id: 1,
      title: "Catan: Edición Especial 25 Aniversario",
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=400&fit=crop",
      currentPrice: 45.50,
      isAuction: true,
      bidCount: 12,
      timeRemaining: "2h 15m",
      condition: "Muy bueno",
      seller: "@juancarlos",
      location: "Madrid",
      isWatched: false,
      category: "Estrategia",
      players: "3-4",
      playTime: "60-90 min"
    },
    {
      id: 2,
      title: "Wingspan: Expansión Europea",
      image: "https://images.unsplash.com/photo-1611891487122-207579d67d98?w=400&h=400&fit=crop",
      currentPrice: 32.00,
      isAuction: false,
      bidCount: 0,
      timeRemaining: null,
      condition: "Nuevo",
      seller: "@birdlover",
      location: "Barcelona",
      isWatched: true,
      category: "Estrategia",
      players: "1-5",
      playTime: "40-70 min"
    },
    {
      id: 3,
      title: "Azul: Pabellón de Verano",
      image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=400&fit=crop",
      currentPrice: 28.75,
      isAuction: true,
      bidCount: 8,
      timeRemaining: "1h 45m",
      condition: "Como nuevo",
      seller: "@azulmaster",
      location: "Valencia",
      isWatched: false,
      category: "Abstracto",
      players: "2-4",
      playTime: "30-45 min"
    },
    {
      id: 4,
      title: "Gloomhaven: Fauces del León",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      currentPrice: 89.99,
      isAuction: false,
      bidCount: 0,
      timeRemaining: null,
      condition: "Bueno",
      seller: "@dungeonmaster",
      location: "Sevilla",
      isWatched: false,
      category: "Temático",
      players: "1-4",
      playTime: "60-120 min"
    },
    {
      id: 5,
      title: "7 Wonders Duel",
      image: "https://images.unsplash.com/photo-1566694271453-390536dd1f0d?w=400&h=400&fit=crop",
      currentPrice: 22.50,
      isAuction: true,
      bidCount: 15,
      timeRemaining: "45m",
      condition: "Muy bueno",
      seller: "@wonderbuilder",
      location: "Bilbao",
      isWatched: true,
      category: "Estrategia",
      players: "2",
      playTime: "30 min"
    },
    {
      id: 6,
      title: "Ticket to Ride: Europa",
      image: "https://images.unsplash.com/photo-1611891487122-207579d67d98?w=400&h=400&fit=crop",
      currentPrice: 35.00,
      isAuction: false,
      bidCount: 0,
      timeRemaining: null,
      condition: "Nuevo",
      seller: "@trainlover",
      location: "Zaragoza",
      isWatched: false,
      category: "Familiar",
      players: "2-5",
      playTime: "30-60 min"
    }
  ];

  // Mock search suggestions
  const mockSuggestions = [
    {
      type: 'game',
      title: 'Catan',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=100&h=100&fit=crop',
      year: '1995',
      players: '3-4'
    },
    {
      type: 'game',
      title: 'Wingspan',
      image: 'https://images.unsplash.com/photo-1611891487122-207579d67d98?w=100&h=100&fit=crop',
      year: '2019',
      players: '1-5'
    },
    {
      type: 'search',
      query: 'juegos de estrategia'
    },
    {
      type: 'search',
      query: 'juegos familiares'
    }
  ];

  // Initialize games on component mount
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setGames(mockGames);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  // Handle search suggestions
  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'game') {
      setSearchQuery(suggestion.title);
    } else {
      setSearchQuery(suggestion.query);
    }
    setShowSuggestions(false);
    performSearch(suggestion.query || suggestion.title);
  };

  // Perform search
  const performSearch = useCallback((query = searchQuery) => {
    setLoading(true);
    setShowSuggestions(false);
    
    setTimeout(() => {
      let filteredGames = mockGames.filter(game =>
        game.title.toLowerCase().includes(query.toLowerCase()) ||
        game.category.toLowerCase().includes(query.toLowerCase()) ||
        game.seller.toLowerCase().includes(query.toLowerCase())
      );
      setGames(filteredGames);
      setLoading(false);
    }, 800);
  }, [searchQuery]);

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    applyFiltersAndSort(newFilters, currentSort);
  };

  // Handle sort changes
  const handleSortChange = (newSort) => {
    setCurrentSort(newSort);
    applyFiltersAndSort(filters, newSort);
  };

  // Apply filters and sorting
  const applyFiltersAndSort = (currentFilters, sortOption) => {
    setLoading(true);
    
    setTimeout(() => {
      let filteredGames = [...mockGames];

      // Apply filters
      if (currentFilters.categories.length > 0) {
        filteredGames = filteredGames.filter(game =>
          currentFilters.categories.includes(game.category)
        );
      }

      if (currentFilters.conditions.length > 0) {
        filteredGames = filteredGames.filter(game =>
          currentFilters.conditions.includes(game.condition)
        );
      }

      if (currentFilters.priceRange.min || currentFilters.priceRange.max) {
        filteredGames = filteredGames.filter(game => {
          const price = game.currentPrice;
          const min = parseFloat(currentFilters.priceRange.min) || 0;
          const max = parseFloat(currentFilters.priceRange.max) || Infinity;
          return price >= min && price <= max;
        });
      }

      // Apply sorting
      switch (sortOption) {
        case 'ending-soon':
          filteredGames.sort((a, b) => {
            if (!a.timeRemaining && !b.timeRemaining) return 0;
            if (!a.timeRemaining) return 1;
            if (!b.timeRemaining) return -1;
            return a.timeRemaining.localeCompare(b.timeRemaining);
          });
          break;
        case 'price-low-high':
          filteredGames.sort((a, b) => a.currentPrice - b.currentPrice);
          break;
        case 'price-high-low':
          filteredGames.sort((a, b) => b.currentPrice - a.currentPrice);
          break;
        case 'newly-listed':
          filteredGames.sort((a, b) => b.id - a.id);
          break;
        default:
          break;
      }

      setGames(filteredGames);
      setLoading(false);
    }, 600);
  };

  // Load more games (infinite scroll)
  const handleLoadMore = useCallback(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate loading more games
        const moreGames = mockGames.map(game => ({
          ...game,
          id: game.id + games.length,
          title: `${game.title} (Copia ${games.length + 1})`
        }));
        
        setGames(prev => [...prev, ...moreGames.slice(0, 4)]);
        
        // Simulate end of results after a few loads
        if (games.length > 20) {
          setHasMore(false);
        }
        
        resolve();
      }, 1000);
    });
  }, [games.length]);

  // Pull to refresh
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setGames(mockGames);
      setHasMore(true);
      setIsRefreshing(false);
    }, 1000);
  }, []);

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.conditions.length > 0) count += filters.conditions.length;
    if (filters.mechanics.length > 0) count += filters.mechanics.length;
    if (filters.priceRange.min || filters.priceRange.max) count += 1;
    if (filters.playerCount.min || filters.playerCount.max) count += 1;
    if (filters.playTime.min || filters.playTime.max) count += 1;
    if (filters.location) count += 1;
    if (filters.sellerRating.min) count += 1;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  // Get active filter chips
  const getActiveFilterChips = () => {
    const chips = [];
    
    filters.categories.forEach(category => {
      chips.push({
        key: `category-${category}`,
        label: category,
        onRemove: () => {
          const newFilters = {
            ...filters,
            categories: filters.categories.filter(c => c !== category)
          };
          handleFiltersChange(newFilters);
        }
      });
    });

    filters.conditions.forEach(condition => {
      chips.push({
        key: `condition-${condition}`,
        label: condition,
        onRemove: () => {
          const newFilters = {
            ...filters,
            conditions: filters.conditions.filter(c => c !== condition)
          };
          handleFiltersChange(newFilters);
        }
      });
    });

    if (filters.priceRange.min || filters.priceRange.max) {
      const min = filters.priceRange.min || '0';
      const max = filters.priceRange.max || '∞';
      chips.push({
        key: 'price-range',
        label: `$${min} - $${max}`,
        onRemove: () => {
          const newFilters = {
            ...filters,
            priceRange: { min: '', max: '' }
          };
          handleFiltersChange(newFilters);
        }
      });
    }

    if (filters.location) {
      chips.push({
        key: 'location',
        label: filters.location,
        onRemove: () => {
          const newFilters = {
            ...filters,
            location: ''
          };
          handleFiltersChange(newFilters);
        }
      });
    }

    return chips;
  };

  const activeFilterChips = getActiveFilterChips();

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader />
      
      <div className="flex">
        {/* Desktop Filter Sidebar */}
        <FilterPanel
          isOpen={true}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isMobile={false}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-4 space-y-4">
            {/* Mobile Search Bar */}
            <div className="lg:hidden relative">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <input
                  type="text"
                  placeholder="Buscar juegos..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
              
              <SearchSuggestions
                suggestions={mockSuggestions}
                onSuggestionClick={handleSuggestionClick}
                isVisible={showSuggestions}
              />
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex items-center justify-between space-x-4">
              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                onClick={() => setIsFilterPanelOpen(true)}
                className="lg:hidden flex items-center space-x-2"
                iconName="Filter"
                iconPosition="left"
                iconSize={16}
              >
                <span>Filtros</span>
                {activeFilterCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                    {activeFilterCount}
                  </span>
                )}
              </Button>

              {/* Sort Dropdown */}
              <SortDropdown
                currentSort={currentSort}
                onSortChange={handleSortChange}
              />
            </div>

            {/* Active Filter Chips */}
            {activeFilterChips.length > 0 && (
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                <div className="flex space-x-2 min-w-max">
                  {activeFilterChips.map(chip => (
                    <FilterChip
                      key={chip.key}
                      label={chip.label}
                      onRemove={chip.onRemove}
                      isActive={true}
                    />
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFiltersChange({
                      categories: [],
                      priceRange: { min: '', max: '' },
                      conditions: [],
                      playerCount: { min: '', max: '' },
                      playTime: { min: '', max: '' },
                      mechanics: [],
                      location: '',
                      sellerRating: { min: '' }
                    })}
                    className="text-muted-foreground hover:text-foreground whitespace-nowrap"
                  >
                    Limpiar todo
                  </Button>
                </div>
              </div>
            )}

            {/* Pull to Refresh Indicator */}
            {isRefreshing && (
              <div className="flex justify-center py-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="RotateCcw" size={16} className="animate-spin" />
                  <span className="font-caption text-sm">Actualizando...</span>
                </div>
              </div>
            )}

            {/* Game Grid */}
            <GameGrid
              games={games}
              loading={loading}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
            />
          </div>
        </main>
      </div>

      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        isMobile={true}
      />

      <BottomTabNavigation />
    </div>
  );
};

export default GameSearchAndBrowse;