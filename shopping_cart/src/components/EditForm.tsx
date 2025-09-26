import type React from "react";
import type { UpdatedProduct } from "../types/index";
import { useEffect, useState } from "react";

interface EditFormProps {
  id: string;
  title: string;
  quantity: number;
  price: number;
  setIsFormShown: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateProduct(id: string, productUpdate: UpdatedProduct): void;
}

export default function EditForm({
  id,
  title,
  quantity,
  price,
  setIsFormShown,
  handleUpdateProduct,
}: EditFormProps) {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedQuantity, setUpdatedQuantity] = useState(String(quantity));
  const [updatedPrice, setUpdatedPrice] = useState(String(price));

  useEffect(() => {
    setUpdatedQuantity(String(quantity));
  }, [quantity]);

  function onUpdateProduct(event: React.SyntheticEvent<Element, Event>) {
    event.preventDefault();
    handleUpdateProduct(id, {
      title: updatedTitle === "" ? undefined : updatedTitle,
      price: updatedPrice === "" ? undefined : Number(updatedPrice),
      quantity: updatedQuantity === "" ? undefined : Number(updatedQuantity),
    });
    setIsFormShown(false);
  }

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={onUpdateProduct}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={updatedTitle}
            onChange={(event) => setUpdatedTitle(event.target.value)}
            aria-label="Product Name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={updatedPrice}
            onChange={(event) => setUpdatedPrice(event.target.value)}
            aria-label="Product Price"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={updatedQuantity}
            onChange={(event) => setUpdatedQuantity(event.target.value)}
            aria-label="Product Quantity"
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={() => setIsFormShown(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
