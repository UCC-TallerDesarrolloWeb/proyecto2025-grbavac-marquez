import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "@components/ui/Button";
import Card from "@components/ui/Card";

// Informacion repetida en todas las paginas de ciudad.
// Se declara una sola vez y luego se recorre con map para evitar duplicar JSX.
const highlights = [
  {
    icon: "cancelacion-png.webp",
    alt: "Cancelación gratis",
    title: "Cancelación gratis",
    text: "Podés cancelar hasta 24 h antes para recibir reembolso total.",
  },
  {
    icon: "salud.png",
    alt: "Medidas sanitarias",
    title: "Medidas sanitarias",
    text: "Protocolos de higiene y seguridad vigentes.",
  },
  {
    icon: "ticket.png",
    alt: "Ticket móvil",
    title: "Ticket móvil",
    text: "Usá tu celular, no hace falta imprimir.",
  },
  {
    icon: "reloj.jpg",
    alt: "Duración aproximada",
    title: "Duración",
    text: "Verificá horarios disponibles antes de reservar.",
  },
];

// CityTemplate recibe un objeto city por props y arma la pagina visual.
const CityTemplate = ({ city }) => {
  // encodeURIComponent prepara el texto para usarlo dentro de una URL.
  // Evita problemas con espacios, comas o acentos en Google Maps.
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    city.mapQuery
  )}&output=embed`;

  return (
    <div id="contenedor" className="page-city">
      <section className="hero section" aria-labelledby="titulo-ciudad">
        <div className="hero-text">
          <h1 id="titulo-ciudad" className="page-title">
            {city.cityName}
          </h1>
          <p className="subdato">
            {city.cityName}, Argentina ·{" "}
            <span aria-label="calificación">{city.rating}</span>
          </p>
        </div>
      </section>

      <section className="layout section">
        <article className="col col-left">
          <figure className="media">
            <img src={`/imagenes/${city.imagen}`} alt={city.alt} />
            <figcaption>{city.cityName}, Argentina</figcaption>
          </figure>

          <div className="highlights">
            {/* map transforma cada item del arreglo highlights en una Card. */}
            {highlights.map((item) => (
              <Card className="highlight-card" key={item.title}>
                <img
                  src={`/imagenes/${item.icon}`}
                  alt={item.alt}
                  className="icon"
                />
                <div>
                  <h2 className="h-item">
                    {item.title === "Duración" ? city.duration : item.title}
                  </h2>
                  <p>{item.text}</p>
                </div>
              </Card>
            ))}
          </div>

          <section className="descripcion" aria-labelledby="tit-desc">
            <h2 id="tit-desc">Descripción</h2>
            <p>{city.description}</p>
          </section>

          <section className="actividades" aria-labelledby="tit-act">
            <h2 id="tit-act">Actividades</h2>
            <ul className="lista">
              {/* Recorre las actividades propias de la ciudad recibida por props. */}
              {city.activities.map((activity) => (
                <li key={activity.name}>
                  <strong>{activity.name}:</strong> {activity.description}
                </li>
              ))}
            </ul>
          </section>

          <section className="incluye" aria-labelledby="tit-inc">
            <h2 id="tit-inc">Qué incluye / No incluye</h2>
            <div className="grid-two">
              <div>
                <h3>Incluye</h3>
                <ul className="lista">
                  {/* Incluye viene del JSON de la ciudad. */}
                  {city.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>No incluye</h3>
                <ul className="lista">
                  {/* Excludes contiene los items que no estan incluidos en el paquete. */}
                  {city.excludes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="seguridad" aria-labelledby="tit-seg">
            <h2 id="tit-seg">Seguridad</h2>
            <ul className="lista">
              <li>Unidades con limpieza y desinfección frecuente.</li>
              <li>Equipo capacitado en seguridad e higiene.</li>
              <li>Control de aforos en transporte y actividades.</li>
            </ul>
          </section>

          <section className="mapa" aria-labelledby="tit-mapa">
            <h2 id="tit-mapa">Ubicación</h2>
            <div className="map-wrapper">
              <iframe
                src={mapSrc}
                title={`Mapa de ${city.cityName}`}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        </article>

        <aside className="col col-right card" aria-labelledby="tit-booking">
          <h2 id="tit-booking">Reserva</h2>
          <p className="booking-price">
            Desde <strong>${city.price}.00</strong> por persona
          </p>
          <p className="booking-copy">
            Elegí fechas desde el buscador y encontrá planes disponibles para{" "}
            {city.cityName}.
          </p>
          <Link to="/buscador">
            <Button className="btn-primary">Buscar disponibilidad</Button>
          </Link>
          <Link to="/actividades" className="button-link">
            Ver todas las actividades
          </Link>
        </aside>
      </section>
    </div>
  );
};

// PropTypes documenta y valida en desarrollo la forma esperada del objeto city.
CityTemplate.propTypes = {
  city: PropTypes.shape({
    cityName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    mapQuery: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    activities: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
    includes: PropTypes.arrayOf(PropTypes.string).isRequired,
    excludes: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default CityTemplate;
