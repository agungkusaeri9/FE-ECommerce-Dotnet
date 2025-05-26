"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard';
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import SupplierService from '@/services/SupplierService';
import { Supplier } from '@/types/supplier';
import { updateSupplierValidator } from '@/validators/UserValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type UpdateSupplierFormData = z.infer<typeof updateSupplierValidator>;

export default function Page() {
    const params = useParams();
    const id = Number(params.id);

    const { data: supplier, isLoading } = useFetchById<Supplier>(SupplierService.getById, id, "supplier");
    const { mutate: updateMutation, isPending } = useUpdateData(
        SupplierService.update,
        id,
        "suppliers",
        "/suppliers"
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<UpdateSupplierFormData>({
        resolver: zodResolver(updateSupplierValidator),
        mode: "onChange",
    });

    useEffect(() => {
        if (supplier) {
            reset({
                name: supplier.name
            });
        }
    }, [supplier, reset]);

    const onSubmit = (data: UpdateSupplierFormData) => {
        updateMutation(data);
    };

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Suppliers', href: '/suppliers' },
                    { label: 'Edit' }
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Edit Supplier">
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
                                disabled={isPending || isLoading}
                                loading={isPending}
                            >
                                Update Supplier
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
