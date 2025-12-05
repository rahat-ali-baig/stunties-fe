"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";
import Pagination from "./Pagination";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex?: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: number | string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  sorter?: (a: T, b: T) => number;
}

export interface TableProps<T> {
  // Data & Columns
  data: T[];
  columns: Column<T>[];
  rowKey?: string | ((record: T) => string);

  // Pagination
  pagination?: boolean | PaginationConfig;
  showPagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  showSizeChanger?: boolean;

  // Interaction
  onRowClick?: (record: T, index: number) => void;
  onPageChange?: (page: number, pageSize: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onSort?: (key: string, direction: "asc" | "desc" | null) => void;

  // Customization
  emptyText?: React.ReactNode;
  loading?: boolean;
  scroll?: { x?: number | string; y?: number | string };
  bordered?: boolean;
  size?: "small" | "middle" | "large";
  className?: string;
  headerClassName?: string;
  rowClassName?: string | ((record: T, index: number) => string);
  customActions?: (record: T) => React.ReactNode;

  // Controlled props
  total?: number;
  current?: number;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  sortConfig?: SortConfig;

  // New props for Pagination component
  showPageSizeSelector?: boolean;
  showTotalCount?: boolean;
  paginationClassName?: string;
}

interface PaginationConfig {
  pageSize?: number;
  current?: number;
  total?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  pageSizeOptions?: number[];
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  showPageSizeSelector?: boolean;
  showTotalCount?: boolean;
  className?: string;
}

interface SortConfig {
  key: string;
  direction: "asc" | "desc" | null;
}

const DefaultEmpty = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="text-foreground/60">No data available</div>
  </div>
);

