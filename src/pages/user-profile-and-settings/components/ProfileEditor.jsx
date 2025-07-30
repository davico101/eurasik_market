import React, { useState } from 'react';
        import Button from '../../../components/ui/Button';
        import Input from '../../../components/ui/Input';
        import Icon from '../../../components/AppIcon';

        const ProfileEditor = ({ profile, onSave, onCancel }) => {
          const [formData, setFormData] = useState({
            displayName: profile?.displayName || '',
            bio: profile?.bio || '',
            location: profile?.location || '',
            gamingInterests: profile?.gamingInterests || [],
            favoriteMechanics: profile?.favoriteMechanics || []
          });

          const [newInterest, setNewInterest] = useState('');
          const [newMechanic, setNewMechanic] = useState('');

          const handleInputChange = (field, value) => {
            setFormData(prev => ({ ...prev, [field]: value }));
          };

          const addInterest = () => {
            if (newInterest.trim() && !formData.gamingInterests.includes(newInterest.trim())) {
              setFormData(prev => ({
                ...prev,
                gamingInterests: [...prev.gamingInterests, newInterest.trim()]
              }));
              setNewInterest('');
            }
          };

          const removeInterest = (interest) => {
            setFormData(prev => ({
              ...prev,
              gamingInterests: prev.gamingInterests.filter(i => i !== interest)
            }));
          };

          const addMechanic = () => {
            if (newMechanic.trim() && !formData.favoriteMechanics.includes(newMechanic.trim())) {
              setFormData(prev => ({
                ...prev,
                favoriteMechanics: [...prev.favoriteMechanics, newMechanic.trim()]
              }));
              setNewMechanic('');
            }
          };

          const removeMechanic = (mechanic) => {
            setFormData(prev => ({
              ...prev,
              favoriteMechanics: prev.favoriteMechanics.filter(m => m !== mechanic)
            }));
          };

          const handleSave = () => {
            onSave(formData);
          };

          return (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                  Información básica
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-2">
                      Nombre de usuario
                    </label>
                    <Input
                      value={formData.displayName}
                      onChange={(e) => handleInputChange('displayName', e.target.value)}
                      placeholder="Tu nombre de usuario"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-2">
                      Ubicación
                    </label>
                    <Input
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Ciudad, País"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-2">
                      Biografía
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                      placeholder="Cuéntanos sobre ti y tu pasión por los juegos de mesa..."
                    />
                  </div>
                </div>
              </div>

              {/* Gaming Interests */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                  Intereses de juego
                </h3>
                
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      placeholder="Agregar interés..."
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addInterest}
                      disabled={!newInterest.trim()}
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.gamingInterests.map((interest, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-caption"
                      >
                        {interest}
                        <button
                          onClick={() => removeInterest(interest)}
                          className="ml-2 hover:text-primary/70"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Favorite Mechanics */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                  Mecánicas favoritas
                </h3>
                
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      value={newMechanic}
                      onChange={(e) => setNewMechanic(e.target.value)}
                      placeholder="Agregar mecánica..."
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && addMechanic()}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addMechanic}
                      disabled={!newMechanic.trim()}
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.favoriteMechanics.map((mechanic, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-caption"
                      >
                        {mechanic}
                        <button
                          onClick={() => removeMechanic(mechanic)}
                          className="ml-2 hover:text-muted-foreground/70"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={handleSave}
                  className="flex-1"
                >
                  <Icon name="Save" size={16} className="mr-2" />
                  Guardar cambios
                </Button>
                <Button
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1"
                >
                  <Icon name="X" size={16} className="mr-2" />
                  Cancelar
                </Button>
              </div>
            </div>
          );
        };

        export default ProfileEditor;