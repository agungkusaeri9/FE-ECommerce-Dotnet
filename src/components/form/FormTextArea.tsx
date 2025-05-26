import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import Label from "./Label";

interface TextAreaLabelProps {
    label: string;
    name: string;
    required?: boolean;
    placeholder?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: any;
    error?: FieldError;
    className?: string;
    rows?: number;
    disabled?: boolean;
    success?: boolean;
    hint?: string;
}

const TextAreaLabel = ({
    label,
    name,
    required = false,
    placeholder,
    register,
    error,
    className,
    rows = 4,
    disabled = false,
    success = false,
    hint
}: TextAreaLabelProps) => {
    let textareaClasses = `w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800`;

    if (disabled) {
        textareaClasses += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
    } else if (error) {
        textareaClasses += ` text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10 dark:text-error-400 dark:border-error-500`;
    } else if (success) {
        textareaClasses += ` text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300 dark:text-success-400 dark:border-success-500`;
    } else {
        textareaClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
    }

    return (
        <div className="mb-4">
            <Label htmlFor={name}>
                {label} {required && <span className="text-error-500">*</span>}
            </Label>
            <textarea
                id={name}
                rows={rows}
                className={twMerge(textareaClasses, className)}
                placeholder={placeholder}
                disabled={disabled}
                {...register}
            />
            {error && <p className="text-sm text-error-500 mt-1">{error.message}</p>}
            {hint && !error && !success && (
                <p className="mt-1.5 text-xs text-gray-500">{hint}</p>
            )}
        </div>
    );
};

export default TextAreaLabel; 