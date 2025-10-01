import React, { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const selectedTheme = localStorage.getItem("theme");

    if (selectedTheme === "light" || selectedTheme === "dark") {
      setTheme(selectedTheme);
    } else {
      localStorage.setItem("theme", "light");
    }
  }, []);

  function handleChangeTheme() {
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }

    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
