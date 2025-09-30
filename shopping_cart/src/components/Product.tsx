import type React from "react";
import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeContext";

interface ProductProps {
  id: string;
  title: string;
  price: number;
  quantity: number;
  handleDeleteProduct(id: string): void;
  handleAddToCart(productId: string): void;
  isFormShown?: boolean;
  setIsFormShown?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Product({
  id,
  title,
  price,
  quantity,
  handleDeleteProduct,
  isFormShown,
  setIsFormShown,
  handleAddToCart,
}: ProductProps) {
  const { theme } = useContext(ThemeContext);

  function onDeleteProduct(event: React.SyntheticEvent<Element, Event>) {
    event.preventDefault();
    handleDeleteProduct(id);
  }

  function onAddToCart(event: React.SyntheticEvent<Element, Event>) {
    event.preventDefault();
    handleAddToCart(id);
  }

  return (
    <div className="product-details">
      <h3>{title}</h3>
      <p className={"price" + " " + theme}>${price}</p>
      <p className="quantity">{quantity} left in stock</p>
      <div className="actions product-actions">
        <button className={"add-to-cart" + " " + theme} onClick={onAddToCart}>
          Add to Cart
        </button>
        <button
          className={"edit" + " " + theme}
          onClick={() => (setIsFormShown ? setIsFormShown(!isFormShown) : null)}
        >
          Edit
        </button>
      </div>
      <button className="delete-button" onClick={onDeleteProduct}>
        <span>X</span>
      </button>
    </div>
  );
}
