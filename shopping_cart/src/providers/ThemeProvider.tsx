import React from "react";
import { ThemeContext } from "./ThemeContext";
import useLocalStorage from "../hooks/useLocalStorage";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  function handleChangeTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
