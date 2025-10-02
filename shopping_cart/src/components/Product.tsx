import type React from "react";
import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeContext";
import { CurrencyConext } from "../providers/CurrencyContext";

interface ProductProps {
  id: string;
  title: string;
  price: number;
  quantity: number;
  handleDeleteProduct(id: string): void;
  handleAddToCart(productId: string): void;
  toggle: () => void;
}

export default function Product({
  id,
  title,
  price,
  quantity,
  handleDeleteProduct,
  toggle,
  handleAddToCart,
}: ProductProps) {
  const { theme } = useContext(ThemeContext);
  const { currency, exchangeRate } = useContext(CurrencyConext);

  function getEuroPrice() {
    return (price * exchangeRate).toFixed(2);
  }

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
      <p className={"price" + " " + theme}>
        {currency === "USD" ? "$" : "€"}
        {currency === "USD" ? price : getEuroPrice()}
      </p>
      <p className="quantity">{quantity} left in stock</p>
      <div className="actions product-actions">
        <button className={"add-to-cart" + " " + theme} onClick={onAddToCart}>
          Add to Cart
        </button>
        <button className={"edit" + " " + theme} onClick={toggle}>
          Edit
        </button>
      </div>
      <button className="delete-button" onClick={onDeleteProduct}>
        <span>X</span>
      </button>
    </div>
  );
}
