import { createContext } from "react";

interface ThemeContextType {
  theme: string;
  handleChangeTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  handleChangeTheme: () => undefined,
});
