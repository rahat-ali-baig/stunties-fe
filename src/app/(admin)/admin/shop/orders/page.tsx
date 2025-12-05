"use client";

import { useState, useMemo } from 'react';
import { Search, X, Eye, Package, Truck, CheckCircle } from 'lucide-react';
import PrimaryButton from '@/components/addons/PrimaryButton';
import CustomSelect from '@/components/addons/CustomSelect';
import CustomTable, { Column } from '@/components/addons/CustomTable';

interface Order {
    id: string;
    orderId: string;
    customer: {
        name: string;
        initials: string;
    };
    itemsCount: string;
    totalAmount: string;
    paymentStatus: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
    orderStatus: 'Delivered' | 'Shipped' | 'Processing' | 'Pending' | 'Cancelled';
    orderDate: string;
}

const sampleOrders: Order[] = [
    { id: '1', orderId: '#ORD-2451', customer: { name: 'Sarah Johnson', initials: 'SJ' }, itemsCount: '3 items', totalAmount: '$567.00', paymentStatus: 'Paid', orderStatus: 'Delivered', orderDate: 'Dec 1, 2025' },
    { id: '2', orderId: '#ORD-2450', customer: { name: 'Michael Chen', initials: 'MC' }, itemsCount: '1 item', totalAmount: '$299.00', paymentStatus: 'Paid', orderStatus: 'Shipped', orderDate: 'Nov 30, 2025' },
    { id: '3', orderId: '#ORD-2449', customer: { name: 'Emma Davis', initials: 'ED' }, itemsCount: '5 items', totalAmount: '$892.00', paymentStatus: 'Pending', orderStatus: 'Processing', orderDate: 'Nov 29, 2025' },
    { id: '4', orderId: '#ORD-2448', customer: { name: 'James Wilson', initials: 'JW' }, itemsCount: '2 items', totalAmount: '$428.00', paymentStatus: 'Paid', orderStatus: 'Delivered', orderDate: 'Nov 28, 2025' },
];

