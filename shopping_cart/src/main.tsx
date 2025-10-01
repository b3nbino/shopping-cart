import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import Background from "./components/Background.tsx";
import { CurrencyProvider } from "./providers/CurrencyProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <CurrencyProvider>
        <Background>
          <App />
        </Background>
      </CurrencyProvider>
    </ThemeProvider>
  </StrictMode>
);
