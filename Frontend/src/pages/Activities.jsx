import { useEffect, useMemo, useState } from "react";
import { fetchActividades } from "@api/travelApi";
import Button from "@components/ui/Button";
import Card from "@components/ui/Card";

// Pagina de actividades: carga datos, filtra por texto/categoria y renderiza cards.
const Activities = () => {
  // Datos leidos desde el JSON mediante la API local.
  const [actividades, setActividades] = useState([]);
  // Mensaje de error si falla la carga asincronica.
  const [loadError, setLoadError] = useState("");
  // Texto escrito por el usuario en el buscador.
  const [searchQuery, setSearchQuery] = useState("");
  // Categoria seleccionada en el select.
  const [category, setCategory] = useState("todas");

  // useEffect se ejecuta al montar la pagina y carga las actividades con async/await.
  useEffect(() => {
    const loadActividades = async () => {
      try {
        const data = await fetchActividades();
        setActividades(data);
      } catch (error) {
        setLoadError(error.message);
      }
    };

    loadActividades();
  }, []);

  // useMemo recalcula la lista filtrada solo cuando cambian los datos o filtros.
  const filteredActivities = useMemo(() => {
    // Normaliza el texto de busqueda para comparar sin espacios extra ni mayusculas.
    const query = searchQuery.trim().toLowerCase();

    return actividades.filter((activity) => {
      // Coincide si el texto esta en nombre, descripcion o ciudad.
      const matchesText =
        !query ||
        `${activity.nombre} ${activity.descripcion} ${activity.ciudad}`
          .toLowerCase()
          .includes(query);
      // Coincide si se eligio "todas" o si la categoria es igual.
      const matchesCategory =
        category === "todas" || activity.categoria === category;

      return matchesText && matchesCategory;
    });
  }, [actividades, category, searchQuery]);

  // Limpia los filtros y vuelve al listado completo.
  const handleReset = () => {
    setSearchQuery("");
    setCategory("todas");
  };

  return (
    <div id="contenido" className="page-activities">
      <section id="filtros" aria-labelledby="tit-filtros">
        <h1 id="tit-filtros">Actividades disponibles</h1>
        <form id="form-filtros" onSubmit={(event) => event.preventDefault()}>
          <div className="campo">
            <label htmlFor="q">Buscar</label>
            <input
              type="search"
              id="q"
              name="q"
              placeholder="buscá actividad o ciudad"
              maxLength="40"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
          <div className="campo">
            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              name="categoria"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="todas">Todas</option>
              <option value="musica">Música</option>
              <option value="nieve">Nieve</option>
              <option value="turismo">Turismo</option>
            </select>
          </div>
          <div className="acciones">
            <Button type="submit" className="btn-primary">
              filtrar
            </Button>
            <Button type="reset" className="btn-outline" onClick={handleReset}>
              limpiar
            </Button>
          </div>
        </form>
      </section>

      <section id="actividades" aria-labelledby="tit-actividades">
        <h2 id="tit-actividades" className="visually-hidden">
          Listado de actividades
        </h2>
        <ul className="cards" role="list">
          {loadError && <li className="msg">{loadError}</li>}
          {filteredActivities.map((activity) => (
            <li key={activity.slug}>
              <Card id={`card-${activity.slug}`}>
                <div className="card-media">
                  <img
                    src={`/imagenes/${activity.imagen}`}
                    alt={activity.alt}
                    loading="lazy"
                  />
                </div>
                <div className="card-overlay">
                  <h3 className="card-titulo">{activity.nombre}</h3>
                  <p className="card-sub">
                    {activity.ciudad} · {activity.descripcion}
                  </p>
                  <ul className="card-meta" role="list">
                    {activity.meta.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    className="btn btn-primary"
                    href={activity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="ir al sitio oficial"
                  >
                    Ir al sitio
                  </a>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Activities;
