import "./index.css";
import { useContext, useEffect, useReducer, useState } from "react";
import { addToCart, checkoutCart, getCart } from "./services/cart";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getExchangeRate,
  updateProduct,
} from "./services/products";
import productsReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";

// Import components
import CartHeader from "./components/CartHeader";
import EditableProductListing from "./components/EditableProductListing";

// Import types
import type { CartedProduct, SortingOptions } from "./types";
import type {
  Product as ProductType,
  UpdatedProduct,
  NewProduct,
} from "./types";
import { CurrencyConext } from "./providers/CurrencyContext";

function App() {
  const [cart, dispatchCart] = useReducer(cartReducer, []);
  const [products, dispatchProducts] = useReducer(productsReducer, []);
  const [sortBy, setSortBy] = useState<SortingOptions>("NAME_ASCENDING");
  const { currency } = useContext(CurrencyConext);

  // Set cart and products to reflect database
  useEffect(() => {
    try {
      (async () => {
        const cartItems = await getCart();
        dispatchCart({
          type: "GET_CART",
          newItems: cartItems,
        });
      })();
    } catch (e: unknown) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      (async () => {
        const allProducts: ProductType[] = await getAllProducts();
        const exchangeRate = await getExchangeRate();
        dispatchProducts({
          type: "GET_PRODUCTS",
          newProducts: allProducts,
          sortBy,
          currency,
          exchangeRate,
        });
      })();
    } catch (e: unknown) {
      console.log(e);
    }
  }, [sortBy, currency]);

  // Adds an item to the cart
  async function handleAddToCart(productId: string) {
    try {
      // Make API Call
      const {
        product,
        item,
      }: { product: ProductType; item: CartedProduct | null } = await addToCart(
        productId
      );
      // Update products to reflect new product quantity
      dispatchProducts({
        type: "EDIT_PRODUCT",
        newProducts: product,
        sortBy,
      });
      if (item !== null) {
        dispatchCart({
          type: "ADD_TO_CART",
          newItems: item,
        });
      }
    } catch (e: unknown) {
      console.log(e);
    }
  }

  // Clears the cart
  async function handleCheckout() {
    try {
      await checkoutCart();
      dispatchCart({
        type: "CHECKOUT",
      });
    } catch (e: unknown) {
      console.log(e);
    }
  }

  // Adds a new product to the database and state
  async function handleAddProduct(product: NewProduct, callback: () => void) {
    try {
      const addedProduct = await addProduct(product);
      dispatchProducts({
        type: "ADD_PRODUCT",
        newProducts: addedProduct,
        sortBy,
      });

      if (callback) {
        callback();
      }
    } catch (e: unknown) {
      console.log(e);
    }
  }

  // Removes a product from the database and state
  async function handleDeleteProduct(productId: string) {
    try {
      await deleteProduct(productId);
      dispatchProducts({
        type: "DELETE_PRODUCT",
        productId,
        sortBy,
      });
    } catch (e: unknown) {
      console.log(e);
    }
  }

  // Changes an existing product's properties
  async function handleUpdateProduct(
    productId: string,
    productUpdate: UpdatedProduct
  ) {
    try {
      const updatedProduct: ProductType = await updateProduct(
        productId,
        productUpdate
      );
      dispatchProducts({
        type: "EDIT_PRODUCT",
        newProducts: updatedProduct,
        sortBy,
      });
    } catch (e: unknown) {
      console.log(e);
    }
  }

  return (
    <div id="app">
      <CartHeader cart={cart} handleCheckout={handleCheckout}></CartHeader>
      <EditableProductListing
        products={products}
        handleAddToCart={handleAddToCart}
        handleDeleteProduct={handleDeleteProduct}
        handleUpdateProduct={handleUpdateProduct}
        handleAddProduct={handleAddProduct}
        sortBy={sortBy}
        setSortBy={setSortBy}
      ></EditableProductListing>
    </div>
  );
}

export default App;
