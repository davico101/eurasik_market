import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationToast = ({ notifications = [], onDismiss }) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    if (notifications.length > 0) {
      setVisibleNotifications(notifications);
    }
  }, [notifications]);

  const handleDismiss = (notificationId) => {
    setVisibleNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
    onDismiss && onDismiss(notificationId);
  };

  const getNotificationIcon = (type) => {
    const iconMap = {
      bid: 'TrendingUp',
      message: 'MessageCircle',
      auction: 'Clock',
      success: 'CheckCircle',
      warning: 'AlertTriangle',
      error: 'XCircle'
    };
    return iconMap[type] || 'Bell';
  };

  const getNotificationStyle = (type) => {
    const styleMap = {
      bid: 'bg-primary/10 border-primary/20 text-primary',
      message: 'bg-accent/10 border-accent/20 text-accent',
      auction: 'bg-warning/10 border-warning/20 text-warning',
      success: 'bg-success/10 border-success/20 text-success',
      warning: 'bg-warning/10 border-warning/20 text-warning',
      error: 'bg-error/10 border-error/20 text-error'
    };
    return styleMap[type] || 'bg-muted/10 border-border text-foreground';
  };

  if (visibleNotifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {visibleNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            rounded-lg border p-4 shadow-warm-lg backdrop-blur-sm
            animate-in slide-in-from-right-full duration-300
            ${getNotificationStyle(notification.type)}
          `}
        >
          <div className="flex items-start space-x-3">
            {/* Icon */}
            <div className="shrink-0">
              <Icon 
                name={getNotificationIcon(notification.type)} 
                size={20} 
                className="mt-0.5"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-body font-medium text-sm mb-1">
                {notification.title}
              </h4>
              <p className="font-caption text-xs opacity-90 line-clamp-2">
                {notification.message}
              </p>
              {notification.action && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={notification.action}
                  className="text-xs font-caption mt-2 p-0 h-auto opacity-90 hover:opacity-100"
                >
                  {notification.actionText}
                  <Icon name="ChevronRight" size={12} className="ml-1" />
                </Button>
              )}
            </div>

            {/* Dismiss Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDismiss(notification.id)}
              className="shrink-0 w-6 h-6 opacity-70 hover:opacity-100"
            >
              <Icon name="X" size={14} />
            </Button>
          </div>

          {/* Progress Bar for Auto-dismiss */}
          {notification.autoDismiss && (
            <div className="mt-3 h-1 bg-black/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-current opacity-50 animate-pulse"
                style={{
                  animation: `shrink ${notification.duration || 5000}ms linear forwards`
                }}
              />
            </div>
          )}
        </div>
      ))}

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default NotificationToast;