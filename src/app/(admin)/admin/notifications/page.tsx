"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
    Search,
    Filter,
    MoreVertical,
    Eye,
    Send,
    Trash2,
    Bell,
    Mail,
    MessageSquare,
    Users,
    User,
    Calendar,
    CheckCircle,
    XCircle,
    AlertCircle,
    Download,
    ChevronLeft,
    ChevronRight,
    Plus,
    FileText,
    Clock,
    TrendingUp,
    X,
    BarChart3,
    UserCheck,
    Zap,
    Target
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MetricsSlider from "@/components/admin/MetricsSlider";
import CreateNotificationModal from "@/components/dialogs/CreateNotificationModal";
import NotificationPreviewModal from "@/components/dialogs/NotificationPreviewModal";

// Mock data for notification history
const mockNotifications = [
    {
        id: '1',
        title: 'New Feature Announcement',
        message: 'Check out our new video upload feature for better portfolio showcasing.',
        type: 'push',
        target: 'all',
        status: 'sent',
        sentDate: '2024-03-15T10:30:00',
        recipients: 'All Users',
        deliveryRate: '98%',
        openRate: '72%',
        clicks: '1,245'
    },
    {
        id: '2',
        title: 'Important Platform Update',
        message: 'Scheduled maintenance this Sunday from 2-4 AM UTC. Platform will be temporarily unavailable.',
        type: 'push',
        target: 'all',
        status: 'sent',
        sentDate: '2024-03-14T14:15:00',
        recipients: 'All Users',
        deliveryRate: '97%',
        openRate: '68%',
        clicks: '892'
    },
    {
        id: '3',
        title: 'Welcome to Premium!',
        message: 'Congratulations on upgrading to Premium! Enjoy exclusive features.',
        type: 'push',
        target: 'single',
        status: 'sent',
        sentDate: '2024-03-14T09:45:00',
        recipients: 'John Doe',
        deliveryRate: '100%',
        openRate: '95%',
        clicks: '1'
    },
    {
        id: '4',
        title: 'Verification Approved',
        message: 'Your profile verification has been approved. You can now accept premium gigs.',
        type: 'push',
        target: 'single',
        status: 'failed',
        sentDate: '2024-03-13T16:20:00',
        recipients: 'Jane Smith',
        deliveryRate: '0%',
        openRate: '0%',
        clicks: '0'
    },
    {
        id: '5',
        title: 'Weekly Digest',
        message: 'Check out this week\'s trending gigs and new opportunities in your area.',
        type: 'email',
        target: 'segment',
        status: 'sent',
        sentDate: '2024-03-12T08:00:00',
        recipients: 'Verified Users',
        deliveryRate: '95%',
        openRate: '42%',
        clicks: '567'
    },
    {
        id: '6',
        title: 'Payment Reminder',
        message: 'Your subscription renewal is due in 3 days. Update your payment method.',
        type: 'push',
        target: 'segment',
        status: 'sent',
        sentDate: '2024-03-11T11:30:00',
        recipients: 'Active Subscribers',
        deliveryRate: '99%',
        openRate: '81%',
        clicks: '324'
    },
    {
        id: '7',
        title: 'Job Application Update',
        message: 'Your application for "Car Chase Scene" has been viewed by the client.',
        type: 'push',
        target: 'single',
        status: 'sent',
        sentDate: '2024-03-10T15:45:00',
        recipients: 'Mike Johnson',
        deliveryRate: '100%',
        openRate: '98%',
        clicks: '1'
    },
    {
        id: '8',
        title: 'Security Alert',
        message: 'We detected unusual login activity from your account. Please verify.',
        type: 'push',
        target: 'single',
        status: 'sent',
        sentDate: '2024-03-09T18:10:00',
        recipients: 'Alex Chen',
        deliveryRate: '100%',
        openRate: '99%',
        clicks: '1'
    }
];

// User segments for targeting
const userSegments = [
    { id: 'all', label: 'All Users', count: '12,458', icon: Users, color: 'bg-blue-500' },
    { id: 'verified', label: 'Verified Users', count: '4,231', icon: UserCheck, color: 'bg-emerald-500' },
    { id: 'subscribers', label: 'Active Subscribers', count: '1,845', icon: Zap, color: 'bg-purple-500' },
    { id: 'performers', label: 'Stunt Performers', count: '3,567', icon: Users, color: 'bg-amber-500' },
    { id: 'seekers', label: 'Talent Seekers', count: '8,891', icon: Target, color: 'bg-pink-500' },
    { id: 'new_users', label: 'New Users (Last 30d)', count: '892', icon: User, color: 'bg-cyan-500' },
    { id: 'high_performers', label: 'High Performers', count: '456', icon: TrendingUp, color: 'bg-indigo-500' },
    { id: 'inactive', label: 'Inactive Users (30d+)', count: '3,245', icon: Clock, color: 'bg-gray-500' }
];

const NotificationsManagementPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [targetFilter, setTargetFilter] = useState('all');
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [activeTab, setActiveTab] = useState('content');

    // New notification form state
    const [newNotification, setNewNotification] = useState({
        title: '',
        message: '',
        type: 'push',
        targetType: 'all',
        selectedSegment: '',
        selectedUser: '',
        scheduleSend: false,
        scheduledTime: ''
    });

    // Calculate filtered notifications
    const filteredNotifications = useMemo(() => {
        return mockNotifications.filter(notification => {
            if (searchTerm &&
                !notification.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !notification.message.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !notification.recipients.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
            if (statusFilter !== 'all' && notification.status !== statusFilter) return false;
            if (typeFilter !== 'all' && notification.type !== typeFilter) return false;
            if (targetFilter !== 'all' && notification.target !== targetFilter) return false;
            return true;
        });
    }, [searchTerm, statusFilter, typeFilter, targetFilter]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredNotifications.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, filteredNotifications.length);
    const currentNotifications = filteredNotifications.slice(startIndex, endIndex);

    const handleViewDetails = (notification: any) => {
        setSelectedNotification(notification);
        setPreviewDialogOpen(true);
    };

    const clearFilters = useCallback(() => {
        setStatusFilter('all');
        setTypeFilter('all');
        setTargetFilter('all');
        setSearchTerm('');
        setCurrentPage(1);
    }, []);

    const hasActiveFilters = statusFilter !== 'all' || typeFilter !== 'all' || targetFilter !== 'all' || searchTerm;

    // Helper functions
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

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'push':
                return <div className="w-10 h-10 rounded-xl bg-primary-dark/5 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-primary-dark" />
                </div>;
            case 'email':
                return <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-foreground" />
                </div>;
            default:
                return <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-foreground/60" />
                </div>;
        }
    };

    const getTargetColor = (target: string) => {
        switch (target) {
            case 'all':
                return 'bg-blue-50 text-blue-800 border border-blue-200';
            case 'segment':
                return 'bg-amber-50 text-amber-800 border border-amber-200';
            case 'single':
                return 'bg-emerald-50 text-emerald-800 border border-emerald-200';
            default:
                return 'bg-gray-50 text-gray-800 border border-gray-200';
        }
    };

    const formatDate = useCallback((dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }, []);

    const handleCreateNotification = () => {
        console.log('Creating notification:', newNotification);
        alert('Notification created and queued for sending!');
        setCreateDialogOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setNewNotification({
            title: '',
            message: '',
            type: 'push',
            targetType: 'all',
            selectedSegment: '',
            selectedUser: '',
            scheduleSend: false,
            scheduledTime: ''
        });
        setActiveTab('content');
    };

    const handleSendTest = () => {
        console.log('Sending test notification:', newNotification);
        alert('Test notification sent to admin device!');
    };

    const notificationStats = [
        {
            title: 'Total Sent',
            value: '1,284',
            change: '+12%',
            trend: 'up',
            icon: Bell,
            color: '#435c00'
        },
        {
            title: 'Delivery Rate',
            value: '97.5%',
            change: '+0.8%',
            trend: 'up',
            icon: CheckCircle,
            color: '#435c00'
        },
        {
            title: 'Avg. Open Rate',
            value: '68%',
            change: '+5%',
            trend: 'up',
            icon: BarChart3,
            color: '#435c00'
        },
        {
            title: 'Failed',
            value: '32',
            change: '-15%',
            trend: 'down',
            icon: XCircle,
            color: '#435c00'
        }
    ];

    return (
        <div className="h-[calc(100vh-120px)] w-full overflow-y-auto p-4">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Notifications Management</h1>
                        <p className="text-foreground/60 mt-2">Create and send custom notifications to users or segments</p>
                    </div>
                    <button
                        onClick={() => setCreateDialogOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-primary-dark text-background rounded-lg hover:bg-primary-dark/90 transition-colors font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        Create Notification
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="mb-8">
                <MetricsSlider cards={notificationStats} />
            </div>

            {/* Search and Filter Section */}
            <div className="bg-background border border-foreground/10 rounded-xl p-6 mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Search */}
                    <div className="max-w-md flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
                        <input
                            type="text"
                            placeholder="Search notifications by title, message, or recipients..."
                            className="w-full h-12 pl-12 pr-4 bg-background border border-foreground/30 rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-dark/80 focus:border-primary-dark/20 transition-all"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Status Filter */}
                        <Select
                            value={statusFilter}
                            onValueChange={(value) => {
                                setStatusFilter(value);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="sent">Sent</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Type Filter */}
                        <Select
                            value={typeFilter}
                            onValueChange={(value) => {
                                setTypeFilter(value);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="push">Push</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Target Filter */}
                        <Select
                            value={targetFilter}
                            onValueChange={(value) => {
                                setTargetFilter(value);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Target" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Targets</SelectItem>
                                <SelectItem value="all">All Users</SelectItem>
                                <SelectItem value="segment">Segment</SelectItem>
                                <SelectItem value="single">Single</SelectItem>
                            </SelectContent>
                        </Select>

                        <button className="px-4 py-2 bg-background hover:bg-foreground/5 border border-foreground/10 rounded-lg text-sm font-medium transition-colors">
                            <Download className="w-4 h-4 inline mr-2" />
                            Export
                        </button>
                    </div>
                </div>

                {/* Active Filters */}
                {hasActiveFilters && (
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-sm text-foreground/60">Active filters:</span>
                        <div className="flex flex-wrap gap-2">
                            {statusFilter !== 'all' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm border border-blue-200">
                                    Status: {statusFilter}
                                    <button onClick={() => setStatusFilter('all')} className="hover:text-blue-900">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                            {typeFilter !== 'all' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-800 rounded-full text-sm border border-purple-200">
                                    Type: {typeFilter}
                                    <button onClick={() => setTypeFilter('all')} className="hover:text-purple-900">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                            {targetFilter !== 'all' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-sm border border-emerald-200">
                                    Target: {targetFilter}
                                    <button onClick={() => setTargetFilter('all')} className="hover:text-emerald-900">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={clearFilters}
                            className="ml-2 text-sm text-foreground/60 hover:text-foreground underline"
                        >
                            Clear all
                        </button>
                    </div>
                )}
            </div>

            {/* Notifications Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {currentNotifications.map((notification) => (
                    <div
                        key={notification.id}
                        className="bg-background border border-foreground/10 rounded-xl hover:border-primary-dark/30 transition-all duration-300 overflow-hidden group cursor-pointer"
                        onClick={() => handleViewDetails(notification)}
                    >
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        {getTypeIcon(notification.type)}
                                        <div className="ml-3">
                                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary-dark transition-colors line-clamp-2">
                                                {notification.title}
                                            </h3>
                                            <p className="text-sm text-foreground/60 mt-1">{formatDate(notification.sentDate)}</p>
                                        </div>
                                    </div>

                                    <p className="text-foreground/70 line-clamp-2 mb-4">
                                        {notification.message}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs capitalize font-semibold border ${getStatusColor(notification.status)}`}>
                                            {notification.status}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTargetColor(notification.target)}`}>
                                            {notification.target === 'all' ? 'All Users' :
                                                notification.target === 'segment' ? 'Segment' : 'Single User'}
                                        </span>
                                    </div>
                                </div>
                                {/* <button className="p-2 hover:bg-foreground/5 rounded-lg transition-colors ml-2">
                                    <MoreVertical className="w-5 h-5 text-foreground/40" />
                                </button> */}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-foreground/10">
                                <div>
                                    <p className="text-sm text-foreground/60 mb-1">Recipients</p>
                                    <p className="font-medium text-foreground">{notification.recipients}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground/60 mb-1">Delivery</p>
                                    <p className="font-medium text-foreground">{notification.deliveryRate}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground/60 mb-1">Open Rate</p>
                                    <p className="font-medium text-foreground">{notification.openRate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredNotifications.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-24 h-24 rounded-full bg-foreground/5 flex items-center justify-center mb-6">
                        <Bell className="w-12 h-12 text-foreground/40" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">No notifications found</h3>
                    <p className="text-foreground/60 mb-6">
                        {hasActiveFilters
                            ? 'Try adjusting your search or filter criteria'
                            : 'Create your first notification to get started'}
                    </p>
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="px-6 py-3 bg-primary-dark text-background rounded-lg hover:bg-primary-dark/90 transition-colors"
                        >
                            Clear All Filters
                        </button>
                    )}
                </div>
            )}

            {/* Pagination */}
            {filteredNotifications.length > 0 && (
                <div className="flex items-center justify-between mt-8 px-2">
                    <div className="text-sm text-foreground/60">
                        Showing {startIndex + 1}-{endIndex} of {filteredNotifications.length} notifications
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-foreground/10 hover:bg-foreground/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-sm font-medium text-foreground px-3">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg border border-foreground/10 hover:bg-foreground/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Use the new modal components */}
            <CreateNotificationModal
                isOpen={createDialogOpen}
                onClose={() => {
                    setCreateDialogOpen(false);
                    resetForm();
                }}
                onSubmit={handleCreateNotification}
                onTestSend={handleSendTest}
            />

            <NotificationPreviewModal
                isOpen={previewDialogOpen}
                onClose={() => setPreviewDialogOpen(false)}
                notification={selectedNotification}
            />
        </div>
    );
};

export default NotificationsManagementPage;