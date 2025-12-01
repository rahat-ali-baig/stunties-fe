"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, CheckCircle, Clock } from "lucide-react";

interface RecentUser {
  name: string;
  email: string;
  signupDate: string;
  verificationStatus: "Verified" | "Pending";
  avatar?: string;
}

interface RecentUsersProps {
  users?: RecentUser[];
}

const defaultUsers: RecentUser[] = [
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

const RecentUsers: React.FC<RecentUsersProps> = ({
  users = defaultUsers,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="py-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-medium text-foreground">
          Recent Users
        </h2>
        <p className="text-sm text-foreground/40 mt-1">
          Latest user registrations and their verification status
        </p>
      </div>

      {/* Table */}
      <div className="border border-foreground/10 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary-dark/10 border-b border-foreground/10">
              <TableHead className="py-4">Name</TableHead>
              <TableHead className="py-4">Email</TableHead>
              <TableHead className="py-4">Signup Date</TableHead>
              <TableHead className="py-4">Status</TableHead>
              <TableHead className="py-4 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow 
                key={index}
                className="border-foreground/10 hover:bg-primary/5 transition-colors"
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover border border-foreground/10"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-medium text-primary-dark">
                        {getInitials(user.name)}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-foreground/70 py-4">
                  {user.email}
                </TableCell>
                <TableCell className="text-foreground/70 py-4">
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
                  <button className="inline-flex items-center justify-center gap-2 text-foreground/70 hover:text-primary transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary/5 border border-transparent hover:border-primary/10">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecentUsers;