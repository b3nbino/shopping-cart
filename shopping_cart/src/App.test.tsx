import App from "./App";
import { screen, render } from "@testing-library/react";
import { addProduct, getAllProducts, updateProduct } from "./services/products";
import { addToCart, getCart } from "./services/cart";
import userEvent from "@testing-library/user-event";

vi.mock("./services/products.ts");
vi.mock("./services/cart.ts");

// Mocked functions
const mockedGetAllProducts = vi.mocked(getAllProducts);
const mockedGetCart = vi.mocked(getCart);
const mockedAddProduct = vi.mocked(addProduct);
const mockedUpdateProduct = vi.mocked(updateProduct);
const mockedAddToCart = vi.mocked(addToCart);

afterEach(() => {
  vi.resetAllMocks();
});

const products = [
  {
    _id: "68d43f1547d384a7e2e03fcb",
    title: "10% Milk",
    price: 2.99,
    quantity: 5,
  },
];

const cart = [
  {
    _id: "68d6ad260c29ee12e63ab25a",
    title: "10% Milk",
    price: 2.99,
    quantity: 2,
    productId: "68d43f1547d384a7e2e03fcb",
  },
];

it("renders the product and cart on initial render", async () => {
  mockedGetAllProducts.mockResolvedValue(products);
  mockedGetCart.mockResolvedValue(cart);
  render(<App></App>);

  const productHeading = await screen.findByRole("heading", {
    level: 3,
    name: "10% Milk",
  });
  const cartHeading = await screen.findByRole("cell", {
    name: "10% Milk",
  });

  expect(productHeading).toBeInTheDocument();
  expect(cartHeading).toBeInTheDocument();
});

it("adds a product to the product list when a product is added and removes form", async () => {
  mockedGetAllProducts.mockResolvedValue([]);
  mockedGetCart.mockResolvedValue([]);
  mockedAddProduct.mockResolvedValue(products[0]);
  render(<App></App>);
  const user = userEvent.setup();

  const addProductButton = screen.getByText("Add A Product");
  await user.click(addProductButton);

  const nameInput = screen.getByLabelText("Product Name:");
  await user.type(nameInput, "10% Milk");

  const priceInput = screen.getByLabelText("Price:");
  await user.type(priceInput, "2.99");

  const quantityInput = screen.getByLabelText("Quantity:");
  await user.type(quantityInput, "2");

  const addButton = screen.getByRole("button", {
    name: "Add",
  });
  await user.click(addButton);

  const productHeading = await screen.findByRole("heading", {
    level: 3,
    name: "10% Milk",
  });

  expect(productHeading).toBeInTheDocument();

  const removedNameInput = screen.queryByLabelText("Product Name:");
  expect(removedNameInput).not.toBeInTheDocument();
});

it("updates a product when a product is edited and removes form", async () => {
  mockedGetAllProducts.mockResolvedValue(products);
  mockedGetCart.mockResolvedValue([]);
  mockedUpdateProduct.mockResolvedValue({
    _id: "1",
    title: "Updated product",
    quantity: 10,
    price: 10.99,
  });
  render(<App></App>);
  const user = userEvent.setup();

  const editProductButton = await screen.findByRole("button", {
    name: "Edit",
  });
  await user.click(editProductButton);

  const nameInput = screen.getByLabelText("Product Name");
  await user.clear(nameInput);
  await user.type(nameInput, "Updated product");

  const priceInput = screen.getByLabelText("Price");
  await user.clear(priceInput);
  await user.type(priceInput, "10.99");

  const quantityInput = screen.getByLabelText("Quantity");
  await user.clear(quantityInput);
  await user.type(quantityInput, "10");

  const updateButton = screen.getByRole("button", {
    name: "Update",
  });
  await user.click(updateButton);

  const productHeading = await screen.findByRole("heading", {
    level: 3,
    name: "Updated product",
  });

  expect(productHeading).toBeInTheDocument();

  const removedNameInput = screen.queryByLabelText("Product Name");
  expect(removedNameInput).not.toBeInTheDocument();
});

it("removes product from list when clicking delete", async () => {
  mockedGetAllProducts.mockResolvedValue(products);
  mockedGetCart.mockResolvedValue([]);
  render(<App></App>);

  const user = userEvent.setup();
  const deleteButton = await screen.findByRole("button", {
    name: "X",
  });
  await user.click(deleteButton);

  const removedHeader = screen.queryByRole("heading", {
    level: 3,
    name: "10% Milk",
  });
  expect(removedHeader).not.toBeInTheDocument();
});

it("adds an item to the cart on button click", async () => {
  mockedGetAllProducts.mockResolvedValue(products);
  mockedGetCart.mockResolvedValue([]);
  mockedAddToCart.mockResolvedValue({ item: cart[0], product: products[0] });
  render(<App></App>);

  const user = userEvent.setup();
  const addToCartButton = await screen.findByRole("button", {
    name: "Add to Cart",
  });
  await user.click(addToCartButton);

  const nameCell = screen.getByRole("cell", {
    name: "10% Milk",
  });
  expect(nameCell).toBeInTheDocument();
});

it("clears the cart on checkout", async () => {
  mockedGetAllProducts.mockResolvedValue(products);
  mockedGetCart.mockResolvedValue(cart);
  mockedAddToCart.mockResolvedValue({ item: cart[0], product: products[0] });
  render(<App></App>);

  const user = userEvent.setup();
  const checkoutButton = await screen.findByRole("button", {
    name: "Checkout",
  });
  await user.click(checkoutButton);

  const nameCell = screen.queryByRole("cell", {
    name: "Cart empty",
  });
  expect(nameCell).toBeInTheDocument();
});
