"use client";

import React, { useState, useMemo } from 'react';
import MetricsSlider from "@/components/addons/MetricsSlider";
import { Search, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import OrdersTable from '@/components/orders/OrdersTable';
import OrderDetailModal from '../../../../components/orders/OrderDetailModal';
import { ordersStats } from '@/constants'; // We'll add this to constants
import { orders, timeRangeOptions, statusOptions, amountRangeOptions } from '@/constants'; // We'll add these

const OrdersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);

  const [filters, setFilters] = useState({
    timeRange: 'all-time',
    status: [] as string[],
    amountRange: 'all-amounts',
  });

  const filteredOrders = useMemo(() => {
    return orders.filter((order: any) => {
      // Search filter
      if (searchTerm &&
        !order.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !order.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !order.buyer.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !order.performer.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(order.status.toLowerCase())) {
        return false;
      }

      // Amount range filter
      if (filters.amountRange !== 'all-amounts') {
        const amount = parseFloat(order.amount.replace(/[^0-9.-]+/g, ""));

        switch (filters.amountRange) {
          case 'under-1000':
            if (amount >= 1000) return false;
            break;
          case '1000-5000':
            if (amount < 1000 || amount > 5000) return false;
            break;
          case '5000-10000':
            if (amount < 5000 || amount > 10000) return false;
            break;
          case 'over-10000':
            if (amount <= 10000) return false;
            break;
        }
      }

      // Time range filter
      if (filters.timeRange !== 'all-time') {
        const orderDate = new Date(order.orderDate);
        const now = new Date();

        switch (filters.timeRange) {
          case 'today':
            const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            if (orderDate < startOfToday) return false;
            break;
          case 'this-week':
            const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
            if (orderDate < startOfWeek) return false;
            break;
          case 'this-month':
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            if (orderDate < startOfMonth) return false;
            break;
          case 'this-year':
            const startOfYear = new Date(now.getFullYear(), 0, 1);
            if (orderDate < startOfYear) return false;
            break;
        }
      }

      return true;
    }).sort((a: any, b: any) => {
      return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
    });
  }, [searchTerm, filters]);

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setOrderDetailOpen(true);
  };

  const clearFilters = () => {
    setFilters({
      timeRange: 'all-time',
      status: [],
      amountRange: 'all-amounts',
    });
  };

  const hasActiveFilters =
    filters.status.length > 0 ||
    filters.timeRange !== 'all-time' ||
    filters.amountRange !== 'all-amounts';

  return (
    <div className="h-[calc(100vh-120px)] w-full overflow-y-auto p-4">
      <div className="mb-8">
        <MetricsSlider cards={ordersStats} />
      </div>

      {/* Search Section */}
      <div className="mb-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="max-w-lg relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
            <input
              type="text"
              placeholder="Search by Order ID, Job Title, Buyer, or Performer..."
              className="w-full h-12 pl-12 pr-4 bg-background border border-foreground/30 rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-dark/80 focus:border-primary-dark/20 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div className="text-sm text-foreground/60">Filters:</div>

          <div className="flex flex-wrap gap-3">
            {/* Status Filter */}
            <div className="min-w-[140px]">
              <Select
                value={filters.status[0] || "all"}
                onValueChange={(value) => {
                  if (value === "all") {
                    setFilters({ ...filters, status: [] });
                  } else {
                    setFilters({ ...filters, status: [value] });
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option: any) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Time Range Filter */}
            <div className="min-w-[140px]">
              <Select
                value={filters.timeRange}
                onValueChange={(value) => setFilters({ ...filters, timeRange: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent>
                  {timeRangeOptions.map((option: any) => (
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
                  <SelectValue placeholder="All Amounts" />
                </SelectTrigger>
                <SelectContent>
                  {amountRangeOptions.map((option: any) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-foreground/60">Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {/* Time range filter badge */}
              {filters.timeRange !== 'all-time' && (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary-dark/5 text-primary-dark rounded-full text-sm border border-primary-dark/10">
                  Time: {timeRangeOptions.find((opt: any) => opt.value === filters.timeRange)?.label}
                  <button
                    onClick={() => setFilters({ ...filters, timeRange: 'all-time' })}
                    className="hover:text-primary-dark/60"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Status filter badge */}
              {filters.status.map((status) => (
                <div key={status} className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-sm border border-emerald-200">
                  Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                  <button
                    onClick={() => setFilters({
                      ...filters,
                      status: filters.status.filter(s => s !== status)
                    })}
                    className="hover:text-emerald-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {/* Amount range filter badge */}
              {filters.amountRange !== 'all-amounts' && (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-50 text-cyan-800 rounded-full text-sm border border-cyan-200">
                  Amount: {amountRangeOptions.find((opt: any) => opt.value === filters.amountRange)?.label}
                  <button
                    onClick={() => setFilters({ ...filters, amountRange: 'all-amounts' })}
                    className="hover:text-cyan-900"
                  >
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

      {/* Orders Table */}
      <OrdersTable
        orders={filteredOrders}
        onViewDetails={handleViewDetails}
        onClearFilters={clearFilters}
      />

      {/* Order Detail Modal */}
      <OrderDetailModal
        isOpen={orderDetailOpen}
        onClose={() => setOrderDetailOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrdersManagement;