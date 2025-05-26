import { z } from "zod";

export const createCourierValidator = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.string().min(1, "Status is required").refine((val) => ["active", "inactive"].includes(val), {
    message: "Status must be either 'active' or 'inactive'",
  }),
});

export const updateCourierValidator = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.string().min(1, "Status is required").refine((val) => ["1", "0"].includes(val), {
    message: "Status must be either 'active' or 'inactive'",
  }),
}); 