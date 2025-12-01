"use client";

import React, { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { Check } from "lucide-react";
import { VerificationFilters } from "@/types/verification";

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: VerificationFilters;
  onFilterChange: (filters: VerificationFilters) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
  onApplyFilters,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const toggleArrayFilter = (category: "verificationStatus" | "userType", value: string) => {
    const currentArray = filters[category];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    onFilterChange({ ...filters, [category]: newArray });
  };

  const toggleBooleanFilter = (category: "hasPortfolio" | "hasDocuments", value: boolean | null) => {
    onFilterChange({
      ...filters,
      [category]: filters[category] === value ? null : value
    });
  };

  const hasActiveFilters = Object.values(filters).some(v =>
    Array.isArray(v) ? v.length > 0 : v !== null && v !== ""
  );

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className="fixed right-0 top-0 h-full w-[480px] bg-background border-l border-foreground/20 z-50 rounded-l-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-foreground/20">
          <div className="flex items-center justify-between">
            <h3 className="text-xl xl:text-2xl text-foreground">Filter Verification Requests</h3>
            <div className="flex items-center gap-4">
              {hasActiveFilters && (
                <button
                  onClick={onClearFilters}
                  className="px-4 py-2 text-sm text-primary-dark/90 hover:text-primary-dark/60 cursor-pointer font-medium transition-colors"
                >
                  Clear all filters
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-primary-dark/10 transition-colors border border-foreground/30"
              >
                <FaTimes className="w-4 h-4 text-foreground/70" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Content */}
        <div className="h-[calc(100vh-170px)] overflow-y-auto custom-scrollbar p-6 space-y-6">
          {/* Verification Status */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Verification Status</h4>
            <div className="space-y-2">
              {["Pending", "Under Review", "More Info Requested", "Approved", "Rejected"].map((status) => (
                <label
                  key={status}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-dark/10 cursor-pointer transition-colors"
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${filters.verificationStatus.includes(status)
                    ? 'bg-primary-dark border-primary-dark'
                    : 'border-foreground/30'
                    }`}>
                    {filters.verificationStatus.includes(status) && (
                      <Check className="w-3 h-3 text-background" />
                    )}
                  </div>
                  <span className="text-sm text-foreground/70">{status}</span>
                  <input
                    type="checkbox"
                    checked={filters.verificationStatus.includes(status)}
                    onChange={() => toggleArrayFilter('verificationStatus', status)}
                    className="sr-only"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* User Type */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">User Type</h4>
            <div className="space-y-2">
              {["Stunt Performer", "Talent Seeker"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-dark/10 cursor-pointer transition-colors"
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${filters.userType.includes(type)
                    ? 'bg-primary-dark border-primary-dark'
                    : 'border-foreground/30'
                    }`}>
                    {filters.userType.includes(type) && (
                      <Check className="w-3 h-3 text-background" />
                    )}
                  </div>
                  <span className="text-sm text-foreground/70">{type}</span>
                  <input
                    type="checkbox"
                    checked={filters.userType.includes(type)}
                    onChange={() => toggleArrayFilter('userType', type)}
                    className="sr-only"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Portfolio Status */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Portfolio & Media</h4>
            <div className="flex gap-2">
              {[
                { value: true, label: "Has Portfolio" },
                { value: false, label: "No Portfolio" },
                { value: null, label: "Any" }
              ].map((option) => (
                <button
                  key={option.label}
                  onClick={() => toggleBooleanFilter("hasPortfolio", option.value)}
                  className={`px-4 py-2 text-sm rounded-lg font-medium transition-all border ${filters.hasPortfolio === option.value
                    ? 'bg-primary-dark/10 text-primary-dark border-primary-dark/20'
                    : 'bg-background text-foreground/70 border-foreground/30 hover:bg-primary-dark/10'
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Documents Status */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Supporting Documents</h4>
            <div className="flex gap-2">
              {[
                { value: true, label: "Has Documents" },
                { value: false, label: "No Documents" },
                { value: null, label: "Any" }
              ].map((option) => (
                <button
                  key={option.label}
                  onClick={() => toggleBooleanFilter("hasDocuments", option.value)}
                  className={`px-4 py-2 text-sm rounded-lg font-medium transition-all border ${filters.hasDocuments === option.value
                    ? 'bg-primary-dark/10 text-primary-dark border-primary-dark/20'
                    : 'bg-background text-foreground/70 border-foreground/30 hover:bg-primary-dark/10'
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submitted Date */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Submitted Date</h4>
            <input
              type="date"
              value={filters.submittedDate}
              onChange={(e) => onFilterChange({ ...filters, submittedDate: e.target.value })}
              className="w-full h-12 px-4 bg-background border border-foreground/30 rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-dark/80 focus:border-primary-dark/20 transition-all"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-foreground/20 bg-background">
          <button
            onClick={onApplyFilters}
            className="w-full py-3 bg-primary-dark text-background rounded-lg font-semibold hover:bg-primary-dark/90 transition-all"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;