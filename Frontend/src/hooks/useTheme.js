import { useState, useEffect } from "react";

const KEY = "rutas-theme";

export default function useTheme(defaultTheme = "light") {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(KEY);
      return stored || defaultTheme;
    } catch (e) {
      return defaultTheme;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, theme);
      document.documentElement.setAttribute("data-theme", theme);
    } catch (e) {}
  }, [theme]);

  const toggle = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return { theme, toggle, setTheme };
}
