import { ReactNode } from "react";
import { Sparkles } from "lucide-react";

interface PageHeaderProps {
    icon?: ReactNode;
    title: string;
    subtitle?: string;
    highlight?: string;
    colors?: {
        gradient?: string;
        glow?: string;
        iconBg?: string;
        iconShadow?: string;
        highlightText?: string;
    };
}

export default function PageHeader({
    icon = <Sparkles className="w-12 h-12" />,
    title,
    subtitle,
    highlight,
    colors = {},
}: PageHeaderProps) {
    // Default colors
    const {
        gradient = "from-transparent to-primary/5",
        glow = "bg-primary/40",
        iconBg = "from-primary/20 to-primary/20",
        iconShadow = "shadow-primary/30 dark:shadow-primary/40",
        highlightText = "text-primary",
    } = colors;

    return (
        <div className={`w-full mb-6 relative overflow-hidden p-6 rounded-2xl bg-linear-to-l ${gradient}`}>
            {/* Glow effect */}
            <div className={`w-40 h-40 rounded-full ${glow} blur-3xl absolute -top-8 -left-8 animate-pulse`} />

            <div className="relative flex flex-col gap-3 items-center text-center sm:flex-row sm:text-left sm:items-start">
                {/* Icon wrapper */}
                <div className={`flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-tr ${iconBg} shadow-lg ${iconShadow} transform transition-transform hover:scale-110 hover:rotate-6`}>
                    {icon}
                </div>

                {/* Title + subtitle */}
                <div className="flex flex-col sm:items-start items-center gap-1 sm:mt-0 mt-6 sm:text-left text-center">
                    <h1 className="w-fit! text-2xl md:text-3xl text-foreground flex items-center gap-2">
                        {title}
                        {highlight && (
                            <span className={`${highlightText} font-poppins drop-shadow-[0px_0px_10px] text-lg font-bold`}>
                                {highlight}
                            </span>
                        )}
                    </h1>
                    {subtitle && (
                        <p className="mt-1 text-sm text-gray-500">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}