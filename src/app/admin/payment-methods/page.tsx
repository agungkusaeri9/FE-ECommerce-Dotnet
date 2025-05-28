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
import PaymentMethodService from "@/services/PaymentMethodService";
import { Brand } from "@/types/brand";
import { PaymentMethod } from "@/types/paymentMethod";
import Image from "next/image";

function PaymentMethodListPage() {
    const {
        data: paymentMethods,
        isLoading,
        setKeyword,
        setCurrentPage,
        setLimit,
        limit,
        keyword,
        pagination
    } = useFetchData(PaymentMethodService.get, "paymentMethods");

    const { mutate: remove } = useDeleteData(PaymentMethodService.remove, ["paymentMethods"]);

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
            cell: (item: Brand) => item.id || "-",
        },
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Number",
            accessorKey: "number",
        },
        {
            header: "Owner Name",
            accessorKey: "ownerName",
        },
        {
            header: "Is Active",
            accessorKey: "isActive",
            cell: (item: PaymentMethod) => (
                <span className={`px-2 py-1 rounded ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                </span>
            ),
        },
        {
            header: "Image",
            accessorKey: "image",
            cell: (item: PaymentMethod) => (
                <>
                    <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded"
                    />
                </>
            ),
        },
        {
            header: "Action",
            accessorKey: "id",
            cell: (item: Brand) => (
                <div className="flex items-center gap-2">
                    <ButtonLink
                        href={`/admin/payment-methods/${item.id}/edit`}
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
            <Breadcrumb items={[{ label: 'Dashboard', href: '//\admin' }, { label: 'Payment Methods', href: '/admin/payment-methods' }]} />
            <div className="space-y-6">
                <div className="flex justify-end mb-4">
                    <ButtonLink size='xs' href="/admin/payment-methods/create">Create Payment Method</ButtonLink>
                </div>
                <DataTable
                    title="Payment Method List"
                    columns={columns}
                    data={paymentMethods || []}
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
                        placeholder: "Search paymentMethods...",
                    }}
                />
            </div>
        </div>
    );
}
export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <PaymentMethodListPage />
        </Suspense>
    );
}
