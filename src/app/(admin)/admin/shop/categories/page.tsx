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
import { Search, X, Edit, Trash2, MoreHorizontal, Plus, Eye, Download } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Pagination from '@/components/addons/Pagination';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sampleCategories: Category[] = [
    { id: '1', name: 'Electronics', productsCount: 89, status: 'Active', createdOn: 'Oct 15, 2025' },
    { id: '2', name: 'Footwear', productsCount: 56, status: 'Active', createdOn: 'Oct 10, 2025' },
    { id: '3', name: 'Accessories', productsCount: 42, status: 'Active', createdOn: 'Sep 28, 2025' },
    { id: '4', name: 'Bags', productsCount: 31, status: 'Active', createdOn: 'Sep 20, 2025' },
    { id: '5', name: 'Home', productsCount: 16, status: 'Disabled', createdOn: 'Sep 12, 2025' },
    { id: '6', name: 'Clothing', productsCount: 45, status: 'Active', createdOn: 'Sep 5, 2025' },
    { id: '7', name: 'Beauty', productsCount: 28, status: 'Active', createdOn: 'Aug 28, 2025' },
    { id: '8', name: 'Sports', productsCount: 19, status: 'Disabled', createdOn: 'Aug 15, 2025' },
    { id: '9', name: 'Books', productsCount: 34, status: 'Active', createdOn: 'Aug 1, 2025' },
    { id: '10', name: 'Toys', productsCount: 22, status: 'Active', createdOn: 'Jul 25, 2025' },
];

interface Category {
    id: string;
    name: string;
    productsCount: number;
    status: 'Active' | 'Disabled';
    createdOn: string;
}

