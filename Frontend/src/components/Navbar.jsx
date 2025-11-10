import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/buenos-aires">Buenos Aires</Link></li>
        <li><Link to="/cordoba">Córdoba</Link></li>
        <li><Link to="/mendoza">Mendoza</Link></li>
        <li><Link to="/misiones">Misiones</Link></li>
        <li><Link to="/salta">Salta</Link></li>
        <li><Link to="/tucuman">Tucumán</Link></li>
        <li><Link to="/ushuaia">Ushuaia</Link></li>
        <li><Link to="/bariloche">Bariloche</Link></li>
        <li><Link to="/actividades">Actividades</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/registrarse">Registrarse</Link></li>
      </ul>
    </nav>
  )
}