import { z } from "zod";

export const createProductValidator = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(1, "Price is required"),
  stock: z.number().min(1, "Stock is required"),
  categoryId: z.number().min(1, "Category is required"),
  brandId: z.number().min(1, "Brand is required"),
  image: z
    .custom<File>((val) => val instanceof File, "Image is required")
    .nullable(),
});

export const updateProductValidator = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(1, "Price is required"),
  stock: z.number().min(1, "Stock is required"),
  categoryId: z.number().min(1, "Category is required"),
  brandId: z.number().min(1, "Brand is required"),
  image: z
    .union([z.instanceof(File), z.null(), z.undefined()])
    .optional(),
});