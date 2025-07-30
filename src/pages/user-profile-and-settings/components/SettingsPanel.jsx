import React from 'react';
        import Icon from '../../../components/AppIcon';
        import Select from '../../../components/ui/Select';

        const SettingsPanel = ({ settings, onSettingChange }) => {
          const handleToggle = (category, setting) => {
            onSettingChange(category, setting, !settings[category][setting]);
          };

          const handleSelectChange = (category, setting, value) => {
            onSettingChange(category, setting, value);
          };

          const ToggleSwitch = ({ enabled, onChange }) => (
            <button
              onClick={onChange}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${enabled ? 'bg-primary' : 'bg-muted'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-background transition-transform
                  ${enabled ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          );

          return (
            <div className="space-y-6">
              {/* Notification Settings */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name="Bell" size={20} className="text-primary" />
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    Notificaciones
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-body text-sm font-medium text-foreground">
                        Alertas de pujas
                      </div>
                      <div className="font-caption text-xs text-muted-foreground">
                        Recibe notificaciones cuando alguien puje por tus juegos
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.notifications.bidAlerts}
                      onChange={() => handleToggle('notifications', 'bidAlerts')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-body text-sm font-medium text-foreground">
                        Mensajes nuevos
                      </div>
                      <div className="font-caption text-xs text-muted-foreground">
                        Notificaciones de mensajes de otros usuarios
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.notifications.messageNotifications}
                      onChange={() => handleToggle('notifications', 'messageNotifications')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-body text-sm font-medium text-foreground">
                        Final de subastas
                      </div>
                      <div className="font-caption text-xs text-muted-foreground">
                        Avisos cuando terminen las subastas que sigues
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.notifications.auctionEndings}
                      onChange={() => handleToggle('notifications', 'auctionEndings')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-body text-sm font-medium text-foreground">
                        Bajadas de precio
                      </div>
                      <div className="font-caption text-xs text-muted-foreground">
                        Notificaciones cuando bajen precios de juegos en tu lista de deseos
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.notifications.priceDrops}
                      onChange={() => handleToggle('notifications', 'priceDrops')}
                    />
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name="Shield" size={20} className="text-primary" />
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    Privacidad
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-2">
                      Visibilidad del perfil
                    </label>
                    <Select
                      value={settings.privacy.profileVisibility}
                      onChange={(value) => handleSelectChange('privacy', 'profileVisibility', value)}
                      options={[
                        { value: 'public', label: 'Público - Visible para todos' },
                        { value: 'verified', label: 'Solo usuarios verificados' },
                        { value: 'private', label: 'Privado - Solo contactos' }
                      ]}
                    />
                  </div>

                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-2">
                      Preferencias de contacto
                    </label>
                    <Select
                      value={settings.privacy.contactPreferences}
                      onChange={(value) => handleSelectChange('privacy', 'contactPreferences', value)}
                      options={[
                        { value: 'anyone', label: 'Cualquier usuario' },
                        { value: 'verified', label: 'Solo usuarios verificados' },
                        { value: 'trusted', label: 'Solo usuarios con buenas valoraciones' }
                      ]}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-body text-sm font-medium text-foreground">
                        Mostrar nombre real
                      </div>
                      <div className="font-caption text-xs text-muted-foreground">
                        Mostrar tu nombre real en lugar del nombre de usuario
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.privacy.showRealName}
                      onChange={() => handleToggle('privacy', 'showRealName')}
                    />
                  </div>
                </div>
              </div>

              {/* Location Settings */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name="MapPin" size={20} className="text-primary" />
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    Ubicación y envíos
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-2">
                      Radio de intercambio local (km)
                    </label>
                    <Select
                      value={settings.location.tradingRadius.toString()}
                      onChange={(value) => handleSelectChange('location', 'tradingRadius', parseInt(value))}
                      options={[
                        { value: '10', label: '10 km' },
                        { value: '25', label: '25 km' },
                        { value: '50', label: '50 km' },
                        { value: '100', label: '100 km' },
                        { value: '200', label: '200 km' }
                      ]}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-body text-sm font-medium text-foreground">
                        Permitir envíos
                      </div>
                      <div className="font-caption text-xs text-muted-foreground">
                        Acepta transacciones con envío postal
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.location.allowShipping}
                      onChange={() => handleToggle('location', 'allowShipping')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-body text-sm font-medium text-foreground">
                        Preferir tratos locales
                      </div>
                      <div className="font-caption text-xs text-muted-foreground">
                        Mostrar primero ofertas de tu zona
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.location.preferLocalDeals}
                      onChange={() => handleToggle('location', 'preferLocalDeals')}
                    />
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name="Settings" size={20} className="text-primary" />
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    Cuenta
                  </h3>
                </div>

                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <Icon name="Key" size={16} className="text-muted-foreground" />
                      <span className="font-body text-sm text-foreground">
                        Cambiar contraseña
                      </span>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                  </button>

                  <button className="w-full flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <Icon name="Download" size={16} className="text-muted-foreground" />
                      <span className="font-body text-sm text-foreground">
                        Descargar mis datos
                      </span>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                  </button>

                  <button className="w-full flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <Icon name="Trash2" size={16} className="text-red-600" />
                      <span className="font-body text-sm text-red-600">
                        Eliminar cuenta
                      </span>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          );
        };

        export default SettingsPanel;