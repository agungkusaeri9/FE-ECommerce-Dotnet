"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import AreaService from '@/services/AreaService';
import { Area } from '@/types/area';
import { updateAreaValidator } from '@/validators/areaValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type UpdateAreaFormData = z.infer<typeof updateAreaValidator>;

export default function EditArea() {
    const params = useParams();
    const id = Number(params.id);
    
    const { data: area, isLoading } = useFetchById<Area>(AreaService.getById, id, "area");
    const { mutate: updateMutation, isPending } = useUpdateData(
        AreaService.update, 
        id, 
        "areas", 
        "/areas"
    );

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        reset 
    } = useForm<UpdateAreaFormData>({
        resolver: zodResolver(updateAreaValidator),
        mode: "onChange",
    });

    useEffect(() => {
        if (area) {
            reset({
                name: area.name
            });
        }
    }, [area, reset]);

    const onSubmit = (data: UpdateAreaFormData) => {
        updateMutation(data);
    };

    return (
        <div>
            <Breadcrumb 
                items={[
                    { label: 'Dashboard', href: '/dashboard' }, 
                    { label: 'Areas', href: '/areas' }, 
                    { label: 'Edit' }
                ]} 
            />
            <div className="space-y-6">
                <ComponentCard title="Edit Area">
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
                                disabled={isPending || isLoading} 
                                loading={isPending}
                            >
                                Update Area
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
