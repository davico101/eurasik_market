import React from 'react';
        import Icon from '../../../components/AppIcon';

        const ProfileTabs = ({ tabs, activeTab, onTabChange }) => {
          return (
            <div className="bg-card border-b border-border">
              <div className="flex">
                {tabs?.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`
                      flex-1 flex items-center justify-center space-x-2 py-4 px-4
                      font-body text-sm font-medium transition-colors duration-200
                      border-b-2 ${
                        activeTab === tab.id
                          ? 'text-primary border-primary bg-primary/5' :'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50'
                      }
                    `}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        };

        export default ProfileTabs;