import React, { useState } from "react";
import EditableProduct from "./EditableProduct";
import AddForm from "./AddForm";
import type {
  NewProduct,
  Product as ProductType,
  UpdatedProduct,
} from "../types/index";
import type { SortingOptions as SortingOptionsType } from "../types/index";
import SortingOptions from "./SortingOptions";

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
  const [isAddFormShown, setIsAddFormShown] = useState<boolean>(false);

  return (
    <main>
      <div className="product-listing">
        <div className="products-header">
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
      {!isAddFormShown ? (
        <button
          className="add-product-button"
          onClick={() => setIsAddFormShown(true)}
        >
          Add A Product
        </button>
      ) : null}
      {isAddFormShown ? (
        <AddForm
          setIsAddFormShown={setIsAddFormShown}
          handleAddProduct={handleAddProduct}
        ></AddForm>
      ) : null}
    </main>
  );
}
