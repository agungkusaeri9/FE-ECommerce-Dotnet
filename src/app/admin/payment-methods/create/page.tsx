"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateData } from '@/hooks/useCreateData';
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import Breadcrumb from '@/components/common/Breadcrumb';
import ComponentCard from '@/components/common/ComponentCard';
import PaymentMethodService from '@/services/PaymentMethodService';
import SelectLabel from '@/components/form/FormSelect';
import { createPaymentMethodValidator } from '@/validators/paymentMethodValidator';

type CreatePaymentMethodForm = {
    name: string;
    type: string;
    number: string;
    ownerName: string;
    isActive: number;
    image: File | null;
};

export default function CreateArea() {
    const { mutate: createMutation, isPending } = useCreateData(
        PaymentMethodService.create,
        ["paymentMethods"],
        "/admin/payment-methods"
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<CreatePaymentMethodForm>({
        resolver: zodResolver(createPaymentMethodValidator),
        mode: "onChange",
        defaultValues: { name: "", number: "", ownerName: "", isActive: 0, type: "", image: null },
    });

    const onSubmit = (data: CreatePaymentMethodForm) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("type", data.type);
        formData.append("number", data.number);
        formData.append("ownerName", data.ownerName);
        formData.append("isActive", data.isActive.toString());
        if (data.image) {
            formData.append("image", data.image);
        }
        createMutation(formData, {
            onSuccess: () => reset(),
        });
    };

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: "Dashboard", href: "/admin" },
                    { label: "Payment Methods", href: "/admin/payment-methods" },
                    { label: "Create" },
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Create Brand">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                        encType="multipart/form-data"
                    >
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
                            label="Image"
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
                                disabled={isPending}
                                loading={isPending}
                            >
                                Create Brand
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
