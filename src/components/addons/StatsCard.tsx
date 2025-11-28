// components/StatsCard.tsx
'use client';
import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    icon: LucideIcon;
    background?: string;
    color?: string;
    invBg: string;
    invClr: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    change,
    icon: IconComponent,
    background = "bg-primary",
    color = "text-background",
    invBg = "bg-background",
    invClr = "text-primary",
}) => {
    return (
        <div className={`${background} cursor-pointer rounded-xl p-4 flex flex-col gap-5`}>
            {/* Header with Icon and Percentage */}
            <div className="flex items-center justify-between">
                <IconComponent className={`h-8 w-8 ${color}`} />
                <span className={`text-sm font-semibold px-3 py-1 font-helvetica tracking-wide rounded-full ${invBg} ${invClr}`}>
                    {change}
                </span>
            </div>

            {/* Content */}
            <p className={`${color} text-xl uppercase font-semibold tracking-wide`}>
                {title}
            </p>

            <h3 className={`${color} text-3xl font-medium tracking-tight`}>
                {value}
            </h3>
        </div>
    );
};

export default StatsCard;