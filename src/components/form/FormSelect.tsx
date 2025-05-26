import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import Label from "./Label";

interface SelectLabelProps {
    label: string;
    name: string;
    options: { label: string; value: string | number }[];
    required?: boolean;
    placeholder?: string;
    error?: FieldError;
    register?: UseFormRegisterReturn;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
    value?: string | number;
}

const SelectLabel: React.FC<SelectLabelProps> = ({
    label,
    name,
    options,
    required = false,
    placeholder = "Select an option",
    error,
    register,
    disabled = false,
    onChange,
    value
}) => {
    let selectClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90`;

    if (disabled) {
        selectClasses += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400`;
    } else if (error) {
        selectClasses += ` text-error-800 border-error-500 focus:ring-error-500/10`;
    } else {
        selectClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/10`;
    }

    return (
        <div className="mb-4">
            <Label htmlFor={name}>
                {label} {required && <span className="text-error-500">*</span>}
            </Label>
            <select
                id={name}
                {...register}
                disabled={disabled}
                className={selectClasses}
                onChange={onChange}
                value={value}
                name={name}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-sm text-error-500 mt-1">{error.message}</p>}
        </div>
    );
};

export default SelectLabel;
