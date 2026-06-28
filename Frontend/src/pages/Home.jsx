import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCiudades } from "@api/travelApi";
import Button from "@components/ui/Button";
import Card from "@components/ui/Card";
import Input from "@components/ui/Input";

// Estado inicial del formulario. Mantenerlo separado permite reutilizarlo o resetearlo.
const initialForm = {
  ciudad_origen: "",
  ciudad_destino: "",
  fecha_ida: "",
  fecha_vuelta: "",
  pasajeros: "",
};

// REGEX + normalizacion: quita espacios, pasa a minusculas y elimina acentos.
// Esto permite comparar "Cordoba" con "Cordoba" aunque el usuario escriba distinto.
const normalize = (value) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

// Valida un campo individual del formulario segun su name.
// Recibe tambien el formulario completo para comparar fechas entre si.
const validateField = (name, value, data, ciudades) => {
  // Arreglo con las ciudades permitidas, tambien normalizadas.
  const allowedCities = ciudades.map((city) => normalize(city.cityName));
  // REGEX: permite solo letras, espacios y guiones en ciudades.
  const lettersOnly = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]+$/;

  if (name === "ciudad_origen" || name === "ciudad_destino") {
    if (!value.trim()) return "Ingresá una ciudad.";
    if (!lettersOnly.test(value)) return "Usá solo letras y espacios.";
    if (!allowedCities.includes(normalize(value))) {
      return "Elegí una ciudad disponible de Rutas Argentinas.";
    }
  }

  if (name === "fecha_ida") {
    if (!value) return "Elegí una fecha de ida.";
    if (data.fecha_vuelta && value > data.fecha_vuelta) {
      return "La ida no puede ser posterior a la vuelta.";
    }
  }

  if (name === "fecha_vuelta") {
    if (!value) return "Elegí una fecha de vuelta.";
    if (data.fecha_ida && value < data.fecha_ida) {
      return "La vuelta no puede ser anterior a la ida.";
    }
  }

  if (name === "pasajeros") {
    const amount = Number(value);
    if (!value) return "Indicá cantidad de pasajeros.";
    if (!Number.isInteger(amount) || amount < 1 || amount > 10) {
      return "Los pasajeros deben ser entre 1 y 10.";
    }
  }

  return "";
};

// Valida todos los campos recorriendo las claves del objeto data.
// reduce arma un nuevo objeto de errores con la misma forma del formulario.
const validateForm = (data, ciudades) =>
  Object.keys(data).reduce(
    (acc, key) => ({
      ...acc,
      [key]: validateField(key, data[key], data, ciudades),
    }),
    {}
  );

