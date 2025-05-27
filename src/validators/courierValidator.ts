import { z } from "zod";

export const createCourierValidator = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.union([
    z.literal(0),
    z.literal(1),
    z.null()
  ]),
});

export const updateCourierValidator = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.union([
    z.literal(0),
    z.literal(1),
    z.null()
  ]),
});
