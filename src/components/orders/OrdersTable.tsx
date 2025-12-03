"use client";

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { LuEye } from "react-icons/lu";
import { MdDeleteOutline } from 'react-icons/md';
import { FaRegFileLines } from 'react-icons/fa6';
import { Download, MessageSquare, CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';
import Pagination from '../addons/Pagination';

interface Order {
    id: string;
    jobTitle: string;
    buyer: string;
    performer: string;
    orderDate: string;
    deliveryDate: string;
    amount: string;
    commission: string;
    netEarnings: string;
    status: string;
}

interface OrdersTableProps {
    orders: Order[];
    onViewDetails: (order: Order) => void;
    onClearFilters: () => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
    orders,
    onViewDetails,
    onClearFilters
}) => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Calculate pagination values
    const totalUsers = orders.length;
    const totalPages = Math.ceil(totalUsers / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalUsers);

    // Get current page orders
    const currentOrders = orders.slice(startIndex, endIndex);

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return {
                    bgColor: 'bg-amber-50',
                    textColor: 'text-amber-700',
                    borderColor: 'border-amber-200',
                    label: 'Pending',
                    icon: <Clock className="w-3 h-3 mr-1" />
                };
            case 'in progress':
                return {
                    bgColor: 'bg-blue-50',
                    textColor: 'text-blue-700',
                    borderColor: 'border-blue-200',
                    label: 'In Progress',
                    icon: <Clock className="w-3 h-3 mr-1" />
                };
            case 'under review':
                return {
                    bgColor: 'bg-purple-50',
                    textColor: 'text-purple-700',
                    borderColor: 'border-purple-200',
                    label: 'Under Review',
                    icon: <AlertCircle className="w-3 h-3 mr-1" />
                };
            case 'completed':
                return {
                    bgColor: 'bg-emerald-50',
                    textColor: 'text-emerald-700',
                    borderColor: 'border-emerald-200',
                    label: 'Completed',
                    icon: <CheckCircle className="w-3 h-3 mr-1" />
                };
            case 'cancelled':
                return {
                    bgColor: 'bg-rose-50',
                    textColor: 'text-rose-700',
                    borderColor: 'border-rose-200',
                    label: 'Cancelled',
                    icon: <XCircle className="w-3 h-3 mr-1" />
                };
            default:
                return {
                    bgColor: 'bg-gray-50',
                    textColor: 'text-gray-700',
                    borderColor: 'border-gray-200',
                    label: status,
                    icon: <Clock className="w-3 h-3 mr-1" />
                };
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1); // Reset to first page when rows per page changes
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (orders.length === 0) {
        return (
            <div className="border border-foreground/20 rounded-lg overflow-hidden bg-white">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-primary-dark/10">
                            <TableHead className="font-semibold text-foreground py-4">ORDER ID</TableHead>
                            <TableHead className="font-semibold text-foreground py-4">JOB TITLE</TableHead>
                            <TableHead className="font-semibold text-foreground py-4">BUYER & PERFORMER</TableHead>
                            <TableHead className="font-semibold text-foreground py-4">AMOUNT & EARNINGS</TableHead>
                            <TableHead className="font-semibold text-foreground py-4">DATES</TableHead>
                            <TableHead className="font-semibold text-foreground py-4">STATUS</TableHead>
                            <TableHead className="font-semibold text-foreground py-4 text-right">ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={7} className="text-center py-12">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="text-foreground/60">No orders found</div>
                                    <button
                                        onClick={onClearFilters}
                                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-primary-dark/70 transition-colors text-sm"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }

    return (
        <>
            <div className="border border-foreground/20 rounded-lg overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-primary-dark/10">
                                <TableHead className="font-semibold text-foreground py-4">ORDER ID</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">JOB TITLE</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">BUYER & PERFORMER</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">AMOUNT & EARNINGS</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">DATES</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">STATUS</TableHead>
                                <TableHead className="font-semibold text-foreground py-4 text-right">ACTIONS</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentOrders.map((order) => {
                                const statusBadge = getStatusBadge(order.status);

                                return (
                                    <TableRow
                                        key={order.id}
                                        className="border-foreground/10 hover:bg-primary/5 transition-colors"
                                    >
                                        <TableCell className="py-4">
                                            <div className="font-mono text-sm font-medium text-foreground">{order.id}</div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="font-medium text-foreground">{order.jobTitle}</div>
                                            <div className="text-xs text-foreground/60 mt-1">
                                                {order.performer}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="mb-2">
                                                <div className="text-xs text-foreground/60 mb-1">BUYER</div>
                                                <div className="text-sm font-medium text-foreground">{order.buyer}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-foreground/60 mb-1">PERFORMER</div>
                                                <div className="text-sm font-medium text-foreground">{order.performer}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="mb-2">
                                                <div className="text-xs text-foreground/60 mb-1">AMOUNT</div>
                                                <div className="text-lg font-bold text-emerald-600">{order.amount}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-foreground/60 mb-1">NET EARNINGS</div>
                                                <div className="text-sm font-medium text-foreground">{order.netEarnings}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="mb-2">
                                                <div className="text-xs text-foreground/60 mb-1">ORDERED</div>
                                                <div className="text-sm font-medium text-foreground">{formatDate(order.orderDate)}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-foreground/60 mb-1">DELIVERY</div>
                                                <div className="text-sm font-medium text-foreground">{formatDate(order.deliveryDate)}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.bgColor} ${statusBadge.textColor} ${statusBadge.borderColor}`}>
                                                {statusBadge.icon}
                                                {statusBadge.label}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => onViewDetails(order)}
                                                    className="p-1.5 text-foreground/60 hover:text-primary-dark hover:bg-primary-dark/5 rounded transition-colors"
                                                    title="View Details"
                                                >
                                                    <LuEye className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // Handle download details
                                                    }}
                                                    className="p-1.5 text-foreground/60 hover:text-primary-dark hover:bg-primary-dark/5 rounded transition-colors"
                                                    title="Download Details"
                                                >
                                                    <Download className="w-3.5 h-3.5" />
                                                </button>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // Handle message
                                                    }}
                                                    className="p-1.5 text-foreground/60 hover:text-primary-dark hover:bg-primary-dark/5 rounded transition-colors"
                                                    title="Message"
                                                >
                                                    <MessageSquare className="w-3.5 h-3.5" />
                                                </button>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // Handle delete
                                                    }}
                                                    className="p-1.5 text-red-500/60 hover:text-red-500/40 cursor-pointer hover:bg-red-50 rounded transition-colors"
                                                    title="Delete"
                                                >
                                                    <MdDeleteOutline className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Add Pagination component */}
            <div className="mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    rowsPerPage={rowsPerPage}
                    totalUsers={totalUsers}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </div>
        </>
    );
};

export default OrdersTable;