"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateData } from '@/hooks/useCreateData';
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import Breadcrumb from '@/components/common/Breadcrumb';
import ComponentCard from '@/components/common/ComponentCard';
import StockService from '@/services/StockService';
import SelectLabel from '@/components/form/FormSelect';
import { useFetchData } from '@/hooks/useFetchData';
import ProductService from '@/services/ProductService';
import CategoryService from '@/services/CategoryService';
import BrandService from '@/services/BrandService';
import { createStockValidator } from '@/validators/stockValidator';

type CreateStockForm = {
    type: string;
    productId: number;
    qty: number;
};

export default function CreateArea() {
    const { data: products } = useFetchData(ProductService.getWithoutPagination, "products");
    const { mutate: createMutation, isPending } = useCreateData(
        StockService.create,
        ["stocks"],
        "/admin/stocks"
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<CreateStockForm>({
        resolver: zodResolver(createStockValidator),
        mode: "onChange",
        defaultValues: { type: "", productId: 0, qty: 0 },
    });

    const onSubmit = (data: CreateStockForm) => {
        createMutation(data, {
            onSuccess: () => reset(),
        });
    };

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: "Dashboard", href: "/admin" },
                    { label: "Stocks", href: "/admin/stocks" },
                    { label: "Create" },
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Create Stock">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <SelectLabel
                            label="Type"
                            name="type"
                            options={[{ label: "In", value: "in" }, { label: "Out", value: "out" }]}
                            error={errors.type}
                            register={register("type")}
                        />

                        <SelectLabel
                            label="Product"
                            name="productId"
                            options={products?.map((product) => ({
                                label: product.name,
                                value: product.id,
                            })) || []}
                            error={errors.productId}
                            register={register("productId", { valueAsNumber: true })}
                        />
                        <InputLabel
                            label="Qty"
                            name="qty"
                            type="number"
                            required
                            placeholder="Enter qty"
                            register={register("qty", { valueAsNumber: true })}
                            error={errors.qty}
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
                                Create Stock
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
