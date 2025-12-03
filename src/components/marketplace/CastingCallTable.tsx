"use client";

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { LuEye } from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';
import Pagination from '../addons/Pagination';

interface CastingCallJob {
    id: string;
    title: string;
    creator: string;
    location: string;
    gender: string;
    applicants: number;
    status: 'Open' | 'Hired' | 'Completed' | 'Expired' | 'Cancelled';
    type?: string;
}

interface CastingCallTableProps {
    jobs: CastingCallJob[];
    onViewDetails: (job: CastingCallJob) => void;
    onClearFilters: () => void;
}

const CastingCallTable: React.FC<CastingCallTableProps> = ({
    jobs,
    onViewDetails,
    onClearFilters
}) => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Calculate pagination values
    const totalUsers = jobs.length;
    const totalPages = Math.ceil(totalUsers / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalUsers);

    // Get current page jobs
    const currentJobs = jobs.slice(startIndex, endIndex);

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'open':
                return {
                    bgColor: 'bg-emerald-50',
                    textColor: 'text-emerald-700',
                    borderColor: 'border-emerald-200',
                    label: 'Open'
                };
            case 'hired':
                return {
                    bgColor: 'bg-blue-50',
                    textColor: 'text-blue-700',
                    borderColor: 'border-blue-200',
                    label: 'Hired'
                };
            case 'completed':
                return {
                    bgColor: 'bg-purple-50',
                    textColor: 'text-purple-700',
                    borderColor: 'border-purple-200',
                    label: 'Completed'
                };
            case 'expired':
                return {
                    bgColor: 'bg-amber-50',
                    textColor: 'text-amber-700',
                    borderColor: 'border-amber-200',
                    label: 'Expired'
                };
            case 'cancelled':
                return {
                    bgColor: 'bg-rose-50',
                    textColor: 'text-rose-700',
                    borderColor: 'border-rose-200',
                    label: 'Cancelled'
                };
            default:
                return {
                    bgColor: 'bg-gray-50',
                    textColor: 'text-gray-700',
                    borderColor: 'border-gray-200',
                    label: status
                };
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1); // Reset to first page when rows per page changes
    };

    if (jobs.length === 0) {
        return (
            <div className="border border-foreground/20 rounded-lg overflow-hidden bg-white">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-primary-dark/10">
                            <TableHead className="font-semibold text-foreground py-4">ID</TableHead>
                            <TableHead className="font-semibold text-foreground py-4">Title</TableHead>
                            <TableHead className="font-semibold text-foreground py-4">Creator</TableHead>
                            <TableHead className="font-semibold text-foreground py-4">Location</TableHead>
                            <TableHead className="font-semibold text-foreground py-4">Gender</TableHead>
                            <TableHead className="font-semibold text-foreground py-4">Applicants</TableHead>
                            <TableHead className="font-semibold text-foreground py-4">Status</TableHead>
                            <TableHead className="font-semibold text-foreground py-4 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={8} className="text-center py-12">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="text-foreground/60">No casting calls found</div>
                                    <button
                                        onClick={onClearFilters}
                                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-primary-dark/70 transition-colors text-sm"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }

    return (
        <>
            <div className="border border-foreground/20 rounded-lg overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-primary-dark/10">
                                <TableHead className="font-semibold text-foreground py-4">ID</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Title</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Creator</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Location</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Gender</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Applicants</TableHead>
                                <TableHead className="font-semibold text-foreground py-4">Status</TableHead>
                                <TableHead className="font-semibold text-foreground py-4 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentJobs.map((job) => {
                                const statusBadge = getStatusBadge(job.status);

                                return (
                                    <TableRow
                                        key={job.id}
                                        className="border-foreground/10 hover:bg-primary/5 transition-colors cursor-pointer"
                                        onClick={() => onViewDetails(job)}
                                    >
                                        <TableCell className="py-4">
                                            <div className="font-mono text-sm text-foreground/70">{job.id}</div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="font-medium text-foreground">{job.title}</div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="text-sm text-foreground/70">{job.creator}</div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="text-sm text-foreground/70">{job.location}</div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${job.gender.toLowerCase() === 'any'
                                                ? 'bg-gray-50 text-gray-700 border border-gray-200'
                                                : job.gender.toLowerCase() === 'male'
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                    : job.gender.toLowerCase() === 'female'
                                                        ? 'bg-pink-50 text-pink-700 border border-pink-200'
                                                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                                                }`}>
                                                {job.gender}
                                            </span>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="text-sm font-medium text-foreground">{job.applicants}</div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusBadge.bgColor} ${statusBadge.textColor} border ${statusBadge.borderColor}`}>
                                                {statusBadge.label}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onViewDetails(job);
                                                    }}
                                                    className="p-1.5 text-foreground/60 hover:text-foreground/40 cursor-pointer hover:bg-foreground/5 rounded transition-colors"
                                                    title="View Details"
                                                >
                                                    <LuEye className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                    className="p-1.5 text-red-500/60 hover:text-red-500/40 cursor-pointer hover:bg-red-50 rounded transition-colors"
                                                    title="Delete"
                                                >
                                                    <MdDeleteOutline className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Add Pagination component */}
            <div className="mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    rowsPerPage={rowsPerPage}
                    totalUsers={totalUsers}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </div>
        </>
    );
};

export default CastingCallTable;