import { z } from "zod";

export const subcategorySchema = z.object({
  name: z
    .string()
    .min(1, "name must be at least one character")
    .max(255, "name should not be more than 255 characters"),
  categoryId: z.string().min(1, "name is required.").max(255),
});
