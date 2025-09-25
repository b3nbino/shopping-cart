import axios from "axios";
import {
  cartedProductSchema,
  productSchema,
  type CartedProduct,
} from "../types";
import z from "zod";

const addToCartSchema = z.object({
  product: productSchema,
  item: cartedProductSchema.nullable(),
});
const cartedProductsSchema = cartedProductSchema.array();

type AddToCart = z.infer<typeof addToCartSchema>;

export async function addToCart(productId: string) {
  const { data }: { data: AddToCart } = await axios.post("/api/add-to-cart", {
    productId,
  });
  console.log("Item added to cart.");
  return addToCartSchema.parse(data);
}

export async function getCart() {
  const { data }: { data: CartedProduct[] } = await axios.get("/api/cart");
  console.log("Got cart.");
  return cartedProductsSchema.parse(data);
}

export async function checkoutCart() {
  await axios.post("/api/checkout");
  console.log("Items bought!");
}
