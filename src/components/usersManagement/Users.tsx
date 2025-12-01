"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, CheckCircle, Clock, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import Select from 'react-select';

interface User {
  name: string;
  email: string;
  signupDate: string;
  verificationStatus: "Verified" | "Pending";
  avatar?: string;
  userStatus?: "Active Users" | "Deactivated Users";
  country?: string;
  city?: string;
}

interface UsersProps {
  users?: User[];
  filters?: any;
  searchQuery?: string;
}

const defaultUsers: User[] = [
  {
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    signupDate: "Nov 26, 2025",
    verificationStatus: "Verified",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Michael Chen",
    email: "m.chen@email.com",
    signupDate: "Nov 25, 2025",
    verificationStatus: "Pending",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Emma Williams",
    email: "emma.w@email.com",
    signupDate: "Nov 25, 2025",
    verificationStatus: "Verified",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "James Rodriguez",
    email: "j.rodriguez@email.com",
    signupDate: "Nov 24, 2025",
    verificationStatus: "Verified",
    avatar: "https://i.pravatar.cc/150?img=13",
  },
  {
    name: "Olivia Martinez",
    email: "olivia.m@email.com",
    signupDate: "Nov 24, 2025",
    verificationStatus: "Pending",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
];

const Users: React.FC<UsersProps> = ({
  users = defaultUsers,
  filters = {},
  searchQuery = ""
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (searchQuery !== undefined) {
      setCurrentPage(1);
    }
  }, [searchQuery]);

  const filteredUsers = useMemo(() => {
    let filtered = users;

    if (searchQuery.trim()) {
      const lowercasedSearch = searchQuery.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(lowercasedSearch) ||
        user.email.toLowerCase().includes(lowercasedSearch) ||
        user.verificationStatus.toLowerCase().includes(lowercasedSearch)
      );
    }

    if (filters.userStatus && filters.userStatus.length > 0) {
      filtered = filtered.filter(user =>
        filters.userStatus.includes(user.userStatus || "")
      );
    }

    if (filters.verificationStatus && filters.verificationStatus.length > 0) {
      filtered = filtered.filter(user =>
        filters.verificationStatus.includes(user.verificationStatus)
      );
    }

    if (filters.country && filters.country !== "") {
      filtered = filtered.filter(user =>
        user.country === filters.country
      );
    }

    if (filters.city && filters.city !== "") {
      filtered = filtered.filter(user =>
        user.city === filters.city
      );
    }

    return filtered;
  }, [users, searchQuery, filters]);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredUsers.length);
  const currentUsers = filteredUsers.slice(startIndex, endIndex);
  const totalUsers = filteredUsers.length;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: 'var(--color-background)',
      border: '1px solid var(--color-primary-dark)',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      minHeight: '36px',
      fontSize: '14px',
      cursor: 'pointer',
      '&:hover': {
        borderColor: 'var(--color-primary-dark)',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'white',
      border: '1px solid var(--color-primary-dark)',
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
    <div className="space-y-4">
      {/* Table */}
      <div className="border border-foreground/20 rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary-dark/10">
              <TableHead className="font-semibold text-gray-900 py-4">Name</TableHead>
              <TableHead className="font-semibold text-gray-900 py-4">Email</TableHead>
              <TableHead className="font-semibold text-gray-900 py-4">Signup Date</TableHead>
              <TableHead className="font-semibold text-gray-900 py-4">Status</TableHead>
              <TableHead className="font-semibold text-gray-900 py-4 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <TableRow key={index} className="border-foreground/20 hover:bg-primary/5 transition-colors">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-9 h-9 rounded-full object-cover border border-foreground/30"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-primary-dark/5 border border-primary-dark/20 flex items-center justify-center text-sm font-medium text-primary-dark/70">
                          {getInitials(user.name)}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground/60 py-4">
                    {user.email}
                  </TableCell>
                  <TableCell className="text-foreground/60 py-4">
                    {user.signupDate}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      {user.verificationStatus === "Verified" ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                            Verified
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4 text-amber-500" />
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                            Pending
                          </span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <button className="inline-flex items-center justify-center gap-2 text-foreground/60 hover:text-primary-dark transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-dark/5 border border-transparent hover:border-primary-dark/10">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-foreground/50">
                  No users found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 relative">
            <span className="text-sm text-foreground/60">Rows per page:</span>
            <div className="w-20">
              <Select
                options={[
                  { value: 5, label: "5" },
                  { value: 10, label: "10" },
                  { value: 20, label: "20" },
                  { value: 50, label: "50" },
                ]}
                value={{ value: rowsPerPage, label: rowsPerPage.toString() }}
                onChange={(selectedOption) => handleRowsPerPageChange(selectedOption?.value.toString() || "10")}
                isSearchable={false}
                styles={customStyles}
                menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                menuPlacement="top" // This makes the menu open upward
                components={{
                  IndicatorSeparator: () => null,
                }}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
          </div>
          <span className="text-sm text-foreground/60">
            {startIndex + 1} - {endIndex} of {totalUsers}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-foreground/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-foreground/30"
            title="First page"
          >
            <ChevronsLeft className="w-4 h-4 text-foreground/70" />
          </button>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-foreground/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-foreground/30"
            title="Previous page"
          >
            <ChevronLeft className="w-4 h-4 text-foreground/70" />
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
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-md text-sm font-medium transition-colors border ${currentPage === pageNum
                      ? "bg-primary-dark text-white border-primary-dark"
                      : "text-foreground/70 border-foreground/30 hover:bg-foreground/10"
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
            <ChevronRight className="w-4 h-4 text-foreground/70" />
          </button>
          <button
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md hover:bg-foreground/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-foreground/30"
            title="Last page"
          >
            <ChevronsRight className="w-4 h-4 text-foreground/70" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;