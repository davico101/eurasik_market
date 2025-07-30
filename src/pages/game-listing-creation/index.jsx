import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import components
import ProgressIndicator from './components/ProgressIndicator';
import GameSearchSection from './components/GameSearchSection';
import ManualGameEntry from './components/ManualGameEntry';
import ListingDetailsSection from './components/ListingDetailsSection';
import PhotoUploadSection from './components/PhotoUploadSection';
import ShippingLocationSection from './components/ShippingLocationSection';
import ListingPreview from './components/ListingPreview';

const GameListingCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Form data states
  const [selectedGame, setSelectedGame] = useState(null);
  const [manualGameData, setManualGameData] = useState({});
  const [listingData, setListingData] = useState({
    listingType: 'fixed',
    condition: '',
    price: '',
    customTitle: '',
    description: ''
  });
  const [photos, setPhotos] = useState([]);
  const [shippingData, setShippingData] = useState({
    province: '',
    city: '',
    postalCode: '',
    allowPickup: false,
    allowShipping: false,
    shippingCost: '',
    shippingDays: '',
    freeShipping: false
  });

  const steps = [
    {
      label: 'Juego',
      icon: 'Search',
      description: 'Busca o agrega información del juego'
    },
    {
      label: 'Detalles',
      icon: 'Settings',
      description: 'Configura precio y condiciones'
    },
    {
      label: 'Fotos',
      icon: 'Camera',
      description: 'Agrega imágenes del juego'
    },
    {
      label: 'Envío',
      icon: 'Truck',
      description: 'Configura opciones de entrega'
    },
    {
      label: 'Vista previa',
      icon: 'Eye',
      description: 'Revisa y publica tu anuncio'
    }
  ];

  const totalSteps = steps.length;

  // Auto-save functionality
  useEffect(() => {
    const saveData = () => {
      const formData = {
        selectedGame,
        manualGameData,
        listingData,
        photos: photos.map(photo => ({ ...photo, file: null })), // Remove file objects for storage
        shippingData,
        currentStep,
        isManualEntry,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('gameListingDraft', JSON.stringify(formData));
    };

    if (hasUnsavedChanges) {
      const timer = setTimeout(saveData, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedGame, manualGameData, listingData, photos, shippingData, currentStep, isManualEntry, hasUnsavedChanges]);

  // Load saved draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('gameListingDraft');
    if (savedDraft) {
      try {
        const data = JSON.parse(savedDraft);
        setSelectedGame(data.selectedGame || null);
        setManualGameData(data.manualGameData || {});
        setListingData(data.listingData || { listingType: 'fixed' });
        setPhotos(data.photos || []);
        setShippingData(data.shippingData || {});
        setCurrentStep(data.currentStep || 1);
        setIsManualEntry(data.isManualEntry || false);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    setIsManualEntry(false);
    setHasUnsavedChanges(true);
  };

  const handleManualEntry = () => {
    setIsManualEntry(true);
    setSelectedGame(null);
    setHasUnsavedChanges(true);
  };

  const handleManualGameUpdate = (data) => {
    setManualGameData(data);
    setHasUnsavedChanges(true);
  };

  const handleListingUpdate = (data) => {
    setListingData(data);
    setHasUnsavedChanges(true);
  };

  const handlePhotosUpdate = (newPhotos) => {
    setPhotos(newPhotos);
    setHasUnsavedChanges(true);
  };

  const handleShippingUpdate = (data) => {
    setShippingData(data);
    setHasUnsavedChanges(true);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return selectedGame || (isManualEntry && manualGameData.name);
      case 2:
        return listingData.condition && (
          (listingData.listingType === 'fixed' && listingData.price) ||
          (listingData.listingType === 'auction' && listingData.startingBid && listingData.auctionDuration)
        );
      case 3:
        return photos.length > 0;
      case 4:
        return (shippingData.allowPickup || shippingData.allowShipping) && 
               shippingData.province && shippingData.city;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (canProceedToNext() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepEdit = (step) => {
    setCurrentStep(step);
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        '¿Estás seguro de que quieres salir? Los cambios no guardados se perderán.'
      );
      if (!confirmLeave) return;
    }
    localStorage.removeItem('gameListingDraft');
    navigate('/marketplace-dashboard');
  };

  const handleSaveDraft = () => {
    // Force save current state
    setHasUnsavedChanges(true);
    setTimeout(() => {
      alert('Borrador guardado correctamente');
    }, 100);
  };

  const handlePublish = () => {
    // Simulate publishing
    localStorage.removeItem('gameListingDraft');
    alert('¡Publicación creada exitosamente! Tu juego ya está disponible en el marketplace.');
    navigate('/marketplace-dashboard');
  };

  const getCurrentGameData = () => {
    return isManualEntry ? manualGameData : selectedGame;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        if (isManualEntry) {
          return (
            <ManualGameEntry
              gameData={manualGameData}
              onUpdate={handleManualGameUpdate}
              onCancel={() => setIsManualEntry(false)}
            />
          );
        }
        return (
          <GameSearchSection
            selectedGame={selectedGame}
            onGameSelect={handleGameSelect}
            onManualEntry={handleManualEntry}
          />
        );

      case 2:
        return (
          <ListingDetailsSection
            listingData={listingData}
            onUpdate={handleListingUpdate}
          />
        );

      case 3:
        return (
          <PhotoUploadSection
            photos={photos}
            onPhotosUpdate={handlePhotosUpdate}
          />
        );

      case 4:
        return (
          <ShippingLocationSection
            shippingData={shippingData}
            onUpdate={handleShippingUpdate}
          />
        );

      case 5:
        return (
          <ListingPreview
            listingData={listingData}
            gameData={getCurrentGameData()}
            photos={photos}
            shippingData={shippingData}
            onEdit={handleStepEdit}
            onPublish={handlePublish}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader />
      
      <main className="pb-20">
        <div className="max-w-2xl mx-auto px-4 py-6">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={handleCancel}
              iconName="X"
              iconPosition="left"
              className="text-destructive hover:text-destructive/80"
            >
              Cancelar
            </Button>
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              iconName="Save"
              iconPosition="left"
              className="text-sm"
            >
              Guardar borrador
            </Button>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            steps={steps}
          />

          {/* Step Content */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-warm">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          {currentStep < totalSteps && (
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Anterior
              </Button>
              
              <Button
                variant="default"
                onClick={handleNext}
                disabled={!canProceedToNext()}
                iconName="ChevronRight"
                iconPosition="right"
              >
                {currentStep === totalSteps - 1 ? 'Vista previa' : 'Siguiente'}
              </Button>
            </div>
          )}

          {/* Auto-save Indicator */}
          {hasUnsavedChanges && (
            <div className="fixed bottom-20 right-4 bg-muted border border-border rounded-lg px-3 py-2 shadow-warm">
              <div className="flex items-center space-x-2">
                <Icon name="Save" size={14} className="text-primary animate-pulse" />
                <span className="font-caption text-xs text-muted-foreground">
                  Guardando...
                </span>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomTabNavigation />
    </div>
  );
};

export default GameListingCreation;