"use client";

import React, { useState } from 'react';
import {
    Bell,
    Mail,
    CheckCircle,
    AlertCircle,
    Clock,
    Send,
    Users,
    UserCheck,
    Zap,
    Target,
    User,
    TrendingUp,
    XCircle,
    Calendar
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ModalWrapper from './ModalWrapper';

interface CreateNotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (notification: any) => void;
    onTestSend: (notification: any) => void;
}

// User segments for targeting
const userSegments = [
    { id: 'all', label: 'All Users', count: '12,458', icon: Users, color: 'bg-blue-500' },
    { id: 'verified', label: 'Verified Users', count: '4,231', icon: UserCheck, color: 'bg-emerald-500' },
    { id: 'subscribers', label: 'Active Subscribers', count: '1,845', icon: Zap, color: 'bg-purple-500' },
    { id: 'performers', label: 'Stunt Performers', count: '3,567', icon: Users, color: 'bg-amber-500' },
    { id: 'seekers', label: 'Talent Seekers', count: '8,891', icon: Target, color: 'bg-pink-500' },
    { id: 'new_users', label: 'New Users (Last 30d)', count: '892', icon: User, color: 'bg-cyan-500' },
    { id: 'high_performers', label: 'High Performers', count: '456', icon: TrendingUp, color: 'bg-indigo-500' },
    { id: 'inactive', label: 'Inactive Users (30d+)', count: '3,245', icon: XCircle, color: 'bg-gray-500' }
];

