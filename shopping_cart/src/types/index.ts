import { z } from "zod";

export const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  quantity: z.number(),
  price: z.number(),
});

export const cartedProductSchema = productSchema.extend({
  productId: z.string(),
});

export const newProductSchema = productSchema.omit({
  _id: true,
});

export const updatedProductSchema = productSchema.partial();

export type Product = z.infer<typeof productSchema>;
export type CartedProduct = z.infer<typeof cartedProductSchema>;
export type NewProduct = z.infer<typeof newProductSchema>;
export type UpdatedProduct = z.infer<typeof updatedProductSchema>;
export type SortingOptions =
  | "NAME_ASCENDING"
  | "NAME_DESCENDING"
  | "PRICE_ASCENDING"
  | "PRICE_DESCENDING"
  | "QUANTITY_ASCENDING"
  | "QUANTITY_DESCENDING";
