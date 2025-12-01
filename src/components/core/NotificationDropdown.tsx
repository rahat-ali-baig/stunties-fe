'use client';
import { useEffect, useRef, useState } from "react";
import { FaCheck, FaExclamationTriangle, FaInfoCircle, FaTimes, FaChevronRight, FaBell } from "react-icons/fa";

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationDropdown = ({ isOpen, onClose }: NotificationDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Action Successful',
      message: 'Your action was completed successfully.',
      time: '5 min ago',
      read: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Low Stock Alert',
      message: 'Product "Premium Widget" is running low on stock.',
      time: '1 hour ago',
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'New Feature Available',
      message: 'Check out the new analytics dashboard features.',
      time: '2 hours ago',
      read: true
    },
    {
      id: '4',
      type: 'error',
      title: 'Payment Failed',
      message: 'Payment for invoice #67890 failed to process.',
      time: '1 day ago',
      read: true
    },
    {
      id: '5',
      type: 'info',
      title: 'New User Registered',
      message: 'A new user has registered on the platform.',
      time: 'Just now',
      read: true
    },
    {
      id: '6',
      type: 'success',
      title: 'Order Shipped',
      message: 'Your order #12345 has been shipped successfully.',
      time: '30 min ago',
      read: false
    }
  ]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <FaCheck className="w-4 h-4" />;
      case 'warning':
        return <FaExclamationTriangle className="w-4 h-4" />;
      case 'error':
        return <FaTimes className="w-4 h-4" />;
      case 'info':
      default:
        return <FaInfoCircle className="w-4 h-4" />;
    }
  };

  const getNotificationIconColor = (type: Notification['type'], read: boolean) => {
    const baseColor = read ? 'bg-foreground/5 text-foreground/70' : 'bg-foreground/10 text-foreground';
    
    switch (type) {
      case 'success':
        return read ? baseColor : 'bg-emerald-100 text-emerald-600';
      case 'warning':
        return read ? baseColor : 'bg-amber-100 text-amber-600';
      case 'error':
        return read ? baseColor : 'bg-rose-100 text-rose-600';
      case 'info':
      default:
        return read ? baseColor : 'bg-blue-100 text-blue-600';
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
      
      {/* Offcanvas Panel */}
      <div
        ref={dropdownRef}
        className="fixed right-0 top-0 h-full w-96 bg-background border-l border-foreground/5 z-50 shadow-lg"
      >
        {/* Header */}
        <div className="p-6 border-b border-foreground/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
              <p className="text-sm text-foreground/70 mt-1">
                {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-foreground/5 transition-colors"
            >
              <FaTimes className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-b border-border">
          <div className="flex gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-primary text-foreground' 
                  : 'bg-background text-foreground hover:bg-foreground/5 border border-border'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                filter === 'unread' 
                  ? 'bg-primary text-foreground' 
                  : 'bg-background text-foreground hover:bg-foreground/5 border border-border'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button 
              onClick={markAllAsRead}
              className="px-3 py-1.5 text-sm bg-background text-foreground rounded-lg font-medium hover:bg-foreground/5 transition-colors border border-border ml-auto"
            >
              Mark all as read
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="h-[calc(100vh-240px)] overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-16 h-16 bg-foreground/5 rounded-full flex items-center justify-center mb-4">
                <FaBell className="w-6 h-6 text-foreground/40" />
              </div>
              <h4 className="text-foreground font-medium mb-2">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
              </h4>
              <p className="text-sm text-foreground/60">
                {filter === 'unread' ? 'All notifications are read' : 'You\'re all caught up!'}
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-2">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                    !notification.read 
                      ? 'border-foreground/20 bg-primary/5' 
                      : 'border-foreground/10 hover:bg-foreground/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${getNotificationIconColor(notification.type, notification.read)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className={`text-sm font-medium ${
                            !notification.read ? 'text-foreground' : 'text-foreground/80'
                          }`}>
                            {notification.title}
                          </h4>
                          <p className="text-xs text-foreground/60 mt-0.5">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />
                        )}
                      </div>
                      
                      <p className={`text-sm mt-2 leading-relaxed ${
                        !notification.read ? 'text-foreground/90' : 'text-foreground/70'
                      }`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <button className="text-xs text-foreground/60 font-medium hover:text-foreground flex items-center gap-1 transition-colors">
                          View details
                          <FaChevronRight className="w-3 h-3" />
                        </button>
                        {!notification.read && (
                          <span className="text-xs text-primary font-medium">New</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-foreground/5 bg-background">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 text-sm bg-primary text-foreground font-medium hover:opacity-70 transition-colors rounded-lg">
            View All Notifications
            <FaChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationDropdown;