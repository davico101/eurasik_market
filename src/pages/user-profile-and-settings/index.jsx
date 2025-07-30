import React, { useState, useEffect } from 'react';
        import { useNavigate } from 'react-router-dom';
        import ContextualHeader from '../../components/ui/ContextualHeader';
        import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
        import ProfileHeader from './components/ProfileHeader';
        import ProfileTabs from './components/ProfileTabs';
        import ProfileEditor from './components/ProfileEditor';
        import SettingsPanel from './components/SettingsPanel';
        import TradingHistory from './components/TradingHistory';
        import PhotoUploadModal from './components/PhotoUploadModal';
        import Icon from '../../components/AppIcon';

        const UserProfileAndSettings = () => {
          const navigate = useNavigate();
          const [activeTab, setActiveTab] = useState('profile');
          const [isEditing, setIsEditing] = useState(false);
          const [showPhotoModal, setShowPhotoModal] = useState(false);
          const [userProfile, setUserProfile] = useState({
            avatar: '/api/placeholder/120/120',
            displayName: 'Juan García',
            memberSince: '2023-03-15',
            bio: 'Apasionado de los juegos de mesa estratégicos. Coleccionista desde hace 10 años.',
            gamingInterests: ['Estrategia', 'Euro Games', 'Worker Placement'],
            favoriteMechanics: ['Control de área', 'Gestión de recursos', 'Construcción de mazos'],
            location: 'Madrid, España',
            stats: {
              gamesSold: 45,
              buyerRating: 4.8,
              responseTime: '< 2h',
              totalRatings: 127
            }
          });

          const [settings, setSettings] = useState({
            notifications: {
              bidAlerts: true,
              messageNotifications: true,
              auctionEndings: true,
              priceDrops: false
            },
            privacy: {
              profileVisibility: 'public',
              contactPreferences: 'verified',
              showRealName: true
            },
            location: {
              tradingRadius: 25,
              allowShipping: true,
              preferLocalDeals: true
            }
          });

          const [tradingHistory, setTradingHistory] = useState([]);
          const [isLoading, setIsLoading] = useState(true);

          useEffect(() => {
            // Simulate loading user data
            const loadUserData = async () => {
              setIsLoading(true);
              
              // Mock trading history data
              const mockHistory = [
                {
                  id: 1,
                  type: 'sold',
                  gameTitle: 'Wingspan',
                  price: 42.50,
                  date: '2025-01-25',
                  buyerSeller: 'María López',
                  rating: 5,
                  review: 'Excelente vendedor, juego en perfecto estado.'
                },
                {
                  id: 2,
                  type: 'bought',
                  gameTitle: 'Terraforming Mars',
                  price: 67.00,
                  date: '2025-01-20',
                  buyerSeller: 'Carlos Ruiz',
                  rating: 4,
                  review: 'Buen trato, envío rápido.'
                }
              ];

              await new Promise(resolve => setTimeout(resolve, 1000));
              setTradingHistory(mockHistory);
              setIsLoading(false);
            };

            loadUserData();
          }, []);

          const handleProfileUpdate = (updatedProfile) => {
            setUserProfile(prev => ({ ...prev, ...updatedProfile }));
            setIsEditing(false);
          };

          const handleSettingChange = (category, setting, value) => {
            setSettings(prev => ({
              ...prev,
              [category]: {
                ...prev[category],
                [setting]: value
              }
            }));
          };

          const handlePhotoUpload = (newPhotoUrl) => {
            setUserProfile(prev => ({ ...prev, avatar: newPhotoUrl }));
            setShowPhotoModal(false);
          };

          const tabs = [
            { id: 'profile', label: 'Perfil', icon: 'User' },
            { id: 'settings', label: 'Configuración', icon: 'Settings' },
            { id: 'history', label: 'Historial', icon: 'History' }
          ];

          if (isLoading) {
            return (
              <div className="min-h-screen bg-background">
                <ContextualHeader />
                <div className="flex items-center justify-center pt-20">
                  <div className="flex flex-col items-center space-y-4">
                    <Icon name="Loader2" size={32} className="text-primary animate-spin" />
                    <p className="font-body text-muted-foreground">Cargando perfil...</p>
                  </div>
                </div>
                <BottomTabNavigation />
              </div>
            );
          }

          return (
            <div className="min-h-screen bg-background">
              {/* Header */}
              <ContextualHeader />

              {/* Main Content */}
              <main className="pb-32">
                {/* Profile Header */}
                <ProfileHeader
                  profile={userProfile}
                  onEditPhoto={() => setShowPhotoModal(true)}
                  onEdit={() => setIsEditing(true)}
                />

                {/* Profile Tabs */}
                <ProfileTabs
                  tabs={tabs}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />

                {/* Tab Content */}
                <div className="px-4 py-6">
                  {activeTab === 'profile' && (
                    isEditing ? (
                      <ProfileEditor
                        profile={userProfile}
                        onSave={handleProfileUpdate}
                        onCancel={() => setIsEditing(false)}
                      />
                    ) : (
                      <div className="space-y-6">
                        {/* Bio Section */}
                        <div className="bg-card rounded-lg p-6 border border-border">
                          <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                            Sobre mí
                          </h3>
                          <p className="font-body text-muted-foreground mb-4">
                            {userProfile?.bio || 'Sin biografía'}
                          </p>
                          <button
                            onClick={() => setIsEditing(true)}
                            className="text-primary font-body text-sm hover:underline"
                          >
                            Editar perfil
                          </button>
                        </div>

                        {/* Gaming Interests */}
                        <div className="bg-card rounded-lg p-6 border border-border">
                          <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                            Intereses de juego
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {userProfile?.gamingInterests?.map((interest, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-caption"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Favorite Mechanics */}
                        <div className="bg-card rounded-lg p-6 border border-border">
                          <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                            Mecánicas favoritas
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {userProfile?.favoriteMechanics?.map((mechanic, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-caption"
                              >
                                {mechanic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  )}

                  {activeTab === 'settings' && (
                    <SettingsPanel
                      settings={settings}
                      onSettingChange={handleSettingChange}
                    />
                  )}

                  {activeTab === 'history' && (
                    <TradingHistory
                      history={tradingHistory}
                      isLoading={isLoading}
                    />
                  )}
                </div>
              </main>

              {/* Bottom Navigation */}
              <BottomTabNavigation />

              {/* Photo Upload Modal */}
              {showPhotoModal && (
                <PhotoUploadModal
                  currentPhoto={userProfile?.avatar}
                  onUpload={handlePhotoUpload}
                  onClose={() => setShowPhotoModal(false)}
                />
              )}
            </div>
          );
        };

        export default UserProfileAndSettings;