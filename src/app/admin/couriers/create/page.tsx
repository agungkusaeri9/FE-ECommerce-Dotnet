"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import CourierService from '@/services/CourierService';
import { createCourierValidator } from '@/validators/courierValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type CreateCourierForm = z.infer<typeof createCourierValidator>;

export default function CreateArea() {
    const { mutate: createMutation, isPending } = useCreateData(
        CourierService.create,
        ["couriers"],
        "/admin/couriers"
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CreateCourierForm>({
        resolver: zodResolver(createCourierValidator),
        mode: "onChange",
    });

    const onSubmit = (data: CreateCourierForm) => {
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
                    { label: 'Dashboard', href: '/admin/dashboard' },
                    { label: 'Couriers', href: '/admin/couriers' },
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

                        <SelectLabel
                            label="Status"
                            name="status"
                            register={register("status", { valueAsNumber: true })}
                            error={errors.status}
                            options={[
                                { value: "1", label: "Active" },
                                { value: "0", label: "Inactive" }
                            ]}
                            placeholder="Select status"
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
                                Create Courier
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
