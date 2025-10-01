import axios from "axios";
import type { NewProduct } from "../types/index";
import type { Product } from "../types/index";
import type { UpdatedProduct } from "../types/index";
import { productSchema } from "../types/index";
import z from "zod";

const productsSchema = z.array(productSchema);

// Add a product, then return added
export async function addProduct(newProduct: NewProduct) {
  const { data }: { data: Product } = await axios.post("/api/products", {
    ...newProduct,
  });
  console.log("New product added.");
  return productSchema.parse(data);
}

// Get all products and return them
export async function getAllProducts() {
  const { data }: { data: Product[] } = await axios.get("/api/products");
  console.log("Got all products.");
  return productsSchema.parse(data);
}

// Delete a product
export async function deleteProduct(id: string) {
  await axios.delete(`/api/products/${id}`);
  console.log("Product deleted.");
}

export async function updateProduct(
  id: string,
  updatedProduct: UpdatedProduct
) {
  const { data }: { data: Product } = await axios.put(`/api/products/${id}`, {
    ...updatedProduct,
  });
  console.log("Product updated.");
  return productSchema.parse(data);
}

export async function getExchangeRate() {
  const { data } = await axios.get("https://open.er-api.com/v6/latest/USD");
  return data.rates.EUR;
}
