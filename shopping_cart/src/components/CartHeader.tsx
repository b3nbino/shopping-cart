import CartItem from "./CartItem";
import type { CartedProduct } from "../types";
import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeContext";
import { CurrencyConext } from "../providers/CurrencyContext";

interface CartHeaderProps {
  cart: CartedProduct[];
  handleCheckout(): void;
}

export default function CartHeader({ cart, handleCheckout }: CartHeaderProps) {
  const { theme, handleChangeTheme } = useContext(ThemeContext);
  const { currency, handleChangeCurrency, exchangeRate } =
    useContext(CurrencyConext);

  function onCheckout() {
    handleCheckout();
  }

  function calculateTotal() {
    return cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  }

  return (
    <header className={theme}>
      <div className="shop-header">
        <h1>The Shop!</h1>
        <button className={theme} onClick={handleChangeTheme}>
          {theme === "light" ? "☀️" : "🌙"}
        </button>
        <button className={theme} onClick={handleChangeCurrency}>
          {currency}
        </button>
      </div>
      <div className="cart">
        <h2>Your Cart</h2>
        <table className="cart-items">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((item) => (
                <CartItem
                  key={item.productId}
                  title={item.title}
                  quantity={item.quantity}
                  price={item.price}
                ></CartItem>
              ))
            ) : (
              <tr>
                <td>Cart empty</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="total">
                Total: {currency === "USD" ? "$" : "€"}
                {currency === "USD"
                  ? calculateTotal().toFixed(2)
                  : (calculateTotal() * exchangeRate).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="checkout-button">
          <button className={"checkout" + " " + theme} onClick={onCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </header>
  );
}
