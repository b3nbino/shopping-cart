import type { CartedProduct } from "../types";
import { itemInCart } from "../utils/utils";

interface CartActions {
  type: "GET_CART" | "ADD_TO_CART" | "CHECKOUT";
  newItems?: CartedProduct | CartedProduct[];
}

export default function cartReducer(
  currCart: CartedProduct[],
  actions: CartActions
): CartedProduct[] {
  const { type, newItems } = actions;
  let newCart;
  switch (type) {
    case "GET_CART":
      if (newItems && Array.isArray(newItems)) {
        return newItems;
      }
      throw new Error("Invalid newItems when getting cart.");
    case "ADD_TO_CART":
      if (newItems && !Array.isArray(newItems)) {
        if (itemInCart(newItems.productId, currCart)) {
          newCart = currCart.map((currItem) => {
            if (currItem.productId === newItems.productId) {
              return newItems;
            } else {
              return currItem;
            }
          });
        } else {
          newCart = [...currCart];
          newCart.push(newItems);
        }
        return newCart;
      }

      throw new Error("Invalid newItems when adding to cart.");
    case "CHECKOUT":
      return [];
    default:
      throw new Error("Unhandled type in cart reducer");
  }
}
