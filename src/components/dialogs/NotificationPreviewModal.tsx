"use client";

import React from 'react';
import { Bell } from 'lucide-react';
import ModalWrapper from './ModalWrapper';

interface NotificationPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    notification: any;
}

const NotificationPreviewModal: React.FC<NotificationPreviewModalProps> = ({
    isOpen,
    onClose,
    notification
}) => {
    if (!notification) return null;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'sent':
                return 'bg-emerald-50 text-emerald-800 border border-emerald-200';
            case 'failed':
                return 'bg-rose-50 text-rose-800 border border-rose-200';
            default:
                return 'bg-gray-50 text-gray-800 border border-gray-200';
        }
    };

    const getTypeIcon = () => {
        return (
            <div className="w-10 h-10 rounded-xl bg-primary-dark/5 flex items-center justify-center">
                <Bell className="h-5 w-5 text-primary-dark" />
            </div>
        );
    };

    return (
        <ModalWrapper
            isOpen={isOpen}
            onClose={onClose}
            title="Notification Preview"
            size="md"
        >
            <div className="space-y-6">
                {/* Header with sent date */}
                <div className="flex items-center gap-3 mb-4">
                    {getTypeIcon()}
                    <div>
                        <p className="text-sm text-foreground/60">Sent</p>
                        <p className="text-foreground font-medium">{formatDate(notification.sentDate)}</p>
                    </div>
                </div>

                {/* Notification Preview */}
                <div className="p-4 bg-foreground/5 border border-foreground/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                        <Bell className="w-4 h-4 text-foreground/60" />
                        <span className="text-sm font-medium text-foreground">Push Notification Preview</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-foreground/10">
                        <h3 className="font-bold text-foreground mb-2">{notification.title}</h3>
                        <p className="text-foreground/60 text-sm">{notification.message}</p>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-foreground/60 mb-1">Type</p>
                        <p className="text-foreground capitalize">{notification.type}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground/60 mb-1">Target</p>
                        <p className="text-foreground capitalize">{notification.target}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground/60 mb-1">Status</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(notification.status)}`}>
                            {notification.status}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground/60 mb-1">Delivery Rate</p>
                        <p className="text-foreground">{notification.deliveryRate}</p>
                    </div>
                </div>

                {/* Recipients */}
                <div>
                    <p className="text-sm font-medium text-foreground/60 mb-1">Recipients</p>
                    <p className="text-foreground">{notification.recipients}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-foreground/5 rounded-lg">
                    <div>
                        <p className="text-sm font-medium text-foreground/60 mb-1">Open Rate</p>
                        <p className="text-xl font-bold text-foreground">{notification.openRate}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground/60 mb-1">Total Clicks</p>
                        <p className="text-xl font-bold text-foreground">{notification.clicks}</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-foreground/10">
                    <button
                        onClick={onClose}
                        className="w-full py-3 border-2 border-foreground/10 text-foreground rounded-lg hover:bg-foreground/5 transition-colors font-medium"
                    >
                        Close Preview
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default NotificationPreviewModal;