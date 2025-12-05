"use client";

import { useState, useMemo } from 'react';
import { Search, X, Download, Eye, MoreHorizontal, Edit, Trash2, Image as ImageIcon, Plus } from 'lucide-react';
import PrimaryButton from '@/components/addons/PrimaryButton';
import CustomSelect from '@/components/addons/CustomSelect';
import CustomTable, { Column } from '@/components/addons/CustomTable';
import MetricsSlider from '@/components/addons/MetricsSlider';
import { categoryOptions, dateRangeOptions, priceRangeOptions, productMetricesData, productStatusOptions, sampleProducts, stockOptions } from '@/constants';
import { MdDeleteOutline } from 'react-icons/md';

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

    const filteredProducts = useMemo(() => {
        return sampleProducts.filter((product) => {
            if (searchTerm &&
                !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !product.sku.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !product.category.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            if (filters.category !== 'all-categories' &&
                product.category.toLowerCase() !== filters.category) {
                return false;
            }

            if (filters.status !== 'all-status' &&
                product.status.toLowerCase().replace(/ /g, '-') !== filters.status) {
                return false;
            }

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

            return true;
        });
    }, [searchTerm, filters]);

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

    const columns: Column<Product>[] = [
        {
            key: 'image',
            title: 'Image',
            width: 80,
            render: (_, record) => (
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                    {record.image ? (
                        <img
                            src={record.image}
                            alt={record.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: 'name',
            title: 'Product Name',
            dataIndex: 'name',
            sortable: true,
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            key: 'category',
            title: 'Category',
            dataIndex: 'category',
            sortable: true,
            sorter: (a, b) => a.category.localeCompare(b.category),
            render: (category) => {
                const badge = getCategoryBadge(category);
                return (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text} border ${badge.border}`}>
                        {category}
                    </span>
                );
            },
        },
        {
            key: 'price',
            title: 'Price',
            dataIndex: 'price',
            sortable: true,
            sorter: (a, b) => {
                const priceA = parseFloat(a.price.replace('$', '').replace(',', ''));
                const priceB = parseFloat(b.price.replace('$', '').replace(',', ''));
                return priceA - priceB;
            },
            render: (price) => (
                <span className="font-semibold text-emerald-600">{price}</span>
            ),
        },
        {
            key: 'stock',
            title: 'Stock',
            dataIndex: 'stock',
            sortable: true,
            sorter: (a, b) => a.stock - b.stock,
            render: (stock) => (
                <span className="text-sm text-foreground/70">
                    {stock} units
                </span>
            ),
        },
        {
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
            sortable: true,
            sorter: (a, b) => a.status.localeCompare(b.status),
            render: (status) => {
                const badge = getStatusBadge(status);
                return (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text} border ${badge.border}`}>
                        {status}
                    </span>
                );
            },
        },
        {
            key: 'addedOn',
            title: 'Added On',
            dataIndex: 'addedOn',
            sortable: true,
            sorter: (a, b) => new Date(a.addedOn).getTime() - new Date(b.addedOn).getTime(),
        },
    ];

    const customActions = (record: Product) => {
        const handleEditProduct = () => console.log('Edit product:', record);
        const handleDeleteProduct = () => {
            if (confirm(`Delete product "${record.name}"?`)) {
                console.log('Product deleted');
            }
        };

        return (
            <div className="flex items-center justify-end gap-1">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleEditProduct();
                    }}
                    className="p-1.5 text-foreground/60 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit"
                >
                    <Edit className="w-4 h-4" />
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProduct();
                    }}
                    className="p-1.5 text-foreground/60 hover:text-primary-dark hover:bg-primary-dark/5 rounded transition-colors"
                    title="View"
                >
                    <MdDeleteOutline className="w-4 h-4" />
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
            category: 'all-categories',
            status: 'all-status',
            stock: 'all-stock',
            priceRange: 'all-prices',
            dateRange: 'all-time'
        });
        setSearchTerm('');
        setCurrentPage(1);
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
            {/* Top Section */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">Products</h1>
                        <p className="text-sm text-foreground/60 mt-1">
                            Manage your shop products, inventory, and pricing
                        </p>
                    </div>

                    <PrimaryButton
                        variant="primary"
                        icon={Plus}
                        onClick={() => console.log('Add new product')}
                        className="whitespace-nowrap"
                    >
                        Add Product
                    </PrimaryButton>
                </div>

                {/* Search Bar */}
                <div className="max-w-lg">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
                        <input
                            type="text"
                            placeholder="Search by product name, SKU, category..."
                            className="w-full h-10 pl-10 pr-2 text-sm bg-background border border-foreground/30 rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-primary-dark transition-all"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Metrics Slider */}
            <div className="mb-8">
                <MetricsSlider cards={productMetricesData} />
            </div>

            {/* Filters Section */}
            <div className="mb-8">
                {/* Filters Row */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <div className="text-sm text-foreground/60">Filters:</div>

                    <div className="flex flex-wrap gap-3">
                        {/* Category Filter */}
                        <div className="min-w-[140px]">
                            <CustomSelect
                                value={filters.category}
                                onChange={(value: any) => {
                                    setFilters({ ...filters, category: value });
                                    setCurrentPage(1);
                                }}
                                options={categoryOptions}
                                placeholder="Category"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="min-w-[140px]">
                            <CustomSelect
                                value={filters.status}
                                onChange={(value: any) => {
                                    setFilters({ ...filters, status: value });
                                    setCurrentPage(1);
                                }}
                                options={productStatusOptions}
                                placeholder="Status"
                            />
                        </div>

                        {/* Stock Filter */}
                        <div className="min-w-[140px]">
                            <CustomSelect
                                value={filters.stock}
                                onChange={(value: any) => {
                                    setFilters({ ...filters, stock: value });
                                    setCurrentPage(1);
                                }}
                                options={stockOptions}
                                placeholder="Stock"
                            />
                        </div>

                        {/* Price Range Filter */}
                        <div className="min-w-[140px]">
                            <CustomSelect
                                value={filters.priceRange}
                                onChange={(value: any) => {
                                    setFilters({ ...filters, priceRange: value });
                                    setCurrentPage(1);
                                }}
                                options={priceRangeOptions}
                                placeholder="Price Range"
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
                                placeholder="Date Added"
                            />
                        </div>
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
                                        onClick={() => {
                                            setFilters({ ...filters, category: 'all-categories' });
                                            setCurrentPage(1);
                                        }}
                                        className="hover:text-primary-dark/60 ml-1"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}

                            {filters.status !== 'all-status' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-sm border border-emerald-200">
                                    Status: {productStatusOptions.find(opt => opt.value === filters.status)?.label}
                                    <button
                                        onClick={() => {
                                            setFilters({ ...filters, status: 'all-status' });
                                            setCurrentPage(1);
                                        }}
                                        className="hover:text-emerald-900 ml-1"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}

                            {filters.stock !== 'all-stock' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm border border-blue-200">
                                    Stock: {stockOptions.find(opt => opt.value === filters.stock)?.label}
                                    <button
                                        onClick={() => {
                                            setFilters({ ...filters, stock: 'all-stock' });
                                            setCurrentPage(1);
                                        }}
                                        className="hover:text-blue-900 ml-1"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}

                            {filters.priceRange !== 'all-prices' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-800 rounded-full text-sm border border-purple-200">
                                    Price: {priceRangeOptions.find(opt => opt.value === filters.priceRange)?.label}
                                    <button
                                        onClick={() => {
                                            setFilters({ ...filters, priceRange: 'all-prices' });
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
            </div>

            <CustomTable<Product>
                data={filteredProducts}
                columns={columns}
                rowKey="id"
                pagination={true}
                showPagination={true}
                pageSize={rowsPerPage}
                pageSizeOptions={[6, 12, 50, 100]}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                current={currentPage}
                total={filteredProducts.length}
                customActions={customActions}
                bordered
                size="middle"
                emptyText={
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                        <div className="text-foreground/60">No products found</div>
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

export default ProductsPage;