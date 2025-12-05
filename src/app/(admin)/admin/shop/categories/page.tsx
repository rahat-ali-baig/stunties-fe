"use client";

import { useState, useMemo } from 'react';
import { Search, X, Plus, Edit, Trash2, Image as ImageIcon, ChevronDown, MoreVertical } from 'lucide-react';
import PrimaryButton from '@/components/addons/PrimaryButton';
import CustomSelect from '@/components/addons/CustomSelect';
import CustomTable, { Column } from '@/components/addons/CustomTable';
import { MdDeleteOutline } from 'react-icons/md';

interface Category {
    id: string;
    name: string;
    productsCount: string;
    status: 'Active' | 'Disabled';
    createdOn: string;
    description?: string;
    icon?: string;
}

const sampleCategories: Category[] = [
    { id: '1', name: 'Electronics', productsCount: '89 products', status: 'Active', createdOn: 'Oct 15, 2025' },
    { id: '2', name: 'Footwear', productsCount: '56 products', status: 'Active', createdOn: 'Oct 10, 2025' },
    { id: '3', name: 'Accessories', productsCount: '42 products', status: 'Active', createdOn: 'Sep 28, 2025' },
    { id: '4', name: 'Bags', productsCount: '31 products', status: 'Active', createdOn: 'Sep 20, 2025' },
    { id: '5', name: 'Home', productsCount: '16 products', status: 'Disabled', createdOn: 'Sep 12, 2025' },
];

const statusOptions = [
    { value: 'all-status', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'disabled', label: 'Disabled' },
];

const CategoriesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        status: 'all-status',
        dateRange: 'all-time'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filteredCategories = useMemo(() => {
        return sampleCategories.filter((category) => {
            if (searchTerm &&
                !category.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            if (filters.status !== 'all-status' &&
                category.status.toLowerCase() !== filters.status) {
                return false;
            }

            return true;
        });
    }, [searchTerm, filters]);

    const columns: Column<Category>[] = [
        {
            key: 'name',
            title: 'Category Name',
            dataIndex: 'name',
            sortable: true,
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (name) => (
                <div className="space-y-1">
                    <div className="font-medium text-foreground">{name}</div>
                    <div className="text-sm text-foreground/60">Category description here</div>
                </div>
            ),
        },
        {
            key: 'productsCount',
            title: 'Products Count',
            dataIndex: 'productsCount',
            sortable: true,
            sorter: (a, b) => {
                const countA = parseInt(a.productsCount);
                const countB = parseInt(b.productsCount);
                return countA - countB;
            },
            render: (count) => (
                <span className="font-medium text-foreground">{count}</span>
            ),
        },
        {
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
        },
        {
            key: 'createdOn',
            title: 'Created On',
            dataIndex: 'createdOn',
            sortable: true,
            sorter: (a, b) => new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime(),
        },
    ];

    const customActions = (record: Category) => {
        const handleEditCategory = () => console.log('Edit category:', record);
        const handleDeleteCategory = () => {
            if (confirm(`Delete category "${record.name}"? This will affect ${record.productsCount}.`)) {
                console.log('Category deleted');
            }
        };

        return (
            <div className="flex items-center justify-end gap-1">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleEditCategory();
                    }}
                    className="p-1.5 text-foreground/60 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit"
                >
                    <Edit className="w-4 h-4" />
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory();
                    }}
                    className="p-1.5 text-foreground/60 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
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
            status: 'all-status',
            dateRange: 'all-time'
        });
        setSearchTerm('');
        setCurrentPage(1);
    };

    return (
        <div className="h-[calc(100dvh-120px)] w-full overflow-y-auto p-4">
            {/* Top Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Categories</h1>
                    <p className="text-sm text-foreground/60 mt-1">
                        Manage and organize shop categories
                    </p>
                </div>

                <PrimaryButton
                    variant="primary"
                    icon={Plus}
                    onClick={() => console.log('Add new category')}
                    className="whitespace-nowrap"
                >
                    Add Category
                </PrimaryButton>
            </div>

            {/* Filters Row */}
            <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                {/* Search Bar */}
                <div className="max-w-lg w-full">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            className="w-full h-10 pl-10 pr-2 text-sm bg-background border border-foreground/30 rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-primary-dark transition-all"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>

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
            </div>

            <CustomTable<Category>
                data={filteredCategories}
                columns={columns}
                rowKey="id"
                pagination={true}
                showPagination={true}
                pageSize={rowsPerPage}
                pageSizeOptions={[5, 10, 20, 50]}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                current={currentPage}
                total={filteredCategories.length}
                customActions={customActions}
                bordered
                size="middle"
                emptyText={
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                        <div className="text-foreground/60">No categories found</div>
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

export default CategoriesPage;