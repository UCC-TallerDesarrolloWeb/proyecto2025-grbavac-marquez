import { useState, useEffect } from "react";

const KEY = "rutas-theme";

export default function useTheme(defaultTheme = "light") {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(KEY);
      return stored || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, theme);
      document.documentElement.setAttribute("data-theme", theme);
    } catch {
      /* localStorage puede no estar disponible en modo privado */
    }
  }, [theme]);

  const toggle = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return { theme, toggle, setTheme };
}
