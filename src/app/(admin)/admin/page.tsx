
'use client';

import { useState } from "react";
import AlertBanner from "@/components/addons/AlertBanner";
import MetricsSlider from "@/components/addons/MetricsSlider";
import { dashboardMetricCards } from "@/constants";
import EarningsChart from "@/components/admin/EarningsChart";
import UserGrowthChart from "@/components/admin/UserGrowthChart";
import RecentUsers from "@/components/admin/RecentUsers";
import AdminFooter from "@/components/admin/AdminFooter";
import { DataTableDemo } from "@/components/addons/DataTable";

const AdminDashboard = () => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="h-[calc(100dvh-120px)] w-full overflow-y-auto p-4">
      {/* Alert Banner */}
      <AlertBanner
        title="Platform Performance Update"
        description="Your platform is performing exceptionally well this month with a 24% increase in total earnings. Keep up the great work!"
        show={showAlert}
        onClose={() => setShowAlert(false)}
      />

      {/* Metrics Slider */}
      <MetricsSlider cards={dashboardMetricCards} />

      <EarningsChart />
      <UserGrowthChart />
      <RecentUsers />
      <AdminFooter />
    </div>
  );
};

export default AdminDashboard;