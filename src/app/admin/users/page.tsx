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
import UserService from "@/services/UserService";
import { User } from "@/types/user";

function UserListPage() {
    const {
        data: users,
        isLoading,
        setKeyword,
        setCurrentPage,
        setLimit,
        limit,
        keyword,
        pagination
    } = useFetchData(UserService.get, "users");
    const { mutate: remove } = useDeleteData(UserService.remove, ["users"]);

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
            cell: (item: User) => item.id || "-",
        },
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Role",
            accessorKey: "role",
        },
        {
            header: "Action",
            accessorKey: "id",
            cell: (item: Area) => (
                <div className="flex items-center gap-2">
                    <ButtonLink
                        href={`/admin/users/${item.id}/edit`}
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
            <Breadcrumb items={[{ label: 'Dashboard', href: '/admin/dashboard' }, { label: 'Users', href: '/admin/users' }]} />
            <div className="space-y-6">
                <div className="flex justify-end mb-4">
                    <ButtonLink size='xs' href="/admin/users/create">Create User</ButtonLink>
                </div>
                <DataTable
                    title="User List"
                    columns={columns}
                    data={users || []}
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
                        placeholder: "Search users...",
                    }}
                />
            </div>
        </div>
    );
}
export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <UserListPage />
        </Suspense>
    );
}
