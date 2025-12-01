"use client";

import React from "react";
import { Search, Filter } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenFilters: () => void;
  activeFilterCount: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenFilters,
  activeFilterCount,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="max-w-md flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
        <input
          type="text"
          placeholder="Search by name, email, or user ID..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-12 pl-12 pr-4 bg-background border border-foreground/30 rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-dark/80 focus:border-primary-dark/20 transition-all"
        />
      </div>

      <button
        onClick={onOpenFilters}
        className="relative h-12 px-5 flex items-center gap-2 bg-background hover:bg-primary-dark/10 border border-foreground/10 rounded-xl text-foreground font-medium transition-all"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs bg-primary-dark text-background rounded-full font-semibold">
            {activeFilterCount}
          </div>
        )}
      </button>
    </div>
  );
};

export default SearchBar;