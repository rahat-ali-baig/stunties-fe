
'use client';

import React from "react";
import { LucideIcon } from "lucide-react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    icon: LucideIcon;
    forecast?: string;
    showIcon?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    change,
    icon: IconComponent,
    forecast,
    showIcon = true
}) => {
    const isPositive = change.includes('+');

    return (
        <div className="bg-white border border-border rounded-xl p-5 flex flex-col justify-between min-h-[140px] w-full">
            {/* Header - Title and Change */}
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-foreground/70">{title}</p>
                <div className="flex items-center gap-2">
                    {showIcon && (
                        <div className="p-2 rounded-lg bg-primary/10">
                            <IconComponent className="h-4 w-4 text-primary-dark" />
                        </div>
                    )}
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${isPositive
                            ? 'bg-primary/10 text-primary-dark'
                            : 'bg-rose-100 text-rose-700'
                        }`}>
                        {change.includes('+') || change.includes('-') ? change : `+${change}`}
                    </span>
                </div>
            </div>

            {/* Main Value */}
            <h3 className="text-2xl font-bold text-foreground mb-2">
                {value}
            </h3>

            {/* Change Comparison */}
            <div className="flex items-center gap-2 mb-1">
                {isPositive ? (
                    <FiTrendingUp className="w-4 h-4 text-primary-dark" />
                ) : (
                    <FiTrendingDown className="w-4 h-4 text-rose-600" />
                )}
                <span className="text-sm text-foreground/70">
                    {change.includes('vs') ? change : `${change} vs last week`}
                </span>
            </div>

            {/* Forecast Section */}
            {forecast && (
                <div className="mt-auto pt-3">
                    <div className="flex items-center gap-2 px-3 py-2 bg-primary-dark/10 rounded-lg">
                        <span className="text-sm text-primary-dark font-medium">
                            {forecast}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatsCard;

