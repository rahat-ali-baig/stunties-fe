"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Select from "react-select";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  totalUsers: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (value: number) => void;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  showTotalCount?: boolean;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  totalUsers,
  startIndex,
  endIndex,
  onPageChange,
  onRowsPerPageChange,
  pageSizeOptions = [5, 10, 20, 50],
  showPageSizeSelector = true,
  showTotalCount = true,
  className = "",
}) => {
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: 'var(--color-background)',
      border: '1px solid #09090930',
      borderRadius: '0.5rem',
      minHeight: '36px',
      fontSize: '14px',
      cursor: 'pointer',
      '&:hover': {
        borderColor: '#435c00',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'white',
      border: '1px solid #D7FF66',
      borderRadius: '0.375rem',
      marginBottom: '4px',
      marginTop: '0',
      fontSize: '14px',
    }),
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: 9999,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#D7FF66'
        : state.isFocused
          ? 'rgba(67, 92, 0, 0.1)'
          : 'transparent',
      color: 'var(--color-foreground)',
      '&:hover': {
        backgroundColor: 'rgba(67, 92, 0, 0.1)',
        color: 'var(--color-foreground)',
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'var(--color-foreground)',
    }),
    input: (provided: any) => ({
      ...provided,
      color: 'var(--color-foreground)',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: 'rgba(9, 9, 9, 0.6)',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: 'rgba(9, 9, 9, 0.5)',
      '&:hover': {
        color: 'var(--color-foreground)',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      color: 'rgba(9, 9, 9, 0.5)',
      '&:hover': {
        color: 'var(--color-foreground)',
      },
    }),
  };

  const handleFirstPage = () => onPageChange(1);
  const handleLastPage = () => onPageChange(totalPages);
  const handlePreviousPage = () => currentPage > 1 && onPageChange(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && onPageChange(currentPage + 1);

  return (
    <div className={`flex items-center justify-between pt-4 ${className}`}>
      <div className="flex items-center gap-3">
        {showPageSizeSelector && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground/60">Rows per page:</span>
            <div className="w-20">
              <Select
                options={pageSizeOptions.map(option => ({
                  value: option,
                  label: option.toString(),
                }))}
                value={{ value: rowsPerPage, label: rowsPerPage.toString() }}
                onChange={(selectedOption) => onRowsPerPageChange(selectedOption?.value || 10)}
                isSearchable={false}
                styles={customStyles}
                menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                menuPlacement="top"
                components={{
                  IndicatorSeparator: () => null,
                }}
                classNamePrefix="react-select"
              />
            </div>
          </div>
        )}
        
        {showTotalCount && (
          <span className="text-sm text-foreground/60">
            {startIndex + 1} - {endIndex} of {totalUsers}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={handleFirstPage}
          disabled={currentPage === 1}
          className="p-2 rounded-md hover:bg-foreground/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-foreground/30"
          title="First page"
        >
          <ChevronsLeft className="w-4 h-4 text-foreground/80" />
        </button>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="p-2 rounded-md hover:bg-foreground/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-foreground/30"
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4 text-foreground/80" />
        </button>

        <div className="flex items-center gap-1 mx-2">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            if (pageNum > 0 && pageNum <= totalPages) {
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-colors border ${currentPage === pageNum
                    ? "bg-primary text-foreground border-primary"
                    : "text-foreground/80 border-foreground/30 hover:bg-foreground/10"
                    }`}
                >
                  {pageNum}
                </button>
              );
            }
            return null;
          })}
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md hover:bg-foreground/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-foreground/30"
          title="Next page"
        >
          <ChevronRight className="w-4 h-4 text-foreground/80" />
        </button>
        <button
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md hover:bg-foreground/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-foreground/30"
          title="Last page"
        >
          <ChevronsRight className="w-4 h-4 text-foreground/80" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;