import type { CartedProduct } from "../types";

export function itemInCart(itemId: string, cart: CartedProduct[]) {
  for (const item of cart) {
    if (item.productId === itemId) {
      return true;
    }
  }

  return false;
}
