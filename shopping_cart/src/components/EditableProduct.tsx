import { useContext, useState } from "react";
import Product from "./Product";
import EditForm from "./EditForm";
import type { UpdatedProduct } from "../types/index";
import { ThemeContext } from "../providers/ThemeContext";

interface EditableProductProps {
  id: string;
  title: string;
  price: number;
  quantity: number;
  handleDeleteProduct(id: string): void;
  handleUpdateProduct(id: string, productUpdate: UpdatedProduct): void;
  handleAddToCart(productId: string): void;
}

export default function EditableProduct({
  id,
  title,
  price,
  quantity,
  handleDeleteProduct,
  handleUpdateProduct,
  handleAddToCart,
}: EditableProductProps) {
  const [isFormShown, setIsFormShown] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

  return (
    <li className={"product" + " " + theme}>
      <Product
        id={id}
        title={title}
        quantity={quantity}
        price={price}
        isFormShown={isFormShown}
        setIsFormShown={setIsFormShown}
        handleDeleteProduct={handleDeleteProduct}
        handleAddToCart={handleAddToCart}
      ></Product>
      {isFormShown ? (
        <EditForm
          id={id}
          title={title}
          quantity={quantity}
          price={price}
          setIsFormShown={setIsFormShown}
          handleUpdateProduct={handleUpdateProduct}
        ></EditForm>
      ) : null}
    </li>
  );
}
