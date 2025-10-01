import { useContext } from "react";
import { CurrencyConext } from "../providers/CurrencyContext";

interface CartItemProps {
  title: string;
  quantity: number;
  price: number;
}

export default function CartItem({ title, quantity, price }: CartItemProps) {
  const { currency, exchangeRate } = useContext(CurrencyConext);

  return (
    <tr>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>{currency === "USD" ? price : (price * exchangeRate).toFixed(2)}</td>
    </tr>
  );
}
