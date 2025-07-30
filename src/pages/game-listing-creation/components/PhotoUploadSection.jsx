import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PhotoUploadSection = ({ photos, onPhotosUpdate }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const maxPhotos = 8;

  // Mock uploaded photos for demonstration
  const mockPhotos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=400&fit=crop",
      isPrimary: true,
      name: "catan_box_front.jpg"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1611891487122-207579d67d98?w=400&h=400&fit=crop",
      isPrimary: false,
      name: "catan_components.jpg"
    }
  ];

  const currentPhotos = photos.length > 0 ? photos : mockPhotos;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const remainingSlots = maxPhotos - currentPhotos.length;
    const filesToProcess = fileArray.slice(0, remainingSlots);

    const newPhotos = filesToProcess.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      isPrimary: currentPhotos.length === 0 && index === 0,
      name: file.name,
      file: file
    }));

    onPhotosUpdate([...currentPhotos, ...newPhotos]);
  };

  const handleRemovePhoto = (photoId) => {
    const updatedPhotos = currentPhotos.filter(photo => photo.id !== photoId);
    
    // If we removed the primary photo, make the first remaining photo primary
    if (updatedPhotos.length > 0 && !updatedPhotos.some(photo => photo.isPrimary)) {
      updatedPhotos[0].isPrimary = true;
    }
    
    onPhotosUpdate(updatedPhotos);
  };

  const handleSetPrimary = (photoId) => {
    const updatedPhotos = currentPhotos.map(photo => ({
      ...photo,
      isPrimary: photo.id === photoId
    }));
    onPhotosUpdate(updatedPhotos);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          Fotos del Juego
        </h3>
        <p className="font-caption text-sm text-muted-foreground">
          Agrega hasta {maxPhotos} fotos. La primera será la imagen principal.
        </p>
      </div>

      {/* Upload Area */}
      {currentPhotos.length < maxPhotos && (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200
            ${dragActive 
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
            }
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Icon name="Upload" size={24} className="text-muted-foreground" />
            </div>
            
            <div>
              <p className="font-body text-sm text-foreground mb-1">
                Arrastra fotos aquí o haz clic para seleccionar
              </p>
              <p className="font-caption text-xs text-muted-foreground">
                PNG, JPG hasta 5MB cada una
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={openFileDialog}
              iconName="Plus"
              iconPosition="left"
            >
              Seleccionar fotos
            </Button>
          </div>
        </div>
      )}

      {/* Photo Grid */}
      {currentPhotos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="font-body text-sm text-foreground">
              {currentPhotos.length} de {maxPhotos} fotos
            </p>
            {currentPhotos.length < maxPhotos && (
              <Button
                variant="outline"
                size="sm"
                onClick={openFileDialog}
                iconName="Plus"
                iconPosition="left"
              >
                Agregar más
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentPhotos.map((photo, index) => (
              <div key={photo.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={photo.url}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Primary Badge */}
                {photo.isPrimary && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-caption font-medium">
                    Principal
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-y-1">
                  {!photo.isPrimary && (
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => handleSetPrimary(photo.id)}
                      className="w-8 h-8 bg-background/90 hover:bg-background"
                      title="Establecer como principal"
                    >
                      <Icon name="Star" size={14} />
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemovePhoto(photo.id)}
                    className="w-8 h-8"
                    title="Eliminar foto"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>

                {/* Photo Name */}
                <p className="font-caption text-xs text-muted-foreground mt-2 truncate">
                  {photo.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Photo Tips */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Icon name="Camera" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-body text-sm text-foreground mb-2">
              <strong>Consejos para mejores fotos:</strong>
            </p>
            <ul className="font-caption text-xs text-muted-foreground space-y-1">
              <li>• Usa buena iluminación natural</li>
              <li>• Muestra la caja, componentes y manual</li>
              <li>• Incluye fotos de cualquier daño o desgaste</li>
              <li>• Mantén el fondo limpio y ordenado</li>
              <li>• La foto principal debe mostrar la caja completa</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadSection;