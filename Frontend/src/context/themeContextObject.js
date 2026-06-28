import { createContext } from "react";

// Context crea un "canal" global para compartir datos sin pasar props
// manualmente por todos los componentes. Arranca en null hasta que Provider le da valor.
const ThemeContext = createContext(null);

export default ThemeContext;
