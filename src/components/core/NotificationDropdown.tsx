'use client';
import { useEffect, useRef } from "react";
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

  // Sample notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'success',
      title: 'Successfully',
      message: 'Your action was completed successfully.',
      time: '5 min ago',
      read: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'A Low Stock Alert',
      message: 'Product "Premium Widget" is running low on stock.',
      time: '1 hour ago',
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'B New Feature Available',
      message: 'Check out the new analytics dashboard features.',
      time: '2 hours ago',
      read: true
    },
    {
      id: '4',
      type: 'error',
      title: 'X Payment Failed',
      message: 'Payment for invoice #67890 failed to process.',
      time: '1 day ago',
      read: true
    },
    {
      id: '5',
      type: 'info',
      title: 'Y New User Registered',
      message: 'A new user has registered on the platform.',
      time: 'Just now',
      read: true
    }
  ];

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

  const getNotificationIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-primary/10 text-primary';
      case 'warning':
        return 'bg-primary/10 text-primary';
      case 'error':
        return 'bg-primary/10 text-primary';
      case 'info':
      default:
        return 'bg-primary/10 text-primary';
    }
  };

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
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sms"
        onClick={onClose}
      />
      
      {/* Offcanvas Panel */}
      <div
        ref={dropdownRef}
        className="fixed right-0 top-0 h-full w-96 bg-background border-l border-border/20 z-50 rounded-l-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-border/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {notifications.filter(n => !n.read).length} unread messages
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-primary/10 transition-colors border border-border/10"
            >
              <FaTimes className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-b border-border/10">
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm bg-primary text-secondary rounded-lg font-medium border border-primary/20">
              All
            </button>
            <button className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-primary/10 transition-colors border border-border/10">
              Unread
            </button>
            <button className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-primary/10 transition-colors border border-border/10 ml-auto">
              Mark all as read
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 border border-border/10">
                <FaBell className="w-6 h-6 text-muted-foreground" />
              </div>
              <h4 className="text-foreground font-medium mb-2">No notifications</h4>
              <p className="text-sm text-muted-foreground">You're all caught up!</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl border border-border/10 transition-all duration-200 cursor-pointer group hover:border-primary/20 ${
                    !notification.read 
                      ? 'bg-primary/5 border-primary/20' 
                      : 'hover:bg-primary/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border border-border/10 ${getNotificationIconColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-medium leading-tight text-foreground">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5 border border-primary/20" />
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                        <FaChevronRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/10 bg-background">
          <button className="w-full flex items-center justify-center gap-2 py-3 text-sm text-primary font-medium hover:text-primary/80 transition-colors rounded-lg hover:bg-primary/10 border border-border/10">
            View All Notifications
            <FaChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationDropdown;