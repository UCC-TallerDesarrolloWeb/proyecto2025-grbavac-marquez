import { useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ThemeContext from "@context/themeContextObject";

const cityMap = {
  "buenos aires": "/buenos-aires",
  cordoba: "/cordoba",
  córdoba: "/cordoba",
  mendoza: "/mendoza",
  misiones: "/misiones",
  salta: "/salta",
  tucuman: "/tucuman",
  tucumán: "/tucuman",
  ushuaia: "/ushuaia",
  bariloche: "/bariloche",
};

const pageTitles = {
  "/buscador": "DESTINOS DISPONIBLES",
  "/contacto": "CANALES DE CONSULTA",
  "/actividades": "ACTIVIDADES DISPONIBLES",
  "/registrarse": "REGISTRO",
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const [q, setQ] = useState("");
  const title = pageTitles[location.pathname] || "RUTAS ARGENTINAS";
  const links = [
    ["/", "Inicio"],
    ["/buscador", "Buscador"],
    ["/actividades", "Actividades"],
    ["/contacto", "Contacto"],
    ["/registrarse", "Registrarse / Iniciar Sesion"],
  ].filter(([to]) => to !== location.pathname || to === "/");

  const onSearch = (e) => {
    e.preventDefault();
    const key = q.trim().toLowerCase();
    if (!key) return;
    navigate(cityMap[key] || "/buscador");
  };

  return (
    <nav className="site-nav" aria-label="navegación principal">
      <Link to="/" className="brand" aria-label="ir al inicio">
        <img
          src="/imagenes/Logo-Rutas-Argentinas.jpeg.jpg"
          alt="logotipo de rutas argentinas"
        />
      </Link>

      <h1 className="site-title">{title}</h1>

      <form className="nav-search visually-hidden" onSubmit={onSearch}>
        <label htmlFor="nav-search" className="visually-hidden">
          Buscar ciudad
        </label>
        <input
          id="nav-search"
          type="text"
          placeholder="Buscar ciudad"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button type="submit">Ir</button>
      </form>

      <ul data-theme-label={theme}>
        {links.map(([to, label]) => (
          <li key={to}>
            <NavLink to={to}>{label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
