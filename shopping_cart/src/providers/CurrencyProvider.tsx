import React, { useEffect, useState } from "react";
import { CurrencyConext } from "./CurrencyContext";
import { getExchangeRate } from "../services/products";
import useLocalStorage from "../hooks/useLocalStorage";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useLocalStorage("currency", "USD");
  const [exchangeRate, setExchangeRate] = useState(0.85);

  useEffect(() => {
    try {
      (async () => {
        const currRate = await getExchangeRate();
        setExchangeRate(currRate);
      })();
    } catch (e: unknown) {
      console.log(e);
      setExchangeRate(0.85);
    }
  }, []);

  function handleChangeCurrency() {
    if (currency === "USD") {
      setCurrency("EUR");
    } else {
      setCurrency("USD");
    }
  }

  return (
    <CurrencyConext.Provider
      value={{ currency, handleChangeCurrency, exchangeRate }}
    >
      {children}
    </CurrencyConext.Provider>
  );
}
