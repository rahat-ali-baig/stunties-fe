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
        <div className="py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg xl:text-xl font-medium text-foreground font-coolvetica">Earnings Overview</h2>
                    <p className="text-sm text-foreground/40 mt-1">
                        Total revenue and breakdown by source
                    </p>
                </div>
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                    <SelectTrigger className="w-[120px] border-border/20 bg-transparent">
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
                <ResponsiveContainer width="100%" height="100%" className={'border-0! outline-none! '} >
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#D7FF66" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#D7FF66" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#AAF7FF" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#AAF7FF" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorReferrals" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#E3E3E3" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#E3E3E3" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorDirect" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ffff00" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#ffff00" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        {/* Only show Y and X axis lines */}
                        <CartesianGrid
                            horizontal={false}
                            vertical={false}
                            stroke="#D7FF66"
                        />

                        <XAxis
                            dataKey="month"
                            axisLine={{ stroke: '#E3E3E330' }}
                            tickLine={false}
                            tick={{ fill: '#FFFFFF60', fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={{ stroke: '#E3E3E330' }}
                            tickLine={false}
                            tick={{ fill: '#FFFFFF60', fontSize: 12 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />

                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-background border border-border/10 rounded-lg p-3 shadow-lg outline-none border-none ring-0">
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
                                stroke="#ffff0060"
                                fill="url(#colorDirect)"
                                name="Direct Sales"
                                strokeWidth={1}
                            />
                        )}
                        {visibleCharts.referrals && (
                            <Area
                                type="monotone"
                                dataKey="referrals"
                                stackId="1"
                                stroke="#E3E3E360"
                                fill="url(#colorReferrals)"
                                name="Referrals"
                                strokeWidth={1}
                            />
                        )}
                        {visibleCharts.organic && (
                            <Area
                                type="monotone"
                                dataKey="organic"
                                stackId="1"
                                stroke="#AAF7FF60"
                                fill="url(#colorOrganic)"
                                name="Organic"
                                strokeWidth={1}
                            />
                        )}
                        {visibleCharts.revenue && (
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stackId="1"
                                stroke="#D7FF6660"
                                fill="url(#colorRevenue)"
                                name="Total Revenue"
                                strokeWidth={1}
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Toggle buttons for charts */}
            <div className="flex justify-center gap-6 mt-4">
                <button
                    onClick={() => toggleChart('revenue')}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-colors ${visibleCharts.revenue
                        ? 'bg-primary/5 text-white border-primary/10'
                        : 'border-border/10 opacity-50'
                        }`}
                >
                    {visibleCharts.revenue ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span className="text-xs">Total Revenue</span>
                </button>

                <button
                    onClick={() => toggleChart('organic')}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-colors ${visibleCharts.organic
                        ? 'bg-[#AAF7FF]/5 text-white border-[#AAF7FF]/10'
                        : 'border-border/10 opacity-50'
                        }`}
                >
                    {visibleCharts.organic ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span className="text-xs">Organic</span>
                </button>

                <button
                    onClick={() => toggleChart('referrals')}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-colors ${visibleCharts.referrals
                        ? 'bg-[#E3E3E3]/5 text-white border-[#E3E3E3]/10'
                        : 'border-border/10 opacity-50'
                        }`}
                >
                    {visibleCharts.referrals ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span className="text-xs">Referrals</span>
                </button>

                <button
                    onClick={() => toggleChart('direct')}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-colors ${visibleCharts.direct
                        ? 'bg-[#ffff00]/5 text-white border-[#ffff00]/10'
                        : 'border-border/10 opacity-50'
                        }`}
                >
                    {visibleCharts.direct ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span className="text-xs">Direct Sales</span>
                </button>
            </div>
        </div>
    );
};

export default EarningsChart;