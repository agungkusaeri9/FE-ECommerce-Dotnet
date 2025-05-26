"use client";
import React from "react";

interface TableToolbarProps {
    limit: number;
    setLimit: (limit: number) => void;
    keyword: string;
    setKeyword: (value: string) => void;
}

const TableToolbar = ({ limit, setLimit, keyword, setKeyword }: TableToolbarProps) => {
    return (
        <>
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <select
                        className="h-9 bg-white rounded border font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                        onChange={(e) => setLimit(parseInt(e.target.value))}
                        value={limit}
                    >
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                    </select>
                    <span className="text-gray-500">entries</span>
                </div>
                <input
                    type="text"
                    placeholder="Search..."
                    className="h-9 rounded border border-gray-300 p-2 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    value={keyword || ""}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
        </>
    );
};

export default TableToolbar;
