import React, { useState } from "react";
import { CurrencyConext, type Currency } from "./CurrencyContext";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  function handleChangeCurrency() {
    setCurrency((prev) => (prev === "USD" ? "EUR" : "USD"));
  }

  return (
    <CurrencyConext.Provider value={{ currency, handleChangeCurrency }}>
      {children}
    </CurrencyConext.Provider>
  );
}
