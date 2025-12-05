"use client";

import React, { forwardRef } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";

export interface SelectOption {
    value: any;
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    description?: string;
}

export interface SearchSelectProps {
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
    isMulti?: boolean;
    isClearable?: boolean;
    isSearchable?: boolean;
    noOptionsMessage?: string | ((obj: { inputValue: string }) => string);
    loadingMessage?: string | ((obj: { inputValue: string }) => string);
    menuPortalTarget?: HTMLElement | null;
    menuPlacement?: "auto" | "bottom" | "top";
    limit?: number;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
    onInputChange?: (value: string) => void;
    components?: any;
    name?: string;
    id?: string;
    formik?: any;
    error?: string;
    touched?: boolean;
    showError?: boolean;
    label?: string;
    helperText?: string;

    // Async specific props
    async?: boolean;
    loadOptions?: (inputValue: string, callback: (options: SelectOption[]) => void) => Promise<SelectOption[]> | void;
    defaultOptions?: boolean | SelectOption[];
    cacheOptions?: boolean;
    debounceTimeout?: number;
    minInputLength?: number;
    onSearch?: (inputValue: string) => void;
    [key: string]: any;
}

// Custom Styles
const getCustomSelectStyles = (props: Partial<SearchSelectProps> = {}) => ({
    control: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: props.disabled ? 'var(--color-background-muted)' : 'var(--color-background)',
        border: `1px solid ${props.error && props.touched ? '#ef4444' : '#09090930'}`,
        borderRadius: '0.5rem',
        minHeight: '40px',
        fontSize: '14px',
        cursor: 'pointer',
        '&:hover': {
            borderColor: props.error && props.touched ? '#ef4444' : '#435c00',
        },
        boxShadow: state.isFocused && !props.error
            ? '0 0 0 3px rgba(67, 92, 0, 0.1)'
            : props.error && props.touched
                ? '0 0 0 3px rgba(239, 68, 68, 0.1)'
                : 'none',
    }),
    menu: (provided: any) => ({
        ...provided,
        backgroundColor: 'white',
        border: '1px solid #D7FF66',
        borderRadius: '0.375rem',
        marginTop: '4px',
        fontSize: '14px',
        zIndex: 9999,
    }),
    menuPortal: (provided: any) => ({
        ...provided,
        zIndex: 9999,
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? '#D7FF66'
            : state.isFocused
                ? 'rgba(67, 92, 0, 0.1)'
                : 'transparent',
        color: 'var(--color-foreground)',
        padding: '8px 12px',
        fontSize: '14px',
        '&:hover': {
            backgroundColor: 'rgba(67, 92, 0, 0.1)',
            color: 'var(--color-foreground)',
        },
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: 'var(--color-foreground)',
    }),
    multiValue: (provided: any) => ({
        ...provided,
        backgroundColor: 'rgba(67, 92, 0, 0.1)',
        borderRadius: '4px',
    }),
    multiValueLabel: (provided: any) => ({
        ...provided,
        color: 'var(--color-foreground)',
    }),
    multiValueRemove: (provided: any) => ({
        ...provided,
        color: '#666',
        '&:hover': {
            backgroundColor: 'rgba(67, 92, 0, 0.2)',
            color: '#333',
        },
    }),
    input: (provided: any) => ({
        ...provided,
        color: 'var(--color-foreground)',
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: 'rgba(9, 9, 9, 0.5)',
    }),
    dropdownIndicator: (provided: any) => ({
        ...provided,
        color: 'rgba(9, 9, 9, 0.5)',
        '&:hover': {
            color: 'var(--color-foreground)',
        },
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    clearIndicator: (provided: any) => ({
        ...provided,
        color: 'rgba(9, 9, 9, 0.5)',
        '&:hover': {
            color: 'var(--color-foreground)',
        },
    }),
});