const CategoriesPage = () => {
    // State
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        status: 'all-status',
        dateRange: 'all-time'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Calculate pagination values
    const totalCategories = sampleCategories.length;
    const totalPages = Math.ceil(totalCategories / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalCategories);

    // Filter categories based on search and filter criteria
    const filteredCategories = useMemo(() => {
        return sampleCategories.filter((category) => {
            // Search filter
            if (searchTerm &&
                !category.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            // Status filter
            if (filters.status !== 'all-status' &&
                category.status.toLowerCase() !== filters.status) {
                return false;
            }

            return true;
        });
    }, [searchTerm, filters]);

    // Get current page categories
    const currentCategories = filteredCategories.slice(startIndex, endIndex);

    // Status badge colors
    const getStatusBadge = (status: string) => {
        const statusMap: any = {
            'Active': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
            'Disabled': { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-300' },
        };
        return statusMap[status] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
    };

    // Status options for filter
    const statusOptions = [
        { value: 'all-status', label: 'All Status' },
        { value: 'active', label: 'Active' },
        { value: 'disabled', label: 'Disabled' },
    ];

    // Date range options for filter
    const dateRangeOptions = [
        { value: 'all-time', label: 'All Time' },
        { value: 'last-7-days', label: 'Last 7 Days' },
        { value: 'last-30-days', label: 'Last 30 Days' },
        { value: 'last-90-days', label: 'Last 90 Days' },
    ];

    const handlePageChange = (page: number) => setCurrentPage(page);
    const handleRowsPerPageChange = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1);
    };

    const clearAllFilters = () => {
        setFilters({
            status: 'all-status',
            dateRange: 'all-time'
        });
        setSearchTerm('');
    };

    const handleExport = () => {
        console.log('Exporting categories data...');
        // Export functionality would go here
    };

    const handleAddCategory = () => {
        console.log('Adding new category...');
        // Open add category modal
    };

    const handleViewCategory = (category: Category) => {
        console.log('View category:', category);
        // Navigate to category detail page or open modal
    };

    const handleEditCategory = (category: Category) => {
        console.log('Edit category:', category);
        // Open edit modal
    };

    const handleDeleteCategory = (category: Category) => {
        console.log('Delete category:', category);
        // Show delete confirmation
        if (confirm(`Delete category "${category.name}"? This will affect ${category.productsCount} products.`)) {
            console.log('Category deleted');
        }
    };

    const handleToggleStatus = (category: Category) => {
        console.log('Toggle status for category:', category);
        // Toggle category status
        if (confirm(`${category.status === 'Active' ? 'Disable' : 'Activate'} category "${category.name}"?`)) {
            console.log(`Category ${category.status === 'Active' ? 'disabled' : 'activated'}`);
        }
    };

    const hasActiveFilters = Object.values(filters).some(value =>
        value !== 'all-status' && value !== 'all-time'
    );

    return (
        <div className="h-[calc(100dvh-120px)] w-full overflow-y-auto p-4">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">Categories</h1>
                <p className="text-foreground/60 mt-2">Manage and organize shop categories</p>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white border border-foreground/10 rounded-xl p-6 mb-8">
                {/* Search Bar */}
                <div className="mb-6">
                    <div className="max-w-lg relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
                        <input
                            type="text"
                            placeholder="Search categories..."
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

                        {/* Date Range Filter */}
                        <div className="min-w-[140px]">
                            <Select
                                value={filters.dateRange}
                                onValueChange={(value) => setFilters({ ...filters, dateRange: value })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Date Added" />
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
                    </div>

                    {/* Export and Add New Buttons */}
                    <div className="ml-auto flex gap-2">
                        <Button
                            onClick={handleExport}
                            variant="outline"
                            className="gap-2 cursor-pointer"
                        >
                            <Download className="w-4 h-4" />
                            Export
                        </Button>
                        <Button
                            onClick={handleAddCategory}
                            className="bg-primary-dark hover:bg-primary-dark/90 text-white gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Category
                        </Button>
                    </div>
                </div>

                {/* Active Filters */}
                {hasActiveFilters && (
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-sm text-foreground/60">Active filters:</span>
                        <div className="flex flex-wrap gap-2">
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

            {/* Categories Table */}
            <div className="bg-white border border-foreground/10 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-foreground/10 flex justify-between items-center">
                    <div className="text-sm font-medium text-foreground/70">
                        Showing {startIndex + 1} to {endIndex} of {filteredCategories.length} categories
                    </div>
                    <div className="text-lg font-semibold text-foreground">
                        {filteredCategories.length} Categories
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-primary-dark/5">
                                <TableHead className="font-semibold text-foreground py-4">Category Name</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Products Count</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Status</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Created On</TableHead>
                                <TableHead className="font-semibold text-foreground py-4 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentCategories.length > 0 ? (
                                currentCategories.map((category) => {
                                    const statusBadge = getStatusBadge(category.status);

                                    return (
                                        <TableRow
                                            key={category.id}
                                            className="border-foreground/10 hover:bg-primary/5 transition-colors"
                                        >
                                            {/* Category Name */}
                                            <TableCell className="font-medium text-foreground">
                                                {category.name}
                                            </TableCell>

                                            {/* Products Count */}
                                            <TableCell className="text-foreground/70">
                                                {category.productsCount} products
                                            </TableCell>

                                            {/* Status */}
                                            <TableCell>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text} border ${statusBadge.border}`}>
                                                    {category.status}
                                                </span>
                                            </TableCell>

                                            {/* Created On */}
                                            <TableCell className="text-foreground/70">
                                                {category.createdOn}
                                            </TableCell>

                                            {/* Actions */}
                                            <TableCell className="text-right py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEditCategory(category);
                                                        }}
                                                        className="p-1.5 text-foreground/60 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleToggleStatus(category);
                                                        }}
                                                        className={`p-1.5 rounded transition-colors ${category.status === 'Active'
                                                            ? 'text-foreground/60 hover:text-amber-600 hover:bg-amber-50'
                                                            : 'text-foreground/60 hover:text-emerald-600 hover:bg-emerald-50'
                                                            }`}
                                                        title={category.status === 'Active' ? 'Disable' : 'Activate'}
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
                                                            <DropdownMenuItem onClick={() => handleViewCategory(category)}>
                                                                <Eye className="w-4 h-4 mr-2" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                                                                <Edit className="w-4 h-4 mr-2" />
                                                                Edit Category
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleToggleStatus(category)}>
                                                                <Eye className="w-4 h-4 mr-2" />
                                                                {category.status === 'Active' ? 'Disable' : 'Activate'} Category
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleDeleteCategory(category)}
                                                                className="text-rose-600"
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-2" />
                                                                Delete Category
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-12">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="text-foreground/60">No categories found</div>
                                            <button
                                                onClick={clearAllFilters}
                                                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
                                            >
                                                Clear All Filters
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Pagination */}
            {filteredCategories.length > 0 && (
                <div className="mt-6">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        rowsPerPage={rowsPerPage}
                        totalUsers={filteredCategories.length}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;