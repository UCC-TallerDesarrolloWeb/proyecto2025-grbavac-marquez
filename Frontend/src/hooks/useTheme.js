import { useState, useEffect } from "react";

const KEY = "rutas-theme";

// Hook personalizado: concentra la logica del modo claro/oscuro.
// Los hooks personalizados permiten reutilizar estado y efectos entre componentes.
export default function useTheme(defaultTheme = "light") {
  // useState guarda el tema actual. La funcion inicial se ejecuta una sola vez.
  const [theme, setTheme] = useState(() => {
    try {
      // Si el usuario ya eligio un tema, se recupera desde localStorage.
      const stored = localStorage.getItem(KEY);
      return stored || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  // useEffect se ejecuta cada vez que cambia "theme".
  // Sincroniza el estado de React con localStorage y con el atributo del HTML.
  useEffect(() => {
    try {
      localStorage.setItem(KEY, theme);
      document.documentElement.setAttribute("data-theme", theme);
    } catch {
      /* localStorage puede no estar disponible en modo privado */
    }
  }, [theme]);

  // TERNARIO: cambia de light a dark o de dark a light.
  const toggle = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Se devuelve un objeto para que otros componentes puedan leer y cambiar el tema.
  return { theme, toggle, setTheme };
}
