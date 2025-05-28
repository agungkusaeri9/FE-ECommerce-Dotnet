"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import BrandService from '@/services/BrandService';
import { Brand } from '@/types/brand';
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

    const { data: brand, isLoading } = useFetchById<Brand>(BrandService.getById, id, "brand");
    const { mutate: updateMutation, isPending } = useUpdateData(
        BrandService.update,
        id,
        "brands",
        "/admin/brands"
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
        if (brand) {
            reset({
                name: brand.name
            });
        }
    }, [brand, reset]);


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
                    { label: 'Brands', href: '/admin/brands' },
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
                                Update Brand
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
