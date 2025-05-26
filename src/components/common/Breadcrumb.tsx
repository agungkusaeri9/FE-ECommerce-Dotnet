import Link from "next/link";
import React from "react";

interface BreadcrumbItem {
    label: string;
    href?: string; // optional: jika tidak ada, dianggap item aktif
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {items[items.length - 1]?.label}
            </h2>
            <nav>
                <ol className="flex items-center gap-1.5">
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;

                        return (
                            <li key={index} className="flex items-center gap-1.5">
                                {item.href && !isLast ? (
                                    <Link
                                        href={item.href}
                                        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                                    >
                                        {item.label}
                                        <svg
                                            className="stroke-current"
                                            width="17"
                                            height="16"
                                            viewBox="0 0 17 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                                                strokeWidth="1.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </Link>
                                ) : (
                                    <span className="text-sm text-gray-800 dark:text-white/90">
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;
