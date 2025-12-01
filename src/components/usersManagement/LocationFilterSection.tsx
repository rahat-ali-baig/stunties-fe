'use client';
import { useState, useEffect, useRef } from "react";
import { FaSearch, FaFilter, FaTimes, FaCheck } from "react-icons/fa";
import Select from 'react-select';
import { Country, City } from 'country-state-city';

interface FilterState {
    userStatus: string[];
    verificationStatus: string[];
    subscription: string[];
    country: string;
    city: string;
    recentActivity: string[];
    jobActivity: string[];
}

interface CountryOption {
    value: string;
    label: string;
}

interface CityOption {
    value: string;
    label: string;
}

interface LocationFilterSectionProps {
    onApplyFilters?: (filters: FilterState) => void;
    initialSearchQuery?: string;
    setSearchQuery: (value: string) => void;
    searchQuery: string;
    onSearchQueryChange?: (query: string) => void;
}

const LocationFilterSection: React.FC<LocationFilterSectionProps> = ({
    onApplyFilters,
    setSearchQuery,
    searchQuery,
    onSearchQueryChange,
}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [countries, setCountries] = useState<CountryOption[]>([]);
    const [cities, setCities] = useState<CityOption[]>([]);
    const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
    const [cityOptions, setCityOptions] = useState<CityOption[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [filters, setFilters] = useState<FilterState>({
        userStatus: [],
        verificationStatus: [],
        subscription: [],
        country: "",
        city: "",
        recentActivity: [],
        jobActivity: []
    });

    useEffect(() => {
        const allCountries = Country.getAllCountries();
        const formattedCountries = allCountries.map(country => ({
            value: country.isoCode,
            label: country.name
        }));
        setCountries(formattedCountries);
        setCountryOptions(formattedCountries);
    }, []);

    useEffect(() => {
        if (filters.country && filters.country !== "") {
            const countryCities = City.getCitiesOfCountry(filters.country);
            const formattedCities = countryCities?.map(city => ({
                value: city.name,
                label: city.name
            })) || [];
            setCities(formattedCities);
            setCityOptions(formattedCities);
            setFilters(prev => ({ ...prev, city: "" }));
        } else {
            setCities([]);
            setCityOptions([]);
        }
    }, [filters.country]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsFilterOpen(false);
            }
        };

        if (isFilterOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isFilterOpen]);

    const toggleArrayFilter = (category: keyof FilterState, value: string) => {
        setFilters(prev => {
            const currentArray = prev[category] as string[];
            const newArray = currentArray.includes(value)
                ? currentArray.filter(item => item !== value)
                : [...currentArray, value];
            return { ...prev, [category]: newArray };
        });
    };

    const handleApplyFilters = () => {
        console.log("Applied filters:", filters);
        if (onApplyFilters) {
            onApplyFilters(filters);
        }
        setIsFilterOpen(false);
    };

    const handleClearAllFilters = () => {
        setFilters({
            userStatus: [],
            verificationStatus: [],
            subscription: [],
            country: "",
            city: "",
            recentActivity: [],
            jobActivity: []
        });
        if (onApplyFilters) {
            onApplyFilters({
                userStatus: [],
                verificationStatus: [],
                subscription: [],
                country: "",
                city: "",
                recentActivity: [],
                jobActivity: []
            });
        }
    };

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        if (onSearchQueryChange) {
            onSearchQueryChange(value);
        }
    };

    const activeFilterCount =
        filters.userStatus.length +
        filters.verificationStatus.length +
        filters.subscription.length +
        filters.recentActivity.length +
        filters.jobActivity.length +
        (filters.country !== "" ? 1 : 0) +
        (filters.city !== "" ? 1 : 0);

    const hasFilters = activeFilterCount > 0;

    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: 'var(--color-background)',
            borderColor: state.isFocused ? 'var(--color-primary-dark)' : 'var(--color-primary-dark)',
            borderRadius: '0.5rem',
            padding: '2px 8px',
            minHeight: '44px',
            boxShadow: state.isFocused ? '0 0 0 2px rgba(67, 92, 0, 0.1)' : 'none',
            '&:hover': {
                borderColor: 'var(--color-primary-dark)',
            },
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: 'var(--color-background)',
            border: '1px solid var(--color-primary-dark)',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? 'var(--color-primary-dark)'
                : state.isFocused
                    ? 'rgba(67, 92, 0, 0.1)'
                    : 'transparent',
            color: state.isSelected ? 'var(--color-background)' : 'var(--color-foreground)',
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
        indicatorSeparator: (provided: any) => ({
            ...provided,
            backgroundColor: 'rgba(67, 92, 0, 0.2)',
        }),
        clearIndicator: (provided: any) => ({
            ...provided,
            color: 'rgba(9, 9, 9, 0.5)',
            '&:hover': {
                color: 'var(--color-foreground)',
            },
        }),
    };

    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between gap-3">
                <div className="max-w-md flex-1 relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
                    <input
                        type="text"
                        placeholder="Search by name, email, username..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 bg-background border border-foreground/30 rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-dark/80 focus:border-primary-dark/20 transition-all"
                    />
                </div>

                {/* Filter Button */}
                <button
                    onClick={() => setIsFilterOpen(true)}
                    className="relative h-12 px-5 flex items-center gap-2 bg-background hover:bg-primary-dark/10 border border-foreground/10 rounded-xl text-foreground font-medium transition-all"
                >
                    <FaFilter className="w-4 h-4" />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs bg-primary-dark text-background rounded-full font-semibold">
                            {activeFilterCount}
                        </div>
                    )}
                </button>
            </div>

            {isFilterOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
                        onClick={() => setIsFilterOpen(false)}
                    />

                    {/* Offcanvas Panel */}
                    <div
                        ref={dropdownRef}
                        className="fixed right-0 top-0 h-full w-[480px] bg-background border-l border-foreground/20 z-50 rounded-l-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-foreground/20">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl xl:text-2xl text-foreground">Filters</h3>
                                <div className="flex items-center gap-4">
                                    {/* Clear All Filters Button - Only shown when filters are applied */}
                                    {hasFilters && (
                                        <button
                                            onClick={handleClearAllFilters}
                                            className="px-4 py-2 text-sm text-primary-dark/90 hover:text-primary-dark/60 cursor-pointer font-medium transition-colors"
                                        >
                                            Clear all filters
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setIsFilterOpen(false)}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-primary-dark/10 transition-colors border border-foreground/30"
                                    >
                                        <FaTimes className="w-4 h-4 text-foreground/70" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Filters Content */}
                        <div className="h-[calc(100vh-170px)] overflow-y-auto custom-scrollbar p-6 space-y-6">

                            {/* User Status */}
                            <div>
                                <h4 className="text-sm font-medium text-foreground mb-3">User Status</h4>
                                <div className="flex gap-2">
                                    {["Active Users", "Deactivated Users"].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => toggleArrayFilter('userStatus', status)}
                                            className={`px-4 py-2 text-sm rounded-lg font-medium transition-all border ${filters.userStatus.includes(status)
                                                ? 'bg-primary-dark/10 text-primary-dark border-primary-dark/20'
                                                : 'bg-background text-foreground/70 border-foreground/30 hover:bg-primary-dark/10'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Verification Status */}
                            <div>
                                <h4 className="text-sm font-medium text-foreground mb-3">Verification Status</h4>
                                <div className="flex gap-2">
                                    {["Verified", "Pending", "Rejected"].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => toggleArrayFilter('verificationStatus', status)}
                                            className={`px-4 py-2 text-sm rounded-lg font-medium transition-all border ${filters.verificationStatus.includes(status)
                                                ? 'bg-primary-dark/10 text-primary-dark border-primary-dark/20'
                                                : 'bg-background text-foreground/70 border-foreground/30 hover:bg-primary-dark/10'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Subscription */}
                            <div>
                                <h4 className="text-sm font-medium text-foreground mb-3">Subscription</h4>
                                <div className="space-y-2">
                                    {["Free plan", "Pro plan", "Active boosts"].map(plan => (
                                        <label
                                            key={plan}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-dark/10 cursor-pointer transition-colors"
                                        >
                                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${filters.subscription.includes(plan)
                                                ? 'bg-primary-dark border-primary-dark'
                                                : 'border-foreground/30'
                                                }`}>
                                                {filters.subscription.includes(plan) && (
                                                    <FaCheck className="w-3 h-3 text-background" />
                                                )}
                                            </div>
                                            <span className="text-sm text-foreground/70">{plan}</span>
                                            <input
                                                type="checkbox"
                                                checked={filters.subscription.includes(plan)}
                                                onChange={() => toggleArrayFilter('subscription', plan)}
                                                className="sr-only"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <h4 className="text-sm font-medium text-foreground mb-3">Location</h4>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs text-foreground mb-1">Country</label>
                                        <Select
                                            options={countryOptions}
                                            value={countries.find(c => c.value === filters.country) || null}
                                            onChange={(selectedOption) => {
                                                setFilters(prev => ({
                                                    ...prev,
                                                    country: selectedOption?.value || "",
                                                    city: ""
                                                }));
                                            }}
                                            placeholder="Search or select country..."
                                            isClearable
                                            isSearchable
                                            styles={customStyles}
                                            className="text-foreground"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs text-foreground mb-1">City</label>
                                        <Select
                                            options={cityOptions}
                                            value={cities.find(c => c.value === filters.city) || null}
                                            onChange={(selectedOption) => {
                                                setFilters(prev => ({
                                                    ...prev,
                                                    city: selectedOption?.value || ""
                                                }));
                                            }}
                                            placeholder={filters.country ? "Search or select city..." : "Select a country first"}
                                            isDisabled={!filters.country}
                                            isClearable
                                            isSearchable
                                            styles={customStyles}
                                            className="text-foreground"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div>
                                <h4 className="text-sm font-medium text-foreground mb-3">Recent Activity</h4>
                                <div className="flex gap-2">
                                    {["Active in last 24h", "Active in last 7 days"].map(activity => (
                                        <button
                                            key={activity}
                                            onClick={() => toggleArrayFilter('recentActivity', activity)}
                                            className={`px-4 py-2 text-sm rounded-lg font-medium transition-all border ${filters.recentActivity.includes(activity)
                                                ? 'bg-primary-dark/10 text-primary-dark border-primary-dark/20'
                                                : 'bg-background text-foreground/70 border-foreground/30 hover:bg-primary-dark/10'
                                                }`}
                                        >
                                            {activity}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Job / Order Activity */}
                            <div>
                                <h4 className="text-sm font-medium text-foreground mb-3">Job / Order Activity</h4>
                                <div className="space-y-2">
                                    {["Has active gigs", "Has active orders", "Has completed orders", "Has zero activity"].map(activity => (
                                        <label
                                            key={activity}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-dark/10 cursor-pointer transition-colors"
                                        >
                                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${filters.jobActivity.includes(activity)
                                                ? 'bg-primary-dark border-primary-dark'
                                                : 'border-foreground/30'
                                                }`}>
                                                {filters.jobActivity.includes(activity) && (
                                                    <FaCheck className="w-3 h-3 text-background" />
                                                )}
                                            </div>
                                            <span className="text-sm text-foreground/70">{activity}</span>
                                            <input
                                                type="checkbox"
                                                checked={filters.jobActivity.includes(activity)}
                                                onChange={() => toggleArrayFilter('jobActivity', activity)}
                                                className="sr-only"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-foreground/20 bg-background">
                            <button
                                onClick={handleApplyFilters}
                                className="w-full py-3 bg-primary-dark text-background rounded-lg font-semibold hover:bg-primary-dark transition-all"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LocationFilterSection;