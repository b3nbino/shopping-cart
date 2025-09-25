interface CartItemProps {
  title: string;
  quantity: number;
  price: number;
}

export default function CartItem({ title, quantity, price }: CartItemProps) {
  return (
    <tr>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>{price}</td>
    </tr>
  );
}
