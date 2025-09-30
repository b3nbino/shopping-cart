import React, { useContext } from "react";
import { ThemeContext } from "../providers/ThemeContext";

export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <div id="background" className={theme}>
      {children}
    </div>
  );
}
