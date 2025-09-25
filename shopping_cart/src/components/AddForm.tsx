import type React from "react";
import type { NewProduct } from "../types/index";
import { useState } from "react";

interface AddFormProps {
  setIsAddFormShown: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddProduct(product: NewProduct, callback: () => void): void;
}

export default function AddForm({
  setIsAddFormShown,
  handleAddProduct,
}: AddFormProps) {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  function handleReset() {
    setTitle("");
    setQuantity("");
    setPrice("");
    setIsAddFormShown(false);
  }

  function onAddProduct(event: React.SyntheticEvent<Element, Event>) {
    event.preventDefault();
    handleAddProduct(
      {
        title,
        quantity: Number(quantity),
        price: Number(price),
      },
      handleReset
    );
  }

  return (
    <div className="add-form">
      <form onSubmit={onAddProduct}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            required
          />
        </div>
        <div className="actions form-actions">
          <button type="submit">Add</button>
          <button type="button" onClick={() => setIsAddFormShown(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