const paymentStatusOptions = [
    { value: 'all-payments', label: 'All Payments' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' },
];

const orderStatusOptions = [
    { value: 'all-status', label: 'All Status' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'processing', label: 'Processing' },
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' },
];

const dateRangeOptions = [
    { value: 'all-time', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'last-7-days', label: 'Last 7 days' },
    { value: 'last-30-days', label: 'Last 30 days' },
    { value: 'last-90-days', label: 'Last 90 days' },
];

const OrdersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        paymentStatus: 'all-payments',
        orderStatus: 'all-status',
        dateRange: 'all-time'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filteredOrders = useMemo(() => {
        return sampleOrders.filter((order) => {
            // Search filter
            if (searchTerm &&
                !order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            // Payment status filter
            if (filters.paymentStatus !== 'all-payments' &&
                order.paymentStatus.toLowerCase() !== filters.paymentStatus) {
                return false;
            }

            // Order status filter
            if (filters.orderStatus !== 'all-status' &&
                order.orderStatus.toLowerCase() !== filters.orderStatus) {
                return false;
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

    const getPaymentStatusBadge = (status: string) => {
        const statusMap: any = {
            'Paid': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
            'Pending': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
            'Failed': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
            'Refunded': { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
        };
        return statusMap[status] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
    };

    const getOrderStatusBadge = (status: string) => {
        const statusMap: any = {
            'Delivered': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: <CheckCircle className="w-3 h-3 mr-1" /> },
            'Shipped': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: <Truck className="w-3 h-3 mr-1" /> },
            'Processing': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: <Package className="w-3 h-3 mr-1" /> },
            'Pending': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: null },
            'Cancelled': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', icon: null },
        };
        return statusMap[status] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', icon: null };
    };

    const columns: Column<Order>[] = [
        {
            key: 'orderId',
            title: 'Order ID',
            dataIndex: 'orderId',
            render: (orderId) => (
                <span className="font-medium text-foreground">{orderId}</span>
            ),
        },
        {
            key: 'customer',
            title: 'Customer',
            dataIndex: 'customer',
            render: (customer) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-dark/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary-dark">{customer.initials}</span>
                    </div>
                    <div>
                        <div className="font-medium text-foreground">{customer.name}</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'itemsCount',
            title: 'Items Count',
            dataIndex: 'itemsCount',
            render: (count) => (
                <span className="text-foreground">{count}</span>
            ),
        },
        {
            key: 'totalAmount',
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            render: (amount) => (
                <span className="font-semibold text-emerald-600">{amount}</span>
            ),
        },
        {
            key: 'paymentStatus',
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            render: (status) => {
                const badge = getPaymentStatusBadge(status);
                return (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text} border ${badge.border}`}>
                        {status}
                    </span>
                );
            },
        },
        {
            key: 'orderStatus',
            title: 'Order Status',
            dataIndex: 'orderStatus',
            render: (status) => {
                const badge = getOrderStatusBadge(status);
                return (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text} border ${badge.border}`}>
                        {badge.icon}
                        {status}
                    </span>
                );
            },
        },
        {
            key: 'orderDate',
            title: 'Order Date',
            dataIndex: 'orderDate',
        },
    ];

    const customActions = (record: Order) => {
        const handleViewOrder = () => console.log('View order:', record);

        return (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleViewOrder();
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
            paymentStatus: 'all-payments',
            orderStatus: 'all-status',
            dateRange: 'all-time'
        });
        setSearchTerm('');
        setCurrentPage(1);
    };

    const hasActiveFilters = Object.values(filters).some(value =>
        value !== 'all-payments' &&
        value !== 'all-status' &&
        value !== 'all-time'
    );

    return (
        <div className="h-[calc(100dvh-120px)] w-full overflow-y-auto p-4">
            {/* Top Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Shop Orders</h1>
                    <p className="text-sm text-foreground/60 mt-1">
                        Track customer orders and fulfillment status
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
                            placeholder="Search by order ID, customer name..."
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
                    {/* Payment Status Filter */}
                    <div className="min-w-[140px]">
                        <CustomSelect
                            value={filters.paymentStatus}
                            onChange={(value: any) => {
                                setFilters({ ...filters, paymentStatus: value });
                                setCurrentPage(1);
                            }}
                            options={paymentStatusOptions}
                            placeholder="Payment Status"
                        />
                    </div>

                    {/* Order Status Filter */}
                    <div className="min-w-[140px]">
                        <CustomSelect
                            value={filters.orderStatus}
                            onChange={(value: any) => {
                                setFilters({ ...filters, orderStatus: value });
                                setCurrentPage(1);
                            }}
                            options={orderStatusOptions}
                            placeholder="Order Status"
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
                            placeholder="Date Range"
                        />
                    </div>
                </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
                <div className="mt-4 mb-6 flex items-center gap-2">
                    <span className="text-sm text-foreground/60">Active filters:</span>
                    <div className="flex flex-wrap gap-2">
                        {filters.paymentStatus !== 'all-payments' && (
                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-sm border border-emerald-200">
                                Payment: {paymentStatusOptions.find(opt => opt.value === filters.paymentStatus)?.label}
                                <button
                                    onClick={() => {
                                        setFilters({ ...filters, paymentStatus: 'all-payments' });
                                        setCurrentPage(1);
                                    }}
                                    className="hover:text-emerald-900 ml-1"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        )}

                        {filters.orderStatus !== 'all-status' && (
                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm border border-blue-200">
                                Order: {orderStatusOptions.find(opt => opt.value === filters.orderStatus)?.label}
                                <button
                                    onClick={() => {
                                        setFilters({ ...filters, orderStatus: 'all-status' });
                                        setCurrentPage(1);
                                    }}
                                    className="hover:text-blue-900 ml-1"
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

            <CustomTable<Order>
                data={filteredOrders}
                columns={columns}
                rowKey="id"
                pagination={true}
                showPagination={true}
                pageSize={rowsPerPage}
                pageSizeOptions={[5, 10, 20, 50]}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                current={currentPage}
                total={filteredOrders.length}
                customActions={customActions}
                bordered
                size="middle"
                emptyText={
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                        <div className="text-foreground/60">No orders found</div>
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

export default OrdersPage;