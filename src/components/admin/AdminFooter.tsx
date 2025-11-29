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

interface VerificationRequest {
  userName: string;
  submittedOn: string;
  status: "Under Review" | "Pending";
}

interface RecentOrder {
  orderId: string;
  jobTitle: string;
  buyer: string;
  performer: string;
  amount: string;
  status: "Completed" | "In Progress";
}

interface AdminFooterProps {
  verificationRequests?: VerificationRequest[];
  recentOrders?: RecentOrder[];
}

const defaultVerificationRequests: VerificationRequest[] = [
  {
    userName: "Alex Thompson",
    submittedOn: "Nov 26, 2025",
    status: "Under Review",
  },
  {
    userName: "Jessica Brown",
    submittedOn: "Nov 26, 2025",
    status: "Pending",
  },
  {
    userName: "Ryan Miller",
    submittedOn: "Nov 25, 2025",
    status: "Under Review",
  },
  {
    userName: "Amanda Davis",
    submittedOn: "Nov 25, 2025",
    status: "Pending",
  },
  {
    userName: "Chris Wilson",
    submittedOn: "Nov 24, 2025",
    status: "Under Review",
  },
];

const defaultRecentOrders: RecentOrder[] = [
  {
    orderId: "#ORD-1847",
    jobTitle: "Brand Voice Actor Needed",
    buyer: "Sarah J.",
    performer: "Mike C.",
    amount: "$450",
    status: "Completed",
  },
  {
    orderId: "#ORD-1846",
    jobTitle: "Commercial Shoot Extra",
    buyer: "Emma W.",
    performer: "James R.",
    amount: "$280",
    status: "In Progress",
  },
  {
    orderId: "#ORD-1845",
    jobTitle: "Product Photography Model",
    buyer: "David K.",
    performer: "Olivia M.",
    amount: "$650",
    status: "Completed",
  },
  {
    orderId: "#ORD-1844",
    jobTitle: "Podcast Guest Speaker",
    buyer: "Alex T.",
    performer: "Jessica B.",
    amount: "$350",
    status: "In Progress",
  },
  {
    orderId: "#ORD-1843",
    jobTitle: "Social Media Content",
    buyer: "Ryan M.",
    performer: "Amanda D.",
    amount: "$520",
    status: "Completed",
  },
];

const AdminFooter: React.FC<AdminFooterProps> = ({
  verificationRequests = defaultVerificationRequests,
  recentOrders = defaultRecentOrders,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-6">
      {/* Verification Requests Table */}
      <div className="p-2 bg">
        {/* Header */}
        <div className="pb-4">
          <h2 className="text-lg xl:text-xl font-medium text-foreground font-coolvetica">
            Verification Requests
          </h2>
          <p className="text-sm text-foreground/40 mt-1">
            Pending user verifications
          </p>
        </div>

        {/* Table with custom scrollbar */}
        <div className="overflow-x-auto scrollbar-thin">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Name</TableHead>
                <TableHead>Submitted On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {verificationRequests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {request.userName}
                  </TableCell>
                  <TableCell className="text-foreground/60">
                    {request.submittedOn}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${
                        request.status === "Under Review"
                          ? "bg-[#4A9EFF]/10 text-[#4A9EFF]"
                          : "bg-[#FFA500]/10 text-[#FFA500]"
                      }`}
                    >
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="text-[#4A9EFF] hover:text-[#4A9EFF]/80 transition-colors text-sm font-medium">
                      Review
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="">
        {/* Header */}
        <div className="pb-4">
          <h2 className="text-lg xl:text-xl font-medium text-foreground font-coolvetica">
            Recent Orders
          </h2>
          <p className="text-sm text-foreground/40 mt-1">
            Latest marketplace transactions
          </p>
        </div>

        {/* Table with custom scrollbar */}
        <div className="overflow-x-auto scrollbar-thin">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Buyer → Performer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{order.orderId}</TableCell>
                  <TableCell className="text-foreground">
                    {order.jobTitle}
                  </TableCell>
                  <TableCell className="text-foreground/60">
                    {order.buyer} → {order.performer}
                  </TableCell>
                  <TableCell className="font-medium">{order.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${
                        order.status === "Completed"
                          ? "bg-[#AAF7FF]/10 text-[#AAF7FF]"
                          : "bg-[#4A9EFF]/10 text-[#4A9EFF]"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="inline-flex items-center gap-2 text-[#4A9EFF] hover:text-[#4A9EFF]/80 transition-colors text-sm font-medium">
                      <Eye className="w-4 h-4" />
                      View Order
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #262626 transparent;
        }

        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #262626;
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: #333333;
        }
      `}</style>
    </div>
  );
};

export default AdminFooter;