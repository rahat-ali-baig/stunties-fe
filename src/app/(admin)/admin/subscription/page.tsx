"use client";

import { useState } from 'react';
import MetricsSlider from '@/components/admin/MetricsSlider';
import SubscriptionTable from '@/components/Subscription/SubscriptionTable';
import { subscriptionMetricCards } from '@/constants';


const SubscriptionManagementPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleViewUser = (subscription: any) => {
        console.log('View user:', subscription);
    };

    const handleViewHistory = (subscription: any) => {
        console.log('View history:', subscription);
    };

    const handleEdit = (subscription: any) => {
        console.log('Edit subscription:', subscription);
    };

    const handleCancel = (subscription: any) => {
        console.log('Cancel subscription:', subscription);
    };

    return (
        <div className="h-[calc(100dvh-120px)] w-full overflow-y-auto p-4">
            <div className="mb-8">
                <MetricsSlider cards={subscriptionMetricCards} />
            </div>

            <SubscriptionTable
                onViewUser={handleViewUser}
                onViewHistory={handleViewHistory}
                onEdit={handleEdit}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default SubscriptionManagementPage;