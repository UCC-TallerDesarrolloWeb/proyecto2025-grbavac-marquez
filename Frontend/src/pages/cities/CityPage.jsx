import PropTypes from "prop-types";
import CityTemplate from "@components/cities/CityTemplate";
import ciudades from "@data/ciudades.json";
import NotFound from "@pages/NotFound";

const CityPage = ({ slug }) => {
  const city = ciudades.find((item) => item.slug === slug);

  if (!city) {
    return <NotFound />;
  }

  return <CityTemplate city={city} />;
};

CityPage.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CityPage;
