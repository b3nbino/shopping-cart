import { createContext } from "react";

export type Currency = "USD" | "EUR";

interface CurrencyContextType {
  currency: Currency;
  handleChangeCurrency: () => void;
}

export const CurrencyConext = createContext<CurrencyContextType>({
  currency: "USD",
  handleChangeCurrency: () => undefined,
});
