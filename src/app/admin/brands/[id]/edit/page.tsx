"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import CourierService from '@/services/CourierService';
import { Courier } from '@/types/courier';
import { updateCourierValidator } from '@/validators/courierValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type updateCourierForm = z.infer<typeof updateCourierValidator>;

export default function Page() {
    const params = useParams();
    const id = Number(params.id);

    const { data: courier, isLoading } = useFetchById<Courier>(CourierService.getById, id, "courier");
    const { mutate: updateMutation, isPending } = useUpdateData(
        CourierService.update,
        id,
        "couriers",
        "/admin/couriers"
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<updateCourierForm>({
        resolver: zodResolver(updateCourierValidator),
        mode: "onChange",
    });

    useEffect(() => {
        if (courier) {
            reset({
                name: courier.name,
                status: courier.status,
            });
        }
    }, [courier, reset]);

    const onSubmit = (data: updateCourierForm) => {
        updateMutation(data);
    };

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Couriers', href: '/admin/couriers' },
                    { label: 'Edit' }
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Edit courier">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputLabel
                            label="Name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter courier name"
                            register={register("name")}
                            error={errors?.name}
                        />
                        <SelectLabel
                            label="Status"
                            name="status"
                            register={register("status", { valueAsNumber: true })}
                            error={errors?.status}
                            options={[
                                { value: 1, label: "Active" },
                                { value: 0, label: "Inactive" }
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
                                disabled={isPending || isLoading}
                                loading={isPending}
                            >
                                Update Courier
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
