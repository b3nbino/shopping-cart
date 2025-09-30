import type { Product as ProductType } from "../types";
interface ProductActions {
  type: "GET_PRODUCTS" | "ADD_PRODUCT" | "EDIT_PRODUCT" | "DELETE_PRODUCT";
  productId?: string;
  newProducts?: ProductType[] | ProductType;
}

export default function productsReducer(
  currProducts: ProductType[],
  actions: ProductActions
): ProductType[] {
  const { type, productId, newProducts } = actions;
  switch (type) {
    case "GET_PRODUCTS":
      if (newProducts && Array.isArray(newProducts)) {
        return newProducts;
      }
      throw new Error("Non array argument passed with get products.");
    case "ADD_PRODUCT":
      if (currProducts[0] && newProducts && !Array.isArray(newProducts)) {
        return [...currProducts, newProducts];
      }

      throw new Error("Invalid newProducts when adding product.");
    case "EDIT_PRODUCT":
      return currProducts.map((prod) => {
        if (
          newProducts &&
          !Array.isArray(newProducts) &&
          newProducts._id &&
          prod._id === newProducts._id
        ) {
          return newProducts;
        } else {
          return prod;
        }
      });
    case "DELETE_PRODUCT":
      return currProducts.filter((prod) => prod._id !== productId);
    default:
      throw new Error("Unhandled type in products reducer.");
  }
}
