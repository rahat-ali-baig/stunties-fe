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
import {
  Eye,
  Check,
  X,
  MessageCircle,
  MoreVertical,
  Image,
  Video,
  FileText,
} from "lucide-react";
import { VerificationUser } from "@/types/verification";
import { getStatusBadge } from "@/constants/verification"; 

interface VerificationTableProps {
  users: VerificationUser[];
  onViewDetails: (user: VerificationUser) => void;
  onVerificationAction: (userId: string, action: "approve" | "reject" | "request-info") => void;
  getInitials: (name: string) => string;
}

const VerificationTable: React.FC<VerificationTableProps> = ({
  users,
  onViewDetails,
  onVerificationAction,
  getInitials,
}) => {
  if (users.length === 0) {
    return (
      <div className="border border-foreground/20 rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary-dark/10">
              <TableHead className="font-semibold text-foreground py-4">User Information</TableHead>
              <TableHead className="font-semibold text-foreground py-4">Submitted Date</TableHead>
              <TableHead className="font-semibold text-foreground py-4">User Type</TableHead>
              <TableHead className="font-semibold text-foreground py-4">Verification Status</TableHead>
              <TableHead className="font-semibold text-foreground py-4">Documents</TableHead>
              <TableHead className="font-semibold text-foreground py-4 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className="text-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="text-foreground/60">No verification requests found</div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="border border-foreground/20 rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary-dark/10">
            <TableHead className="font-semibold text-foreground py-4">User Information</TableHead>
            <TableHead className="font-semibold text-foreground py-4">Submitted Date</TableHead>
            <TableHead className="font-semibold text-foreground py-4">User Type</TableHead>
            <TableHead className="font-semibold text-foreground py-4">Verification Status</TableHead>
            <TableHead className="font-semibold text-foreground py-4">Documents</TableHead>
            <TableHead className="font-semibold text-foreground py-4 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const statusBadge = getStatusBadge(user.verificationStatus);
            const StatusIcon = statusBadge.icon;
            const hasPhotos = user.photos && user.photos.length > 0;
            const hasVideos = user.videos && user.videos.length > 0;
            const hasDocuments = user.governmentId || (user.certificates && user.certificates.length > 0);

            return (
              <TableRow key={user.id} className="border-foreground/10 hover:bg-primary/5 transition-colors">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border border-foreground/20"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary-dark/10 border border-primary-dark/20 flex items-center justify-center text-sm font-medium text-primary-dark">
                        {getInitials(user.name)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">{user.name}</p>
                      <p className="text-sm text-foreground/60 truncate">{user.email}</p>
                      <p className="text-xs text-foreground/40 mt-0.5">ID: {user.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-foreground/70 py-4">
                  {new Date(user.submittedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </TableCell>
                <TableCell className="py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${user.userType === "Stunt Performer"
                      ? "bg-blue-50 text-blue-700 border border-blue-100"
                      : "bg-purple-50 text-purple-700 border border-purple-100"
                    }`}>
                    {user.userType}
                  </span>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`w-4 h-4 ${statusBadge.iconColor}`} />
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusBadge.bgColor} ${statusBadge.textColor} border ${statusBadge.borderColor}`}>
                      {statusBadge.label}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    {hasPhotos && (
                      <span className="flex items-center gap-1 text-xs text-foreground/60">
                        <Image className="w-3 h-3" />
                        <span>{user.photos?.length || 0}</span>
                      </span>
                    )}
                    {hasVideos && (
                      <span className="flex items-center gap-1 text-xs text-foreground/60">
                        <Video className="w-3 h-3" />
                        <span>{user.videos?.length || 0}</span>
                      </span>
                    )}
                    {hasDocuments ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-600">
                        <FileText className="w-3 h-3" />
                        <span>✓</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-amber-600">
                        <FileText className="w-3 h-3" />
                        <span>!</span>
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onViewDetails(user)}
                      className="inline-flex items-center justify-center gap-2 text-foreground/60 hover:text-primary-dark transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-dark/5 border border-transparent hover:border-primary-dark/10"
                    >
                      <Eye className="w-4 h-4" />
                      Review Details
                    </button>
                    {user.verificationStatus === "Pending" || user.verificationStatus === "Under Review" ? (
                      <>
                        <button
                          onClick={() => onVerificationAction(user.id, "approve")}
                          className="inline-flex items-center justify-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors text-sm font-medium px-3 py-2 rounded-lg hover:bg-emerald-50 border border-emerald-200"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => onVerificationAction(user.id, "request-info")}
                          className="inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-50 border border-blue-200"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Request Info
                        </button>
                        <button
                          onClick={() => onVerificationAction(user.id, "reject")}
                          className="inline-flex items-center justify-center gap-2 text-rose-600 hover:text-rose-700 transition-colors text-sm font-medium px-3 py-2 rounded-lg hover:bg-rose-50 border border-rose-200"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                      </>
                    ) : (
                      <button className="p-2 text-foreground/60 hover:text-foreground hover:bg-foreground/10 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default VerificationTable;