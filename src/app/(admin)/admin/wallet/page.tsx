
'use client';

import { useState } from "react";
import AlertBanner from "@/components/addons/AlertBanner";
import MetricsSlider from "@/components/addons/MetricsSlider";
import { earningsMetricCards } from "@/constants";
import EarningsChart from "@/components/admin/EarningsChart";
import EarningTable from "@/components/earning/EarningTable";

const WalletPage = () => {
    const [showAlert, setShowAlert] = useState(true);

    return (
        <div className="h-[calc(100dvh-120px)] w-full overflow-y-auto p-4">
            {/* Alert Banner */}
            <AlertBanner
                title="Earnings Summary"
                description="Your platform earnings are performing consistently through all revenue channels."
                show={showAlert}
                onClose={() => setShowAlert(false)}
            />

            {/* Metrics Slider */}
            <MetricsSlider cards={earningsMetricCards} />
            <EarningsChart />
            <EarningTable />
        </div>
    );
};

export default WalletPage;