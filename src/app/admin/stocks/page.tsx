"use client";
import React, { Suspense } from "react";
import ButtonLink from "@/components/ui/button/ButtonLink";
import Breadcrumb from "@/components/common/Breadcrumb";
import { useFetchData } from "@/hooks/useFetchData";
import { useDeleteData } from "@/hooks/useDeleteData";
import { confirmDelete } from "@/utils/confirm";
import Button from "@/components/ui/button/Button";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";
import BrandService from "@/services/BrandService";
import { Brand } from "@/types/brand";
import Image from "next/image";
import StockService from "@/services/StockService";
import { Stock } from "@/types/stock";

function StockListPage() {
    const {
        data: brands,
        isLoading,
        setKeyword,
        setCurrentPage,
        setLimit,
        limit,
        keyword,
        pagination
    } = useFetchData(StockService.get, "stocks");


    const columns = [
        {
            header: "ID",
            accessorKey: "id",
            cell: (item: Stock) => item.id || "-",
        },
        {
            header: "Type",
            accessorKey: "type",
            cell: (item: Stock) => item.type || "-",
        },
        {
            header: "Product",
            accessorKey: "product",
            cell: (item: Stock) => item.product.name || "-",
        },
        {
            header: "Qty",
            accessorKey: "qty",
            cell: (item: Stock) => item.qty || "-",
        },
        {
            header: "Created At",
            accessorKey: "createdAt",
            cell: (item: Stock) => item.createdAt || "-",
        },
    ];

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Stocks', href: '/admin/stocks' }]} />
            <div className="space-y-6">
                <div className="flex justify-end mb-4">
                    <ButtonLink size='xs' href="/admin/stocks/create">Create Stock</ButtonLink>
                </div>
                <DataTable
                    title="Stock List"
                    columns={columns}
                    data={brands || []}
                    isLoading={isLoading}
                    pagination={{
                        currentPage: pagination?.curr_page || 1,
                        totalPages: pagination?.total_page || 1,
                        totalItems: pagination?.total || 0,
                        itemsPerPage: limit,
                        onPageChange: setCurrentPage,
                        onLimitChange: setLimit,
                    }}
                    search={{
                        value: keyword,
                        onChange: setKeyword,
                        placeholder: "Search stocks...",
                    }}
                />
            </div>
        </div>
    );
}
export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <StockListPage />
        </Suspense>
    );
}
