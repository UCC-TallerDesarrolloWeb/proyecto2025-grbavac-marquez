import PropTypes from "prop-types";
import useTheme from "@hooks/useTheme";
import ThemeContext from "@context/themeContextObject";

export const ThemeProvider = ({ children }) => {
  const themeState = useTheme();

  return (
    <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
