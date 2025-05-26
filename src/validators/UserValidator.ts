import { z } from "zod";

export const createUserValidator = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    role: z.string().min(1, "Role is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string().min(6, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });


  export const updateUserValidator = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    role: z.string().min(1, "Role is required"),
    password: z.string().optional(),
    password_confirmation: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.password || !data.password_confirmation || data.password === data.password_confirmation,
    {
      message: "Passwords do not match",
      path: ["password_confirmation"],
    }
  );
