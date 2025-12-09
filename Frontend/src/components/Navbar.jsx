import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    // navigate to a normalized route if possible, or to search page
    const key = q.trim().toLowerCase();
    if (!key) return;
    // simple mapping for known cities (lowercase, no accents)
    const map = {
      "buenos aires": "/buenos-aires",
      cordoba: "/cordoba",
      mendoza: "/mendoza",
      misiones: "/misiones",
      salta: "/salta",
      tucuman: "/tucuman",
      ushuaia: "/ushuaia",
      bariloche: "/bariloche",
    };
    const dest = map[key] || `/actividades`;
    navigate(dest);
  };

  return (
    <nav>
      <form
        onSubmit={onSearch}
        style={{ display: "inline-block", marginRight: 12 }}
      >
        <input
          type="text"
          aria-label="Buscar ciudad"
          placeholder="Buscar ciudad"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button type="submit">Ir</button>
      </form>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/buenos-aires">Buenos Aires</Link>
        </li>
        <li>
          <Link to="/cordoba">Córdoba</Link>
        </li>
        <li>
          <Link to="/mendoza">Mendoza</Link>
        </li>
        <li>
          <Link to="/misiones">Misiones</Link>
        </li>
        <li>
          <Link to="/salta">Salta</Link>
        </li>
        <li>
          <Link to="/tucuman">Tucumán</Link>
        </li>
        <li>
          <Link to="/ushuaia">Ushuaia</Link>
        </li>
        <li>
          <Link to="/bariloche">Bariloche</Link>
        </li>
        <li>
          <Link to="/actividades">Actividades</Link>
        </li>
        <li>
          <Link to="/contacto">Contacto</Link>
        </li>
        <li>
          <Link to="/registrarse">Registrarse</Link>
        </li>
      </ul>
    </nav>
  );
}
