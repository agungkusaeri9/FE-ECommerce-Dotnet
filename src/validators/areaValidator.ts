import { z } from "zod";

export const createAreaValidator = z.object({
  name: z.string().min(1, "Name is required"),
});

export const updateAreaValidator = z.object({
  name: z.string().min(1, "Name is required"),
}); 