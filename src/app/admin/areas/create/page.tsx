"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import AreaService from '@/services/AreaService';
import { createAreaValidator } from '@/validators/areaValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type CreateAreaFormData = z.infer<typeof createAreaValidator>;

export default function CreateArea() {
    const { mutate: createMutation, isPending } = useCreateData(
        AreaService.create,
        ["areas"],
        "/areas"
    );

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset
    } = useForm<CreateAreaFormData>({
        resolver: zodResolver(createAreaValidator),
        mode: "onChange",
    });

    const onSubmit = (data: CreateAreaFormData) => {
        createMutation(data, {
            onSuccess: () => {
                reset(); 
            }
        });
    };

    return (
        <div>
            <Breadcrumb 
                items={[
                    { label: 'Dashboard', href: '/dashboard' }, 
                    { label: 'Areas', href: '/areas' }, 
                    { label: 'Create' }
                ]} 
            />
            <div className="space-y-6">
                <ComponentCard title="Create Area">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputLabel
                            label="Name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter area name"
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
                                disabled={isPending} 
                                loading={isPending}
                            >
                                Create Area
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
