"use client";

import React, { useState } from 'react';
import MetricsSlider from "@/components/admin/MetricsSlider";
import {
    Search, Filter, MoreVertical, Eye, Edit, Trash2,
    Briefcase, Video, User, CheckCircle, Calendar,
    MapPin, DollarSign, Star, Download, FileText,
    AlertCircle, Users, Clock, TrendingUp, MessageSquare,
    X
} from 'lucide-react';

const marketplaceStats = [
    {
        title: 'Total Jobs Posted',
        value: '1,284',
        change: '+12%',
        trend: 'up',
        icon: Briefcase,
        color: '#4CAF50'
    },
    {
        title: 'Open Jobs',
        value: '342',
        change: '+5%',
        trend: 'up',
        icon: Calendar,
        color: '#2196F3'
    },
    {
        title: 'Active Casting Calls',
        value: '89',
        change: '-2%',
        trend: 'down',
        icon: Video,
        color: '#9C27B0'
    },
    {
        title: 'Avg. Proposals per Job',
        value: '8.7',
        change: '+1.2',
        trend: 'up',
        icon: User,
        color: '#FF9800'
    },
    {
        title: 'Completed Orders',
        value: '756',
        change: '+18%',
        trend: 'up',
        icon: CheckCircle,
        color: '#00BCD4'
    },
    {
        title: 'Total Platform Revenue',
        value: '$84,250',
        change: '+23%',
        trend: 'up',
        icon: DollarSign,
        color: '#8BC34A'
    }
];

const mockJobs = [
    {
        id: 1,
        title: 'Parkour Stunt for Commercial',
        type: 'Gig',
        budget: '$1500-$2000',
        location: 'Los Angeles, CA',
        postedDate: '2024-03-15',
        status: 'Open',
        category: 'Parkour',
        client: 'John Doe',
        clientRating: 4.8,
        verified: true,
        proposals: 12,
        description: 'Need experienced parkour performer for a 30-second commercial shoot. Must have professional experience.',
        views: 245,
        saves: 18
    },
    {
        id: 2,
        title: 'Car Chase Scene - Movie',
        type: 'Casting Call',
        budget: '$3000-$5000',
        location: 'New York, NY',
        postedDate: '2024-03-14',
        status: 'Pending',
        category: 'Driving',
        client: 'Film Productions Inc',
        clientRating: 4.9,
        verified: true,
        proposals: 8,
        description: 'Looking for skilled drivers for a major motion picture car chase sequence.',
        views: 189,
        saves: 12
    },
    {
        id: 3,
        title: 'Martial Arts Fight Scene',
        type: 'Gig',
        budget: '$800-$1200',
        location: 'Chicago, IL',
        postedDate: '2024-03-13',
        status: 'Hired',
        category: 'Fight',
        client: 'Jane Smith',
        clientRating: 4.5,
        verified: false,
        proposals: 5,
        description: 'Need martial arts performers for a short film fight scene.',
        views: 156,
        saves: 7
    },
    {
        id: 4,
        title: 'High Fall Stunt',
        type: 'Gig',
        budget: '$2000-$2500',
        location: 'Miami, FL',
        postedDate: '2024-03-12',
        status: 'Completed',
        category: 'High Fall',
        client: 'Stunt Masters LLC',
        clientRating: 4.7,
        verified: true,
        proposals: 15,
        description: 'Experienced high fall performer needed for a feature film.',
        views: 312,
        saves: 24
    },
    {
        id: 5,
        title: 'Motorcycle Stunt Show',
        type: 'Casting Call',
        budget: '$1800-$2200',
        location: 'Las Vegas, NV',
        postedDate: '2024-03-11',
        status: 'Closed',
        category: 'Motorcycle',
        client: 'Extreme Shows Inc',
        clientRating: 4.6,
        verified: true,
        proposals: 7,
        description: 'Motorcycle stunt performers wanted for live show performances.',
        views: 198,
        saves: 9
    }
];

const JobsMarketplacePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [jobDetailOpen, setJobDetailOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    const filteredJobs = mockJobs.filter(job => {
        if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !job.client.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        if (statusFilter !== 'all' && job.status !== statusFilter) return false;
        if (typeFilter !== 'all' && job.type !== typeFilter) return false;
        if (categoryFilter !== 'all' && job.category !== categoryFilter) return false;
        return true;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
            case 'oldest':
                return new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime();
            case 'budget-high':
                const maxA = parseInt(a.budget.split('-')[1].replace('$', '').replace(',', ''));
                const maxB = parseInt(b.budget.split('-')[1].replace('$', '').replace(',', ''));
                return maxB - maxA;
            case 'budget-low':
                const minA = parseInt(a.budget.split('-')[0].replace('$', '').replace(',', ''));
                const minB = parseInt(b.budget.split('-')[0].replace('$', '').replace(',', ''));
                return minA - minB;
            default:
                return 0;
        }
    });

    const handleViewDetails = (job: any) => {
        setSelectedJob(job);
        setJobDetailOpen(true);
    };

    const clearFilters = () => {
        setStatusFilter('all');
        setTypeFilter('all');
        setCategoryFilter('all');
        setSortBy('newest');
    };

    const hasActiveFilters = statusFilter !== 'all' || typeFilter !== 'all' || categoryFilter !== 'all';

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Open': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'Hired': return 'bg-primary-dark/10 text-primary-dark border-primary-dark/20';
            case 'Completed': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'Closed': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getTypeColor = (type: string) => {
        return type === 'Gig'
            ? 'bg-purple-100 text-purple-800 border-purple-200'
            : 'bg-pink-100 text-pink-800 border-pink-200';
    };

    return (
        <div className="h-[calc(100vh-120px)] w-full overflow-y-auto p-4">
            {/* Metrics Slider */}
            <div className="mb-8">
                <MetricsSlider cards={marketplaceStats} />
            </div>

            {/* Search and Filter Section */}
            <div className="py-6 mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Search */}
                    <div className="relative flex-1 max-w-2xl">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search jobs, clients, or keywords..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-dark focus:border-primary-dark transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Filters */}
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <select
                                className="bg-transparent text-sm outline-none"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="Open">Open</option>
                                <option value="Pending">Pending</option>
                                <option value="Hired">Hired</option>
                                <option value="Completed">Completed</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2">
                            <Briefcase className="w-4 h-4 text-gray-500" />
                            <select
                                className="bg-transparent text-sm outline-none"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <option value="all">All Types</option>
                                <option value="Gig">Gigs</option>
                                <option value="Casting Call">Casting Calls</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <select
                                className="bg-transparent text-sm outline-none"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="budget-high">Budget: High to Low</option>
                                <option value="budget-low">Budget: Low to High</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Active Filters */}
                {hasActiveFilters && (
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-sm text-gray-500">Active filters:</span>
                        <div className="flex flex-wrap gap-2">
                            {statusFilter !== 'all' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary-dark/5 text-primary-dark rounded-full text-sm border border-primary-dark/10">
                                    Status: {statusFilter}
                                    <button onClick={() => setStatusFilter('all')} className="hover:text-primary-dark">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                            {typeFilter !== 'all' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm border border-purple-100">
                                    Type: {typeFilter}
                                    <button onClick={() => setTypeFilter('all')} className="hover:text-purple-900">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                            {categoryFilter !== 'all' && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-100">
                                    Category: {categoryFilter}
                                    <button onClick={() => setCategoryFilter('all')} className="hover:text-green-900">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={clearFilters}
                            className="ml-2 text-sm text-gray-500 hover:text-gray-700 underline"
                        >
                            Clear all
                        </button>
                    </div>
                )}
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                    <div
                        key={job.id}
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                        onClick={() => handleViewDetails(job)}
                    >
                        {/* Job Header */}
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(job.type)}`}>
                                            {job.type === 'Gig' ? '🎯 Gig' : '🎬 Casting Call'}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(job.status)}`}>
                                            {job.status}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-dark transition-colors line-clamp-2">
                                        {job.title}
                                    </h3>
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <MoreVertical className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                {job.description}
                            </p>
                        </div>

                        {/* Job Details */}
                        <div className="p-6">
                            <div className="space-y-4">
                                {/* Budget */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                        <DollarSign className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Budget</p>
                                        <p className="text-lg font-bold text-gray-900">{job.budget}</p>
                                    </div>
                                </div>

                                {/* Location & Date */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary-dark/5 flex items-center justify-center">
                                            <MapPin className="w-5 h-5 text-primary-dark" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Location</p>
                                            <p className="font-medium text-gray-900">{job.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                                            <Calendar className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Posted</p>
                                            <p className="font-medium text-gray-900">
                                                {new Date(job.postedDate).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Client Info */}
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-linear-to-r from-primary-dark to-primary-dark flex items-center justify-center text-white font-bold">
                                            {job.client.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{job.client}</p>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                <span className="text-sm text-gray-600">{job.clientRating}</span>
                                                {job.verified && (
                                                    <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                                            <Users className="w-4 h-4" />
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">{job.proposals}</p>
                                        <p className="text-xs text-gray-500">Proposals</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                                            <Eye className="w-4 h-4" />
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">{job.views}</p>
                                        <p className="text-xs text-gray-500">Views</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">{job.saves}</p>
                                        <p className="text-xs text-gray-500">Saved</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredJobs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                        <AlertCircle className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                    <button
                        onClick={clearFilters}
                        className="px-6 py-3 bg-primary-dark text-white rounded-xl hover:bg-primary-dark transition-colors"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}

            {/* Job Detail Modal */}
            {jobDetailOpen && selectedJob && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getTypeColor(selectedJob.type)}`}>
                                            {selectedJob.type}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(selectedJob.status)}`}>
                                            {selectedJob.status}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                                    <p className="text-gray-600 mt-2">{selectedJob.category} • Posted {new Date(selectedJob.postedDate).toLocaleDateString()}</p>
                                </div>
                                <button
                                    onClick={() => setJobDetailOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Left Column */}
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Description */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3">Job Description</h3>
                                        <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
                                    </div>

                                    {/* Requirements */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3">Requirements</h3>
                                        <ul className="space-y-2">
                                            <li className="flex items-center gap-2 text-gray-700">
                                                <div className="w-2 h-2 bg-primary-dark rounded-full"></div>
                                                Professional experience in {selectedJob.category}
                                            </li>
                                            <li className="flex items-center gap-2 text-gray-700">
                                                <div className="w-2 h-2 bg-primary-dark rounded-full"></div>
                                                Available for dates as specified
                                            </li>
                                            <li className="flex items-center gap-2 text-gray-700">
                                                <div className="w-2 h-2 bg-primary-dark rounded-full"></div>
                                                Must provide portfolio/reel
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    {/* Quick Stats */}
                                    <div className="bg-linear-to-br from-primary-dark/5 to-indigo-50 rounded-2xl p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Job Details</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Budget Range</p>
                                                <p className="text-2xl font-bold text-gray-900">{selectedJob.budget}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Location</p>
                                                <p className="font-medium text-gray-900 flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    {selectedJob.location}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Posted Date</p>
                                                <p className="font-medium text-gray-900 flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(selectedJob.postedDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Client Info */}
                                    <div className="bg-gray-50 rounded-2xl p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Client Information</h3>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-14 h-14 rounded-full bg-linear-to-r from-primary-dark to-primary-dark flex items-center justify-center text-white font-bold text-lg">
                                                {selectedJob.client.split(' ').map((n: any) => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{selectedJob.client}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                        <span className="text-sm text-gray-700">{selectedJob.clientRating}</span>
                                                    </div>
                                                    {selectedJob.verified && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                                                            <CheckCircle className="w-3 h-3" />
                                                            Verified
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="space-y-3">
                                        <button className="w-full py-3 bg-primary-dark text-white rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 font-medium">
                                            <Edit className="w-5 h-5" />
                                            Edit Job Details
                                        </button>
                                        <button className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium">
                                            <MessageSquare className="w-5 h-5" />
                                            Contact Client
                                        </button>
                                        <button className="w-full py-3 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2 font-medium">
                                            <Trash2 className="w-5 h-5" />
                                            Delete Job
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobsMarketplacePage;