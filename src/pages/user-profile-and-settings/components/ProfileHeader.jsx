import React from 'react';
        import Icon from '../../../components/AppIcon';
        import Button from '../../../components/ui/Button';

        const ProfileHeader = ({ profile, onEditPhoto, onEdit }) => {
          const formatMemberSince = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long' 
            });
          };

          return (
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-b border-border">
              <div className="px-4 py-8">
                {/* Avatar and Basic Info */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <img
                      src={profile?.avatar || '/api/placeholder/80/80'}
                      alt={profile?.displayName || 'Avatar'}
                      className="w-20 h-20 rounded-full object-cover border-4 border-background shadow-warm-md"
                    />
                    <button
                      onClick={onEditPhoto}
                      className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors duration-200 shadow-warm-sm"
                      aria-label="Cambiar foto"
                    >
                      <Icon name="Camera" size={14} />
                    </button>
                  </div>

                  <div className="flex-1">
                    <h1 className="font-heading font-bold text-xl text-foreground mb-1">
                      {profile?.displayName || 'Usuario'}
                    </h1>
                    <p className="font-body text-sm text-muted-foreground mb-2">
                      Miembro desde {formatMemberSince(profile?.memberSince)}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={14} className="text-muted-foreground" />
                      <span className="font-caption text-sm text-muted-foreground">
                        {profile?.location || 'Ubicación no especificada'}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onEdit}
                    className="shrink-0"
                  >
                    <Icon name="Edit" size={16} className="mr-2" />
                    Editar
                  </Button>
                </div>

                {/* Trading Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-card/50 rounded-lg p-4 text-center">
                    <div className="font-heading font-bold text-2xl text-foreground mb-1">
                      {profile?.stats?.gamesSold || 0}
                    </div>
                    <div className="font-caption text-xs text-muted-foreground">
                      Juegos vendidos
                    </div>
                  </div>

                  <div className="bg-card/50 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <span className="font-heading font-bold text-2xl text-foreground">
                        {profile?.stats?.buyerRating || 0}
                      </span>
                      <Icon name="Star" size={16} className="text-yellow-500 fill-current" />
                    </div>
                    <div className="font-caption text-xs text-muted-foreground">
                      Valoración ({profile?.stats?.totalRatings || 0})
                    </div>
                  </div>

                  <div className="bg-card/50 rounded-lg p-4 text-center">
                    <div className="font-heading font-bold text-2xl text-foreground mb-1">
                      {profile?.stats?.responseTime || 'N/A'}
                    </div>
                    <div className="font-caption text-xs text-muted-foreground">
                      Tiempo respuesta
                    </div>
                  </div>

                  <div className="bg-card/50 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Icon name="TrendingUp" size={20} className="text-green-500" />
                    </div>
                    <div className="font-caption text-xs text-muted-foreground">
                      Tendencia positiva
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        };

        export default ProfileHeader;