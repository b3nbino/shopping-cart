import EditableProductListing from "./EditableProductListing";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

const products = [
  {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  },
  {
    _id: "2",
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 0,
    price: 649.99,
  },
  {
    _id: "3",
    title: "Yamaha Portable Keyboard",
    quantity: 2,
    price: 155.99,
  },
  {
    _id: "4",
    title: "Tinker, Tailor, Soldier, Spy - A John le Carre Novel",
    quantity: 12,
    price: 13.74,
  },
];

it("contains the expected products", () => {
  render(
    <EditableProductListing
      products={products}
      handleAddProduct={vi.fn()}
      handleAddToCart={vi.fn()}
      handleDeleteProduct={vi.fn()}
      handleUpdateProduct={vi.fn()}
    ></EditableProductListing>
  );

  const title1 = screen.getByText("Amazon Kindle E-reader");
  expect(title1).toBeInTheDocument();
  const title2 = screen.getByText("Apple 10.5-Inch iPad Pro");
  expect(title2).toBeInTheDocument();
  const title3 = screen.getByText("Yamaha Portable Keyboard");
  expect(title3).toBeInTheDocument();
  const title4 = screen.getByText(
    "Tinker, Tailor, Soldier, Spy - A John le Carre Novel"
  );
  expect(title4).toBeInTheDocument();
});

it("opens the add form after clicking the add button", async () => {
  render(
    <EditableProductListing
      products={products}
      handleAddProduct={vi.fn()}
      handleAddToCart={vi.fn()}
      handleDeleteProduct={vi.fn()}
      handleUpdateProduct={vi.fn()}
    ></EditableProductListing>
  );

  const addProductButton = screen.getByText("Add A Product");
  const user = userEvent.setup();
  await user.click(addProductButton);

  const addButton = screen.getByText("Add");
  expect(addButton).toBeInTheDocument();
});

it("closes the add form after clicking the cancel button", async () => {
  render(
    <EditableProductListing
      products={products}
      handleAddProduct={vi.fn()}
      handleAddToCart={vi.fn()}
      handleDeleteProduct={vi.fn()}
      handleUpdateProduct={vi.fn()}
    ></EditableProductListing>
  );

  const addProductButton = screen.getByText("Add A Product");
  const user = userEvent.setup();
  await user.click(addProductButton);

  const cancelButton = screen.getByText("Cancel");
  await user.click(cancelButton);
  const form = screen.queryByRole("form");

  expect(form).toBeNull();
});
