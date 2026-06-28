import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

// Diccionario que relaciona lo escrito en el buscador con la ruta real.
// Esto evita usar muchos if/else para cada ciudad.
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

// Titulos especiales segun la pagina actual.
// Si la ruta no esta aca, se usa "RUTAS ARGENTINAS".
const pageTitles = {
  "/buscador": "DESTINOS DISPONIBLES",
  "/contacto": "CANALES DE CONSULTA",
  "/actividades": "ACTIVIDADES DISPONIBLES",
  "/registrarse": "REGISTRO",
};

// Navbar muestra logo, titulo dinamico, buscador oculto y enlaces principales.
const Navbar = () => {
  // useNavigate permite cambiar de pagina desde codigo JavaScript.
  const navigate = useNavigate();
  // useLocation informa en que ruta estamos actualmente.
  const location = useLocation();
  // q guarda lo que escribe el usuario en el buscador de ciudad.
  const [q, setQ] = useState("");
  const title = pageTitles[location.pathname] || "RUTAS ARGENTINAS";
  // links es un arreglo de pares [ruta, texto].
  // Luego se usa desestructuracion de arrays en el map: ([to, label]).
  const links = [
    ["/", "Inicio"],
    ["/buscador", "Buscador"],
    ["/actividades", "Actividades"],
    ["/contacto", "Contacto"],
    ["/registrarse", "Registrarse / Iniciar Sesion"],
  // DESESTRUCTURACION DE ARRAYS: filter recibe [to] para mirar solo la ruta.
  ].filter(([to]) => to !== location.pathname || to === "/");

  // Maneja el submit del buscador: normaliza el texto y navega a la ciudad
  // si existe en cityMap; si no, manda al buscador general.
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

      <ul>
        {/* NavLink agrega la clase active automaticamente cuando coincide la ruta. */}
        {/* DESESTRUCTURACION DE ARRAYS: cada link es [to, label]. */}
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
