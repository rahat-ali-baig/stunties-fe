"use client";

import { useState, useMemo } from "react";
import { Search, X, Plus, Eye, Mail, Bell, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import PrimaryButton from '@/components/addons/PrimaryButton';
import CustomSelect from '@/components/addons/CustomSelect';
import CustomTable, { Column } from '@/components/addons/CustomTable';
import MetricsSlider from "@/components/addons/MetricsSlider";
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

const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'sent', label: 'Sent' },
    { value: 'failed', label: 'Failed' },
];

const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'push', label: 'Push' },
    { value: 'email', label: 'Email' },
];

const targetOptions = [
    { value: 'all', label: 'All Targets' },
    { value: 'all', label: 'All Users' },
    { value: 'segment', label: 'Segment' },
    { value: 'single', label: 'Single' },
];

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
        icon: Bell,
        color: '#435c00'
    },
    {
        title: 'Avg. Open Rate',
        value: '68%',
        change: '+5%',
        trend: 'up',
        icon: Mail,
        color: '#435c00'
    },
    {
        title: 'Failed',
        value: '32',
        change: '-15%',
        trend: 'down',
        icon: Bell,
        color: '#435c00'
    }
];

const NotificationsManagementPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        status: 'all',
        type: 'all',
        target: 'all'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<any>(null);

    const filteredNotifications = useMemo(() => {
        return mockNotifications.filter(notification => {
            if (searchTerm &&
                !notification.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !notification.message.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !notification.recipients.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
            if (filters.status !== 'all' && notification.status !== filters.status) return false;
            if (filters.type !== 'all' && notification.type !== filters.type) return false;
            if (filters.target !== 'all' && notification.target !== filters.target) return false;
            return true;
        });
    }, [searchTerm, filters]);

    const getStatusBadge = (status: string) => {
        const statusMap: any = {
            'sent': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
            'failed': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
        };
        return statusMap[status] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
    };

    const getTypeIcon = (type: string) => {
        return type === 'push' ? <Bell className="w-4 h-4" /> : <Mail className="w-4 h-4" />;
    };

    const getTargetBadge = (target: string) => {
        const targetMap: any = {
            'all': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'All Users' },
            'segment': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'Segment' },
            'single': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Single' },
        };
        return targetMap[target] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', label: target };
    };

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

    const columns: Column<any>[] = [
        {
            key: 'title',
            title: 'Notification',
            dataIndex: 'title',
            render: (title, record) => (
                <div className="space-y-1">
                    <div className="font-medium text-foreground">{title}</div>
                    <div className="text-sm text-foreground/60">
                        {formatDate(record.sentDate)}
                    </div>
                </div>
            ),
        },
        {
            key: 'type',
            title: 'Type',
            dataIndex: 'type',
            render: (type) => (
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center">
                        {getTypeIcon(type)}
                    </div>
                    <span className="font-medium capitalize">{type}</span>
                </div>
            ),
        },
        {
            key: 'recipients',
            title: 'Recipients',
            dataIndex: 'recipients',
            render: (recipients) => (
                <div className="font-medium text-foreground">{recipients}</div>
            ),
        },
        {
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
            render: (status) => {
                const badge = getStatusBadge(status);
                return (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${badge.bg} ${badge.text} border ${badge.border}`}>
                        {status}
                    </span>
                );
            },
        },
        {
            key: 'metrics',
            title: 'Metrics',
            render: (_, record) => (
                <div className="space-y-1">
                    <div className="text-sm">
                        <span className="text-foreground/60">Delivery: </span>
                        <span className="font-medium text-foreground">{record.deliveryRate}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-foreground/60">Open: </span>
                        <span className="font-medium text-foreground">{record.openRate}</span>
                    </div>
                </div>
            ),
        },
    ];

    const customActions = (record: any) => {
        const handleViewDetails = () => {
            setSelectedNotification(record);
            setPreviewDialogOpen(true);
        };

        return (
            <div className="flex items-center justify-end gap-1">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails();
                    }}
                    className="p-1.5 text-foreground/60 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="View Details"
                >
                    <Eye className="w-4 h-4" />
                </button>
            </div>
        );
    };

    const handlePageChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setRowsPerPage(pageSize);
    };

    const handlePageSizeChange = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1);
    };

    const clearAllFilters = () => {
        setFilters({
            status: 'all',
            type: 'all',
            target: 'all'
        });
        setSearchTerm('');
        setCurrentPage(1);
    };

    const hasActiveFilters = Object.values(filters).some(value =>
        value !== 'all'
    ) || searchTerm;

    const handleCreateNotification = () => {
        console.log('Creating notification');
        setCreateDialogOpen(false);
    };

    const handleSendTest = () => {
        console.log('Sending test notification');
    };

    return (
        <div className="h-[calc(100dvh-120px)] w-full overflow-y-auto p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4 mb-6">
                <PrimaryButton
                    variant="primary"
                    icon={Plus}
                    onClick={() => setCreateDialogOpen(true)}
                    className="whitespace-nowrap"
                >
                    Create Notification
                </PrimaryButton>
            </div>

            <div className="mb-8">
                <MetricsSlider cards={notificationStats} />
            </div>

            <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                {/* Search Bar */}
                <div className="max-w-lg w-full">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
                        <input
                            type="text"
                            placeholder="Search notifications by title, message, or recipients..."
                            className="w-full h-10 pl-10 pr-2 text-sm bg-background border border-foreground/30 rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-primary-dark transition-all"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                    {/* Status Filter */}
                    <div className="min-w-[140px]">
                        <CustomSelect
                            value={filters.status}
                            onChange={(value: any) => {
                                setFilters({ ...filters, status: value });
                                setCurrentPage(1);
                            }}
                            options={statusOptions}
                            placeholder="Status"
                        />
                    </div>

                    {/* Type Filter */}
                    <div className="min-w-[140px]">
                        <CustomSelect
                            value={filters.type}
                            onChange={(value: any) => {
                                setFilters({ ...filters, type: value });
                                setCurrentPage(1);
                            }}
                            options={typeOptions}
                            placeholder="Type"
                        />
                    </div>

                    {/* Target Filter */}
                    <div className="min-w-[140px]">
                        <CustomSelect
                            value={filters.target}
                            onChange={(value: any) => {
                                setFilters({ ...filters, target: value });
                                setCurrentPage(1);
                            }}
                            options={targetOptions}
                            placeholder="Target"
                        />
                    </div>
                </div>
            </div>

            {hasActiveFilters && (
                <div className="mt-4 mb-6 flex items-center gap-2">
                    <span className="text-sm text-foreground/60">Active filters:</span>
                    <div className="flex flex-wrap gap-2">
                        {filters.status !== 'all' && (
                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm border border-blue-200">
                                Status: {statusOptions.find(opt => opt.value === filters.status)?.label}
                                <button
                                    onClick={() => {
                                        setFilters({ ...filters, status: 'all' });
                                        setCurrentPage(1);
                                    }}
                                    className="hover:text-blue-900 ml-1"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        )}

                        {filters.type !== 'all' && (
                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-800 rounded-full text-sm border border-purple-200">
                                Type: {typeOptions.find(opt => opt.value === filters.type)?.label}
                                <button
                                    onClick={() => {
                                        setFilters({ ...filters, type: 'all' });
                                        setCurrentPage(1);
                                    }}
                                    className="hover:text-purple-900 ml-1"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        )}

                        {filters.target !== 'all' && (
                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-sm border border-emerald-200">
                                Target: {targetOptions.find(opt => opt.value === filters.target)?.label}
                                <button
                                    onClick={() => {
                                        setFilters({ ...filters, target: 'all' });
                                        setCurrentPage(1);
                                    }}
                                    className="hover:text-emerald-900 ml-1"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={clearAllFilters}
                        className="ml-2 text-sm text-foreground/60 hover:text-foreground underline"
                    >
                        Clear all
                    </button>
                </div>
            )}

            <CustomTable<any>
                data={filteredNotifications}
                columns={columns}
                rowKey="id"
                pagination={true}
                showPagination={true}
                pageSize={rowsPerPage}
                pageSizeOptions={[5, 10, 20, 50]}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                current={currentPage}
                total={filteredNotifications.length}
                customActions={customActions}
                bordered
                size="middle"
                emptyText={
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                        <div className="text-foreground/60">
                            {hasActiveFilters
                                ? 'No notifications found matching your criteria'
                                : 'No notifications found'}
                        </div>
                        {hasActiveFilters && (
                            <PrimaryButton
                                onClick={clearAllFilters}
                                variant="primary"
                                size="sm"
                            >
                                Clear All Filters
                            </PrimaryButton>
                        )}
                    </div>
                }
            />

            <CreateNotificationModal
                isOpen={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
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