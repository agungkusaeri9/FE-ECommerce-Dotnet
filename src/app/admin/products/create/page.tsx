"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateData } from '@/hooks/useCreateData';
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import Breadcrumb from '@/components/common/Breadcrumb';
import ComponentCard from '@/components/common/ComponentCard';
import ProductService from '@/services/ProductService';
import SelectLabel from '@/components/form/FormSelect';
import { createProductValidator } from '@/validators/productValidator';
import TextAreaLabel from '@/components/form/FormTextArea';
import CategoryService from '@/services/CategoryService';
import { useFetchData } from '@/hooks/useFetchData';
import BrandService from '@/services/BrandService';

type CreateProductForm = {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
    brandId: number;
    image: File | null;
};

export default function CreateArea() {
    const { data: categories } = useFetchData(CategoryService.getWithoutPagination, "categories");
    const { data: brands } = useFetchData(BrandService.getWithoutPagination, "brands");
    const { mutate: createMutation, isPending } = useCreateData(
        ProductService.create,
        ["products"],
        "/admin/products"
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<CreateProductForm>({
        resolver: zodResolver(createProductValidator),
        mode: "onChange",
        defaultValues: { name: "", description: "", price: 0, stock: 0, categoryId: 0, brandId: 0, image: null },
    });

    const onSubmit = (data: CreateProductForm) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("stock", data.stock.toString());
        formData.append("categoryId", data.categoryId.toString());
        formData.append("brandId", data.brandId.toString());
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
                    { label: "Products", href: "/admin/products" },
                    { label: "Create" },
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Create Product">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                        encType="multipart/form-data"
                    >
                        <div className="grid grid-cols-2 gap-4">
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
                                label="Price"
                                name="price"
                                type="number"
                                required
                                placeholder="Enter price"
                                register={register("price", { valueAsNumber: true })}
                                error={errors.price}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">

                            <SelectLabel
                                label="Category"
                                name="categoryId"
                                options={categories?.map((category) => ({ label: category.name, value: category.id })) || []}
                                required
                                placeholder="Select category"
                                register={register("categoryId", { valueAsNumber: true })}
                                error={errors.categoryId}
                            />
                            <SelectLabel
                                label="Brand"
                                name="brandId"
                                options={brands?.map((brand) => ({ label: brand.name, value: brand.id })) || []}
                                required
                                placeholder="Select brand"
                                register={register("brandId", { valueAsNumber: true })}
                                error={errors.brandId}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <TextAreaLabel
                                label="Description"
                                name="description"
                                required
                                placeholder="Enter description"
                                register={register("description")}
                                error={errors.description}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <InputLabel
                                label="Stock"
                                name="stock"
                                type="number"
                                required
                                placeholder="Enter stock"
                                register={register("stock", { valueAsNumber: true })}
                                error={errors.stock}
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
                        </div>


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
                                Create Product
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
