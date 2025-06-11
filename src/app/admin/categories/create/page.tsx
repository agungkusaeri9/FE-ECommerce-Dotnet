"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateData } from '@/hooks/useCreateData';
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import Breadcrumb from '@/components/common/Breadcrumb';
import ComponentCard from '@/components/common/ComponentCard';
import CategoryService from '@/services/CategoryService';
import { createCategorydValidator } from '@/validators/categoryValidator';

type CreateServiceForm = {
    name: string;
    image: File | null;
};

export default function CreateArea() {
    const { mutate: createMutation, isPending } = useCreateData(
        CategoryService.create,
        ["categories"],
        "/admin/categories"
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<CreateServiceForm>({
        resolver: zodResolver(createCategorydValidator),
        mode: "onChange",
        defaultValues: { name: "", image: null },
    });

    const onSubmit = (data: CreateServiceForm) => {
        const formData = new FormData();
        formData.append("name", data.name);
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
                    { label: "Categories", href: "/admin/categories" },
                    { label: "Create" },
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Create Category">
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
                                disabled={isPending}
                                loading={isPending}
                            >
                                Create Category
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
