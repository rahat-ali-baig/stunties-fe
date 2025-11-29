
'use client';

import { useState } from "react";
import { Eye, Heart, Star, Download, Users, TrendingUp, CheckCircle, Briefcase, Package, DollarSign } from "lucide-react"; import AlertBanner from "@/components/addons/AlertBanner";
import MetricsSlider from "@/components/admin/MetricsSlider";
import { metricCards } from "@/constants";
import EarningsChart from "@/components/admin/EarningsChart";
import UserGrowthChart from "@/components/admin/UserGrowthChart";
import RecentUsers from "@/components/admin/RecentUsers";
import AdminFooter from "@/components/admin/AdminFooter";
import { RiUserSmileFill } from "react-icons/ri";
import PageHeader from "@/components/addons/PageHeader";

const AdminDashboard = () => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="h-[calc(100vh-80px)] w-full overflow-y-auto p-4">
      <PageHeader
        title="Users Management"
        subtitle="Manage all the AnamProfiles"
        highlight={'6'}
        icon={<RiUserSmileFill className="w-10 h-10" />}
      />

      {/* Metrics Slider */}
      <MetricsSlider cards={metricCards} cardsPerView={3} />
      <RecentUsers />
    </div>
  );
};

export default AdminDashboard;