const Home = () => {
  // useNavigate permite redirigir al usuario cuando el formulario es valido.
  const navigate = useNavigate();
  // Ciudades cargadas desde el JSON local mediante fetch.
  const [ciudades, setCiudades] = useState([]);
  // Mensaje para mostrar si falla la carga de ciudades.
  const [loadError, setLoadError] = useState("");
  // formData guarda todos los valores del formulario como input controlado.
  const [formData, setFormData] = useState(initialForm);
  // errors guarda mensajes de validacion por campo.
  const [errors, setErrors] = useState({});
  // Muestra solo las primeras 6 ciudades en la seccion planes.
  const featuredCities = useMemo(() => ciudades.slice(0, 6), [ciudades]);

  // Al montar Home, se buscan las ciudades con async/await.
  useEffect(() => {
    const loadCiudades = async () => {
      try {
        const data = await fetchCiudades();
        setCiudades(data);
      } catch (error) {
        setLoadError(error.message);
      }
    };

    loadCiudades();
  }, []);

  // Maneja cambios en cualquier input gracias al atributo name.
  const handleChange = (event) => {
    // DESESTRUCTURACION DE OBJETOS: obtiene name y value desde event.target.
    const { name, value } = event.target;
    // Spread operator: copia el formulario anterior y reemplaza solo el campo editado.
    const nextData = { ...formData, [name]: value };

    setFormData(nextData);
    // Valida en tiempo real el campo modificado.
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value, nextData, ciudades),
      ...(name.includes("fecha")
        ? {
            fecha_ida: validateField(
              "fecha_ida",
              nextData.fecha_ida,
              nextData,
              ciudades
            ),
            fecha_vuelta: validateField(
              "fecha_vuelta",
              nextData.fecha_vuelta,
              nextData,
              ciudades
            ),
          }
        : {}),
    }));
  };

  // Valida todo el formulario y navega al destino si no hay errores.
  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateForm(formData, ciudades);
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) return;

    // Busca la ciudad de destino en el JSON usando el nombre normalizado.
    const destination = ciudades.find(
      (city) => normalize(city.cityName) === normalize(formData.ciudad_destino)
    );
    // TERNARIO: si existe destino, va a su pagina; si no, al buscador.
    navigate(destination ? `/${destination.slug}` : "/buscador");
  };

  return (
    <div id="contenedor" className="page-home">
      <section id="hero">
        <div className="hero-inner">
          <img
            id="hero-img"
            src="/imagenes/Perito_Moreno_Glacier.jpg"
            alt="paisaje del glaciar perito moreno en santa cruz, argentina"
          />

          <div id="buscador">
            <form id="form-busqueda" onSubmit={handleSubmit} noValidate>
              <div className="fila">
                <Input
                  id="ciudad_origen"
                  name="ciudad_origen"
                  label="ORIGEN"
                  placeholder="Ciudad de origen"
                  value={formData.ciudad_origen}
                  onChange={handleChange}
                  error={errors.ciudad_origen}
                />
                <Input
                  id="ciudad_destino"
                  name="ciudad_destino"
                  label="DESTINO"
                  placeholder="Ciudad de destino"
                  value={formData.ciudad_destino}
                  onChange={handleChange}
                  error={errors.ciudad_destino}
                />
              </div>

              <div className="fila">
                <div className="campo">
                  <span className="field-label">RANGO FECHAS</span>
                  <div className="fechas">
                    <Input
                      id="fecha_ida"
                      name="fecha_ida"
                      label="Fecha de ida"
                      type="date"
                      value={formData.fecha_ida}
                      onChange={handleChange}
                      error={errors.fecha_ida}
                    />
                    <Input
                      id="fecha_vuelta"
                      name="fecha_vuelta"
                      label="Fecha de vuelta"
                      type="date"
                      value={formData.fecha_vuelta}
                      onChange={handleChange}
                      error={errors.fecha_vuelta}
                    />
                  </div>
                </div>
                <Input
                  id="pasajeros"
                  name="pasajeros"
                  label="PASAJEROS"
                  type="number"
                  placeholder="1"
                  min="1"
                  max="10"
                  value={formData.pasajeros}
                  onChange={handleChange}
                  error={errors.pasajeros}
                />
                <Button id="btn-buscar" type="submit" className="btn-primary">
                  BUSCAR
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section id="planes">
        <div className="planes-inner">
          <h2>PLANES</h2>
          <p className="sub">
            Busca vuelos y alquiler de lugares a nuestros destinos más populares
          </p>
        </div>

        <div className="lista-planes">
          {loadError && <p className="msg">{loadError}</p>}
          {featuredCities.map((city) => (
            <Card className="destination-card" key={city.slug}>
              <Link
                className="card-link"
                to={`/${city.slug}`}
                title={`Ver planes en ${city.cityName}`}
              >
                <img
                  src={`/imagenes/${city.homeImage}`}
                  alt={`${city.cityName.toLowerCase()} argentina`}
                />
                <div className="card-texto">
                  <h3>{city.cityName.toLowerCase()}, argentina</h3>
                  <p>pasajes · hoteles · resorts</p>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section id="testimonios">
        <div className="testimonios-inner">
          <h2>Comentarios</h2>
          <p className="sub">Mirá qué opina la gente de nosotros</p>
        </div>

        <div className="grid-testimonios">
          {[
            ["Excelente experiencia 10/10", "Lorenzo Rossi Bossio", "Comentarios-1.jpeg"],
            ["Atención excelente", "Andrés Romanutti", "Comentario3.jpg"],
            ["Gran relación calidad-precio", "Federico Esteban Almada", "Comentario2.jpg"],
            // DESESTRUCTURACION DE ARRAYS: cada testimonio es [quote, author, image].
          ].map(([quote, author, image]) => (
            <Card className="t-card" key={author}>
              <blockquote className="t-quote">"{quote}"</blockquote>
              <div className="t-stars" aria-label="5 de 5 estrellas">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p className="t-author">- {author}</p>
              <img
                className="t-photo"
                src={`/imagenes/${image}`}
                alt="paisaje turístico de argentina compartido por viajeros"
              />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
