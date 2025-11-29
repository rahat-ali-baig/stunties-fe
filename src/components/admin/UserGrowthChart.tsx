'use client';

import { defaultDistributionData, defaultGrowthData } from '@/constants';
import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

interface UserGrowthData {
    month: string;
    newUsers: number;
    verified: number;
}

interface UserDistributionData {
    country: string;
    users: number;
    code: string;
}

interface UserGrowthChartProps {
    growthData?: UserGrowthData[];
    distributionData?: UserDistributionData[];
}

const UserGrowthChart: React.FC<UserGrowthChartProps> = ({
    growthData = defaultGrowthData,
    distributionData = defaultDistributionData
}) => {
    const totalUsers = distributionData.reduce((sum, item) => sum + item.users, 0);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="py-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <div className="mb-8">
                    <h2 className="text-lg xl:text-xl font-medium text-foreground font-coolvetica">User Growth</h2>
                    <p className="text-sm text-foreground/40 mt-1">
                        New users and verification rates
                    </p>
                </div>

                {/* Left Side - Bar Chart */}
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={growthData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid
                                horizontal={true}
                                vertical={false}
                                stroke="#E3E3E330"
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#FFFFFF60', fontSize: 12 }}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#FFFFFF60', fontSize: 12 }}
                                domain={[0, 2600]}
                                ticks={[0, 650, 1300, 1950, 2600]}
                            />

                            <Tooltip
                                cursor={false}
                                contentStyle={{
                                    backgroundColor: '#090909',
                                    border: '1px solid #E3E3E330',
                                    borderRadius: '8px',
                                }}
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-background border border-border/10 rounded-lg p-3 shadow-lg outline-none border-none ring-0">
                                                <p className="font-medium text-foreground mb-2">{label}</p>
                                                <div className="space-y-1">
                                                    <p className="text-sm text-border/60">
                                                        New Users : {payload[0]?.value?.toLocaleString()}
                                                    </p>
                                                    <p className="text-sm text-primary-foreground">
                                                        Verified : {payload[1]?.value?.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />

                            {/* New Users Bar */}
                            <Bar
                                dataKey="newUsers"
                                fill="#262626"
                                radius={[2, 2, 0, 0]}
                                barSize={24}
                            />

                            {/* Verified Users Bar */}
                            <Bar
                                dataKey="verified"
                                fill="#AAF7FF"
                                radius={[2, 2, 0, 0]}
                                barSize={24}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* User Distribution */}
            <div>
                <div className="mb-6">
                    <h2 className="text-lg xl:text-xl font-medium text-foreground font-coolvetica">User Distribution</h2>
                    <p className="text-sm text-foreground/40 mt-1">
                        Active users by country
                    </p>
                </div>

                <div className="space-y-4">
                    {distributionData.map((item, index) => (
                        <div key={item.code} className="flex items-center gap-4">
                            {/* Country Code */}
                            <div className="w-8 text-sm font-medium text-foreground/60">
                                {item.code}
                            </div>

                            {/* Bar Container */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-foreground">
                                        {item.country}
                                    </span>
                                    <span className="text-sm font-medium text-foreground">
                                        {item.users.toLocaleString()}
                                    </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-secondary/20 rounded-full h-2">
                                    <div
                                        className="bg-primary-foreground h-2 rounded-full transition-all duration-1000 ease-out"
                                        style={{ 
                                            width: isLoaded ? `${(item.users / totalUsers) * 100}%` : '0%',
                                            transitionDelay: `${index * 100}ms`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserGrowthChart;