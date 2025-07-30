import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImageCarousel = ({ images = [], gameTitle = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  if (!images.length) {
    return (
      <div className="relative w-full h-80 bg-muted rounded-lg flex items-center justify-center">
        <Icon name="Image" size={48} className="text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Main Image */}
      <div className="relative w-full h-80 overflow-hidden rounded-lg bg-muted">
        <Image
          src={images[currentIndex]}
          alt={`${gameTitle} - Imagen ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10"
              aria-label="Imagen anterior"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10"
              aria-label="Siguiente imagen"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm font-caption">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex 
                  ? 'border-primary shadow-warm' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Image
                src={image}
                alt={`Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;