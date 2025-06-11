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
import CategoryService from "@/services/CategoryService";
import { Brand } from "@/types/brand";
import Image from "next/image";
import { Category } from "@/types/category";

function BrandListPage() {
    const {
        data: categories,
        isLoading,
        setKeyword,
        setCurrentPage,
        setLimit,
        limit,
        keyword,
        pagination
    } = useFetchData(CategoryService.get, "categories");

    const { mutate: remove } = useDeleteData(CategoryService.remove, ["categories"]);
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
            cell: (item: Category) => item.id || "-",
        },
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Image",
            accessorKey: "image",
            cell: (item: Category) => (
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
            cell: (item: Category) => (
                <div className="flex items-center gap-2">
                    <ButtonLink
                        href={`/admin/categories/${item.id}/edit`}
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
            <Breadcrumb items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Categories', href: '/admin/categories' }]} />
            <div className="space-y-6">
                <div className="flex justify-end mb-4">
                    <ButtonLink size='xs' href="/admin/categories/create">Create Category</ButtonLink>
                </div>
                <DataTable
                    title="Category List"
                    columns={columns}
                    data={categories || []}
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
                        placeholder: "Search category...",
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
