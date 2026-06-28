import { Link } from "react-router-dom";
import Button from "@components/ui/Button";

// Pagina simple para rutas inexistentes.
const NotFound = () => (
  <section className="page-simple not-found">
    <h1>404</h1>
    <p>Página no encontrada.</p>
    <Link to="/">
      <Button className="btn-primary">Volver al inicio</Button>
    </Link>
  </section>
);

export default NotFound;
