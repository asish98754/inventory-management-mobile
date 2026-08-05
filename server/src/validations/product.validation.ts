import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Product name is required"),

  reference: z.string().min(2, "Reference is required"),

  description: z.string().min(5, "Description is required"),

  category: z.enum([
    "FRESH_FRUITS",
    "CITRUS",
    "BERRIES",
    "TROPICAL_FRUITS",
    "STONE_FRUITS",
    "MELONS",
  ]),

  quantity: z.number().int().min(0),

  alertThreshold: z.number().int().min(0),

  image: z.string().optional(),
});

export const updateProductSchema = createProductSchema;

export const updateStockSchema = z.object({
  type: z.enum(["IN", "OUT"]),

  quantity: z.number().int().positive(),
});

export type CreateProductDTO = z.infer<typeof createProductSchema>;
export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
export type UpdateStockDTO = z.infer<typeof updateStockSchema>;
