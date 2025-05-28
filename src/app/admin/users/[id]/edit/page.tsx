"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import UserService from '@/services/UserService';
import { User } from '@/types/user';
import { updateUserValidator } from '@/validators/UserValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type updateUserForm = z.infer<typeof updateUserValidator>;

export default function Page() {
    const params = useParams();
    const id = Number(params.id);

    const { data: user, isLoading } = useFetchById<User>(UserService.getById, id, "user");
    const { mutate: updateMutation, isPending } = useUpdateData(
        UserService.update,
        id,
        "users",
        "/admin/users"
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<updateUserForm>({
        resolver: zodResolver(updateUserValidator),
        mode: "onChange",
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                email: user.email,
                role: user.role,
                password: "",
                password_confirmation: ""
            });
        }
    }, [user, reset]);

    const onSubmit = (data: updateUserForm) => {
        updateMutation(data);
    };

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Users', href: '/admin/users' },
                    { label: 'Edit' }
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Edit User">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputLabel
                            label="Name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter user name"
                            register={register("name")}
                            error={errors.name}
                        />
                        <InputLabel
                            label="Email"
                            name="email"
                            type="text"
                            required
                            placeholder="Enter email"
                            register={register("email")}
                            error={errors.email}
                        />
                        <SelectLabel
                            label="Role"
                            name="role"
                            register={register("role")}
                            error={errors.role}
                            options={[
                                { value: "admin", label: "Admin" },
                                { value: "user", label: "User" }
                            ]}
                            placeholder="Select role"
                        />
                        <InputLabel
                            label="Password"
                            name="password"
                            type="password"
                            required
                            placeholder="Enter password"
                            register={register("password")}
                            error={errors.password}
                        />

                        <InputLabel
                            label="Password Confirmation"
                            name="password_confirmation"
                            type="password"
                            required
                            placeholder="Enter Password Confirmation"
                            register={register("password_confirmation")}
                            error={errors.password_confirmation}
                        />

                        <div className="flex justify-end gap-2 mt-6">
                            <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                className="px-4"
                                onClick={() => reset()}
                            >
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                                variant="primary"
                                className="px-4"
                                disabled={isPending || isLoading}
                                loading={isPending}
                            >
                                Update User
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
