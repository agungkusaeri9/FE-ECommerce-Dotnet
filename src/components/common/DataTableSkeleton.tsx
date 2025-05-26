'use client'
import React from 'react'
import Skeleton from '../ui/skeleton/Skeleton'
import TableToolbarSkeleton from '../ui/skeleton/TableToolbarSkeleton'
import PaginationTableSkeleton from '../ui/skeleton/PaginationTableSkeleton'

interface DataTableSkeletonProps {
    columns: number
    rows?: number
    withExpandable?: boolean
}

export default function DataTableSkeleton({
    columns,
    rows = 10,
    withExpandable = false,
}: DataTableSkeletonProps) {
    return (
        <>
            <TableToolbarSkeleton />
            <div className="overflow-hidden rounded-md border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-white/[0.05]">
                        <thead className="bg-gray-50 dark:bg-white/[0.02]">
                            <tr>
                                {withExpandable && (
                                    <th className="w-20 px-3 py-3">
                                        <Skeleton className="h-4 w-4 mx-auto" />
                                    </th>
                                )}
                                {Array.from({ length: columns }).map((_, index) => (
                                    <th key={index} className="px-3 py-3">
                                        <Skeleton className="h-4 w-24" />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-white/[0.05] dark:bg-white/[0.03]">
                            {Array.from({ length: rows }).map((_, rowIndex) => (
                                <tr key={rowIndex}>
                                    {withExpandable && (
                                        <td className="px-3 py-3">
                                            <Skeleton className="w-5 h-5 mx-auto" />
                                        </td>
                                    )}
                                    {Array.from({ length: columns }).map((_, colIndex) => (
                                        <td key={colIndex} className="px-3 py-3">
                                            <Skeleton className="h-4 w-full" />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <PaginationTableSkeleton />
        </>
    )
}
