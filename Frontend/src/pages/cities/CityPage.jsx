import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { fetchCiudades } from "@api/travelApi";
import CityTemplate from "@components/cities/CityTemplate";
import NotFound from "@pages/NotFound";

const CityPage = ({ slug }) => {
  const [ciudades, setCiudades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const city = ciudades.find((item) => item.slug === slug);

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

  if (isLoading) {
    return <p className="msg">Cargando destino...</p>;
  }

  if (loadError) {
    return <p className="msg">{loadError}</p>;
  }

  if (!city) {
    return <NotFound />;
  }

  return <CityTemplate city={city} />;
};

CityPage.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CityPage;
