"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export interface TabItem {
    id: string;
    label: string;
    icon?: React.ElementType | LucideIcon;
    count?: number;
    badge?: string | number;
    disabled?: boolean;
}

interface TabsProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
    tabs: TabItem[];
    variant?: 'default' | 'underline' | 'pills' | 'rounded';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    showIcon?: boolean;
    showBadge?: boolean;
    className?: string;
}

const Tabs: React.FC<TabsProps> = ({
    activeTab,
    onTabChange,
    tabs,
    variant = 'default',
    size = 'md',
    fullWidth = false,
    showIcon = true,
    showBadge = true,
    className = '',
}) => {
    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'px-3 py-1.5 text-xs';
            case 'lg':
                return 'px-6 py-3 text-base';
            default:
                return 'px-4 py-2 text-sm';
        }
    };

    const getVariantClasses = (isActive: boolean) => {
        const baseClasses = `font-medium transition-colors flex items-center gap-2 ${getSizeClasses()} ${fullWidth ? 'flex-1 justify-center' : ''
            }`;

        switch (variant) {
            case 'underline':
                return `${baseClasses} ${isActive
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-foreground/60 hover:text-foreground border-b-2 border-transparent'
                    }`;

            case 'pills':
                return `${baseClasses} rounded-full ${isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                    }`;

            case 'rounded':
                return `${baseClasses} rounded-lg ${isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                    }`;

            default:
                return `${baseClasses} rounded-lg ${isActive
                        ? 'bg-primary text-foreground font-semibold'
                        : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                    }`;
        }
    };

    const getBadgeClasses = (isActive: boolean) => {
        switch (variant) {
            case 'pills':
            case 'rounded':
                return `px-2 py-0.5 text-xs rounded-full ${isActive
                        ? 'bg-background/20 text-foreground'
                        : 'bg-foreground/10 text-foreground/60'
                    }`;

            default:
                return `px-2 py-0.5 text-xs rounded-full ${isActive
                        ? 'bg-background/20 text-foreground'
                        : 'bg-foreground/10 text-foreground/60'
                    }`;
        }
    };

    return (
        <div className={`flex gap-1 mb-6 ${className}`}>
            {tabs.map(({ id, label, icon: Icon, count, badge, disabled }) => {
                const isActive = activeTab === id;
                const displayBadge = badge !== undefined ? badge : count;

                return (
                    <button
                        key={id}
                        onClick={() => !disabled && onTabChange(id)}
                        disabled={disabled}
                        className={`
              ${getVariantClasses(isActive)}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
                    >
                        {showIcon && Icon && <Icon className="w-4 h-4" />}
                        <span>{label}</span>
                        {showBadge && displayBadge !== undefined && (
                            <span className={getBadgeClasses(isActive)}>
                                {displayBadge}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default Tabs;