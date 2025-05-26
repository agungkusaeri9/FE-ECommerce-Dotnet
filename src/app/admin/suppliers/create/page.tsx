"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import SupplierService from '@/services/SupplierService';
import { createSupplierValidator } from '@/validators/UserValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type CreateSupplierValidator = z.infer<typeof createSupplierValidator>;

export default function Page() {
    const { mutate: createMutation, isPending } = useCreateData(
        SupplierService.create,
        ["suppliers"],
        "/suppliers"
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CreateSupplierValidator>({
        resolver: zodResolver(createSupplierValidator),
        mode: "onChange",
    });

    const onSubmit = (data: CreateSupplierValidator) => {
        createMutation(data, {
            onSuccess: () => {
                reset(); // Reset form after successful creation
            }
        });
    };

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Suppliers', href: '/suppliers' },
                    { label: 'Create' }
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Create Supplier">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputLabel
                            label="Name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter supplier name"
                            register={register("name")}
                            error={errors.name}
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
                                Create Supplier
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
