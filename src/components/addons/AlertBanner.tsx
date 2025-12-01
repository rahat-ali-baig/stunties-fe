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
        <div className={`mb-8 transform transition-all duration-300 ease-in-out ${isClosing
                ? 'opacity-0 scale-95 -translate-y-2 max-h-0 -mt-8 mb-0'
                : 'opacity-100 scale-100 translate-y-0 max-h-32'
            } overflow-hidden`}>
            <Alert className="flex items-center bg-linear-to-r from-primary/10 to-primary-dark/10 border-primary-dark/10 rounded-lg relative">
                <Icon className="h-6 w-6 my-auto text-primary-dark" />

                <div className="flex-1">
                    <AlertTitle className="text-foreground font-semibold">
                        {title}
                    </AlertTitle>
                    <AlertDescription className="text-muted-foreground">
                        {description}
                    </AlertDescription>
                </div>
                <button
                    onClick={handleClose}
                    className=" p-1 rounded-full hover:bg-muted transition-colors duration-200"
                >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
            </Alert>
        </div>
    );
};

export default AlertBanner;