import type { Currency } from "../providers/CurrencyContext";
import type { Product as ProductType, SortingOptions } from "../types";
interface ProductActions {
  type: "GET_PRODUCTS" | "ADD_PRODUCT" | "EDIT_PRODUCT" | "DELETE_PRODUCT";
  sortBy: SortingOptions;
  currency?: Currency;
  productId?: string;
  newProducts?: ProductType[] | ProductType;
  exchangeRate?: number;
}

function sortProducts(
  sortBy: SortingOptions,
  products: ProductType[]
): ProductType[] {
  switch (sortBy) {
    case "NAME_ASCENDING":
      return products.sort((prodA, prodB) => {
        if (prodA.title > prodB.title) {
          return 1;
        } else if (prodA.title < prodB.title) {
          return -1;
        }
        return 0;
      });
    case "NAME_DESCENDING":
      return products.sort((prodA, prodB) => {
        if (prodA.title < prodB.title) {
          return 1;
        } else if (prodA.title > prodB.title) {
          return -1;
        }
        return 0;
      });
    case "PRICE_ASCENDING":
      return products.sort((prodA, prodB) => prodA.price - prodB.price);
    case "PRICE_DESCENDING":
      return products.sort((prodA, prodB) => prodB.price - prodA.price);
    case "QUANTITY_ASCENDING":
      return products.sort((prodA, prodB) => prodA.quantity - prodB.quantity);
    case "QUANTITY_DESCENDING":
      return products.sort((prodA, prodB) => prodB.quantity - prodA.quantity);

    default:
      throw new Error("Unhandled sorting type.");
  }
}

export default function productsReducer(
  currProducts: ProductType[],
  actions: ProductActions
): ProductType[] {
  const { type, productId, newProducts, sortBy, currency, exchangeRate } =
    actions;
  let sortedProducts;
  switch (type) {
    case "GET_PRODUCTS":
      if (newProducts && Array.isArray(newProducts)) {
        sortedProducts = newProducts;
        if (currency === "EUR" && exchangeRate) {
          sortedProducts.forEach((prod) => {
            prod.price = prod.price * exchangeRate;
          });
        }
      } else {
        throw new Error("Non array argument passed with get products.");
      }
      break;
    case "ADD_PRODUCT":
      if (currProducts[0] && newProducts && !Array.isArray(newProducts)) {
        sortedProducts = [...currProducts, newProducts];
      } else {
        throw new Error("Invalid newProducts when adding product.");
      }
      break;
    case "EDIT_PRODUCT":
      sortedProducts = currProducts.map((prod) => {
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
      break;
    case "DELETE_PRODUCT":
      sortedProducts = currProducts.filter((prod) => prod._id !== productId);
      break;
    default:
      throw new Error("Unhandled type in products reducer.");
  }

  return sortProducts(sortBy, sortedProducts);
}
