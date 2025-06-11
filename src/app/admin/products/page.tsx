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
import ProductService from "@/services/ProductService";
import { Product } from "@/types/product";

function ProductLisPage() {
    const {
        data: products,
        isLoading,
        setKeyword,
        setCurrentPage,
        setLimit,
        limit,
        keyword,
        pagination
    } = useFetchData(ProductService.get, "products");

    const { mutate: remove } = useDeleteData(ProductService.remove, ["products"]);

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
            header: "Category",
            accessorKey: "category",
            cell: (item: Product) => item.category.name || "-",
        },
        {
            header: "Brand",
            accessorKey: "brand",
            cell: (item: Product) => item.brand.name || "-",
        },
        {
            header: "Price",
            accessorKey: "price",
        },
        {
            header: "Stock",
            accessorKey: "stock",
        },
        {
            header: "Image",
            accessorKey: "image",
            cell: (item: Product) => (
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
                        href={`/admin/products/${item.id}/edit`}
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
            <Breadcrumb items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Products', href: '/admin/products' }]} />
            <div className="space-y-6">
                <div className="flex justify-end mb-4">
                    <ButtonLink size='xs' href="/admin/products/create">Create Product</ButtonLink>
                </div>
                <DataTable
                    title="Product List"
                    columns={columns}
                    data={products || []}
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
                        placeholder: "Search products...",
                    }}
                />
            </div>
        </div>
    );
}
export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <ProductLisPage />
        </Suspense>
    );
}
