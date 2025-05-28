import { z } from "zod";

export const createBrandValidator = z.object({
  name: z.string().min(1, "Name is required"),
  image: z
    .custom<File>((val) => val instanceof File, "Image is required")
    .nullable(),
});

export const updateBrandValidator = z.object({
  name: z.string().min(1, "Name is required"),
  // image: z
  //   .union([z.instanceof(File), z.null(), z.undefined()])
  //   .optional()
  //   .refine(
  //     (val) => val === null || val === undefined || val instanceof File,
  //     { message: "Image must be a File or null" }
  //   ),
  image: z
  .union([
    z.instanceof(File), // kalau user upload file
    z.null(),           // kalau tidak ada file
    z.undefined(),      // untuk jaga-jaga
  ])
  .optional(),
});