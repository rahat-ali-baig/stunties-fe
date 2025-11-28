'use client';

import React, { useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Eye, EyeOff } from 'lucide-react';

interface EarningsData {
    month: string;
    revenue: number;
    organic: number;
    referrals: number;
    direct: number;
}

interface EarningsChartProps {
    data?: EarningsData[];
    timeRange?: string;
}

const EarningsChart: React.FC<EarningsChartProps> = ({
    data = defaultData,
    timeRange = "30 days"
}) => {
    const [visibleCharts, setVisibleCharts] = useState({
        revenue: true,
        organic: true,
        referrals: true,
        direct: true
    });

    const toggleChart = (chart: keyof typeof visibleCharts) => {
        setVisibleCharts(prev => ({
            ...prev,
            [chart]: !prev[chart]
        }));
    };

    return (
        <div className="py-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-medium text-foreground">Earnings Overview</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Total revenue and breakdown by source
                    </p>
                </div>
                <div className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground">
                    {timeRange}
                </div>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="colorReferrals" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#ffc658" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="colorDirect" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff8042" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#ff8042" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        
                        {/* Only show Y and X axis lines */}
                        <CartesianGrid 
                            horizontal={false} 
                            vertical={false}
                            stroke="hsl(var(--border))"
                        />
                        
                        <XAxis
                            dataKey="month"
                            axisLine={{ stroke: 'hsl(var(--border))' }}
                            tickLine={false}
                            tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={{ stroke: 'hsl(var(--border))' }}
                            tickLine={false}
                            tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-background border border-border rounded-lg p-3 shadow-lg outline-none border-none ring-0">
                                            <p className="font-medium text-foreground mb-2">{label}</p>
                                            {payload.map((entry, index) => (
                                                <p key={index} className="text-sm text-foreground" style={{ color: entry.color }}>
                                                    {entry.name}: ${entry.value?.toLocaleString()}
                                                </p>
                                            ))}
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        
                        {/* Conditionally render areas based on visibility */}
                        {visibleCharts.direct && (
                            <Area
                                type="monotone"
                                dataKey="direct"
                                stackId="1"
                                stroke="#ff8042"
                                fill="url(#colorDirect)"
                                name="Direct Sales"
                                strokeWidth={2}
                            />
                        )}
                        {visibleCharts.referrals && (
                            <Area
                                type="monotone"
                                dataKey="referrals"
                                stackId="1"
                                stroke="#ffc658"
                                fill="url(#colorReferrals)"
                                name="Referrals"
                                strokeWidth={2}
                            />
                        )}
                        {visibleCharts.organic && (
                            <Area
                                type="monotone"
                                dataKey="organic"
                                stackId="1"
                                stroke="#82ca9d"
                                fill="url(#colorOrganic)"
                                name="Organic"
                                strokeWidth={2}
                            />
                        )}
                        {visibleCharts.revenue && (
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stackId="1"
                                stroke="#8884d8"
                                fill="url(#colorRevenue)"
                                name="Total Revenue"
                                strokeWidth={2}
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Toggle buttons for charts */}
            <div className="flex justify-center gap-6 mt-4">
                <button
                    onClick={() => toggleChart('revenue')}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-colors ${
                        visibleCharts.revenue 
                            ? 'bg-[#8884d8] text-white border-[#8884d8]' 
                            : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                    }`}
                >
                    {visibleCharts.revenue ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span className="text-xs">Total Revenue</span>
                </button>
                
                <button
                    onClick={() => toggleChart('organic')}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-colors ${
                        visibleCharts.organic 
                            ? 'bg-[#82ca9d] text-white border-[#82ca9d]' 
                            : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                    }`}
                >
                    {visibleCharts.organic ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span className="text-xs">Organic</span>
                </button>
                
                <button
                    onClick={() => toggleChart('referrals')}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-colors ${
                        visibleCharts.referrals 
                            ? 'bg-[#ffc658] text-white border-[#ffc658]' 
                            : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                    }`}
                >
                    {visibleCharts.referrals ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span className="text-xs">Referrals</span>
                </button>
                
                <button
                    onClick={() => toggleChart('direct')}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-colors ${
                        visibleCharts.direct 
                            ? 'bg-[#ff8042] text-white border-[#ff8042]' 
                            : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                    }`}
                >
                    {visibleCharts.direct ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span className="text-xs">Direct Sales</span>
                </button>
            </div>
        </div>
    );
};

const defaultData: EarningsData[] = [
    { month: 'Jan', revenue: 15000, organic: 5000, referrals: 4000, direct: 6000 },
    { month: 'Feb', revenue: 25000, organic: 8000, referrals: 7000, direct: 10000 },
    { month: 'Mar', revenue: 35000, organic: 12000, referrals: 9000, direct: 14000 },
    { month: 'Apr', revenue: 45000, organic: 15000, referrals: 12000, direct: 18000 },
    { month: 'May', revenue: 55000, organic: 18000, referrals: 15000, direct: 22000 },
    { month: 'Jun', revenue: 65000, organic: 22000, referrals: 18000, direct: 25000 },
];

export default EarningsChart;