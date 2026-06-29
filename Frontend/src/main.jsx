import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@styles/main.scss";
import App from "@/App.jsx";

// Punto de entrada de React: busca el div con id "root" en index.html
// y renderiza adentro toda la aplicacion.
createRoot(document.getElementById("root")).render(
  // StrictMode es una herramienta de React para detectar posibles problemas
  // durante el desarrollo. No agrega HTML visible para el usuario.
  <StrictMode>
    <App />
  </StrictMode>
);
