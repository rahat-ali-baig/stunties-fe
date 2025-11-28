'use client';
import React, { useState } from "react";
import { TrendingUp, X } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface AlertBannerProps {
    title: string;
    description: string;
    show: boolean;
    onClose: () => void;
    icon?: React.ComponentType<any>;
}

const AlertBanner: React.FC<AlertBannerProps> = ({
    title,
    description,
    show,
    onClose,
    icon: Icon = TrendingUp
}) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 300);
    };

    if (!show && !isClosing) return null;

    return (
        <div className={`mb-8 transform transition-all duration-300 ease-in-out ${
            isClosing 
                ? 'opacity-0 scale-95 -translate-y-2 max-h-0 -mt-8 mb-0' 
                : 'opacity-100 scale-100 translate-y-0 max-h-32'
        } overflow-hidden`}>
            <Alert className="bg-card border-border/20 rounded-lg shadow-lg relative">
                <Icon className="h-4 w-4" />
                <AlertTitle className="text-foreground font-semibold">
                    {title}
                </AlertTitle>
                <AlertDescription className="text-muted-foreground">
                    {description}
                </AlertDescription>
                <button
                    onClick={handleClose}
                    className="absolute right-3 top-3 p-1 rounded-full hover:bg-muted transition-colors duration-200"
                >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
            </Alert>
        </div>
    );
};

export default AlertBanner;