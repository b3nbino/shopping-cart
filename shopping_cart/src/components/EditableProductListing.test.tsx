import EditableProductListing from "./EditableProductListing";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const products = [
  {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
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

  const nameInput = screen.getByLabelText("Product Name:");
  expect(nameInput).toBeInTheDocument();
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
  const nameInput = screen.queryByLabelText("Product Name:");

  expect(nameInput).not.toBeInTheDocument();
});

it("lets the user type in the add form inputs", async () => {
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

  const nameInput = screen.getByLabelText("Product Name:");
  await user.type(nameInput, "milk");
  expect(nameInput).toHaveValue("milk");

  const priceInput = screen.getByLabelText("Price:");
  await user.type(priceInput, "12");
  expect(priceInput).toHaveValue(12);

  const quantityInput = screen.getByLabelText("Quantity:");
  await user.type(quantityInput, "3");
  expect(quantityInput).toHaveValue(3);
});

it("opens the add edit after clicking the add button", async () => {
  render(
    <EditableProductListing
      products={products}
      handleAddProduct={vi.fn()}
      handleAddToCart={vi.fn()}
      handleDeleteProduct={vi.fn()}
      handleUpdateProduct={vi.fn()}
    ></EditableProductListing>
  );

  const editProductButton = screen.getByRole("button", {
    name: "Edit",
  });
  const user = userEvent.setup();
  await user.click(editProductButton);

  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
});

it("closes the edit form after clicking the cancel button", async () => {
  render(
    <EditableProductListing
      products={products}
      handleAddProduct={vi.fn()}
      handleAddToCart={vi.fn()}
      handleDeleteProduct={vi.fn()}
      handleUpdateProduct={vi.fn()}
    ></EditableProductListing>
  );

  const editProductButton = screen.getByRole("button", {
    name: "Edit",
  });
  const user = userEvent.setup();
  await user.click(editProductButton);

  const cancelButton = screen.getByRole("button", {
    name: "Cancel",
  });
  await user.click(cancelButton);
  const form = screen.queryByRole("textbox");

  expect(form).not.toBeInTheDocument();
});

it("edit form has values from product automatically populated", async () => {
  render(
    <EditableProductListing
      products={products}
      handleAddProduct={vi.fn()}
      handleAddToCart={vi.fn()}
      handleDeleteProduct={vi.fn()}
      handleUpdateProduct={vi.fn()}
    ></EditableProductListing>
  );

  const editProductButton = screen.getByRole("button", {
    name: "Edit",
  });
  const user = userEvent.setup();
  await user.click(editProductButton);

  const nameInput = screen.getByLabelText("Product Name");
  expect(nameInput).toHaveValue("Amazon Kindle E-reader");

  const priceInput = screen.getByLabelText("Price");
  expect(priceInput).toHaveValue(79.99);

  const quantityInput = screen.getByLabelText("Quantity");
  expect(quantityInput).toHaveValue(5);
});

it("allows the user to enter new values", async () => {
  render(
    <EditableProductListing
      products={products}
      handleAddProduct={vi.fn()}
      handleAddToCart={vi.fn()}
      handleDeleteProduct={vi.fn()}
      handleUpdateProduct={vi.fn()}
    ></EditableProductListing>
  );

  const editProductButton = screen.getByRole("button", {
    name: "Edit",
  });
  const user = userEvent.setup();
  await user.click(editProductButton);

  const nameInput = screen.getByLabelText("Product Name");
  await user.clear(nameInput);
  await user.type(nameInput, "New Name");
  expect(nameInput).toHaveValue("New Name");

  const priceInput = screen.getByLabelText("Price");
  await user.clear(priceInput);
  await user.type(priceInput, "9.99");
  expect(priceInput).toHaveValue(9.99);

  const quantityInput = screen.getByLabelText("Quantity");
  await user.clear(quantityInput);
  await user.type(quantityInput, "10");
  expect(quantityInput).toHaveValue(10);
});
