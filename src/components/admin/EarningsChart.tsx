'use client';

import React, { useState, useMemo } from 'react';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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

const EarningsChart: React.FC<EarningsChartProps> = ({ timeRange = "30 days" }) => {
    const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);
    const [visibleCharts, setVisibleCharts] = useState({
        revenue: true,
        organic: true,
        referrals: true,
        direct: true
    });

    const chartData = useMemo(() => {
        const generateRandomData = (base: number, variance: number) =>
            Math.max(0, base + (Math.random() - 0.5) * variance * 2);

        const timeRanges = {
            "7 days": {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                baseRevenue: 20000,
                variance: 8000
            },
            "30 days": {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                baseRevenue: 25000,
                variance: 15000
            },
            "90 days": {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                baseRevenue: 35000,
                variance: 25000
            }
        };

        const rangeConfig = timeRanges[selectedTimeRange as keyof typeof timeRanges] || timeRanges["30 days"];

        return rangeConfig.labels.map((label, index) => {
            const base = rangeConfig.baseRevenue + (index * rangeConfig.variance * 0.3);
            const revenue = generateRandomData(base, rangeConfig.variance);
            const organic = generateRandomData(revenue * 0.3, revenue * 0.1);
            const referrals = generateRandomData(revenue * 0.25, revenue * 0.08);
            const direct = generateRandomData(revenue * 0.45, revenue * 0.12);

            return {
                month: label,
                revenue: Math.round(revenue),
                organic: Math.round(organic),
                referrals: Math.round(referrals),
                direct: Math.round(direct)
            };
        });
    }, [selectedTimeRange]);

    const toggleChart = (chart: keyof typeof visibleCharts) => {
        setVisibleCharts(prev => ({
            ...prev,
            [chart]: !prev[chart]
        }));
    };

    return (
        <div className="py-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-xl font-medium text-foreground">Earnings Overview</h2>
                    <p className="text-sm text-foreground/70 mt-1">
                        Total revenue and breakdown by source
                    </p>
                </div>
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                    <SelectTrigger className="w-[120px] border-border bg-transparent">
                        <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7 days">7 days</SelectItem>
                        <SelectItem value="30 days">30 days</SelectItem>
                        <SelectItem value="90 days">90 days</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#435c00" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#435c00" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#D7FF66" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#D7FF66" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorReferrals" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#262626" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#262626" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorDirect" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#090909" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#090909" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            horizontal={true}
                            vertical={false}
                            stroke="#E5E7EB"
                            strokeDasharray="0" // Changed from "3 3" to "0" for solid lines
                        />

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            }}
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white border border-border rounded-lg p-3">
                                            <p className="font-medium text-foreground mb-2">{label}</p>
                                            <div className="space-y-1">
                                                {payload.map((entry, index) => (
                                                    <p 
                                                        key={index} 
                                                        className="text-sm text-foreground"
                                                        style={{ 
                                                            color: entry.dataKey === 'revenue' ? '#435c00' :
                                                                   entry.dataKey === 'organic' ? '#D7FF66' :
                                                                   entry.dataKey === 'referrals' ? '#262626' : '#090909'
                                                        }}
                                                    >
                                                        {entry.name}: ${entry.value?.toLocaleString()}
                                                    </p>
                                                ))}
                                            </div>
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
                                stroke="#090909"
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
                                stroke="#262626"
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
                                stroke="#D7FF66"
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
                                stroke="#435c00"
                                fill="url(#colorRevenue)"
                                name="Total Revenue"
                                strokeWidth={2}
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Toggle buttons for charts */}
            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={() => toggleChart('revenue')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${visibleCharts.revenue
                        ? 'bg-primary-dark/30 text-foreground border-primary-dark/30'
                        : 'border-border text-foreground/40'
                        }`}
                >
                    {visibleCharts.revenue ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span className="text-sm">Total Revenue</span>
                </button>

                <button
                    onClick={() => toggleChart('organic')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${visibleCharts.organic
                        ? 'bg-primary/30 text-foreground border-primary/30'
                        : 'border-border text-foreground/40'
                        }`}
                >
                    {visibleCharts.organic ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span className="text-sm">Organic</span>
                </button>

                <button
                    onClick={() => toggleChart('referrals')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${visibleCharts.referrals
                        ? 'bg-secondary/10 text-foreground border-secondary/30'
                        : 'border-border text-foreground/40'
                        }`}
                >
                    {visibleCharts.referrals ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span className="text-sm">Referrals</span>
                </button>

                <button
                    onClick={() => toggleChart('direct')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${visibleCharts.direct
                        ? 'bg-foreground/30 text-foreground border-foreground/30'
                        : 'border-border text-foreground/40'
                        }`}
                >
                    {visibleCharts.direct ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span className="text-sm">Direct Sales</span>
                </button>
            </div>
        </div>
    );
};

export default EarningsChart;