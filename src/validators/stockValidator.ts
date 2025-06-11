import { z } from "zod";

export const createStockValidator = z.object({
  type: z.string().min(1, "Type is required"),
  productId: z.number().min(1, "Product is required"),
  qty: z.number().min(1, "Qty is required"),
});

export const updateStockValidator = z.object({
  type: z.string().min(1, "Type is required"),
  productId: z.number().min(1, "Product is required"),
  qty: z.number().min(1, "Qty is required"),
});