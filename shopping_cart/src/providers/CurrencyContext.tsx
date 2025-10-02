import { createContext } from "react";

export type Currency = "USD" | "EUR";

interface CurrencyContextType {
  currency: string;
  handleChangeCurrency: () => void;
  exchangeRate: number;
}

export const CurrencyConext = createContext<CurrencyContextType>({
  currency: "USD",
  handleChangeCurrency: () => undefined,
  exchangeRate: 1,
});
