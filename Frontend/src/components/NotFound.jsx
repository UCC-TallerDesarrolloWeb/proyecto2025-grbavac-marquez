import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section>
      <h2>404</h2>
      <p>Página no encontrada.</p>
      <Link to="/" className="button">Volver al Home</Link>
    </section>
  )
}