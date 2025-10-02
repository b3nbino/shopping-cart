import React, { useContext } from "react";
import EditableProduct from "./EditableProduct";
import AddForm from "./AddForm";
import type {
  NewProduct,
  Product as ProductType,
  UpdatedProduct,
} from "../types/index";
import type { SortingOptions as SortingOptionsType } from "../types/index";
import SortingOptions from "./SortingOptions";
import { ThemeContext } from "../providers/ThemeContext";
import useToggle from "../hooks/useToggle";

interface EditableProductListingProps {
  products: ProductType[];
  handleAddToCart(productId: string): void;
  handleDeleteProduct(id: string): void;
  handleUpdateProduct(id: string, productUpdate: UpdatedProduct): void;
  handleAddProduct(product: NewProduct, callback: () => void): void;
  sortBy: SortingOptionsType;
  setSortBy: React.Dispatch<React.SetStateAction<SortingOptionsType>>;
}

export default function EditableProductListing({
  products,
  handleAddToCart,
  handleAddProduct,
  handleDeleteProduct,
  handleUpdateProduct,
  sortBy,
  setSortBy,
}: EditableProductListingProps) {
  const [isFormShown, toggle] = useToggle(false);
  const { theme } = useContext(ThemeContext);

  return (
    <main className={theme}>
      <div className="product-listing">
        <div className={"products-header" + " " + theme}>
          <h2>Products</h2>
          <SortingOptions
            sortBy={sortBy}
            setSortBy={setSortBy}
          ></SortingOptions>
        </div>
        <ul className="product-list">
          {products.map((item) => (
            <EditableProduct
              key={item._id}
              id={item._id}
              title={item.title}
              quantity={item.quantity}
              price={item.price}
              handleDeleteProduct={handleDeleteProduct}
              handleUpdateProduct={handleUpdateProduct}
              handleAddToCart={handleAddToCart}
            ></EditableProduct>
          ))}
        </ul>
      </div>
      {!isFormShown ? (
        <button className={"add-product-button" + " " + theme} onClick={toggle}>
          Add A Product
        </button>
      ) : null}
      {isFormShown ? (
        <AddForm
          setIsAddFormShown={toggle}
          handleAddProduct={handleAddProduct}
        ></AddForm>
      ) : null}
    </main>
  );
}
