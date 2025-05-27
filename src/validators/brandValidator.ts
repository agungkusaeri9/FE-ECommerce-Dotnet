import { z } from "zod";

export const createBrandValidator = z.object({
  name: z.string().min(1, "Name is required"),
  image: z
    .custom<File>((file) => file instanceof File && file.size > 0, {
      message: "Image is required",
    }),
});


export const updateBrandValidator = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.instanceof(File).optional().refine(file => file?.size > 0, {
    message: "Image is required if provided",
  }),
});
