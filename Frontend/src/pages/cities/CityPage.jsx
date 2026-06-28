import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { fetchCiudades } from "@api/travelApi";
import CityTemplate from "@components/cities/CityTemplate";
import NotFound from "@pages/NotFound";

// CityPage recibe un slug por props y busca los datos de esa ciudad.
const CityPage = ({ slug }) => {
  // Ciudades cargadas desde el JSON local.
  const [ciudades, setCiudades] = useState([]);
  // Bandera para mostrar estado de carga mientras llega el fetch.
  const [isLoading, setIsLoading] = useState(true);
  // Mensaje de error si falla la carga.
  const [loadError, setLoadError] = useState("");
  // find busca en el arreglo la ciudad cuyo slug coincide con la ruta.
  const city = ciudades.find((item) => item.slug === slug);

  // Carga asincronica de ciudades al montar el componente.
  useEffect(() => {
    const loadCiudades = async () => {
      try {
        const data = await fetchCiudades();
        setCiudades(data);
      } catch (error) {
        setLoadError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadCiudades();
  }, []);

  // Render condicional: mientras carga, muestra un mensaje.
  if (isLoading) {
    return <p className="msg">Cargando destino...</p>;
  }

  // Render condicional: si hubo error, se muestra al usuario.
  if (loadError) {
    return <p className="msg">{loadError}</p>;
  }

  // Si no existe ciudad para ese slug, se muestra pagina 404.
  if (!city) {
    return <NotFound />;
  }

  // Si encontro la ciudad, delega el HTML visual en CityTemplate.
  return <CityTemplate city={city} />;
};

CityPage.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CityPage;
