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
import { Search, X, Filter, Download, Eye, MoreHorizontal, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Pagination from '@/components/addons/Pagination';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categoryOptions, dateRangeOptions, priceRangeOptions, productStatusOptions, sampleProducts, stockOptions } from '@/constants';

interface Product {
    id: string;
    image: string;
    name: string;
    sku: string;
    category: string;
    price: string;
    stock: number;
    status: 'Active' | 'Inactive' | 'Out of Stock' | 'Low Stock' | 'Draft';
    addedOn: string;
    description?: string;
}

const ProductsPage = () => {
    // State
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: 'all-categories',
        status: 'all-status',
        stock: 'all-stock',
        priceRange: 'all-prices',
        dateRange: 'all-time'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Calculate pagination values
    const totalProducts = sampleProducts.length;
    const totalPages = Math.ceil(totalProducts / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalProducts);

    // Filter products based on search and filter criteria
    const filteredProducts = useMemo(() => {
        return sampleProducts.filter((product) => {
            // Search filter
            if (searchTerm &&
                !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !product.sku.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !product.category.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            // Category filter
            if (filters.category !== 'all-categories' &&
                product.category.toLowerCase() !== filters.category) {
                return false;
            }

            // Status filter
            if (filters.status !== 'all-status' &&
                product.status.toLowerCase().replace(/ /g, '-') !== filters.status) {
                return false;
            }

            // Stock filter
            if (filters.stock !== 'all-stock') {
                switch (filters.stock) {
                    case 'in-stock':
                        if (product.stock <= 0) return false;
                        break;
                    case 'out-of-stock':
                        if (product.stock > 0) return false;
                        break;
                    case 'low-stock':
                        if (product.stock >= 10) return false;
                        break;
                }
            }

            // Price range filter
            const price = parseFloat(product.price.replace('$', '').replace(',', ''));
            if (filters.priceRange !== 'all-prices') {
                switch (filters.priceRange) {
                    case '0-50':
                        if (price < 0 || price > 50) return false;
                        break;
                    case '50-200':
                        if (price <= 50 || price > 200) return false;
                        break;
                    case '200-500':
                        if (price <= 200 || price > 500) return false;
                        break;
                    case '500+':
                        if (price <= 500) return false;
                        break;
                }
            }

            // Date range filter would be implemented with actual date comparisons
            return true;
        });
    }, [searchTerm, filters]);

    // Get current page products
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    // Status badge colors
    const getStatusBadge = (status: string) => {
        const statusMap: any = {
            'Active': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
            'Inactive': { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
            'Out of Stock': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
            'Low Stock': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
            'Draft': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
        };
        return statusMap[status] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
    };

    // Stock badge colors
    const getStockBadge = (stock: number) => {
        if (stock === 0) {
            return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', label: 'Out of Stock' };
        } else if (stock < 10) {
            return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'Low Stock' };
        } else {
            return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'In Stock' };
        }
    };

    // Category badge colors
    const getCategoryBadge = (category: string) => {
        const categoryMap: any = {
            'Electronics': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
            'Footwear': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
            'Fitness': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
            'Accessories': { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
            'Clothing': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
            'Office': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
        };
        return categoryMap[category] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
    };

    const handlePageChange = (page: number) => setCurrentPage(page);
    const handleRowsPerPageChange = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1);
    };

    const clearAllFilters = () => {
        setFilters({
            category: 'all-categories',
            status: 'all-status',
            stock: 'all-stock',
            priceRange: 'all-prices',
            dateRange: 'all-time'
        });
        setSearchTerm('');
    };

    const handleExport = () => {
        console.log('Exporting product data...');
        // Export functionality would go here
    };

    const handleViewProduct = (product: Product) => {
        console.log('View product:', product);
        // Navigate to product detail page or open modal
    };

    const handleEditProduct = (product: Product) => {
        console.log('Edit product:', product);
        // Open edit modal
    };

    const handleDeleteProduct = (product: Product) => {
        console.log('Delete product:', product);
        // Show delete confirmation
        if (confirm(`Delete product "${product.name}"? This action cannot be undone.`)) {
            console.log('Product deleted');
        }
    };

    const hasActiveFilters = Object.values(filters).some(value =>
        value !== 'all-categories' &&
        value !== 'all-status' &&
        value !== 'all-stock' &&
        value !== 'all-prices' &&
        value !== 'all-time'
    );

    return (
        <div className="h-[calc(100dvh-120px)] w-full overflow-y-auto p-4">
            {/* Search and Filter Section */}
            <div className="bg-white border border-foreground/10 rounded-xl p-6 mb-8">
                {/* Search Bar */}
                <div className="mb-6">
                    <div className="max-w-lg relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
                        <input
                            type="text"
                            placeholder="Search by product name, SKU, category..."
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
                        {/* Category Filter */}
                        <div className="min-w-[140px]">
                            <Select
                                value={filters.category}
                                onValueChange={(value) => setFilters({ ...filters, category: value })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categoryOptions.map((option) => (
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
                                    {productStatusOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Stock Filter */}
                        <div className="min-w-[140px]">
                            <Select
                                value={filters.stock}
                                onValueChange={(value) => setFilters({ ...filters, stock: value })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Stock" />
                                </SelectTrigger>
                                <SelectContent>
                                    {stockOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Price Range Filter */}
                        <div className="min-w-[140px]">
                            <Select
                                value={filters.priceRange}
                                onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Price Range" />
                                </SelectTrigger>
                                <SelectContent>
                                    {priceRangeOptions.map((option) => (
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
                        <Button className="bg-primary-dark hover:bg-primary-dark/90 text-white">
                            + Add New Product
                        </Button>
                    </div>
                </div>

                {/* Active Filters */}
                {hasActiveFilters && (
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-sm text-foreground/60">Active filters:</span>
                        <div className="flex flex-wrap gap-2">
                            {filters.category !== 'all-categories' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary-dark/5 text-primary-dark rounded-full text-sm border border-primary-dark/10">
                                    Category: {categoryOptions.find(opt => opt.value === filters.category)?.label}
                                    <button
                                        onClick={() => setFilters({ ...filters, category: 'all-categories' })}
                                        className="hover:text-primary-dark/60"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}

                            {filters.status !== 'all-status' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-sm border border-emerald-200">
                                    Status: {productStatusOptions.find(opt => opt.value === filters.status)?.label}
                                    <button
                                        onClick={() => setFilters({ ...filters, status: 'all-status' })}
                                        className="hover:text-emerald-900"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}

                            {filters.stock !== 'all-stock' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm border border-blue-200">
                                    Stock: {stockOptions.find(opt => opt.value === filters.stock)?.label}
                                    <button
                                        onClick={() => setFilters({ ...filters, stock: 'all-stock' })}
                                        className="hover:text-blue-900"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}

                            {filters.priceRange !== 'all-prices' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-800 rounded-full text-sm border border-purple-200">
                                    Price: {priceRangeOptions.find(opt => opt.value === filters.priceRange)?.label}
                                    <button
                                        onClick={() => setFilters({ ...filters, priceRange: 'all-prices' })}
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

            {/* Product Table */}
            <div className="bg-white border border-foreground/10 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-foreground/10 flex justify-between items-center">
                    <div className="text-sm font-medium text-foreground/70">
                        Showing {startIndex + 1} to {endIndex} of {filteredProducts.length} products
                    </div>
                    <div className="text-lg font-semibold text-foreground">
                        {filteredProducts.length} Products
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-primary-dark/5">
                                <TableHead className="font-semibold text-foreground py-4">Image</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Product Name</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">SKU</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Category</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Price</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Stock</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Status</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Added On</TableHead>
                                <TableHead className="font-semibold text-foreground py-4 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product) => {
                                    const statusBadge = getStatusBadge(product.status);
                                    const stockBadge = getStockBadge(product.stock);
                                    const categoryBadge = getCategoryBadge(product.category);

                                    return (
                                        <TableRow
                                            key={product.id}
                                            className="border-foreground/10 hover:bg-primary/5 transition-colors"
                                        >
                                            {/* Image */}
                                            <TableCell>
                                                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                                    {product.image ? (
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <ImageIcon className="w-6 h-6 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>

                                            {/* Product Name */}
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <div className="font-medium text-foreground">{product.name}</div>
                                                    <div className="text-sm text-foreground/60 line-clamp-1">
                                                        {product.description}
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* SKU */}
                                            <TableCell className="font-mono text-sm text-foreground/70">
                                                {product.sku}
                                            </TableCell>

                                            {/* Category */}
                                            <TableCell>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryBadge.bg} ${categoryBadge.text} border ${categoryBadge.border}`}>
                                                    {product.category}
                                                </span>
                                            </TableCell>

                                            {/* Price */}
                                            <TableCell className="font-semibold text-emerald-600">
                                                {product.price}
                                            </TableCell>

                                            {/* Stock */}
                                            <TableCell>
                                                <div className="flex flex-col gap-1">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${stockBadge.bg} ${stockBadge.text} border ${stockBadge.border}`}>
                                                        {stockBadge.label}
                                                    </span>
                                                    <span className="text-sm text-foreground/70">
                                                        {product.stock} units
                                                    </span>
                                                </div>
                                            </TableCell>

                                            {/* Status */}
                                            <TableCell>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text} border ${statusBadge.border}`}>
                                                    {product.status}
                                                </span>
                                            </TableCell>

                                            {/* Added On */}
                                            <TableCell className="text-sm text-foreground/70">
                                                {product.addedOn}
                                            </TableCell>

                                            {/* Actions */}
                                            <TableCell className="text-right py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleViewProduct(product);
                                                        }}
                                                        className="p-1.5 text-foreground/60 hover:text-primary-dark hover:bg-primary-dark/5 rounded transition-colors"
                                                        title="View"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEditProduct(product);
                                                        }}
                                                        className="p-1.5 text-foreground/60 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
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
                                                            <DropdownMenuItem onClick={() => handleViewProduct(product)}>
                                                                <Eye className="w-4 h-4 mr-2" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                                                                <Edit className="w-4 h-4 mr-2" />
                                                                Edit Product
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                Duplicate Product
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                Update Inventory
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleDeleteProduct(product)}
                                                                className="text-rose-600"
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-2" />
                                                                Delete Product
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
                                    <TableCell colSpan={9} className="text-center py-12">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="text-foreground/60">No products found</div>
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
            {filteredProducts.length > 0 && (
                <div className="mt-6">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        rowsPerPage={rowsPerPage}
                        totalUsers={filteredProducts.length}
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

export default ProductsPage;