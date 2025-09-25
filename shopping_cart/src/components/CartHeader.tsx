import CartItem from "./CartItem";
import type { CartedProduct } from "../types";

interface CartHeaderProps {
  cart: CartedProduct[];
  handleCheckout(): void;
}

export default function CartHeader({ cart, handleCheckout }: CartHeaderProps) {
  function onCheckout() {
    handleCheckout();
  }

  return (
    <header>
      <h1>The Shop!</h1>
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
            {cart.map((item) => (
              <CartItem
                key={item.productId}
                title={item.title}
                quantity={item.quantity}
                price={item.price}
              ></CartItem>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="total">
                Total: $
                {cart
                  .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
                  .toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="checkout-button">
          <button className="checkout" onClick={onCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </header>
  );
}
