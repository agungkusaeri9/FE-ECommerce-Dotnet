import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PaginatedResponse } from "@/types/fetch";

type Filter = {
    machine_id: number | null;
    machine_area_id: number | null;
    rack_id: number | null;
    keyword: string;
    status: string | null;
}

export type FetchFunctionWithPagination<T> = (
    page?: number,
    limit?: number,
    keyword?: string,
    machine_id?: number | null,
    machine_area_id?: number | null,
    rack_id?: number | null,
    status?: string | null
) => Promise<PaginatedResponse<T>>;

export const useFetchDataKanban = <T>(
    fetchFunction: FetchFunctionWithPagination<T>,
    queryKey: string,
    usePagination: boolean = true,
    filter: Filter
) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(
        usePagination ? Number(searchParams.get("page")) || 1 : 1
    );
    const [limit, setLimit] = useState(
        usePagination ? Number(searchParams.get("limit")) || 10 : 50
    );
    const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
    const [pagination, setPagination] = useState<PaginatedResponse<T>["pagination"] | null>(null);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of the table
        const tableElement = document.querySelector('.overflow-x-auto');
        if (tableElement) {
            tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    useEffect(() => {
        if (!usePagination) return;

        const newParams = new URLSearchParams(searchParams.toString());

        newParams.set("limit", limit.toString());
        newParams.set("page", currentPage.toString());

        if (filter.keyword) {
            newParams.set("keyword", filter.keyword);
        } else {
            newParams.delete("keyword");
        }

        if (filter.machine_id) {
            newParams.set("machine_id", filter.machine_id.toString());
        } else {
            newParams.delete("machine_id");
        }

        if (filter.machine_area_id) {
            newParams.set("machine_area_id", filter.machine_area_id.toString());
        } else {
            newParams.delete("machine_area_id");
        }

        if (filter.rack_id) {
            newParams.set("rack_id", filter.rack_id.toString());
        } else {
            newParams.delete("rack_id");
        }

        if (filter.status) {
            newParams.set("status", filter.status);
        } else {
            newParams.delete("status");
        }

        router.push(`?${newParams.toString()}`, { scroll: false });
    }, [keyword, currentPage, limit, filter, usePagination, router, searchParams]);

    const fetchData = async (): Promise<T[]> => {
        const res = await fetchFunction(
            currentPage,
            limit,
            filter.keyword,
            filter.machine_id,
            filter.machine_area_id,
            filter.rack_id,
            filter.status
        );
        setPagination(res.pagination);
        return res.data;
    };

    const { data, isLoading, refetch } = useQuery<T[]>({
        queryKey: usePagination
            ? [queryKey, currentPage, limit, filter.keyword, filter.machine_id, filter.machine_area_id, filter.rack_id, filter.status]
            : [queryKey],
        queryFn: fetchData,
    });

    return {
        data,
        isLoading,
        pagination,
        currentPage,
        limit,
        keyword,
        setKeyword,
        setCurrentPage: handlePageChange,
        setLimit,
        refetch,
        fetchData,
    };
};
