import { useMemo, useState } from "react";
import Button from "@components/ui/Button";
import Card from "@components/ui/Card";
import actividades from "@data/actividades.json";

const Activities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("todas");

  const filteredActivities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return actividades.filter((activity) => {
      const matchesText =
        !query ||
        `${activity.nombre} ${activity.descripcion} ${activity.ciudad}`
          .toLowerCase()
          .includes(query);
      const matchesCategory =
        category === "todas" || activity.categoria === category;

      return matchesText && matchesCategory;
    });
  }, [category, searchQuery]);

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