const CreateNotificationModal: React.FC<CreateNotificationModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    onTestSend
}) => {
    const [notification, setNotification] = useState({
        title: '',
        message: '',
        type: 'push',
        targetType: 'all',
        selectedSegment: '',
        selectedUser: '',
        scheduleSend: false,
        scheduledTime: ''
    });

    const handleChange = (field: string, value: any) => {
        setNotification(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        onSubmit(notification);
        resetForm();
    };

    const handleTestSend = () => {
        onTestSend(notification);
    };

    const resetForm = () => {
        setNotification({
            title: '',
            message: '',
            type: 'push',
            targetType: 'all',
            selectedSegment: '',
            selectedUser: '',
            scheduleSend: false,
            scheduledTime: ''
        });
    };

    const handleClose = () => {
        onClose();
        resetForm();
    };

    const isFormValid = notification.title.trim() && notification.message.trim();

    const selectedSegmentInfo = userSegments.find(s => s.id === notification.selectedSegment);

    return (
        <ModalWrapper
            isOpen={isOpen}
            onClose={handleClose}
            title="Create New Notification"
            description="Send custom notifications to users or user segments"
            size="xl"
        >
            <div className="space-y-8">
                {/* Section 1: Content */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-foreground border-b border-foreground/10 pb-2">
                        Content
                    </h3>
                    
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Notification Title *
                        </label>
                        <input
                            type="text"
                            placeholder="Enter notification title"
                            className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-lg focus:ring-2 focus:ring-primary-dark/20 focus:border-primary-dark/50 transition-all outline-none"
                            value={notification.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                        <p className="text-sm text-foreground/60 mt-2">
                            This will appear as the notification title on user devices
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Message Content *
                        </label>
                        <textarea
                            placeholder="Enter your notification message..."
                            rows={3}
                            className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-lg focus:ring-2 focus:ring-primary-dark/20 focus:border-primary-dark/50 transition-all outline-none resize-none"
                            value={notification.message}
                            onChange={(e) => handleChange('message', e.target.value)}
                            maxLength={200}
                        />
                        <div className="flex justify-between text-sm text-foreground/60 mt-2">
                            <span>Keep it concise for better engagement</span>
                            <span>{notification.message.length}/200 characters</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                            Notification Type
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => handleChange('type', 'push')}
                                className={`p-4 border rounded-xl flex items-center gap-3 transition-all ${notification.type === 'push' ? 'border-primary-dark bg-primary-dark/5' : 'border-foreground/10 hover:border-foreground/20'}`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${notification.type === 'push' ? 'bg-primary-dark/10' : 'bg-foreground/5'}`}>
                                    <Bell className={`w-5 h-5 ${notification.type === 'push' ? 'text-primary-dark' : 'text-foreground/60'}`} />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-foreground">Push Notification</p>
                                    <p className="text-sm text-foreground/60">Mobile & web push</p>
                                </div>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleChange('type', 'email')}
                                className={`p-4 border rounded-xl flex items-center gap-3 transition-all ${notification.type === 'email' ? 'border-primary-dark bg-primary-dark/5' : 'border-foreground/10 hover:border-foreground/20'}`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${notification.type === 'email' ? 'bg-primary-dark/10' : 'bg-foreground/5'}`}>
                                    <Mail className={`w-5 h-5 ${notification.type === 'email' ? 'text-primary-dark' : 'text-foreground/60'}`} />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-foreground">Email</p>
                                    <p className="text-sm text-foreground/60">Email notification</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-foreground/10"></div>

                {/* Section 2: Targeting */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-foreground border-b border-foreground/10 pb-2">
                        Targeting
                    </h3>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Select Target Audience
                        </label>
                        <Select
                            value={notification.targetType}
                            onValueChange={(value) => handleChange('targetType', value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select target type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Users</SelectItem>
                                <SelectItem value="segment">User Segment</SelectItem>
                                <SelectItem value="single">Single User</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {notification.targetType === 'segment' && (
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-3">
                                Select User Segment
                            </label>
                            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1">
                                {userSegments.map((segment) => {
                                    const Icon = segment.icon;
                                    return (
                                        <div
                                            key={segment.id}
                                            className={`p-4 border rounded-lg cursor-pointer transition-all ${notification.selectedSegment === segment.id
                                                ? 'border-primary-dark bg-primary-dark/5'
                                                : 'border-foreground/10 hover:border-foreground/20 hover:bg-foreground/5'
                                                }`}
                                            onClick={() => handleChange('selectedSegment', segment.id)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-lg ${segment.color} flex items-center justify-center`}>
                                                        <Icon className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-foreground">{segment.label}</h4>
                                                        <p className="text-sm text-foreground/60">{segment.count} users</p>
                                                    </div>
                                                </div>
                                                {notification.selectedSegment === segment.id && (
                                                    <CheckCircle className="w-5 h-5 text-primary-dark" />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {notification.targetType === 'single' && (
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Select User
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Search user by name, email, or ID..."
                                    className="flex-1 px-4 py-3 bg-background border border-foreground/10 rounded-lg focus:ring-2 focus:ring-primary-dark/20 focus:border-primary-dark/50 transition-all outline-none"
                                    value={notification.selectedUser}
                                    onChange={(e) => handleChange('selectedUser', e.target.value)}
                                />
                                <button className="px-4 py-3 bg-background hover:bg-foreground/5 border border-foreground/10 rounded-lg text-sm font-medium transition-colors">
                                    Browse Users
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="p-4 bg-foreground/5 border border-foreground/10 rounded-lg">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-foreground/60 mt-0.5" />
                            <div>
                                <p className="font-medium text-foreground">Target Information</p>
                                <p className="text-sm text-foreground/60 mt-1">
                                    {notification.targetType === 'all' && 'This notification will be sent to all 12,458 users.'}
                                    {notification.targetType === 'segment' && notification.selectedSegment &&
                                        `This notification will be sent to ${selectedSegmentInfo?.count} users.`}
                                    {notification.targetType === 'single' && notification.selectedUser &&
                                        'This notification will be sent to the selected user only.'}
                                    {!notification.selectedSegment && notification.targetType === 'segment' &&
                                        'Please select a user segment.'}
                                    {!notification.selectedUser && notification.targetType === 'single' &&
                                        'Please select a user.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-foreground/10"></div>

                {/* Section 3: Scheduling */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-foreground border-b border-foreground/10 pb-2">
                        Scheduling
                    </h3>

                    <div className="flex items-center justify-between p-4 border border-foreground/10 rounded-lg">
                        <div>
                            <p className="font-medium text-foreground">Schedule Notification</p>
                            <p className="text-sm text-foreground/60 mt-1">
                                Send at a specific time instead of immediately
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleChange('scheduleSend', !notification.scheduleSend)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notification.scheduleSend ? 'bg-primary-dark' : 'bg-foreground/20'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notification.scheduleSend ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>

                    {notification.scheduleSend && (
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Schedule Date & Time
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/60" />
                                <input
                                    type="datetime-local"
                                    className="w-full pl-12 pr-4 py-3 bg-background border border-foreground/10 rounded-lg focus:ring-2 focus:ring-primary-dark/20 focus:border-primary-dark/50 transition-all outline-none"
                                    value={notification.scheduledTime}
                                    onChange={(e) => handleChange('scheduledTime', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    <div className="p-4 bg-foreground/5 border border-foreground/10 rounded-lg">
                        <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-foreground/60 mt-0.5" />
                            <div>
                                <p className="font-medium text-foreground">Sending Information</p>
                                <p className="text-sm text-foreground/60 mt-1">
                                    {notification.scheduleSend && notification.scheduledTime
                                        ? `Notification will be scheduled for ${new Date(notification.scheduledTime).toLocaleString()}`
                                        : 'Notification will be sent immediately upon creation'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary Card */}
                <div className="p-4 bg-primary-dark/5 border border-primary-dark/20 rounded-lg">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-dark/10 flex items-center justify-center">
                            <Bell className="w-4 h-4 text-primary-dark" />
                        </div>
                        <div>
                            <p className="font-medium text-foreground">Ready to send!</p>
                            <p className="text-sm text-foreground/60 mt-1">
                                Review your notification details below:
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-foreground/60">
                                <li>• Type: {notification.type === 'push' ? 'Push Notification' : 'Email'}</li>
                                <li>• Target: {
                                    notification.targetType === 'all' ? 'All Users' :
                                    notification.targetType === 'segment' ? selectedSegmentInfo?.label || 'Select segment' :
                                    'Single User'
                                }</li>
                                <li>• Schedule: {notification.scheduleSend ? 'Scheduled' : 'Send immediately'}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
                    <button
                        type="button"
                        onClick={handleTestSend}
                        className="px-4 py-2 bg-background hover:bg-foreground/5 border border-foreground/10 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        <Bell className="w-4 h-4" />
                        Send Test
                    </button>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-2 border-2 border-foreground/10 text-foreground rounded-lg hover:bg-foreground/5 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!isFormValid}
                            className="px-6 py-2 bg-primary-dark text-background rounded-lg hover:bg-primary-dark/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
                        >
                            <Send className="w-4 h-4" />
                            Create & Send
                        </button>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default CreateNotificationModal;