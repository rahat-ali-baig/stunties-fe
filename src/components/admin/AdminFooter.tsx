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
import { Eye, CheckCircle, Clock, ArrowRight } from "lucide-react";

interface VerificationRequest {
  userName: string;
  submittedOn: string;
  status: "Under Review" | "Pending";
  avatar?: string;
}

interface RecentOrder {
  orderId: string;
  jobTitle: string;
  buyer: string;
  performer: string;
  amount: string;
  status: "Completed" | "In Progress";
  buyerAvatar?: string;
  performerAvatar?: string;
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
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    userName: "Jessica Brown",
    submittedOn: "Nov 26, 2025",
    status: "Pending",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
  {
    userName: "Ryan Miller",
    submittedOn: "Nov 25, 2025",
    status: "Under Review",
    avatar: "https://i.pravatar.cc/150?img=17",
  },
  {
    userName: "Amanda Davis",
    submittedOn: "Nov 25, 2025",
    status: "Pending",
    avatar: "https://i.pravatar.cc/150?img=20",
  },
  {
    userName: "Chris Wilson",
    submittedOn: "Nov 24, 2025",
    status: "Under Review",
    avatar: "https://i.pravatar.cc/150?img=68",
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
    buyerAvatar: "https://i.pravatar.cc/150?img=1",
    performerAvatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    orderId: "#ORD-1846",
    jobTitle: "Commercial Shoot Extra",
    buyer: "Emma W.",
    performer: "James R.",
    amount: "$280",
    status: "In Progress",
    buyerAvatar: "https://i.pravatar.cc/150?img=5",
    performerAvatar: "https://i.pravatar.cc/150?img=13",
  },
  {
    orderId: "#ORD-1845",
    jobTitle: "Product Photography Model",
    buyer: "David K.",
    performer: "Olivia M.",
    amount: "$650",
    status: "Completed",
    buyerAvatar: "https://i.pravatar.cc/150?img=14",
    performerAvatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    orderId: "#ORD-1844",
    jobTitle: "Podcast Guest Speaker",
    buyer: "Alex T.",
    performer: "Jessica B.",
    amount: "$350",
    status: "In Progress",
    buyerAvatar: "https://i.pravatar.cc/150?img=33",
    performerAvatar: "https://i.pravatar.cc/150?img=45",
  },
  {
    orderId: "#ORD-1843",
    jobTitle: "Social Media Content",
    buyer: "Ryan M.",
    performer: "Amanda D.",
    amount: "$520",
    status: "Completed",
    buyerAvatar: "https://i.pravatar.cc/150?img=17",
    performerAvatar: "https://i.pravatar.cc/150?img=20",
  },
];

const AdminFooter: React.FC<AdminFooterProps> = ({
  verificationRequests = defaultVerificationRequests,
  recentOrders = defaultRecentOrders,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6">
      {/* Verification Requests Table */}
      <div className="w-full bg-white border border-foreground/10 rounded-xl p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-foreground">
            Verification Requests
          </h2>
          <p className="text-sm text-foreground/40 mt-1">
            Pending user verifications
          </p>
        </div>

        {/* Table */}
        <div className="border border-foreground/10 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary-dark/10 border-b border-foreground/10">
                <TableHead className="py-4">User Name</TableHead>
                <TableHead className="py-4">Submitted On</TableHead>
                <TableHead className="py-4">Status</TableHead>
                <TableHead className="py-4 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {verificationRequests.map((request, index) => (
                <TableRow
                  key={index}
                  className="border-foreground/10 hover:bg-primary/5 transition-colors"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      {request.avatar ? (
                        <img
                          src={request.avatar}
                          alt={request.userName}
                          className="w-9 h-9 rounded-full object-cover border border-foreground/10"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-medium text-primary-dark">
                          {getInitials(request.userName)}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-foreground">{request.userName}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground/70 py-4">
                    {request.submittedOn}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      {request.status === "Under Review" ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                            Under Review
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
      <div className="w-full bg-white border border-foreground/10 rounded-xl p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-foreground">
            Recent Orders
          </h2>
          <p className="text-sm text-foreground/40 mt-1">
            Latest marketplace transactions
          </p>
        </div>

        {/* Table */}
        <div className="border border-foreground/10 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary-dark/10 border-b border-foreground/10">
                <TableHead className="py-4">Order ID</TableHead>
                <TableHead className="py-4">Job Title</TableHead>
                <TableHead className="py-4">Buyer → Performer</TableHead>
                <TableHead className="py-4">Amount</TableHead>
                <TableHead className="py-4">Status</TableHead>
                <TableHead className="py-4 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order, index) => (
                  <TableRow
                    key={index}
                    className="border-foreground/10 hover:bg-primary/5 transition-colors"
                  >
                    <TableCell className="py-4 font-medium">
                      {order.orderId}
                    </TableCell>
                    <TableCell className="text-foreground py-4">
                      {order.jobTitle}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center justify-between gap-4">
                        {/* Buyer */}
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          {order.buyerAvatar ? (
                            <img
                              src={order.buyerAvatar}
                              alt={order.buyer}
                              className="w-9 h-9 rounded-full object-cover border border-foreground/10 shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-medium text-primary-dark shrink-0">
                              {getInitials(order.buyer)}
                            </div>
                          )}
                          <span className="truncate font-medium text-foreground">{order.buyer}</span>
                        </div>

                        {/* Arrow */}
                        <ArrowRight className="text-foreground/40 w-4 h-4 shrink-0" />

                        {/* Performer */}
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          {order.performerAvatar ? (
                            <img
                              src={order.performerAvatar}
                              alt={order.performer}
                              className="w-9 h-9 rounded-full object-cover border border-foreground/10 shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-medium text-primary-dark shrink-0">
                              {getInitials(order.performer)}
                            </div>
                          )}
                          <span className="truncate font-medium text-foreground">{order.performer}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-foreground py-4">
                      {order.amount}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        {order.status === "Completed" ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                              Completed
                            </span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                              In Progress
                            </span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <button className="inline-flex items-center justify-center gap-2 text-foreground/70 hover:text-primary transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary/5 border border-transparent hover:border-primary/10">
                        <Eye className="w-4 h-4" />
                        View Order
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-foreground/40 text-sm">
                        No recent orders found
                      </div>
                      <p className="text-foreground/20 text-xs">
                        Recent orders will appear here
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminFooter;