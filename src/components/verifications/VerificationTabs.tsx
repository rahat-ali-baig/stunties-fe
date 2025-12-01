"use client";

import React from "react";
import {
  Users,
  Clock,
  AlertCircle,
  Info,
  UserCheck,
  UserX,
} from "lucide-react";
import { VerificationTab } from "@/types/verification"; 

interface TabItem {
  id: VerificationTab;
  label: string;
  icon: React.ElementType;
  count: number;
}

interface VerificationTabsProps {
  activeTab: VerificationTab;
  onTabChange: (tab: VerificationTab) => void;
  tabStats: {
    all: number;
    pending: number;
    underReview: number;
    moreInfo: number;
    approved: number;
    rejected: number;
  };
}

const VerificationTabs: React.FC<VerificationTabsProps> = ({
  activeTab,
  onTabChange,
  tabStats,
}) => {
  const tabs: TabItem[] = [
    { id: "all", label: "All Requests", icon: Users, count: tabStats.all },
    { id: "pending", label: "Pending", icon: Clock, count: tabStats.pending },
    { id: "under-review", label: "Under Review", icon: AlertCircle, count: tabStats.underReview },
    { id: "more-info", label: "More Info", icon: Info, count: tabStats.moreInfo },
    { id: "approved", label: "Approved", icon: UserCheck, count: tabStats.approved },
    { id: "rejected", label: "Rejected", icon: UserX, count: tabStats.rejected },
  ];

  return (
    <div className="flex items-center gap-2 border-b border-foreground/10">
      {tabs.map(({ id, label, icon: Icon, count }) => {
        const isActive = activeTab === id;

        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${isActive
                ? "text-primary-dark border-b-2 border-primary-dark"
                : "text-foreground/60 hover:text-foreground"
              }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            <span className={`px-2 py-0.5 text-xs rounded-full ${isActive
                ? "bg-primary-dark/20 text-primary-dark"
                : "bg-foreground/10 text-foreground/60"
              }`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default VerificationTabs;