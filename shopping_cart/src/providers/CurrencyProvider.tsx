import React, { useEffect, useState } from "react";
import { CurrencyConext, type Currency } from "./CurrencyContext";
import { getExchangeRate } from "../services/products";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [exchangeRate, setExchangeRate] = useState(0.85);

  useEffect(() => {
    const selectedCurrency = localStorage.getItem("currency");

    if (selectedCurrency === "USD" || selectedCurrency === "EUR") {
      setCurrency(selectedCurrency);
    } else {
      localStorage.setItem("currency", "USD");
    }
  }, []);

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
      localStorage.setItem("currency", "EUR");
    } else {
      localStorage.setItem("currency", "USD");
    }

    setCurrency((prev) => (prev === "USD" ? "EUR" : "USD"));
  }

  return (
    <CurrencyConext.Provider
      value={{ currency, handleChangeCurrency, exchangeRate }}
    >
      {children}
    </CurrencyConext.Provider>
  );
}
