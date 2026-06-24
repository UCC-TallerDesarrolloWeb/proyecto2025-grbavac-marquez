import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@components/ui/Card";
import ciudades from "@data/ciudades.json";

const zones = [
  ["centro", "Pampeana"],
  ["noroeste", "Noroeste"],
  ["patagonia", "Patagonia"],
  ["litoral", "Litoral"],
];

const themes = [
  ["actividades", "Actividades"],
  ["adrenalina", "Adrenalina"],
  ["naturaleza", "Naturaleza"],
  ["arte", "Arte callejero y Grafitis"],
];

const normalize = (value) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const Buscador = () => {
  const [query, setQuery] = useState("");
  const [selectedZones, setSelectedZones] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [sort, setSort] = useState("price-asc");

  const filteredCities = useMemo(() => {
    const normalizedQuery = normalize(query);

    return ciudades
      .filter((city) => {
        const matchesQuery =
          !normalizedQuery || normalize(city.cityName).includes(normalizedQuery);
        const matchesZone =
          selectedZones.length === 0 || selectedZones.includes(city.zona);
        const cityText = normalize(
          `${city.cityName} ${city.meta.join(" ")} ${city.activities
            .map((activity) => `${activity.name} ${activity.description}`)
            .join(" ")}`
        );
        const matchesTheme =
          selectedThemes.length === 0 ||
          selectedThemes.some((theme) => {
            if (theme === "actividades") return true;
            if (theme === "naturaleza") {
              return /parque|selva|cataratas|glaciar|cerro|valle|lago|montan|montañ|salinas/.test(
                cityText
              );
            }
            if (theme === "adrenalina") {
              return /ski|snowboard|trekking|lancha|aventura|cerro/.test(cityText);
            }
            if (theme === "arte") {
              return /arte|museo|teatro|cultural|tango|colon|colón/.test(cityText);
            }
            return false;
          });

        return matchesQuery && matchesZone && matchesTheme;
      })
      .sort((a, b) =>
        sort === "price-asc" ? a.price - b.price : b.price - a.price
      );
  }, [query, selectedThemes, selectedZones, sort]);

  const handleZone = (event) => {
    const { checked, value } = event.target;
    setSelectedZones((prev) =>
      checked ? [...prev, value] : prev.filter((zone) => zone !== value)
    );
  };

  const handleTheme = (event) => {
    const { checked, value } = event.target;
    setSelectedThemes((prev) =>
      checked ? [...prev, value] : prev.filter((theme) => theme !== value)
    );
  };

  return (
    <div id="contenedor" className="page-buscador">
      <main id="contenido">
        <div className="layout">
          <aside id="filtros" aria-label="filtros" className="col-izq">
            <form id="form-filtros" onSubmit={(event) => event.preventDefault()}>
              <section
                className="bloque"
                id="bloque-temas"
                aria-labelledby="tit-temas"
              >
                <h2 className="bloque-titulo" id="tit-temas">
                  Temas
                </h2>
                <fieldset className="grupo">
                  <legend className="visually-hidden">Temáticas</legend>
                  <ul className="lista-check" role="list">
                    {themes.map(([value, label]) => (
                      <li key={value}>
                        <input
                          type="checkbox"
                          id={`c-${value}`}
                          name="temas"
                          value={value}
                          checked={selectedThemes.includes(value)}
                          onChange={handleTheme}
                        />
                        <label htmlFor={`c-${value}`}>{label}</label>
                      </li>
                    ))}
                  </ul>
                </fieldset>
              </section>

              <section
                className="bloque"
                id="bloque-destino"
                aria-labelledby="tit-destino"
              >
                <h2 className="bloque-titulo" id="tit-destino">
                  Destino
                </h2>
                <fieldset className="grupo">
                  <legend className="visually-hidden">zonas</legend>
                  <div className="campo">
                    <label htmlFor="buscar-zona">Buscar Ciudad</label>
                    <input
                      type="text"
                      id="buscar-zona"
                      name="buscar_zona"
                      placeholder="córdoba, buenos aires..."
                      maxLength="40"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>
                  <ul className="lista-check" role="list">
                    {zones.map(([value, label]) => (
                      <li key={value}>
                        <input
                          type="checkbox"
                          id={`d-${value}`}
                          name="zona"
                          value={value}
                          checked={selectedZones.includes(value)}
                          onChange={handleZone}
                        />
                        <label htmlFor={`d-${value}`}>{label}</label>
                      </li>
                    ))}
                  </ul>
                </fieldset>
              </section>
            </form>
          </aside>

          <section
            id="resultados"
            className="col-der"
            aria-labelledby="tit-resultados"
          >
            <header className="resultados-encabezado">
              <p id="cantidad">
                {filteredCities.length === ciudades.length
                  ? "Ciudades Encontradas"
                  : `${filteredCities.length} ciudades encontradas`}
              </p>
              <div className="orden">
                <label htmlFor="ordenar">Elegir por:</label>
                <select
                  id="ordenar"
                  name="ordenar"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="price-asc">Precio: Mas Barato a Mas Caro</option>
                  <option value="price-desc">Precio: Mas Caro a Mas Barato</option>
                </select>
              </div>
            </header>

            <ul className="listado" role="list">
              {filteredCities.map((city) => (
                <li key={city.slug}>
                  <Link to={`/${city.slug}`} className="card-link">
                    <Card id={`card-${city.slug}`} className="search-card">
                      <div className="card-media">
                        <img
                          src={`/imagenes/${city.searchImage}`}
                          alt={city.alt}
                        />
                      </div>
                      <div className="card-body">
                        <p className="badge">Actividades</p>
                        <h3 className="card-titulo">
                          {city.cityName.toUpperCase()}
                        </h3>
                        <ul className="card-meta" role="list">
                          {city.meta.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <aside className="card-precio" aria-label="precio">
                        <p className="monto" data-price={city.price}>
                          ${city.price}.00
                        </p>
                        <small>Por Persona</small>
                      </aside>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Buscador;
