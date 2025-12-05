"use client";

import { useState, useMemo } from 'react';
import { Search, X, Eye, Mail, ShoppingBag, DollarSign } from 'lucide-react';
import PrimaryButton from '@/components/addons/PrimaryButton';
import CustomSelect from '@/components/addons/CustomSelect';
import CustomTable, { Column } from '@/components/addons/CustomTable';

interface Customer {
    id: string;
    name: string;
    email: string;
    ordersCount: string;
    totalSpent: string;
    signupDate: string;
}

const sampleCustomers: Customer[] = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah.j@email.com', ordersCount: '12 orders', totalSpent: '$3,456.00', signupDate: 'Jan 15, 2025' },
    { id: '2', name: 'Michael Chen', email: 'michael.chen@email.com', ordersCount: '8 orders', totalSpent: '$2,189.00', signupDate: 'Feb 3, 2025' },
    { id: '3', name: 'Emma Davis', email: 'emma.davis@email.com', ordersCount: '15 orders', totalSpent: '$4,234.00', signupDate: 'Mar 12, 2025' },
    { id: '4', name: 'James Wilson', email: 'james.w@email.com', ordersCount: '5 orders', totalSpent: '$1,567.00', signupDate: 'Apr 8, 2025' },
    { id: '5', name: 'Olivia Brown', email: 'olivia.brown@email.com', ordersCount: '20 orders', totalSpent: '$5,890.00', signupDate: 'May 20, 2025' },
];

const ordersCountOptions = [
    { value: 'all-orders', label: 'All Orders' },
    { value: '0-5', label: '0-5 orders' },
    { value: '6-15', label: '6-15 orders' },
    { value: '16+', label: '16+ orders' },
];

const spendingRangeOptions = [
    { value: 'all-spending', label: 'All Spending' },
    { value: '0-1000', label: '$0 - $1,000' },
    { value: '1001-3000', label: '$1,001 - $3,000' },
    { value: '3001+', label: '$3,001+' },
];

const dateRangeOptions = [
    { value: 'all-time', label: 'All Time' },
    { value: 'last-7-days', label: 'Last 7 days' },
    { value: 'last-30-days', label: 'Last 30 days' },
    { value: 'last-90-days', label: 'Last 90 days' },
    { value: 'this-year', label: 'This Year' },
];

const CustomersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        ordersCount: 'all-orders',
        spendingRange: 'all-spending',
        dateRange: 'all-time'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filteredCustomers = useMemo(() => {
        return sampleCustomers.filter((customer) => {
            // Search filter
            if (searchTerm &&
                !customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !customer.email.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            // Orders count filter
            if (filters.ordersCount !== 'all-orders') {
                const orderCount = parseInt(customer.ordersCount);
                switch (filters.ordersCount) {
                    case '0-5':
                        if (orderCount > 5) return false;
                        break;
                    case '6-15':
                        if (orderCount < 6 || orderCount > 15) return false;
                        break;
                    case '16+':
                        if (orderCount < 16) return false;
                        break;
                }
            }

            // Spending range filter
            if (filters.spendingRange !== 'all-spending') {
                const spent = parseFloat(customer.totalSpent.replace('$', '').replace(',', ''));
                switch (filters.spendingRange) {
                    case '0-1000':
                        if (spent > 1000) return false;
                        break;
                    case '1001-3000':
                        if (spent <= 1000 || spent > 3000) return false;
                        break;
                    case '3001+':
                        if (spent <= 3000) return false;
                        break;
                }
            }

            // Date filter - simplified for demo
            if (filters.dateRange !== 'all-time') {
                // In real app, you would filter by actual dates
                // For demo, just return true
                return true;
            }

            return true;
        });
    }, [searchTerm, filters]);

    const getCustomerInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    const columns: Column<Customer>[] = [
        {
            key: 'customer',
            title: 'Customer',
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-dark/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary-dark">
                            {getCustomerInitials(record.name)}
                        </span>
                    </div>
                    <div className="space-y-1">
                        <div className="font-medium text-foreground">{record.name}</div>
                        <div className="text-sm text-foreground/60 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {record.email}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: 'ordersCount',
            title: 'Orders Count',
            dataIndex: 'ordersCount',
            render: (count) => (
                <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-foreground/60" />
                    <span className="font-medium text-foreground">{count}</span>
                </div>
            ),
        },
        {
            key: 'totalSpent',
            title: 'Total Spent',
            dataIndex: 'totalSpent',
            render: (amount) => (
                <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-emerald-600">{amount}</span>
                </div>
            ),
        },
        {
            key: 'signupDate',
            title: 'Signup Date',
            dataIndex: 'signupDate',
        },
    ];

    const customActions = (record: Customer) => {
        const handleViewCustomer = () => console.log('View customer:', record);

        return (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleViewCustomer();
                }}
                className="p-1.5 text-foreground/60 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="View Order"
            >
                <Eye className="w-4 h-4" />
            </button>
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
            ordersCount: 'all-orders',
            spendingRange: 'all-spending',
            dateRange: 'all-time'
        });
        setSearchTerm('');
        setCurrentPage(1);
    };

    const hasActiveFilters = Object.values(filters).some(value =>
        value !== 'all-orders' &&
        value !== 'all-spending' &&
        value !== 'all-time'
    );

    return (
        <div className="h-[calc(100dvh-120px)] w-full overflow-y-auto p-4">
            {/* Top Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Customers</h1>
                    <p className="text-sm text-foreground/60 mt-1">
                        View and manage customer accounts
                    </p>
                </div>
            </div>

            {/* Search & Filters Row */}
            <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                {/* Search Bar */}
                <div className="max-w-lg w-full">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
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
                    {/* Orders Count Filter */}
                    <div className="min-w-[140px]">
                        <CustomSelect
                            value={filters.ordersCount}
                            onChange={(value: any) => {
                                setFilters({ ...filters, ordersCount: value });
                                setCurrentPage(1);
                            }}
                            options={ordersCountOptions}
                            placeholder="Orders Count"
                        />
                    </div>

                    {/* Spending Range Filter */}
                    <div className="min-w-[140px]">
                        <CustomSelect
                            value={filters.spendingRange}
                            onChange={(value: any) => {
                                setFilters({ ...filters, spendingRange: value });
                                setCurrentPage(1);
                            }}
                            options={spendingRangeOptions}
                            placeholder="Total Spent"
                        />
                    </div>

                    {/* Date Range Filter */}
                    <div className="min-w-[140px]">
                        <CustomSelect
                            value={filters.dateRange}
                            onChange={(value: any) => {
                                setFilters({ ...filters, dateRange: value });
                                setCurrentPage(1);
                            }}
                            options={dateRangeOptions}
                            placeholder="Signup Date"
                        />
                    </div>
                </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
                <div className="mt-4 mb-6 flex items-center gap-2">
                    <span className="text-sm text-foreground/60">Active filters:</span>
                    <div className="flex flex-wrap gap-2">
                        {filters.ordersCount !== 'all-orders' && (
                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm border border-blue-200">
                                Orders: {ordersCountOptions.find(opt => opt.value === filters.ordersCount)?.label}
                                <button
                                    onClick={() => {
                                        setFilters({ ...filters, ordersCount: 'all-orders' });
                                        setCurrentPage(1);
                                    }}
                                    className="hover:text-blue-900 ml-1"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        )}

                        {filters.spendingRange !== 'all-spending' && (
                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-sm border border-emerald-200">
                                Spending: {spendingRangeOptions.find(opt => opt.value === filters.spendingRange)?.label}
                                <button
                                    onClick={() => {
                                        setFilters({ ...filters, spendingRange: 'all-spending' });
                                        setCurrentPage(1);
                                    }}
                                    className="hover:text-emerald-900 ml-1"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        )}

                        {filters.dateRange !== 'all-time' && (
                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-800 rounded-full text-sm border border-purple-200">
                                Date: {dateRangeOptions.find(opt => opt.value === filters.dateRange)?.label}
                                <button
                                    onClick={() => {
                                        setFilters({ ...filters, dateRange: 'all-time' });
                                        setCurrentPage(1);
                                    }}
                                    className="hover:text-purple-900 ml-1"
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

            <CustomTable<Customer>
                data={filteredCustomers}
                columns={columns}
                rowKey="id"
                pagination={true}
                showPagination={true}
                pageSize={rowsPerPage}
                pageSizeOptions={[5, 10, 20, 50]}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                current={currentPage}
                total={filteredCustomers.length}
                customActions={customActions}
                bordered
                size="middle"
                emptyText={
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                        <div className="text-foreground/60">No customers found</div>
                        <PrimaryButton
                            onClick={clearAllFilters}
                            variant="primary"
                            size="sm"
                        >
                            Clear All Filters
                        </PrimaryButton>
                    </div>
                }
            />
        </div>
    );
};

export default CustomersPage;