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
import { Search, X, Filter, Download, Eye, MoreHorizontal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Pagination from '../addons/Pagination';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Transaction {
    id: string;
    date: string;
    time: string;
    sourceType: 'Commission' | 'Subscription' | 'Boost';
    user: string;
    description: string;
    amount: string;
    paymentMethod: string;
    status: 'Successful' | 'Pending' | 'Failed';
}

const sampleTransactions: Transaction[] = [
    {
        id: "TXN-98234",
        date: "Nov 25, 2025",
        time: "14:32",
        sourceType: "Commission",
        user: "Sarah Johnson",
        description: "Job posting commission - Senior Developer",
        amount: "$125.50",
        paymentMethod: "Stripe",
        status: "Successful"
    },
    {
        id: "TXN-98235",
        date: "Nov 24, 2025",
        time: "11:15",
        sourceType: "Subscription",
        user: "Michael Chen",
        description: "Monthly premium subscription",
        amount: "$29.99",
        paymentMethod: "PayPal",
        status: "Successful"
    },
    {
        id: "TXN-98236",
        date: "Nov 23, 2025",
        time: "16:45",
        sourceType: "Boost",
        user: "Emma Wilson",
        description: "Profile boost renewal",
        amount: "$49.99",
        paymentMethod: "Stripe",
        status: "Pending"
    },
    {
        id: "TXN-98237",
        date: "Nov 22, 2025",
        time: "09:30",
        sourceType: "Commission",
        user: "Alex Rodriguez",
        description: "Job posting commission - UI Designer",
        amount: "$89.75",
        paymentMethod: "Bank Transfer",
        status: "Successful"
    },
    {
        id: "TXN-98238",
        date: "Nov 21, 2025",
        time: "13:20",
        sourceType: "Subscription",
        user: "Lisa Wang",
        description: "Annual subscription",
        amount: "$299.99",
        paymentMethod: "Stripe",
        status: "Successful"
    },
    {
        id: "TXN-98239",
        date: "Nov 20, 2025",
        time: "17:55",
        sourceType: "Commission",
        user: "David Miller",
        description: "Job posting commission - Data Scientist",
        amount: "$150.00",
        paymentMethod: "PayPal",
        status: "Failed"
    },
    {
        id: "TXN-98240",
        date: "Nov 19, 2025",
        time: "10:10",
        sourceType: "Boost",
        user: "Sophia Garcia",
        description: "Premium profile boost",
        amount: "$79.99",
        paymentMethod: "Stripe",
        status: "Successful"
    },
    {
        id: "TXN-98241",
        date: "Nov 18, 2025",
        time: "15:40",
        sourceType: "Commission",
        user: "James Brown",
        description: "Job posting commission - Product Manager",
        amount: "$200.00",
        paymentMethod: "Bank Transfer",
        status: "Successful"
    }
];

const sourceTypeOptions = [
    { value: 'all-sources', label: 'All Sources' },
    { value: 'commission', label: 'Commission' },
    { value: 'subscription', label: 'Subscription' },
    { value: 'boost', label: 'Boost' }
];

const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last-7-days', label: 'Last 7 days' },
    { value: 'last-30-days', label: 'Last 30 days' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'all-time', label: 'All Time' }
];

const amountRangeOptions = [
    { value: 'all-amounts', label: 'All Amounts' },
    { value: '0-100', label: '$0 - $100' },
    { value: '100-500', label: '$100 - $500' },
    { value: '500+', label: '$500+' }
];

