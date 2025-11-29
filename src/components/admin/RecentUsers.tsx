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
import { Eye } from "lucide-react";

interface RecentUser {
  name: string;
  email: string;
  signupDate: string;
  verificationStatus: "Verified" | "Pending";
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
  },
  {
    name: "Michael Chen",
    email: "m.chen@email.com",
    signupDate: "Nov 25, 2025",
    verificationStatus: "Pending",
  },
  {
    name: "Emma Williams",
    email: "emma.w@email.com",
    signupDate: "Nov 25, 2025",
    verificationStatus: "Verified",
  },
  {
    name: "James Rodriguez",
    email: "j.rodriguez@email.com",
    signupDate: "Nov 24, 2025",
    verificationStatus: "Verified",
  },
  {
    name: "Olivia Martinez",
    email: "olivia.m@email.com",
    signupDate: "Nov 24, 2025",
    verificationStatus: "Pending",
  },
];

const RecentUsers: React.FC<RecentUsersProps> = ({
  users = defaultUsers,
}) => {
  return (
    <div className="py-6">
      {/* Header */}
      <div className="pb-4">
        <h2 className="text-lg xl:text-xl font-medium text-foreground font-coolvetica">
          Recent Users
        </h2>
        <p className="text-sm text-foreground/40 mt-1">
          Latest user registrations
        </p>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Signup Date</TableHead>
            <TableHead>Verification Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="text-foreground/60">{user.email}</TableCell>
              <TableCell className="text-foreground/60">
                {user.signupDate}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${
                    user.verificationStatus === "Verified"
                      ? "bg-[#AAF7FF]/10 text-[#AAF7FF]"
                      : "bg-[#FFA500]/10 text-[#FFA500]"
                  }`}
                >
                  {user.verificationStatus}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <button className="inline-flex items-center gap-2 text-[#AAF7FF] hover:text-[#AAF7FF]/80 transition-colors text-sm font-medium">
                  <Eye className="w-4 h-4" />
                  View
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentUsers;