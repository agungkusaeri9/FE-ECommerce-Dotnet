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
import { User } from "@/types/user";
import { Courier } from "@/types/courier";
import BrandService from "@/services/BrandService";
import { Brand } from "@/types/brand";

function BrandListPage() {
    const {
        data: brands,
        isLoading,
        setKeyword,
        setCurrentPage,
        setLimit,
        limit,
        keyword,
        pagination
    } = useFetchData(BrandService.get, "brands");

    const { mutate: remove } = useDeleteData(BrandService.remove, ["brands"]);

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
            header: "Image",
            accessorKey: "image",
            cell: (item: Brand) => (
                <>
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded"
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
                        href={`/admin/brands/${item.id}/edit`}
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
            <Breadcrumb items={[{ label: 'Dashboard', href: '//admin' }, { label: 'brands', href: '/admin/brands' }]} />
            <div className="space-y-6">
                <div className="flex justify-end mb-4">
                    <ButtonLink size='xs' href="/admin/brands/create">Create Brand</ButtonLink>
                </div>
                <DataTable
                    title="Brand List"
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
                        placeholder: "Search brands...",
                    }}
                />
            </div>
        </div>
    );
}
export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <BrandListPage />
        </Suspense>
    );
}
