
'use client';

import { useState } from "react";
import { Eye, Heart, Star, Download, Users, TrendingUp, CheckCircle, Briefcase, Package, DollarSign } from "lucide-react"; import AlertBanner from "@/components/addons/AlertBanner";
import MetricsSlider from "@/components/admin/MetricsSlider";
import { metricCards } from "@/constants";
import EarningsChart from "@/components/admin/EarningsChart";

const AdminDashboard = () => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="h-[calc(100vh-80px)]  w-full overflow-y-auto p-4">
      {/* Alert Banner */}
      <AlertBanner
        title="Platform Performance Update"
        description="Your platform is performing exceptionally well this month with a 24% increase in total earnings. Keep up the great work!"
        show={showAlert}
        onClose={() => setShowAlert(false)}
      />

      {/* Metrics Slider */}
      <MetricsSlider cards={metricCards} cardsPerView={3} />

      <EarningsChart />
    </div>
  );
};

export default AdminDashboard;