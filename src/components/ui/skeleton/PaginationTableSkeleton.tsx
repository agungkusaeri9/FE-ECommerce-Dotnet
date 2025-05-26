import Skeleton from "./Skeleton";

export default function PaginationTableSkeleton() {
    return (
        <div className="mt-4 flex items-center justify-between">
            {/* Text Skeleton */}
            <Skeleton className="h-4 w-56 rounded" />

            {/* Pagination Buttons Skeleton */}
            <div className="flex items-center justify-end gap-2">
                <Skeleton className="h-10 w-20 rounded-lg" /> {/* Previous */}

                {/* Page number buttons */}
                <div className="flex items-center gap-2">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-10 w-10 rounded-lg" />
                    ))}
                    <Skeleton className="h-4 w-6 rounded" /> {/* Ellipsis */}
                    <Skeleton className="h-10 w-10 rounded-lg" />
                </div>

                <Skeleton className="h-10 w-20 rounded-lg" /> {/* Next */}
            </div>
        </div>
    );
}
