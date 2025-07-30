import React, { useState, useRef } from 'react';
        import Button from '../../../components/ui/Button';
        import Icon from '../../../components/AppIcon';

        const PhotoUploadModal = ({ currentPhoto, onUpload, onClose }) => {
          const [selectedFile, setSelectedFile] = useState(null);
          const [previewUrl, setPreviewUrl] = useState(null);
          const [isUploading, setIsUploading] = useState(false);
          const fileInputRef = useRef(null);

          const handleFileSelect = (event) => {
            const file = event.target.files[0];
            if (file) {
              if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('El archivo es demasiado grande. Máximo 5MB.');
                return;
              }

              if (!file.type.startsWith('image/')) {
                alert('Por favor selecciona una imagen válida.');
                return;
              }

              setSelectedFile(file);
              const reader = new FileReader();
              reader.onload = (e) => setPreviewUrl(e.target.result);
              reader.readAsDataURL(file);
            }
          };

          const handleUpload = async () => {
            if (!selectedFile) return;

            setIsUploading(true);
            
            try {
              // Simulate upload process
              await new Promise(resolve => setTimeout(resolve, 2000));
              
              // In a real app, you would upload to your server/cloud storage
              // For now, we'll use the preview URL
              onUpload(previewUrl);
            } catch (error) {
              console.error('Upload failed:', error);
              alert('Error al subir la imagen. Inténtalo de nuevo.');
            } finally {
              setIsUploading(false);
            }
          };

          const handleDragOver = (event) => {
            event.preventDefault();
          };

          const handleDrop = (event) => {
            event.preventDefault();
            const files = event.dataTransfer.files;
            if (files.length > 0) {
              const file = files[0];
              handleFileSelect({ target: { files: [file] } });
            }
          };

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
              <div className="bg-card rounded-lg shadow-warm-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="font-heading font-semibold text-lg text-foreground">
                    Cambiar foto de perfil
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                  >
                    <Icon name="X" size={16} className="text-muted-foreground" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Current Photo */}
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3">
                      <img
                        src={previewUrl || currentPhoto || '/api/placeholder/96/96'}
                        alt="Vista previa"
                        className="w-full h-full rounded-full object-cover border-4 border-background shadow-warm-md"
                      />
                    </div>
                    <p className="font-caption text-sm text-muted-foreground">
                      {previewUrl ? 'Nueva foto' : 'Foto actual'}
                    </p>
                  </div>

                  {/* Upload Area */}
                  <div
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors duration-200 cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Icon name="Upload" size={24} className="text-primary" />
                      </div>
                      
                      <div>
                        <p className="font-body text-sm text-foreground mb-1">
                          Arrastra una imagen aquí o haz clic para seleccionar
                        </p>
                        <p className="font-caption text-xs text-muted-foreground">
                          JPG, PNG, GIF hasta 5MB
                        </p>
                      </div>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>

                  {/* Selected File Info */}
                  {selectedFile && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <Icon name="Image" size={20} className="text-primary" />
                        <div className="flex-1">
                          <p className="font-body text-sm text-foreground">
                            {selectedFile.name}
                          </p>
                          <p className="font-caption text-xs text-muted-foreground">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl(null);
                          }}
                          className="p-1 hover:bg-muted rounded transition-colors duration-200"
                        >
                          <Icon name="X" size={16} className="text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="flex-1"
                      disabled={isUploading}
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleUpload}
                      className="flex-1"
                      disabled={!selectedFile || isUploading}
                    >
                      {isUploading ? (
                        <>
                          <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                          Subiendo...
                        </>
                      ) : (
                        <>
                          <Icon name="Upload" size={16} className="mr-2" />
                          Subir foto
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        };

        export default PhotoUploadModal;