import { z } from "zod";

export const loginValidation = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required")
});
