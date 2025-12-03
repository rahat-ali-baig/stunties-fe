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

const Select = ({ value, onValueChange, children }: any) => {
    return (
        <div className="relative inline-block">
            {React.Children.map(children, child => {
                if (child.type === SelectTrigger) {
                    return React.cloneElement(child, { value, onValueChange });
                }
                if (child.type === SelectContent) {
                    return React.cloneElement(child, { value, onValueChange });
                }
                return child;
            })}
        </div>
    );
};

const SelectTrigger = ({ value, onValueChange, className, children }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={className}
            >
                {children}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <SelectContent value={value} onValueChange={onValueChange} setIsOpen={setIsOpen} />
                </div>
            )}
        </div>
    );
};

const SelectValue = ({ placeholder }: any) => {
    const value = placeholder;
    return <span>{value}</span>;
};

const SelectContent = ({ value, onValueChange, setIsOpen, children }: any) => {
    const handleSelect = (val: string) => {
        onValueChange(val);
        setIsOpen(false);
    };

    return (
        <div className="py-1">
            {React.Children.map(children, child => {
                if (child.type === SelectItem) {
                    return React.cloneElement(child, { 
                        onSelect: handleSelect,
                        isSelected: child.props.value === value 
                    });
                }
                return child;
            })}
        </div>
    );
};

