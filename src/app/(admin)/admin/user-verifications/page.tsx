"use client";

import React, { useState, useMemo, useCallback } from "react";
import MetricsSlider from "@/components/admin/MetricsSlider";
import VerificationTabs from "@/components/verifications/VerificationTabs";
import SearchBar from "@/components/verifications/SearchBar";
import VerificationTable from "@/components/verifications/VerificationTable";
import FilterPanel from "@/components/verifications/FilterPanel";
import Pagination from "@/components/verifications/Pagination";
import {
    Users,
    UserCheck,
    UserX,
    Clock,
    CheckCircle,
    XCircle,
} from "lucide-react";
import { defaultVerificationUsers, userCards } from "@/constants/verification";
import { VerificationTab, VerificationFilters, VerificationUser } from "@/types/verification";

const UserVerificationPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<VerificationTab>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedUser, setSelectedUser] = useState<VerificationUser | null>(null);
    const [filters, setFilters] = useState<VerificationFilters>({
        verificationStatus: [],
        userType: [],
        country: "",
        city: "",
        hasPortfolio: null,
        hasDocuments: null,
        submittedDate: ""
    });

    // Filter users based on active tab and filters
    const getFilteredUsers = useMemo(() => {
        let filtered = defaultVerificationUsers;

        // Apply tab filter
        switch (activeTab) {
            case "pending":
                filtered = filtered.filter(user => user.verificationStatus === "Pending");
                break;
            case "under-review":
                filtered = filtered.filter(user => user.verificationStatus === "Under Review");
                break;
            case "more-info":
                filtered = filtered.filter(user => user.verificationStatus === "More Info Requested");
                break;
            case "approved":
                filtered = filtered.filter(user => user.verificationStatus === "Approved");
                break;
            case "rejected":
                filtered = filtered.filter(user => user.verificationStatus === "Rejected");
                break;
            default:
                // Show all users
                break;
        }

        // Apply search filter
        if (searchQuery.trim()) {
            const lowercasedSearch = searchQuery.toLowerCase();
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(lowercasedSearch) ||
                user.email.toLowerCase().includes(lowercasedSearch) ||
                user.id.toLowerCase().includes(lowercasedSearch)
            );
        }

        // Apply additional filters
        if (filters.verificationStatus.length > 0) {
            filtered = filtered.filter(user => filters.verificationStatus.includes(user.verificationStatus));
        }

        if (filters.userType.length > 0) {
            filtered = filtered.filter(user => filters.userType.includes(user.userType));
        }

        if (filters.country) {
            filtered = filtered.filter(user => user.country === filters.country);
        }

        if (filters.city) {
            filtered = filtered.filter(user => user.city === filters.city);
        }

        if (filters.hasPortfolio !== null) {
            filtered = filtered.filter(user =>
                (user.photos && user.photos.length > 0) === filters.hasPortfolio
            );
        }

        if (filters.hasDocuments !== null) {
            filtered = filtered.filter(user =>
                (user.governmentId || (user.certificates && user.certificates.length > 0)) === filters.hasDocuments
            );
        }

        if (filters.submittedDate) {
            filtered = filtered.filter(user => user.submittedDate === filters.submittedDate);
        }

        return filtered;
    }, [activeTab, searchQuery, filters]);

    // Pagination calculations
    const totalPages = Math.ceil(getFilteredUsers.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, getFilteredUsers.length);
    const currentUsers = getFilteredUsers.slice(startIndex, endIndex);
    const totalUsers = getFilteredUsers.length;

    // Tab stats
    const tabStats = useMemo(() => {
        const all = defaultVerificationUsers.length;
        const pending = defaultVerificationUsers.filter(u => u.verificationStatus === "Pending").length;
        const underReview = defaultVerificationUsers.filter(u => u.verificationStatus === "Under Review").length;
        const moreInfo = defaultVerificationUsers.filter(u => u.verificationStatus === "More Info Requested").length;
        const approved = defaultVerificationUsers.filter(u => u.verificationStatus === "Approved").length;
        const rejected = defaultVerificationUsers.filter(u => u.verificationStatus === "Rejected").length;

        return { all, pending, underReview, moreInfo, approved, rejected };
    }, []);

    // Helper functions
    const getInitials = useCallback((name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    }, []);

    const handleVerificationAction = useCallback((userId: string, action: "approve" | "reject" | "request-info") => {
        console.log(`${action} verification for user ${userId}`);
        alert(`Verification ${action} for user ${userId}`);
    }, []);

    const handleClearFilters = useCallback(() => {
        setFilters({
            verificationStatus: [],
            userType: [],
            country: "",
            city: "",
            hasPortfolio: null,
            hasDocuments: null,
            submittedDate: ""
        });
    }, []);

    const handleApplyFilters = useCallback(() => {
        console.log("Applied filters:", filters);
        setIsFilterOpen(false);
        setCurrentPage(1);
    }, [filters]);

    const activeFilterCount = useMemo(() => {
        return (
            filters.verificationStatus.length +
            filters.userType.length +
            (filters.country ? 1 : 0) +
            (filters.city ? 1 : 0) +
            (filters.hasPortfolio !== null ? 1 : 0) +
            (filters.hasDocuments !== null ? 1 : 0) +
            (filters.submittedDate ? 1 : 0)
        );
    }, [filters]);

    const verificationStats = [
        {
            title: "TOTAL REQUESTS",
            value: tabStats.all.toString(),
            change: "+12%",
            icon: Users,
        },
        {
            title: "APPROVED",
            value: tabStats.approved.toString(),
            change: "+8%",
            icon: CheckCircle,
        },
        {
            title: "PENDING REVIEW",
            value: (tabStats.pending + tabStats.underReview).toString(),
            change: "+3%",
            icon: Clock,
        },
        {
            title: "REJECTED",
            value: tabStats.rejected.toString(),
            change: "-2%",
            icon: XCircle,
        }
    ];

    return (
        <div className="h-[calc(100vh-120px)] w-full overflow-y-auto p-4">
            {/* Metrics Slider */}
            <div className="mb-6">
                <MetricsSlider cards={verificationStats} />
            </div>

            {/* Tabs */}
            <div className="mb-6">
                <VerificationTabs
                    activeTab={activeTab}
                    onTabChange={(tab) => {
                        setActiveTab(tab);
                        setCurrentPage(1);
                    }}
                    tabStats={tabStats}
                />
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-6">
                <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={(query) => {
                        setSearchQuery(query);
                        setCurrentPage(1);
                    }}
                    onOpenFilters={() => setIsFilterOpen(true)}
                    activeFilterCount={activeFilterCount}
                />
            </div>

            {/* Table */}
            <div className="mb-6">
                <VerificationTable
                    users={currentUsers}
                    onViewDetails={setSelectedUser}
                    onVerificationAction={handleVerificationAction}
                    getInitials={getInitials}
                />
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalUsers={totalUsers}
                startIndex={startIndex}
                endIndex={endIndex}
                onPageChange={setCurrentPage}
                onRowsPerPageChange={(value) => {
                    setRowsPerPage(value);
                    setCurrentPage(1);
                }}
            />

            {/* Filter Panel */}
            <FilterPanel
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={filters}
                onFilterChange={setFilters}
                onClearFilters={handleClearFilters}
                onApplyFilters={handleApplyFilters}
            />
        </div>
    );
};

export default UserVerificationPage;