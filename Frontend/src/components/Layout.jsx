import { Outlet } from "react-router-dom";
import Navbar from "@components/Navbar";

// Layout es un componente contenedor: define partes comunes a varias paginas.
// Navbar aparece siempre y Outlet cambia segun la ruta hija activa.
const Layout = () => {
  return (
    <div className="app">
      <header className="app-header">
        <Navbar />
      </header>
      <main>
        {/* Outlet renderiza la pagina hija definida en App.jsx. */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
