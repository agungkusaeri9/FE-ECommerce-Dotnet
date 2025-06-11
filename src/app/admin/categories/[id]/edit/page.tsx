"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import BrandService from '@/services/BrandService';
import CategoryService from '@/services/CategoryService';
import { Brand } from '@/types/brand';
import { Category } from '@/types/category';
import { updateBrandValidator } from '@/validators/brandValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type updateBrandForm = z.infer<typeof updateBrandValidator>;

export default function Page() {
    const params = useParams();
    const id = Number(params.id);

    const { data: category, isLoading } = useFetchById<Category>(CategoryService.getById, id, "category");
    const { mutate: updateMutation, isPending } = useUpdateData(
        CategoryService.update,
        id,
        "categories",
        "/admin/categories"
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<updateBrandForm>({
        resolver: zodResolver(updateBrandValidator),
        defaultValues: { name: "", image: null },
        mode: "onChange",
    });

    useEffect(() => {
        if (category) {
            reset({
                name: category.name
            });
        }
    }, [category, reset]);


    const onSubmit = (data: updateBrandForm) => {
        const formData = new FormData();
        formData.append("name", data.name);
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
                    { label: 'Categories', href: '/admin/categories' },
                    { label: 'Edit' }
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Edit Category">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputLabel
                            label="Name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter category name"
                            register={register("name")}
                            error={errors?.name}
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
                                Update Category
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
