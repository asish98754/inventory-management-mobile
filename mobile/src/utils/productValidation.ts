import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Product name is required"),

  reference: z
    .string()
    .trim()
    .min(1, "Reference is required"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required"),

  category: z
    .string()
    .min(1, "Category is required"),

  quantity: z
    .number()
    .int("Quantity must be a valid number")
    .min(0, "Quantity cannot be negative"),

  alertThreshold: z
    .number()
    .int("Alert threshold must be a valid number")
    .min(0, "Alert threshold cannot be negative"),
});

export type ProductFormData = z.infer<
  typeof productSchema
>;