const SearchSelect = forwardRef<any, SearchSelectProps>(
    (
        {
            value,
            onChange,
            options = [],
            placeholder = "Select or search...",
            disabled = false,
            loading = false,
            className = "",
            selectClassName = "",
            menuClassName = "",
            optionClassName = "",
            isMulti = false,
            isClearable = true,
            isSearchable = true,
            noOptionsMessage = "No options found",
            loadingMessage = "Loading...",
            menuPortalTarget = typeof document !== 'undefined' ? document.body : null,
            menuPlacement = "auto",
            limit,
            onMenuOpen,
            onMenuClose,
            onInputChange,
            components,
            name,
            id,
            formik,
            error,
            touched = false,
            showError = true,
            label,
            helperText,

            // Async props
            async = false,
            loadOptions,
            defaultOptions = true,
            cacheOptions = true,
            debounceTimeout = 300,
            minInputLength = 0,
            onSearch,
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

        const customStyles = getCustomSelectStyles({ error: currentError, touched: currentTouched, onChange });

        // Find selected option(s)
        const getValue = () => {
            if (isMulti && Array.isArray(currentValue)) {
                return currentValue.map(val =>
                    options.find((opt: any) => opt.value === val) || { value: val, label: val.toString() }
                );
            }
            return options.find((opt: any) => opt.value === currentValue) || null;
        };

        const handleChange = (selectedOption: any) => {
            let newValue;
            if (isMulti) {
                newValue = selectedOption ? selectedOption.map((opt: any) => opt.value) : [];
            } else {
                newValue = selectedOption ? selectedOption.value : null;
            }

            onChange(newValue);
            if (formik && name) {
                formik.setFieldValue(name, newValue);
                if (currentTouched) {
                    formik.setFieldTouched(name, false);
                }
            }
        };

        // Custom load options with limit support
        const customLoadOptions = async (inputValue: string, callback?: (options: SelectOption[]) => void) => {
            if (!loadOptions) return [];

            if (onSearch) {
                onSearch(inputValue);
            }

            try {
                const results = await loadOptions(inputValue, callback || (() => { }));
                if (Array.isArray(results)) {
                    return limit ? results.slice(0, limit) : results;
                }
                return results || [];
            } catch (error) {
                console.error('Error loading options:', error);
                return [];
            }
        };

        const SelectComponent = async && loadOptions ? AsyncSelect : Select;

        return (
            <div className={`space-y-2 ${className}`}>
                {label && (
                    <label htmlFor={id || name} className="block text-sm font-medium text-foreground">
                        {label}
                    </label>
                )}

                <SelectComponent
                    ref={ref}
                    id={id || name}
                    name={name}
                    value={getValue()}
                    onChange={handleChange}
                    options={limit ? options.slice(0, limit) : options}
                    placeholder={placeholder}
                    isDisabled={disabled}
                    isLoading={loading}
                    isMulti={isMulti}
                    isClearable={isClearable}
                    isSearchable={isSearchable}
                    styles={customStyles}
                    className={selectClassName}
                    classNamePrefix="react-select"
                    noOptionsMessage={() =>
                        typeof noOptionsMessage === 'function'
                            ? noOptionsMessage({ inputValue: '' })
                            : noOptionsMessage
                    }
                    loadingMessage={() =>
                        typeof loadingMessage === 'function'
                            ? loadingMessage({ inputValue: '' })
                            : loadingMessage
                    }
                    menuPortalTarget={menuPortalTarget}
                    menuPlacement={menuPlacement}
                    onMenuOpen={onMenuOpen}
                    onMenuClose={onMenuClose}
                    onInputChange={onInputChange}
                    components={components}
                    {...(async && loadOptions ? {
                        loadOptions: customLoadOptions,
                        defaultOptions,
                        cacheOptions,
                        debounceTimeout,
                        minInputLength,
                    } : {})}
                    {...props}
                />

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

SearchSelect.displayName = "SearchSelect";

export default SearchSelect;