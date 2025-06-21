"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import TextAreaLabel from '@/components/form/FormTextArea';
import Button from '@/components/ui/button/Button';
import { useFetchData } from '@/hooks/useFetchData';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import BrandService from '@/services/BrandService';
import CategoryService from '@/services/CategoryService';
import PaymentMethodService from '@/services/PaymentMethodService';
import ProductService from '@/services/ProductService';
import { PaymentMethod } from '@/types/paymentMethod';
import { Product } from '@/types/product';
import { updateProductValidator } from '@/validators/productValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type updateProductForm = z.infer<typeof updateProductValidator>;

export default function Page() {
    const params = useParams();
    const id = Number(params.id);

    const { data: product, isLoading } = useFetchById<Product>(ProductService.getById, id, "product");
    const { data: categories } = useFetchData(CategoryService.getWithoutPagination, "categories");
    const { data: brands } = useFetchData(BrandService.getWithoutPagination, "brands");
    const { mutate: updateMutation, isPending } = useUpdateData(
        ProductService.update,
        id,
        "products",
        "/admin/products"
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<updateProductForm>({
        resolver: zodResolver(updateProductValidator),
        mode: "onChange",
    });

    useEffect(() => {
        if (product) {
            reset({
                name: product.name,
                description: product.description,
                price: product.price,
                categoryId: product.category.id,
                brandId: product.brand.id,
                image: null,
            });
        }
    }, [product, reset]);


    const onSubmit = (data: updateProductForm) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        // formData.append("stock", data.stock.toString());
        formData.append("categoryId", data.categoryId.toString());
        formData.append("brandId", data.brandId.toString());
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
                    { label: 'Products', href: '/admin/products' },
                    { label: 'Edit' }
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Edit courier">
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
                                defaultValue={product?.stock ?? 0}
                                disabled
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
                                Update Product
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
