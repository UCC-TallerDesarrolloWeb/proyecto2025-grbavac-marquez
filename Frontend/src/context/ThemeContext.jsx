import PropTypes from "prop-types";
import useTheme from "@hooks/useTheme";
import ThemeContext from "@context/themeContextObject";

// Provider envuelve la aplicacion y deja disponible el estado del tema
// para cualquier componente que use useContext(ThemeContext).
export const ThemeProvider = ({ children }) => {
  // useTheme encapsula la logica del tema y localStorage.
  const themeState = useTheme();

  return (
    <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