function CustomTable<T extends Record<string, any>>({
  // Data & Columns
  data,
  columns,
  rowKey = "id",

  // Pagination
  pagination = true,
  showPagination = true,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  showSizeChanger = true,

  // Interaction
  onRowClick,
  onPageChange,
  onPageSizeChange,
  onSort,

  // Customization
  emptyText = <DefaultEmpty />,
  loading = false,
  scroll,
  bordered = true,
  size = "middle",
  className = "",
  headerClassName = "",
  rowClassName = "",
  customActions,

  // Controlled props
  total,
  current = 1,
  showTotal,
  sortConfig,

  // New Pagination props
  showPageSizeSelector = true,
  showTotalCount = true,
  paginationClassName = "",
}: TableProps<T>) {
  const [internalPage, setInternalPage] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(pageSize);
  const [internalSort, setInternalSort] = useState<SortConfig | null>(
    sortConfig || null
  );

  // Determine if controlled or uncontrolled
  const isControlled = total !== undefined && current !== undefined;
  const currentPage = isControlled ? current : internalPage;
  const currentPageSize = internalPageSize;
  
  // CRITICAL FIX: When controlled, totalItems should be the total prop, not data.length
  const totalItems = isControlled ? total : data.length;

  // Calculate pagination values
  const totalPages = Math.max(1, Math.ceil(totalItems / currentPageSize));
  const startIndex = (currentPage - 1) * currentPageSize;
  const endIndex = Math.min(startIndex + currentPageSize, totalItems);

  // Sorting handler
  const handleSort = (key: string, sorter?: (a: T, b: T) => number) => {
    if (!onSort && !sorter) return;

    let newDirection: "asc" | "desc" | null = "asc";
    if (internalSort?.key === key) {
      if (internalSort.direction === "asc") {
        newDirection = "desc";
      } else if (internalSort.direction === "desc") {
        newDirection = null;
      }
    } else {
      newDirection = "asc";
    }

    const newSortConfig = newDirection ? { key, direction: newDirection } : null;
    setInternalSort(newSortConfig);

    if (onSort) {
      onSort(key, newDirection);
    }
  };

  // Apply sorting to data
  const sortedData = useMemo(() => {
    if (!internalSort || !internalSort.direction) return data;

    const column = columns.find(col => col.key === internalSort?.key);
    if (!column) return data;

    return [...data].sort((a, b) => {
      if (column.sorter) {
        return internalSort.direction === "asc"
          ? column.sorter(a, b)
          : -column.sorter(a, b);
      }

      const aValue = column.dataIndex ? a[column.dataIndex] : a[column.key];
      const bValue = column.dataIndex ? b[column.dataIndex] : b[column.key];

      if (aValue < bValue) return internalSort.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return internalSort.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, internalSort, columns]);

  // Get data for current page - FIXED: Always use pagination logic
  const displayedData = useMemo(() => {
    // If pagination is disabled, show all sorted data
    if (!pagination) return sortedData;
    
    // If controlled mode, we should get the current page data from props
    // In uncontrolled mode, slice the sorted data
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, pagination, startIndex, endIndex]);

  // Page change handler
  const handlePageChange = (page: number) => {
    if (isControlled) {
      onPageChange?.(page, currentPageSize);
    } else {
      setInternalPage(page);
    }
  };

  // Page size change handler
  const handlePageSizeChange = (newPageSize: number) => {
    setInternalPageSize(newPageSize);
    setInternalPage(1);
    onPageSizeChange?.(newPageSize);
    if (isControlled) {
      onPageChange?.(1, newPageSize);
    }
  };

  // Helper functions
  const getRowKey = (record: T, index: number) => {
    if (typeof rowKey === "function") {
      return rowKey(record);
    }
    return record[rowKey] || `row-${index}`;
  };

  const getCellContent = (column: Column<T>, record: T, index: number) => {
    if (column.render) {
      return column.render(
        column.dataIndex ? record[column.dataIndex] : record[column.key],
        record,
        index
      );
    }
    return column.dataIndex
      ? record[column.dataIndex]
      : record[column.key];
  };

  const getRowClassName = (record: T, index: number) => {
    const baseClass = "border-foreground/10 hover:bg-primary/5 transition-colors";
    const customClass = typeof rowClassName === "function"
      ? rowClassName(record, index)
      : rowClassName;

    return `${baseClass} ${customClass || ""}`.trim();
  };

  const getPaddingClass = () => {
    switch (size) {
      case "small": return "py-2";
      case "large": return "py-6";
      default: return "py-4";
    }
  };

  // Get sorting icon for column
  const getSortIcon = (columnKey: string) => {
    if (!columns.find(col => col.key === columnKey)?.sortable) return null;
    
    if (internalSort?.key === columnKey) {
      return internalSort.direction === "asc" ? (
        <ChevronUp className="w-4 h-4 text-primary" />
      ) : (
        <ChevronDown className="w-4 h-4 text-primary" />
      );
    }
    return <ArrowUpDown className="w-3 h-3 text-foreground/40" />;
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-foreground/60">Loading...</div>
      </div>
    );
  }

  const hasData = data.length > 0;
  const hasDisplayData = displayedData.length > 0;
  const colSpan = columns.length + (customActions ? 1 : 0);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Table Container */}
      <div
        className={`${bordered ? "border border-foreground/20 rounded-lg overflow-hidden bg-white" : ""}`}
        style={{
          maxWidth: scroll?.x ? "100%" : undefined,
          overflowX: scroll?.x ? "auto" : undefined,
        }}
      >
        <Table>
          {/* Table Header */}
          <TableHeader>
            <TableRow className={`bg-primary-dark/10 ${headerClassName}`}>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={`font-semibold text-foreground ${getPaddingClass()}`}
                  style={{
                    width: column.width,
                    textAlign: column.align || "left",
                    cursor: column.sortable ? "pointer" : "default",
                  }}
                  onClick={() => column.sortable && handleSort(column.key, column.sorter)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <div className="flex items-center">
                        {getSortIcon(column.key)}
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}
              {customActions && (
                <TableHead className={`font-semibold text-foreground ${getPaddingClass()} text-right`}>
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {!hasData ? (
              <TableRow>
                <TableCell colSpan={colSpan} className="text-center py-12">
                  {emptyText}
                </TableCell>
              </TableRow>
            ) : !hasDisplayData ? (
              <TableRow>
                <TableCell colSpan={colSpan} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-foreground/60">No matching records found</div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              displayedData.map((record, index) => (
                <TableRow
                  key={getRowKey(record, index)}
                  className={getRowClassName(record, index)}
                  onClick={() => onRowClick?.(record, index)}
                  style={{ cursor: onRowClick ? "pointer" : "default" }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={`${getRowKey(record, index)}-${column.key}`}
                      className={getPaddingClass()}
                      style={{
                        textAlign: column.align || "left",
                      }}
                    >
                      {getCellContent(column, record, index)}
                    </TableCell>
                  ))}
                  {customActions && (
                    <TableCell className={`${getPaddingClass()} text-right`}>
                      {customActions(record)}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination - Always show if pagination is enabled and we have data */}
      {pagination && showPagination && hasData && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={currentPageSize}
          totalUsers={totalItems}
          startIndex={startIndex}
          endIndex={endIndex}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handlePageSizeChange}
          pageSizeOptions={pageSizeOptions}
          showPageSizeSelector={showPageSizeSelector}
          showTotalCount={showTotalCount}
          className={paginationClassName}
        />
      )}
    </div>
  );
}

export default CustomTable;