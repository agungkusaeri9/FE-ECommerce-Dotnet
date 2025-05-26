import { z } from "zod";

export const departmentUpdateValidation = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  number: z.string().min(1, "Number is required")
});
