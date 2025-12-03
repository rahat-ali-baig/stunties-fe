"use client";

import React from 'react';
import { X } from 'lucide-react';

interface ModalWrapperProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    closeOnOverlayClick?: boolean;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = 'md',
    closeOnOverlayClick = true
}) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && closeOnOverlayClick) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={handleOverlayClick}
        >
            <div className={`bg-background rounded-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto border border-foreground/10`}>
                {/* Modal Header */}
                <div className="sticky top-0 bg-background border-b border-foreground/10 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
                            {description && (
                                <p className="text-foreground/60 mt-1">{description}</p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"
                            aria-label="Close modal"
                        >
                            <X className="w-6 h-6 text-foreground/60" />
                        </button>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalWrapper;