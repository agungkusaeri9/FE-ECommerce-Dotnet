import Link from "next/link";
import React, { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode; // Button text or content
    size?: "sm" | "md" | "xs"; // Button size
    variant?: "primary" | "outline" | "info" | "danger";
    className?: string; // Disabled state
    href: string; // Link URL
}

const ButtonLink: React.FC<ButtonProps> = ({
    children,
    size = "md",
    variant = "primary",
    className = "",
    href = "#",
}) => {
    // Size Classes
    const sizeClasses = {
        xs: "px-4 py-2 text-xs",
        sm: "px-4 py-3 text-sm",
        md: "px-5 py-3.5 text-sm",
    };

    // Variant Classes
    const variantClasses = {
        info:
            "bg-sky-500 text-white hover:bg-sky-600 hover:text-white shadow-theme-xs disabled:bg-sky-300",
        danger:
            "bg-rose-500 text-white hover:bg-rose-600 hover:text-white shadow-theme-xs disabled:bg-rose-300",
        primary:
            "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
        outline:
            "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
    };

    return (
        <Link
            href={href}
            className={`inline-flex items-center justify-center font-medium gap-2 rounded-lg transition ${className} ${sizeClasses[size]
                } ${variantClasses[variant]}
                }`}
        >
            {children}
        </Link>
    );
};

export default ButtonLink;