const SelectItem = ({ value, children, onSelect, isSelected }: any) => {
    return (
        <div
            onClick={() => onSelect(value)}
            className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${isSelected ? 'bg-gray-50' : ''}`}
        >
            {children}
        </div>
    );
};

interface EarningsData {
    month: string;
    revenue: number;
    commissions: number;
    subscriptions: number;
    boosts: number;
}

interface EarningsChartProps {
    data?: EarningsData[];
    timeRange?: string;
}

const EarningsChart: React.FC<EarningsChartProps> = ({ timeRange = "30 days" }) => {
    const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);
    const [visibleCharts, setVisibleCharts] = useState({
        revenue: true,
        commissions: true,
        subscriptions: true,
        boosts: true
    });

    const chartData = useMemo(() => {
        const timeRanges = {
            "7 days": {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                data: [
                    { revenue: 48000, commissions: 28000, subscriptions: 15000, boosts: 5000 },
                    { revenue: 52000, commissions: 30000, subscriptions: 16000, boosts: 6000 },
                    { revenue: 50000, commissions: 29000, subscriptions: 15500, boosts: 5500 },
                    { revenue: 55000, commissions: 32000, subscriptions: 17000, boosts: 6000 },
                    { revenue: 58000, commissions: 34000, subscriptions: 18000, boosts: 6000 },
                    { revenue: 60000, commissions: 35000, subscriptions: 19000, boosts: 6000 },
                    { revenue: 62000, commissions: 36000, subscriptions: 20000, boosts: 6000 }
                ]
            },
            "30 days": {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                data: [
                    { revenue: 52000, commissions: 30000, subscriptions: 16000, boosts: 6000 },
                    { revenue: 58000, commissions: 32000, subscriptions: 18000, boosts: 8000 },
                    { revenue: 56000, commissions: 31000, subscriptions: 17000, boosts: 8000 },
                    { revenue: 64000, commissions: 35000, subscriptions: 20000, boosts: 9000 }
                ]
            },
            "90 days": {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [
                    { revenue: 180000, commissions: 100000, subscriptions: 60000, boosts: 20000 },
                    { revenue: 195000, commissions: 110000, subscriptions: 65000, boosts: 20000 },
                    { revenue: 210000, commissions: 120000, subscriptions: 70000, boosts: 20000 },
                    { revenue: 220000, commissions: 125000, subscriptions: 75000, boosts: 20000 },
                    { revenue: 235000, commissions: 135000, subscriptions: 80000, boosts: 20000 },
                    { revenue: 250000, commissions: 145000, subscriptions: 85000, boosts: 20000 }
                ]
            }
        };

        const rangeConfig = timeRanges[selectedTimeRange as keyof typeof timeRanges] || timeRanges["30 days"];

        return rangeConfig.labels.map((label, index) => ({
            month: label,
            revenue: rangeConfig.data[index].revenue,
            commissions: rangeConfig.data[index].commissions,
            subscriptions: rangeConfig.data[index].subscriptions,
            boosts: rangeConfig.data[index].boosts
        }));
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
                    <h2 className="text-xl font-medium text-foreground">Earnings Breakdown (30 days)</h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Revenue by category across the selected period.
                    </p>
                </div>
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                    <SelectTrigger className="w-[120px] border border-gray-300 bg-white px-3 py-2 rounded-lg text-sm">
                        <SelectValue placeholder={selectedTimeRange} />
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
                                <stop offset="5%" stopColor="#D7FF66" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#D7FF66" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorCommissions" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#435c00" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#435c00" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorSubscriptions" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorBoosts" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FDE047" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#FDE047" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            horizontal={true}
                            vertical={false}
                            stroke="#E5E7EB"
                            strokeDasharray="0"
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
                            domain={[0, 80000]}
                            ticks={[0, 20000, 40000, 60000, 80000]}
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
                                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                                            <p className="font-medium text-foreground mb-2">{label}</p>
                                            <div className="space-y-1">
                                                {payload.map((entry, index) => (
                                                    <p 
                                                        key={index} 
                                                        className="text-sm"
                                                        style={{ 
                                                            color: entry.dataKey === 'revenue' ? '#D7FF66' :
                                                                   entry.dataKey === 'commissions' ? '#435c00' :
                                                                   entry.dataKey === 'subscriptions' ? '#9CA3AF' : '#FDE047'
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
                        {visibleCharts.boosts && (
                            <Area
                                type="monotone"
                                dataKey="boosts"
                                stroke="#FDE047"
                                fill="url(#colorBoosts)"
                                name="Boosts"
                                strokeWidth={2}
                            />
                        )}
                        {visibleCharts.subscriptions && (
                            <Area
                                type="monotone"
                                dataKey="subscriptions"
                                stroke="#9CA3AF"
                                fill="url(#colorSubscriptions)"
                                name="Subscriptions"
                                strokeWidth={2}
                            />
                        )}
                        {visibleCharts.commissions && (
                            <Area
                                type="monotone"
                                dataKey="commissions"
                                stroke="#435c00"
                                fill="url(#colorCommissions)"
                                name="Commissions"
                                strokeWidth={2}
                            />
                        )}
                        {visibleCharts.revenue && (
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#D7FF66"
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
                        ? 'bg-primary/30 text-foreground border-primary'
                        : 'border-gray-300 text-gray-400'
                        }`}
                >
                    {visibleCharts.revenue ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span className="text-sm">Total Revenue</span>
                </button>

                <button
                    onClick={() => toggleChart('commissions')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${visibleCharts.commissions
                        ? 'bg-primary-dark/30 text-foreground border-primary-dark'
                        : 'border-gray-300 text-gray-400'
                        }`}
                >
                    {visibleCharts.commissions ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span className="text-sm">Commissions</span>
                </button>

                <button
                    onClick={() => toggleChart('subscriptions')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${visibleCharts.subscriptions
                        ? 'bg-gray-400/30 text-foreground border-gray-400'
                        : 'border-gray-300 text-gray-400'
                        }`}
                >
                    {visibleCharts.subscriptions ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span className="text-sm">Subscriptions</span>
                </button>

                <button
                    onClick={() => toggleChart('boosts')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${visibleCharts.boosts
                        ? 'bg-yellow-300/30 text-foreground border-yellow-300'
                        : 'border-gray-300 text-gray-400'
                        }`}
                >
                    {visibleCharts.boosts ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span className="text-sm">Boosts</span>
                </button>
            </div>
        </div>
    );
};

export default EarningsChart;