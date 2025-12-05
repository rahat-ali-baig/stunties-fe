"use client";

import React, { forwardRef, ButtonHTMLAttributes } from "react";
import { LucideIcon, Loader2 } from "lucide-react";

export interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: string;
  icon?: LucideIcon | React.ElementType;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean;
  badge?: string | number;
  badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  badgeVariant?: 'default' | 'primary' | 'danger' | 'success' | 'warning';
  rounded?: boolean;
  pill?: boolean;
  shadow?: boolean;
  hoverEffect?: 'scale' | 'lift' | 'glow' | 'none';
}

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      loadingText,
      icon: Icon,
      iconPosition = 'left',
      iconOnly = false,
      badge,
      badgePosition = 'top-right',
      badgeVariant = 'primary',
      rounded = false,
      pill = false,
      shadow = false,
      hoverEffect = 'scale',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Size classes
    const getSizeClasses = () => {
      switch (size) {
        case 'xs':
          return iconOnly ? 'w-8 h-8' : 'px-2.5 py-1.5 text-xs';
        case 'sm':
          return iconOnly ? 'w-10 h-10' : 'px-3 py-1.5 text-sm';
        case 'lg':
          return iconOnly ? 'w-12 h-12' : 'px-6 py-3 text-base';
        case 'xl':
          return iconOnly ? 'w-14 h-14' : 'px-8 py-4 text-lg';
        default: // md
          return iconOnly ? 'w-10 h-10' : 'px-4 py-2 text-sm';
      }
    };

    // Variant classes
    const getVariantClasses = () => {
      const baseClasses = 'font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50';
      
      switch (variant) {
        case 'secondary':
          return `${baseClasses} bg-foreground/10 text-foreground hover:bg-foreground/20 border border-foreground/20 focus:ring-foreground/50`;
        
        case 'outline':
          return `${baseClasses} bg-transparent text-foreground border border-foreground/30 hover:bg-foreground/5 focus:ring-foreground/50`;
        
        case 'ghost':
          return `${baseClasses} bg-transparent text-foreground hover:bg-foreground/10 focus:ring-foreground/50`;
        
        case 'danger':
          return `${baseClasses} bg-red-500 text-white hover:bg-red-600 border border-red-500 focus:ring-red-500`;
        
        case 'success':
          return `${baseClasses} bg-emerald-500 text-white hover:bg-emerald-600 border border-emerald-500 focus:ring-emerald-500`;
        
        default: // primary
          return `${baseClasses} bg-primary text-foreground hover:opacity-70`;
      }
    };

    // Rounded classes
    const getRoundedClasses = () => {
      if (pill) return 'rounded-full';
      if (rounded) return 'rounded-lg';
      return 'rounded-md';
    };

    // Hover effect classes
    const getHoverEffectClasses = () => {
      if (isDisabled) return '';
      
      switch (hoverEffect) {
        case 'scale':
          return 'hover:scale-105 active:scale-95';
        case 'lift':
          return 'hover:-translate-y-0.5 active:translate-y-0';
        case 'glow':
          return 'hover:shadow-lg hover:shadow-primary/20';
        case 'none':
          return '';
        default:
          return 'hover:scale-105 active:scale-95';
      }
    };

    // Badge variant classes
    const getBadgeVariantClasses = () => {
      switch (badgeVariant) {
        case 'primary':
          return 'bg-primary text-foreground';
        case 'danger':
          return 'bg-red-500 text-white';
        case 'success':
          return 'bg-emerald-500 text-white';
        case 'warning':
          return 'bg-amber-500 text-white';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    // Badge position classes
    const getBadgePositionClasses = () => {
      switch (badgePosition) {
        case 'top-left':
          return 'top-0 left-0 -translate-x-1/2 -translate-y-1/2';
        case 'top-right':
          return 'top-0 right-0 translate-x-1/2 -translate-y-1/2';
        case 'bottom-left':
          return 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2';
        case 'bottom-right':
          return 'bottom-0 right-0 translate-x-1/2 translate-y-1/2';
        default:
          return 'top-0 right-0 translate-x-1/2 -translate-y-1/2';
      }
    };

    const buttonClasses = `
      ${getSizeClasses()}
      ${getVariantClasses()}
      ${getRoundedClasses()}
      ${getHoverEffectClasses()}
      ${fullWidth && !iconOnly ? 'w-full' : ''}
      ${shadow ? 'shadow-md' : ''}
      ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      ${className}
      relative inline-flex items-center justify-center gap-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const renderIcon = () => {
      if (loading) {
        return <Loader2 className="w-4 h-4 animate-spin" />;
      }
      if (Icon) {
        return <Icon className={size === 'xs' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />;
      }
      return null;
    };

    const renderContent = () => {
      if (iconOnly) return renderIcon();
      
      const content = loading && loadingText ? loadingText : children;
      
      return (
        <>
          {iconPosition === 'left' && renderIcon()}
          {content}
          {iconPosition === 'right' && renderIcon()}
        </>
      );
    };

    return (
      <button
        ref={ref}
        className={buttonClasses.trim()}
        disabled={isDisabled}
        {...props}
      >
        {renderContent()}
        
        {badge && !loading && (
          <span className={`
            absolute ${getBadgePositionClasses()}
            ${getBadgeVariantClasses()}
            text-xs font-medium min-w-5 h-5 px-1.5
            rounded-full flex items-center justify-center
            border border-white
          `}>
            {badge}
          </span>
        )}
      </button>
    );
  }
);

PrimaryButton.displayName = "Button";

export default PrimaryButton;