const statusOptions = [
    { value: 'all-status', label: 'All Status' },
    { value: 'successful', label: 'Successful' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' }
];

const EarningTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        sourceType: 'all-sources',
        dateRange: 'last-30-days',
        amountRange: 'all-amounts',
        status: 'all-status',
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Calculate pagination values
    const totalTransactions = sampleTransactions.length;
    const totalPages = Math.ceil(totalTransactions / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalTransactions);

    // Filter transactions based on search and filter criteria
    const filteredTransactions = useMemo(() => {
        return sampleTransactions.filter((transaction) => {
            // Search filter
            if (searchTerm &&
                !transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !transaction.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            // Source type filter
            if (filters.sourceType !== 'all-sources' &&
                transaction.sourceType.toLowerCase() !== filters.sourceType) {
                return false;
            }

            // Status filter
            if (filters.status !== 'all-status' &&
                transaction.status.toLowerCase() !== filters.status) {
                return false;
            }

            const amount = parseFloat(transaction.amount.replace('$', '').replace(',', ''));
            if (filters.amountRange !== 'all-amounts') {
                switch (filters.amountRange) {
                    case '0-100':
                        if (amount < 0 || amount > 100) return false;
                        break;
                    case '100-500':
                        if (amount <= 100 || amount > 500) return false;
                        break;
                    case '500+':
                        if (amount <= 500) return false;
                        break;
                }
            }

            // Date range filter (simplified - would need actual dates for proper filtering)
            // For now, we'll just pass all through

            return true;
        });
    }, [searchTerm, filters, sampleTransactions]);

    // Get current page transactions
    const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'successful':
                return {
                    bgColor: 'bg-emerald-50',
                    textColor: 'text-emerald-700',
                    borderColor: 'border-emerald-200',
                    label: 'Successful'
                };
            case 'pending':
                return {
                    bgColor: 'bg-amber-50',
                    textColor: 'text-amber-700',
                    borderColor: 'border-amber-200',
                    label: 'Pending'
                };
            case 'failed':
                return {
                    bgColor: 'bg-rose-50',
                    textColor: 'text-rose-700',
                    borderColor: 'border-rose-200',
                    label: 'Failed'
                };
            default:
                return {
                    bgColor: 'bg-gray-50',
                    textColor: 'text-gray-700',
                    borderColor: 'border-gray-200',
                    label: status
                };
        }
    };

    const getSourceTypeBadge = (sourceType: string) => {
        switch (sourceType.toLowerCase()) {
            case 'commission':
                return {
                    bgColor: 'bg-blue-50',
                    textColor: 'text-blue-700',
                    borderColor: 'border-blue-200',
                };
            case 'subscription':
                return {
                    bgColor: 'bg-purple-50',
                    textColor: 'text-purple-700',
                    borderColor: 'border-purple-200',
                };
            case 'boost':
                return {
                    bgColor: 'bg-cyan-50',
                    textColor: 'text-cyan-700',
                    borderColor: 'border-cyan-200',
                };
            default:
                return {
                    bgColor: 'bg-gray-50',
                    textColor: 'text-gray-700',
                    borderColor: 'border-gray-200',
                };
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1);
    };

    const hasActiveFilters =
        filters.sourceType !== 'all-sources' ||
        filters.dateRange !== 'last-30-days' ||
        filters.amountRange !== 'all-amounts' ||
        filters.status !== 'all-status' ||
        searchTerm !== '';

    const clearAllFilters = () => {
        setFilters({
            sourceType: 'all-sources',
            dateRange: 'last-30-days',
            amountRange: 'all-amounts',
            status: 'all-status'
        });
        setSearchTerm('');
    };

    const handleExport = () => {
        console.log('Exporting data...');
    };

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
                            placeholder="Search by transaction ID, user, or description..."
                            className="w-full h-12 pl-12 pr-4 bg-background border border-foreground/30 rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-primary-dark transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <div className="text-sm text-foreground/60">Filters:</div>

                    <div className="flex flex-wrap gap-3">
                        {/* Source Type Filter */}
                        <div className="min-w-[140px]">
                            <Select
                                value={filters.sourceType}
                                onValueChange={(value) => setFilters({ ...filters, sourceType: value })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Source Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sourceTypeOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Date Range Filter */}
                        <div className="min-w-[140px]">
                            <Select
                                value={filters.dateRange}
                                onValueChange={(value) => setFilters({ ...filters, dateRange: value })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Date Range" />
                                </SelectTrigger>
                                <SelectContent>
                                    {dateRangeOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Amount Range Filter */}
                        <div className="min-w-[140px]">
                            <Select
                                value={filters.amountRange}
                                onValueChange={(value) => setFilters({ ...filters, amountRange: value })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Amount Range" />
                                </SelectTrigger>
                                <SelectContent>
                                    {amountRangeOptions.map((option) => (
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
                                    {statusOptions.map((option) => (
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
                            Export
                        </Button>
                    </div>
                </div>

                {/* Active Filters */}
                {hasActiveFilters && (
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-sm text-foreground/60">Active filters:</span>
                        <div className="flex flex-wrap gap-2">
                            {/* Source type filter badge */}
                            {filters.sourceType !== 'all-sources' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary-dark/5 text-primary-dark rounded-full text-sm border border-primary-dark/10">
                                    Source: {sourceTypeOptions.find(opt => opt.value === filters.sourceType)?.label}
                                    <button
                                        onClick={() => setFilters({ ...filters, sourceType: 'all-sources' })}
                                        className="hover:text-primary-dark/60"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}

                            {/* Date range filter badge */}
                            {filters.dateRange !== 'last-30-days' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm border border-blue-200">
                                    Date: {dateRangeOptions.find(opt => opt.value === filters.dateRange)?.label}
                                    <button
                                        onClick={() => setFilters({ ...filters, dateRange: 'last-30-days' })}
                                        className="hover:text-blue-900"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}

                            {/* Amount range filter badge */}
                            {filters.amountRange !== 'all-amounts' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-sm border border-amber-200">
                                    Amount: {amountRangeOptions.find(opt => opt.value === filters.amountRange)?.label}
                                    <button
                                        onClick={() => setFilters({ ...filters, amountRange: 'all-amounts' })}
                                        className="hover:text-amber-900"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}

                            {/* Status filter badge */}
                            {filters.status !== 'all-status' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-sm border border-emerald-200">
                                    Status: {statusOptions.find(opt => opt.value === filters.status)?.label}
                                    <button
                                        onClick={() => setFilters({ ...filters, status: 'all-status' })}
                                        className="hover:text-emerald-900"
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
                                <TableHead className="font-semibold text-foreground py-4">Transaction ID</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Date & Time</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Source Type</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">User</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Description</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Amount</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Payment Method</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Status</TableHead>
                                <TableHead className="font-semibold text-foreground py-4 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        {filteredTransactions.length === 0 ? (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={9} className="text-center py-12">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="text-foreground/60">No transactions found</div>
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
                                {currentTransactions.map((transaction) => {
                                    const statusBadge = getStatusBadge(transaction.status);
                                    const sourceTypeBadge = getSourceTypeBadge(transaction.sourceType);

                                    return (
                                        <TableRow
                                            key={transaction.id}
                                            className="border-foreground/10 hover:bg-primary/5 transition-colors"
                                        >
                                            <TableCell className="py-4">
                                                <div className="font-mono text-sm text-foreground/70">{transaction.id}</div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-foreground/70">{transaction.date}</span>
                                                    <span className="text-xs text-foreground/50">{transaction.time}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${sourceTypeBadge.bgColor} ${sourceTypeBadge.textColor} border ${sourceTypeBadge.borderColor}`}>
                                                    {transaction.sourceType}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="text-sm text-foreground/70">{transaction.user}</div>
                                            </TableCell>
                                            <TableCell className="py-4 max-w-xs">
                                                <div className="text-sm text-foreground/70 truncate" title={transaction.description}>
                                                    {transaction.description}
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="text-sm font-semibold text-emerald-600">{transaction.amount}</div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="text-sm text-foreground/70">{transaction.paymentMethod}</div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusBadge.bgColor} ${statusBadge.textColor} border ${statusBadge.borderColor}`}>
                                                    {statusBadge.label}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
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
                                                            <DropdownMenuItem onClick={() => { }}>
                                                                <Eye className="w-4 h-4 mr-2" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Download className="w-4 h-4 mr-2" />
                                                                Download Receipt
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-500">
                                                                Report Issue
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
                    totalUsers={filteredTransactions.length}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </div>
        </>
    );
};

export default EarningTable;