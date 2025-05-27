"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import UserService from '@/services/UserService';
import { createUserValidator } from '@/validators/UserValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type CreateUserForm = z.infer<typeof createUserValidator>;

export default function CreateArea() {
    const { mutate: createMutation, isPending } = useCreateData(
        UserService.create,
        ["users"],
        "/admin/users"
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CreateUserForm>({
        resolver: zodResolver(createUserValidator),
        mode: "onChange",
    });

    const onSubmit = (data: CreateUserForm) => {
        createMutation(data, {
            onSuccess: () => {
                reset();
            }
        });
    };

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '//admin' },
                    { label: 'Users', href: '/admin/users' },
                    { label: 'Create' }
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Create User">
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
                                disabled={isPending}
                                loading={isPending}
                            >
                                Create User
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
