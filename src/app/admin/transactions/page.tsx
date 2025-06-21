"use client";
import React, { Suspense } from "react";
import ButtonLink from "@/components/ui/button/ButtonLink";
import Breadcrumb from "@/components/common/Breadcrumb";
import { useFetchData } from "@/hooks/useFetchData";
import { useDeleteData } from "@/hooks/useDeleteData";
import { confirmDelete } from "@/utils/confirm";
import Button from "@/components/ui/button/Button";
import { Area } from "@/types/area";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";
import { Courier } from "@/types/courier";
import transactionservice from "@/services/TransactionService";

function CourierListPage() {
    const {
        data: couriers,
        isLoading,
        setKeyword,
        setCurrentPage,
        setLimit,
        limit,
        keyword,
        pagination
    } = useFetchData(transactionservice.get, "couriers");
    const { mutate: remove } = useDeleteData(transactionservice.remove, ["couriers"]);

    const handleDelete = async (id: number) => {
        const confirmed = await confirmDelete();
        if (confirmed) {
            remove(id);
        }
    };

    const columns = [
        {
            header: "ID",
            accessorKey: "id",
            cell: (item: Courier) => item.id || "-",
        },
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (item: Courier) => item.status ? "Active" : "Inactive",
        },
        {
            header: "Action",
            accessorKey: "id",
            cell: (item: Area) => (
                <div className="flex items-center gap-2">
                    <ButtonLink
                        href={`/admin/couriers/${item.id}/edit`}
                        variant='info'
                        size='xs'
                    >
                        Edit
                    </ButtonLink>
                    <Button
                        onClick={() => handleDelete(item.id!)}
                        variant='danger'
                        size='xs'
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '//admin' }, { label: 'Couriers', href: '/admin/couriers' }]} />
            <div className="space-y-6">
                <div className="flex justify-end mb-4">
                    <ButtonLink size='xs' href="/admin/couriers/create">Create Courier</ButtonLink>
                </div>
                <DataTable
                    title="Courier List"
                    columns={columns}
                    data={couriers || []}
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
                        placeholder: "Search couriers...",
                    }}
                />
            </div>
        </div>
    );
}
export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <CourierListPage />
        </Suspense>
    );
}
