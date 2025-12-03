"use client";

import React, { useState, useMemo } from 'react';
import MetricsSlider from "@/components/admin/MetricsSlider";
import { Search, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CastingCallTable from '@/components/marketplace/CastingCallTable';
import GigTable from '@/components/marketplace/GigTable';
import JobDetailModal from '@/components/dialogs/JobDetailModal';
import { marketplaceStats } from '@/constants';
import Tabs from '@/components/addons/Tabs';
import { castingCalls, gigs, timeRangeOptions, statusOptions, locationOptions, genderOptions } from '@/constants';

const JobsMarketplacePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [jobDetailOpen, setJobDetailOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("gigs");

    const [filters, setFilters] = useState({
        timeRange: 'all-time',
        status: [] as string[],
        location: 'all-locations',
        gender: 'all-genders'
    });

    const filteredJobs = useMemo(() => {
        const jobs = activeTab === "gigs" ? gigs : castingCalls;

        return jobs.filter((job: any) => {
            // Search filter
            if (searchTerm &&
                !job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !job.creator.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !job.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !job.location.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            // Status filter
            if (filters.status.length > 0 && !filters.status.includes(job.status.toLowerCase())) {
                return false;
            }

            // Location filter
            if (filters.location !== 'all-locations') {
                const locationMap: Record<string, string> = {
                    'new-york': 'New York',
                    'los-angeles': 'Los Angeles',
                    'chicago': 'Chicago',
                    'miami': 'Miami',
                    'atlanta': 'Atlanta',
                    'orlando': 'Orlando',
                    'vancouver': 'Vancouver',
                    'toronto': 'Toronto',
                    'london': 'London'
                };

                const filterLocation = locationMap[filters.location] || filters.location;
                if (!job.location.toLowerCase().includes(filterLocation.toLowerCase())) {
                    return false;
                }
            }

            // Gender filter
            if (filters.gender !== 'all-genders') {
                if (job.gender.toLowerCase() !== filters.gender.toLowerCase()) {
                    return false;
                }
            }

            // Time range filter
            if (filters.timeRange !== 'all-time') {
                const jobDate = new Date(job.postedDate);
                const now = new Date();

                switch (filters.timeRange) {
                    case 'today':
                        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                        if (jobDate < startOfToday) return false;
                        break;
                    case 'this-week':
                        const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
                        if (jobDate < startOfWeek) return false;
                        break;
                    case 'this-month':
                        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                        if (jobDate < startOfMonth) return false;
                        break;
                    case 'this-year':
                        const startOfYear = new Date(now.getFullYear(), 0, 1);
                        if (jobDate < startOfYear) return false;
                        break;
                }
            }

            return true;
        }).sort((a: any, b: any) => {
            return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        });
    }, [searchTerm, filters, activeTab]);

    const handleViewDetails = (job: any) => {
        setSelectedJob(job);
        setJobDetailOpen(true);
    };

    const clearFilters = () => {
        setFilters({
            timeRange: 'all-time',
            status: [],
            location: 'all-locations',
            gender: 'all-genders'
        });
    };

    const tabs = [
        {
            id: "gigs",
            label: "Gigs",
        },
        {
            id: "casting-calls",
            label: "Casting Calls",
        },
    ];

    const hasActiveFilters =
        filters.status.length > 0 ||
        filters.timeRange !== 'all-time' ||
        filters.location !== 'all-locations' ||
        filters.gender !== 'all-genders';

    return (
        <div className="h-[calc(100vh-120px)] w-full overflow-y-auto p-4">
            {/* Metrics Slider */}
            <div className="mb-8">
                <MetricsSlider cards={marketplaceStats} />
            </div>

            {/* Search and Filter Section */}
            <div className="mb-8">
                {/* Tabs */}
                <Tabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    tabs={tabs}
                    variant="default"
                    size="md"
                    showIcon={false}
                    showBadge={false}
                    className="mb-6"
                />

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="max-w-lg relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
                        <input
                            type="text"
                            placeholder="Search by ID, title, creator, or location..."
                            className="w-full h-12 pl-12 pr-4 bg-background border border-foreground/30 rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-dark/80 focus:border-primary-dark/20 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                                value={filters.status[0] || "all"}
                                onValueChange={(value) => {
                                    if (value === "all") {
                                        setFilters({ ...filters, status: [] });
                                    } else {
                                        setFilters({ ...filters, status: [value] });
                                    }
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statusOptions.map((option: any) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Gender Filter */}
                        <div className="min-w-[140px]">
                            <Select
                                value={filters.gender}
                                onValueChange={(value) => setFilters({ ...filters, gender: value })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="All Genders" />
                                </SelectTrigger>
                                <SelectContent>
                                    {genderOptions.map((option: any) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Time Range Filter */}
                        <div className="min-w-[140px]">
                            <Select
                                value={filters.timeRange}
                                onValueChange={(value) => setFilters({ ...filters, timeRange: value })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="All Time" />
                                </SelectTrigger>
                                <SelectContent>
                                    {timeRangeOptions.map((option: any) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Location Filter */}
                        <div className="min-w-[140px]">
                            <Select
                                value={filters.location}
                                onValueChange={(value) => setFilters({ ...filters, location: value })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="All Locations" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locationOptions.map((option: any) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Active Filters */}
                {hasActiveFilters && (
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-sm text-foreground/60">Active filters:</span>
                        <div className="flex flex-wrap gap-2">
                            {/* Time range filter badge */}
                            {filters.timeRange !== 'all-time' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary-dark/5 text-primary-dark rounded-full text-sm border border-primary-dark/10">
                                    Time: {timeRangeOptions.find((opt: any) => opt.value === filters.timeRange)?.label}
                                    <button
                                        onClick={() => setFilters({ ...filters, timeRange: 'all-time' })}
                                        className="hover:text-primary-dark/60"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}

                            {/* Status filter badge */}
                            {filters.status.map((status) => (
                                <div key={status} className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-sm border border-emerald-200">
                                    Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                                    <button
                                        onClick={() => setFilters({
                                            ...filters,
                                            status: filters.status.filter(s => s !== status)
                                        })}
                                        className="hover:text-emerald-900"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}

                            {/* Location filter badge */}
                            {filters.location !== 'all-locations' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-50 text-cyan-800 rounded-full text-sm border border-cyan-200">
                                    Location: {locationOptions.find((opt: any) => opt.value === filters.location)?.label}
                                    <button
                                        onClick={() => setFilters({ ...filters, location: 'all-locations' })}
                                        className="hover:text-cyan-900"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}

                            {/* Gender filter badge */}
                            {filters.gender !== 'all-genders' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-800 rounded-full text-sm border border-purple-200">
                                    Gender: {genderOptions.find((opt: any) => opt.value === filters.gender)?.label}
                                    <button
                                        onClick={() => setFilters({ ...filters, gender: 'all-genders' })}
                                        className="hover:text-purple-900"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={clearFilters}
                            className="ml-2 text-sm text-foreground/60 hover:text-foreground underline"
                        >
                            Clear all
                        </button>
                    </div>
                )}
            </div>

            {/* Render Different Tables Based on Active Tab */}
            {activeTab === "gigs" ? (
                <GigTable
                    // @ts-ignore
                    jobs={filteredJobs}
                    onViewDetails={handleViewDetails}
                    onClearFilters={clearFilters}
                />
            ) : (
                <CastingCallTable
                    jobs={filteredJobs}
                    onViewDetails={handleViewDetails}
                    onClearFilters={clearFilters}
                />
            )}

            {/* Job Detail Modal */}
            <JobDetailModal
                isOpen={jobDetailOpen}
                onClose={() => setJobDetailOpen(false)}
                job={selectedJob}
            />
        </div>
    );
};

export default JobsMarketplacePage;