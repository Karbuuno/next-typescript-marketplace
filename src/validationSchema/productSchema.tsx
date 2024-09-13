import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "name must be at least one character")
    .max(255, "name should not be more than 255 characters"),
  color: z
    .string()
    .min(1, "color must be at least one character")
    .max(255, "color should not be more than 255 characters"),
  brand: z
    .string()
    .min(1, "brand must be at least one character")
    .max(255, "brand should not be more than 255 characters"),
  size: z
    .string()
    .min(1, "size must be at least one character")
    .max(255, "size should not be more than 255 characters"),
  condition: z.string().min(1, "location is required.").max(500).optional(),
  location: z.string().min(1, "location is required.").max(500).optional(),
  categoryId: z.string().min(1, "categoryId is required.").max(500),
  sellerId: z.string().min(1, "categoryId is required.").max(500).optional(),
  subcategoryId: z
    .string()
    .min(1, "subcategoryId is required.")
    .max(500)
    .optional(),
  thumbnail: z.string().min(1, "name is required.").max(255).optional(),
  gallery: z.array(z.string()).optional(),
  price: z.number(),
  description: z.string().min(1, "name is required.").max(500).optional(),
});
