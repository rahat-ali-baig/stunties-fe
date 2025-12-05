"use client";

import React, { forwardRef } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface SelectOption {
    value: any;
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    description?: string;
}

export interface CustomSelectProps {
    value?: any;
    onChange: (value: any) => void;
    options?: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    selectClassName?: string;
    menuClassName?: string;
    optionClassName?: string;
    noOptionsMessage?: string;
    loadingMessage?: string;
    limit?: number;
    name?: string;
    id?: string;
    formik?: any;
    error?: string;
    touched?: boolean;
    showError?: boolean;
    label?: string;
    helperText?: string;
    [key: string]: any;
}

const CustomSelect = forwardRef<HTMLButtonElement, CustomSelectProps>(
    (
        {
            value,
            onChange,
            options = [],
            placeholder = "Select...",
            disabled = false,
            loading = false,
            className = "",
            selectClassName = "",
            menuClassName = "",
            optionClassName = "",
            noOptionsMessage = "No options found",
            loadingMessage = "Loading...",
            limit,
            name,
            id,
            formik,
            error,
            touched = false,
            showError = true,
            label,
            helperText,
            ...props
        },
        ref
    ) => {
        // Handle formik integration
        const formikValue = formik?.values?.[name || ''];
        const formikError = formik?.errors?.[name || ''];
        const formikTouched = formik?.touched?.[name || ''];

        const currentValue = value || formikValue;
        const currentError = error || formikError;
        const currentTouched = touched || formikTouched;

        // Apply limit if provided
        const displayOptions = limit ? options.slice(0, limit) : options;

        const handleChange = (newValue: any) => {
            onChange(newValue);
            if (formik && name) {
                formik.setFieldValue(name, newValue);
                if (currentTouched) {
                    formik.setFieldTouched(name, false);
                }
            }
        };

        return (
            <div className={`space-y-2 ${className}`}>
                {label && (
                    <label htmlFor={id || name} className="block text-sm font-medium text-foreground">
                        {label}
                    </label>
                )}

                <Select
                    value={currentValue}
                    onValueChange={handleChange}
                    disabled={disabled}
                    name={name}
                    {...props}
                >
                    <SelectTrigger
                        ref={ref}
                        id={id || name}
                        className={`w-full ${selectClassName} ${currentError && currentTouched && showError ? 'border-red-500 focus:ring-red-500' : ''}`}
                    >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent className={menuClassName}>
                        {loading ? (
                            <div className="py-2 text-center text-sm text-foreground/60">
                                {loadingMessage}
                            </div>
                        ) : displayOptions.length === 0 ? (
                            <div className="py-2 text-center text-sm text-foreground/60">
                                {noOptionsMessage}
                            </div>
                        ) : (
                            displayOptions.map((option: any) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    disabled={option.disabled}
                                    className={`${optionClassName}`}
                                >
                                    <div className="flex items-center gap-2">
                                        {option.icon && <span className="shrink-0">{option.icon}</span>}
                                        <div className="flex flex-col">
                                            <span>{option.label}</span>
                                            {option.description && (
                                                <span className="text-xs text-foreground/60 mt-0.5">{option.description}</span>
                                            )}
                                        </div>
                                    </div>
                                </SelectItem>
                            ))
                        )}
                    </SelectContent>
                </Select>

                {helperText && !currentError && (
                    <p className="text-sm text-foreground/60">{helperText}</p>
                )}

                {showError && currentError && currentTouched && (
                    <p className="text-sm text-red-600">{currentError}</p>
                )}
            </div>
        );
    }
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;