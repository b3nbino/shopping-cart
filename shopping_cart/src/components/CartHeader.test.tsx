import { render, screen } from "@testing-library/react";
import { it, expect, vi } from "vitest";
import CartHeader from "./CartHeader";

const cart = [
  {
    _id: "a1",
    productId: "1",
    title: "Amazon Kindle E-reader",
    quantity: 1,
    price: 79.99,
  },
  {
    _id: "a2",
    productId: "2",
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 3,
    price: 649.99,
  },
];

it("Displays the expected cart items", () => {
  render(<CartHeader cart={cart} handleCheckout={vi.fn()}></CartHeader>);

  // First item renders
  const item1Text = screen.getByText("Amazon Kindle E-reader");
  const item1Quantity = screen.getByText("1");
  const item1Price = screen.getByText("79.99");

  expect(item1Text).toBeInTheDocument();
  expect(item1Price).toBeInTheDocument();
  expect(item1Quantity).toBeInTheDocument();

  // Second item renders
  const item2Text = screen.getByText("Apple 10.5-Inch iPad Pro");
  const item2Quantity = screen.getByText("3");
  const item2Price = screen.getByText("649.99");

  expect(item2Text).toBeInTheDocument();
  expect(item2Price).toBeInTheDocument();
  expect(item2Quantity).toBeInTheDocument();

  // How do I find calculated elements?
  // const totalString = cart
  //   .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  //   .toFixed(2);
  // const cartTotal = screen.getByText(`Total:$${totalString}`);
  // expect(cartTotal).toBeInTheDocument();
});
