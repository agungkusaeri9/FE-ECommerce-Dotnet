import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PaginatedResponse } from "@/types/fetch";

type Filter = {
    start_date: string;
    end_date: string;
    code: string;
    machine_id: number | null;
    machine_area_id: number | null;
}

export type FetchFunctionWithPagination<T> = (
    page?: number,
    limit?: number,
    start_date?: string,
    end_date?: string,
    code?: string,
    machine_id?: number | null,
    machine_area_id?: number | null,
) => Promise<PaginatedResponse<T>>;

export const useFetchDataStockOut = <T>(
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

        if (keyword) {
            newParams.set("keyword", keyword);
        } else {
            newParams.delete("keyword");
        }

        if (filter.start_date) {
            newParams.set("start_date", filter.start_date);
        } else {
            newParams.delete("start_date");
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

        if (filter.end_date) {
            newParams.set("end_date", filter.end_date);
        } else {
            newParams.delete("end_date");
        }

        if (filter.code) {
            newParams.set("code", filter.code);
        } else {
            newParams.delete("code");
        }

        router.push(`?${newParams.toString()}`, { scroll: false });
    }, [keyword, currentPage, limit, filter, usePagination, router, searchParams]);

    const fetchData = async (): Promise<T[]> => {
        const res = await fetchFunction(
            currentPage,
            limit,
            filter.start_date,
            filter.end_date,
            filter.code,
            filter.machine_id,
            filter.machine_area_id
        );
        setPagination(res.pagination);
        return res.data;
    };

    const { data, isLoading, refetch } = useQuery<T[]>({
        queryKey: usePagination
            ? [queryKey, currentPage, limit, filter.start_date, filter.end_date, filter.code, filter.machine_id, filter.machine_area_id]
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
