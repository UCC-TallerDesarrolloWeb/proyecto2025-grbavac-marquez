import { useState } from 'react'

export default function Activities() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('todas')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica de filtrado
  }

  return (
    <div id="contenido">
      <section id="filtros" aria-labelledby="tit-filtros">
        <h2 id="tit-filtros" className="visually-hidden">Filtros</h2>
        <form id="form-filtros" onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="q">buscar</label>
            <input
              type="search"
              id="q"
              name="q"
              placeholder="buscá actividad o ciudad"
              size="26"
              maxLength="40"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="campo">
            <label htmlFor="categoria">Categoría</label>
            <select 
              id="categoria" 
              name="categoria"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="todas">Todas</option>
              <option value="musica">Música</option>
              <option value="nieve">Nieve</option>
            </select>
          </div>
          <div className="acciones">
            <button type="submit" id="btn-filtrar">filtrar</button>
            <button 
              type="reset" 
              id="btn-limpiar"
              onClick={() => {
                setSearchQuery('')
                setCategory('todas')
              }}
            >
              limpiar
            </button>
          </div>
        </form>
      </section>

      <section id="actividades" aria-labelledby="tit-actividades">
        <h2 id="tit-actividades" className="visually-hidden">
          Listado de actividades
        </h2>
        <ul className="cards" role="list">
          <li>
            <article className="card" id="card-cosquin">
              <div className="card-media">
                <img
                  src="/images/Cosquin_Rock_Actividades.png"
                  alt="afiche del festival cosquín rock"
                  loading="lazy"
                />
              </div>
              <div className="card-overlay" aria-hidden="true">
                <h3 className="card-titulo">Cosquín Rock</h3>
                <p className="card-sub">Córdoba · Febrero</p>
                <ul className="card-meta" role="list">
                  <li>Música · Festival</li>
                  <li>2 días</li>
                </ul>
                <a
                  className="btn"
                  href="https://cosquinrock.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="ir al sitio oficial"
                >
                  Ir al sitio
                </a>
              </div>
            </article>
          </li>

          <li>
            <article className="card" id="card-lolla">
              <div className="card-media">
                <img
                  src="/images/Lollapalooza_Actividades.jpg"
                  alt="afiche lollapalooza buenos aires"
                  loading="lazy"
                />
              </div>
              <div className="card-overlay" aria-hidden="true">
                <h3 className="card-titulo">Lollapalooza</h3>
                <p className="card-sub">Buenos Aires · Marzo</p>
                <ul className="card-meta" role="list">
                  <li>Música · Festival</li>
                  <li>3 días</li>
                </ul>
                <a
                  className="btn"
                  href="https://www.allaccess.com.ar/event/lollapalooza-2026-venta-general"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="ir al sitio oficial"
                >
                  Ir al sitio
                </a>
              </div>
            </article>
          </li>

          <li>
            <article className="card" id="card-badbunny">
              <div className="card-media">
                <img
                  src="/images/Bad_Bunny_Actividades.jpg_large"
                  alt="concierto de bad bunny en buenos aires"
                  loading="lazy"
                />
              </div>
              <div className="card-overlay" aria-hidden="true">
                <h3 className="card-titulo">Bad Bunny</h3>
                <p className="card-sub">Buenos aires · Estadio</p>
                <ul className="card-meta" role="list">
                  <li>Música · Concierto</li>
                  <li>1 noche</li>
                </ul>
                <a
                  className="btn"
                  href="https://www.allaccess.com.ar/event/bad-bunny"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="ir al sitio oficial"
                >
                  Ir al sitio
                </a>
              </div>
            </article>
          </li>

          <li>
            <article className="card" id="card-ruta-vino">
              <div className="card-media">
                <img
                  src="/images/Ruta_Del_Vino_Actividades.jpg"
                  alt="viñedos en mendoza"
                  loading="lazy"
                />
              </div>
              <div className="card-overlay" aria-hidden="true">
                <h3 className="card-titulo">Ruta del vino</h3>
                <p className="card-sub">Mendoza · Todo el año</p>
                <ul className="card-meta" role="list">
                  <li>Turismo · Gastronomia</li>
                </ul>
                <a
                  className="btn"
                  href="https://www.wanderwine.tur.ar/tour/ruta-del-vino-mendoza/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="ir al sitio oficial"
                >
                  Ir al sitio
                </a>
              </div>
            </article>
          </li>

          <li>
            <article className="card" id="card-nieve">
              <div className="card-media">
                <img
                  src="/images/Clases_Snow_Actividades.jpg"
                  alt="snowboard en centro de ski"
                  loading="lazy"
                />
              </div>
              <div className="card-overlay" aria-hidden="true">
                <h3 className="card-titulo">Snowboard / Ski</h3>
                <p className="card-sub">Temporada de invierno</p>
                <ul className="card-meta" role="list">
                  <li>Nieve · Alquiler</li>
                </ul>
                <a
                  className="btn"
                  href="https://verticalskisnowboard.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="ir al sitio oficial"
                >
                  Ir al sitio
                </a>
              </div>
            </article>
          </li>

          <li>
            <article className="card" id="card-egresados">
              <div className="card-media">
                <img
                  src="/images/Bariloche_Actividades.jpg"
                  alt="viaje de egresados en Bariloche, actividades de nieve"
                  loading="lazy"
                />
              </div>
              <div className="card-overlay" aria-hidden="true">
                <h3 className="card-titulo">Viaje de Egresados</h3>
                <p className="card-sub">Bariloche · Temporada de invierno</p>
                <ul className="card-meta" role="list">
                  <li>Nieve · Boliches y Mas</li>
                </ul>
                <a
                  className="btn"
                  href="https://www.travelrock.com.ar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="ir al sitio oficial"
                >
                  Ir al sitio
                </a>
              </div>
            </article>
          </li>

          <li>
            <article className="card" id="card-Kendrick-Lamar">
              <div className="card-media">
                <img
                  src="/images/Kendrick_Lamar_Actividades.png"
                  alt="Kendrick Lamar — concierto en Buenos Aires"
                  loading="lazy"
                />
              </div>
              <div className="card-overlay" aria-hidden="true">
                <h3 className="card-titulo">Kendrick Lamar</h3>
                <p className="card-sub">Buenos aires · Estadio</p>
                <ul className="card-meta" role="list">
                  <li>Música · Concierto</li>
                  <li>1 noche</li>
                </ul>
                <a
                  className="btn"
                  href="https://www.allaccess.com.ar/event/kendrick-lamar-venta-general"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="ir al sitio oficial"
                >
                  Ir al sitio
                </a>
              </div>
            </article>
          </li>

          <li>
            <article className="card" id="card-Duki">
              <div className="card-media">
                <img
                  src="/images/Duki_Actividades.webp"
                  alt="Duki — concierto en Buenos Aires"
                  loading="lazy"
                />
              </div>
              <div className="card-overlay" aria-hidden="true">
                <h3 className="card-titulo">Duki</h3>
                <p className="card-sub">Buenos aires · Estadio</p>
                <ul className="card-meta" role="list">
                  <li>Música · Concierto</li>
                  <li>1 noche</li>
                </ul>
                <a
                  className="btn"
                  href="https://www.movistararena.com.ar/show/e69127ec-55d8-4a59-b6c5-a7fdaa536615"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="ir al sitio oficial"
                >
                  Ir al sitio
                </a>
              </div>
            </article>
          </li>
        </ul>
      </section>
    </div>
  )
}