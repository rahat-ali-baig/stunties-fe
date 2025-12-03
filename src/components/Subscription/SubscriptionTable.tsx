"use client";

import React, { useState, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Search, X, Filter, Download, Eye, MoreHorizontal, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Pagination from '../addons/Pagination';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Subscription {
    id: string;
    user: {
        name: string;
        email: string;
        avatar: string;
    };
    platform: string;
    plan: string;
    status: string;
    startDate: string;
    renewalDate: string;
    autoRenew: string;
    trialStatus: string;
    duration: string;
    transactionId: string;
    price: string;
    country: string;
    cancellationReason: string | null;
    revenueSource: string;
}

interface SubscriptionTableProps {
    subscriptions?: Subscription[];
    onViewUser?: (subscription: Subscription) => void;
    onViewHistory?: (subscription: Subscription) => void;
    onEdit?: (subscription: Subscription) => void;
    onCancel?: (subscription: Subscription) => void;
}

// Mock data (same as before)
const subscriptionPlans = ['Pro Monthly', 'Pro Yearly', 'Starter', 'Business', 'Enterprise'];
const platformOptions = ['iOS', 'Android', 'Stripe', 'Web'];
const statusOptions = ['Active', 'Cancelled', 'In Billing Retry', 'In Grace Period', 'Paused', 'Refunded', 'Expired'];
const countryOptions = ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'JP', 'IN', 'BR'];
const offerTypeOptions = ['Regular', 'Intro Offer', 'Free Trial', 'Promotional Offer'];

