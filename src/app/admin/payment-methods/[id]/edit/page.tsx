"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import PaymentMethodService from '@/services/PaymentMethodService';
import { PaymentMethod } from '@/types/paymentMethod';
import { updatePaymentMethodValidator } from '@/validators/paymentMethodValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type updatePaymentMethodForm = z.infer<typeof updatePaymentMethodValidator>;

export default function Page() {
    const params = useParams();
    const id = Number(params.id);

    const { data: paymentMethod, isLoading } = useFetchById<PaymentMethod>(PaymentMethodService.getById, id, "paymentMethod");
    const { mutate: updateMutation, isPending } = useUpdateData(
        PaymentMethodService.update,
        id,
        "paymentMethods",
        "/admin/payment-methods"
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<updatePaymentMethodForm>({
        resolver: zodResolver(updatePaymentMethodValidator),
        mode: "onChange",
    });

    useEffect(() => {
        if (paymentMethod) {
            reset({
                name: paymentMethod.name,
                type: paymentMethod.type,
                number: paymentMethod.number,
                ownerName: paymentMethod.ownerName,
                isActive: paymentMethod.isActive,
            });
        }
    }, [paymentMethod, reset]);


    const onSubmit = (data: updatePaymentMethodForm) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("type", data.type);
        formData.append("number", data.number);
        formData.append("ownerName", data.ownerName);
        formData.append("isActive", data.isActive.toString());
        if (data.image) {
            formData.append("image", data.image);
        }
        updateMutation(formData, {
            onSuccess: () => reset(),
        });
    };

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'paymentMethods', href: '/admin/payment-methods' },
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
                            placeholder="Enter name"
                            register={register("name")}
                            error={errors.name}
                        />

                        <SelectLabel
                            label="Type"
                            name="type"
                            required
                            options={[
                                { value: "Bank Transfer", label: "Bank Transfer" },
                                { value: "Ewallet", label: "Ewallet" }
                            ]}
                            register={register("type")}
                            error={errors.type}
                        />

                        <InputLabel
                            label="Number"
                            name="number"
                            type="text"
                            required
                            placeholder="Enter number"
                            register={register("number")}
                            error={errors.number}
                        />
                        <InputLabel
                            label="Owner Name"
                            name="ownerName"
                            type="text"
                            required
                            placeholder="Enter owner name"
                            register={register("ownerName")}
                            error={errors.ownerName}
                        />

                        <SelectLabel
                            label="Is Active"
                            name="isActive"
                            required
                            options={[
                                { value: 0, label: "Inactive" },
                                { value: 1, label: "Active" },
                            ]}
                            register={register("isActive", { valueAsNumber: true })}
                            error={errors.isActive}
                        />
                        <InputLabel
                            label="Upload Image"
                            name="image"
                            type="file"
                            required
                            accept="image/*"
                            onChange={(e) => setValue("image", e.target.files?.[0] ?? null)}
                            error={errors.image}
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
                                Update Payment Method
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
