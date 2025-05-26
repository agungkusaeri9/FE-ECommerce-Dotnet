import { z } from "zod";

export const operatorCreateValidator = z.object({
  name: z.string().min(1, "Name is required"),
  nik: z.string().min(1, "NIK is required")
});