// Default sample data if none provided
const defaultSubscriptions: Subscription[] = Array.from({ length: 50 }, (_, i) => ({
    id: `SUB-${1000 + i}`,
    user: {
        name: ['Alex Johnson', 'Sarah Chen', 'Mike Wilson', 'Emma Davis', 'James Brown'][i % 5],
        email: `user${i}@example.com`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
    },
    platform: platformOptions[i % 4],
    plan: subscriptionPlans[i % 5],
    status: statusOptions[i % 7],
    startDate: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    renewalDate: `2025-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    autoRenew: i % 3 === 0 ? 'ON' : 'OFF',
    trialStatus: ['Trial Active', 'Trial Expired', 'Trial Converted', 'No Trial'][i % 4],
    duration: i % 2 === 0 ? 'Monthly' : 'Yearly',
    transactionId: `TXN-${2000 + i}`,
    price: `$${['9.99', '99.99', '19.99', '49.99', '199.99'][i % 5]}`,
    country: countryOptions[i % 9],
    cancellationReason: i % 10 === 0 ? ['Voluntary', 'Billing Error', 'Not Renewal Eligible'][i % 3] : null,
    revenueSource: offerTypeOptions[i % 4],
}));

// Filter options
const planOptions = [
    { value: 'all-plans', label: 'All Plans' },
    ...subscriptionPlans.map(plan => ({ value: plan.toLowerCase().replace(' ', '-'), label: plan }))
];

const platformFilterOptions = [
    { value: 'all-platforms', label: 'All Platforms' },
    ...platformOptions.map(platform => ({ value: platform.toLowerCase(), label: platform }))
];

const statusFilterOptions = [
    { value: 'all-status', label: 'All Status' },
    ...statusOptions.map(status => ({ value: status.toLowerCase().replace(/ /g, '-'), label: status }))
];

const countryFilterOptions = [
    { value: 'all-countries', label: 'All Countries' },
    ...countryOptions.map(country => ({ value: country.toLowerCase(), label: country }))
];

const offerTypeFilterOptions = [
    { value: 'all-offers', label: 'All Offer Types' },
    ...offerTypeOptions.map(offer => ({ value: offer.toLowerCase().replace(' ', '-'), label: offer }))
];

const renewalTypeOptions = [
    { value: 'all-renewal', label: 'All Renewal Types' },
    { value: 'auto-renew-on', label: 'Auto-renew ON' },
    { value: 'auto-renew-off', label: 'Auto-renew OFF' }
];

const dateRangeOptions = [
    { value: 'all-time', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' }
];

const SubscriptionTable: React.FC<SubscriptionTableProps> = ({
    subscriptions = defaultSubscriptions,
    onViewUser = () => { },
    onViewHistory = () => { },
    onEdit = () => { },
    onCancel = () => { },
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        plan: 'all-plans',
        status: 'all-status',
        renewalType: 'all-renewal',
        platform: 'all-platforms',
        country: 'all-countries',
        offerType: 'all-offers',
        dateRange: 'all-time',
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Calculate pagination values
    const totalTransactions = subscriptions.length;
    const totalPages = Math.ceil(totalTransactions / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalTransactions);

    // Filter subscriptions based on search and filter criteria
    const filteredSubscriptions = useMemo(() => {
        return subscriptions.filter((sub) => {
            // Search filter
            if (searchTerm &&
                !sub.user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !sub.user.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !sub.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !sub.transactionId.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            // Plan filter
            if (filters.plan !== 'all-plans' && sub.plan.toLowerCase().replace(' ', '-') !== filters.plan) {
                return false;
            }

            // Status filter
            if (filters.status !== 'all-status' && sub.status.toLowerCase().replace(/ /g, '-') !== filters.status) {
                return false;
            }

            // Renewal type filter
            if (filters.renewalType !== 'all-renewal') {
                if (filters.renewalType === 'auto-renew-on' && sub.autoRenew !== 'ON') return false;
                if (filters.renewalType === 'auto-renew-off' && sub.autoRenew !== 'OFF') return false;
            }

            // Platform filter
            if (filters.platform !== 'all-platforms' && sub.platform.toLowerCase() !== filters.platform) {
                return false;
            }

            // Country filter
            if (filters.country !== 'all-countries' && sub.country.toLowerCase() !== filters.country) {
                return false;
            }

            // Offer type filter
            if (filters.offerType !== 'all-offers' && sub.revenueSource.toLowerCase().replace(' ', '-') !== filters.offerType) {
                return false;
            }

            // Date range filter would be implemented with actual date comparisons
            return true;
        });
    }, [searchTerm, filters, subscriptions]);

    // Get current page subscriptions
    const currentSubscriptions = filteredSubscriptions.slice(startIndex, endIndex);

    // Status badge colors
    const getStatusBadge = (status: string) => {
        const statusMap: any = {
            'Active': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
            'Cancelled': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
            'In Billing Retry': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
            'In Grace Period': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
            'Paused': { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
            'Refunded': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
            'Expired': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
        };
        return statusMap[status] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
    };

    // Platform badge colors
    const getPlatformBadge = (platform: string) => {
        const platformMap: any = {
            'iOS': { bg: 'bg-black/5', text: 'text-gray-800', border: 'border-gray-200' },
            'Android': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
            'Stripe': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
            'Web': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
        };
        return platformMap[platform] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
    };

    // Trial status badge colors
    const getTrialBadge = (trialStatus: string) => {
        const trialMap: any = {
            'Trial Active': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
            'Trial Expired': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
            'Trial Converted': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
            'No Trial': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
        };
        return trialMap[trialStatus] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
    };

    const handlePageChange = (page: number) => setCurrentPage(page);
    const handleRowsPerPageChange = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1);
    };

    const clearAllFilters = () => {
        setFilters({
            plan: 'all-plans',
            status: 'all-status',
            renewalType: 'all-renewal',
            platform: 'all-platforms',
            country: 'all-countries',
            offerType: 'all-offers',
            dateRange: 'all-time',
        });
        setSearchTerm('');
    };

    const handleExport = () => {
        console.log('Exporting subscription data...');
        // Export functionality would go here
    };

    const hasActiveFilters = Object.values(filters).some(value =>
        value !== 'all-plans' &&
        value !== 'all-status' &&
        value !== 'all-renewal' &&
        value !== 'all-platforms' &&
        value !== 'all-countries' &&
        value !== 'all-offers' &&
        value !== 'all-time'
    );

    return (
        <>
            {/* Search and Filter Section */}
            <div className="mb-8">
                {/* Search Bar */}
                <div className="mb-6">
                    <div className="max-w-lg relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
                        <input
                            type="text"
                            placeholder="Search by name, email, user ID, transaction ID..."
                            className="w-full h-12 pl-12 pr-4 bg-background border border-foreground/30 rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-primary-dark transition-all"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <div className="text-sm text-foreground/60">Filters:</div>

                    <div className="flex flex-wrap gap-3">
                        {/* Subscription Plan Filter */}
                        <div className="min-w-[140px]">
                            <Select
                                value={filters.plan}
                                onValueChange={(value) => setFilters({ ...filters, plan: value })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Plan" />
                                </SelectTrigger>
                                <SelectContent>
                                    {planOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Status Filter */}
                        <div className="min-w-[140px]">
                            <Select
                                value={filters.status}
                                onValueChange={(value) => setFilters({ ...filters, status: value })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statusFilterOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Renewal Type Filter */}
                        <div className="min-w-[140px]">
                            <Select
                                value={filters.renewalType}
                                onValueChange={(value) => setFilters({ ...filters, renewalType: value })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Renewal" />
                                </SelectTrigger>
                                <SelectContent>
                                    {renewalTypeOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Platform Filter */}
                        <div className="min-w-[140px]">
                            <Select
                                value={filters.platform}
                                onValueChange={(value) => setFilters({ ...filters, platform: value })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    {platformFilterOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Country Filter */}
                        <div className="min-w-[140px]">
                            <Select
                                value={filters.country}
                                onValueChange={(value) => setFilters({ ...filters, country: value })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Country" />
                                </SelectTrigger>
                                <SelectContent>
                                    {countryFilterOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Export Button */}
                    <div className="ml-auto">
                        <Button
                            onClick={handleExport}
                            className="gap-2 cursor-pointer"
                        >
                            <Download className="w-4 h-4" />
                            Export CSV
                        </Button>
                    </div>
                </div>

                {/* Active Filters */}
                {hasActiveFilters && (
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-sm text-foreground/60">Active filters:</span>
                        <div className="flex flex-wrap gap-2">
                            {filters.plan !== 'all-plans' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary-dark/5 text-primary-dark rounded-full text-sm border border-primary-dark/10">
                                    Plan: {planOptions.find(opt => opt.value === filters.plan)?.label}
                                    <button
                                        onClick={() => setFilters({ ...filters, plan: 'all-plans' })}
                                        className="hover:text-primary-dark/60"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}

                            {filters.status !== 'all-status' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-sm border border-emerald-200">
                                    Status: {statusFilterOptions.find(opt => opt.value === filters.status)?.label}
                                    <button
                                        onClick={() => setFilters({ ...filters, status: 'all-status' })}
                                        className="hover:text-emerald-900"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}

                            {filters.renewalType !== 'all-renewal' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm border border-blue-200">
                                    Renewal: {renewalTypeOptions.find(opt => opt.value === filters.renewalType)?.label}
                                    <button
                                        onClick={() => setFilters({ ...filters, renewalType: 'all-renewal' })}
                                        className="hover:text-blue-900"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}

                            {filters.platform !== 'all-platforms' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-800 rounded-full text-sm border border-green-200">
                                    Platform: {platformFilterOptions.find(opt => opt.value === filters.platform)?.label}
                                    <button
                                        onClick={() => setFilters({ ...filters, platform: 'all-platforms' })}
                                        className="hover:text-green-900"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}

                            {filters.country !== 'all-countries' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-800 rounded-full text-sm border border-purple-200">
                                    Country: {countryFilterOptions.find(opt => opt.value === filters.country)?.label}
                                    <button
                                        onClick={() => setFilters({ ...filters, country: 'all-countries' })}
                                        className="hover:text-purple-900"
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
            </div>

            {/* Table */}
            <div className="border border-foreground/20 rounded-lg overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-primary-dark/10">
                                <TableHead className="font-semibold text-foreground py-4">User</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Platform</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Plan</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Status</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Start Date</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Renewal Date</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Auto-Renew</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Trial Status</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Duration</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Transaction ID</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Price</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Country</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Revenue Source</TableHead>
                                <TableHead className="font-semibold text-foreground py-4 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        {filteredSubscriptions.length === 0 ? (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={14} className="text-center py-12">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="text-foreground/60">No subscriptions found</div>
                                            <button
                                                onClick={clearAllFilters}
                                                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
                                            >
                                                Clear All Filters
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ) : (
                            <TableBody>
                                {currentSubscriptions.map((sub) => {
                                    const statusBadge = getStatusBadge(sub.status);
                                    const platformBadge = getPlatformBadge(sub.platform);
                                    const trialBadge = getTrialBadge(sub.trialStatus);

                                    return (
                                        <TableRow
                                            key={sub.id}
                                            className="border-foreground/10 hover:bg-primary/5 transition-colors"
                                        >
                                            {/* User */}
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={sub.user.avatar} />
                                                        <AvatarFallback>{sub.user.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <div className="font-medium text-foreground">{sub.user.name}</div>
                                                        <div className="text-sm text-foreground/60">{sub.user.email}</div>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Platform */}
                                            <TableCell>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${platformBadge.bg} ${platformBadge.text} border ${platformBadge.border}`}>
                                                    {sub.platform}
                                                </span>
                                            </TableCell>

                                            {/* Plan */}
                                            <TableCell className="font-medium text-foreground">{sub.plan}</TableCell>

                                            {/* Status */}
                                            <TableCell>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text} border ${statusBadge.border}`}>
                                                    {sub.status}
                                                </span>
                                            </TableCell>

                                            {/* Start Date */}
                                            <TableCell className="text-sm text-foreground/70">{sub.startDate}</TableCell>

                                            {/* Renewal Date */}
                                            <TableCell className="text-sm text-foreground/70">{sub.renewalDate}</TableCell>

                                            {/* Auto-Renew */}
                                            <TableCell>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${sub.autoRenew === 'ON' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                                                    {sub.autoRenew}
                                                </span>
                                            </TableCell>

                                            {/* Trial Status */}
                                            <TableCell>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${trialBadge.bg} ${trialBadge.text} border ${trialBadge.border}`}>
                                                    {sub.trialStatus}
                                                </span>
                                            </TableCell>

                                            {/* Duration */}
                                            <TableCell>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${sub.duration === 'Yearly' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                                    {sub.duration}
                                                </span>
                                            </TableCell>

                                            {/* Transaction ID */}
                                            <TableCell className="font-mono text-sm text-foreground/70">{sub.transactionId}</TableCell>

                                            {/* Price */}
                                            <TableCell className="font-semibold text-emerald-600">{sub.price}</TableCell>

                                            {/* Country */}
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-foreground/70">{sub.country}</span>
                                                </div>
                                            </TableCell>

                                            {/* Revenue Source */}
                                            <TableCell>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${sub.revenueSource === 'Intro Offer' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                    sub.revenueSource === 'Free Trial' ? 'bg-cyan-50 text-cyan-700 border-cyan-200' :
                                                        sub.revenueSource === 'Promotional Offer' ? 'bg-pink-50 text-pink-700 border-pink-200' :
                                                            'bg-gray-50 text-gray-700 border-gray-200'
                                                    }`}>
                                                    {sub.revenueSource}
                                                </span>
                                            </TableCell>

                                            {/* Actions */}
                                            <TableCell className="text-right py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onViewUser(sub);
                                                        }}
                                                        className="p-1.5 text-foreground/60 hover:text-primary-dark hover:bg-primary-dark/5 rounded transition-colors"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>

                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <button
                                                                onClick={(e) => e.stopPropagation()}
                                                                className="p-1.5 text-foreground/60 hover:text-primary-dark hover:bg-primary-dark/5 rounded transition-colors"
                                                            >
                                                                <MoreHorizontal className="w-4 h-4" />
                                                            </button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => onViewUser(sub)}>
                                                                <Eye className="w-4 h-4 mr-2" />
                                                                View User Profile
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => onViewHistory(sub)}>
                                                                <Calendar className="w-4 h-4 mr-2" />
                                                                View Subscription History
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => onEdit(sub)}>
                                                                Edit Subscription
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => onCancel(sub)} className="text-rose-600">
                                                                Cancel Subscription
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        )}
                    </Table>
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    rowsPerPage={rowsPerPage}
                    totalUsers={filteredSubscriptions.length}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </div>
        </>
    );
};

export default SubscriptionTable;