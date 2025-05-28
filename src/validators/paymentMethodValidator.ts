import { z } from "zod";

export const createPaymentMethodValidator = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  number: z.string().min(1, "Number is required"),
  ownerName: z.string().min(1, "Owner Name is required"),
  isActive: z.number().min(0, "Is Active must be 0 or 1").max(1, "Is Active must be 0 or 1"),
  image: z
    .custom<File>((val) => val instanceof File, "Image is required")
    .nullable(),
});


export const updatePaymentMethodValidator = z.object({
    name: z.string().min(1, "Name is required"),
    type: z.string().min(1, "Type is required"),
    number: z.string().min(1, "Number is required"),
    ownerName: z.string().min(1, "Owner Name is required"),
    isActive: z.number().min(0, "Is Active must be 0 or 1").max(1, "Is Active must be 0 or 1"),
    image: z
    .union([z.instanceof(File), z.null(), z.undefined()])
    .optional()
    .refine(
      (val) => val === null || val === undefined || val instanceof File,
      { message: "Image must be a File or null" }
    ),
  });
  