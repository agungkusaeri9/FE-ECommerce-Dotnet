import Skeleton from "./Skeleton";

export default function TableToolbarSkeleton({ withPagination = true, withSearch = true }) {
    return (
        <div className="mb-3 flex items-center justify-between">
            {withPagination ? (
                <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-20 rounded" />
                    <Skeleton className="h-4 w-12" />
                </div>
            ) : <div />}

            {withSearch && (
                <Skeleton className="h-9 w-40 rounded" />
            )}
        </div>
    )
}
