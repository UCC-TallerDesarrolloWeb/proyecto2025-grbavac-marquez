import { useState } from 'react';
import { Link } from "react-router-dom";

export default function Home() {
  const [formData, setFormData] = useState({
    ciudad_origen: '',
    ciudad_destino: '',
    fecha_ida: '',
    fecha_vuelta: '',
    pasajeros: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div id="contenedor">
      {/* Header */}
      <header id="cabecera">
        <div className="cabecera-inner">
          <Link to="/">
            <img
              id="logo"
              src="/Imagenes/Logo-Rutas-Argentinas.jpeg.jpg"
              alt="Rutas Argentinas"
            />
          </Link>
          <h1 id="titulo">Rutas Argentinas</h1>
          <nav aria-label="principal">
            <ul id="menu">
              <li><Link to="/buscador">Buscar</Link></li>
              <li><Link to="/actividades">Actividades</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
              <li><Link to="/registrarse">Registrarse / Iniciar Sesión</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="contenido">
        {/* Hero */}
        <section id="hero">
          <div className="hero-inner">
            <img
              id="hero-img"
              src="/Imagenes/Perito_Moreno_Glacier.jpg"
              alt="paisaje del glaciar perito moreno en santa cruz, argentina"
            />

            {/* Buscador */}
            <div id="buscador">
              <form id="form-busqueda" onSubmit={handleSubmit}>
                <div className="fila">
                  <div className="campo">
                    <label htmlFor="ciudad_origen">ORIGEN</label>
                    <input
                      id="ciudad_origen"
                      type="text"
                      name="ciudad_origen"
                      placeholder="Ciudad de origen"
                      value={formData.ciudad_origen}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="campo">
                    <label htmlFor="ciudad_destino">DESTINO</label>
                    <input
                      id="ciudad_destino"
                      type="text"
                      name="ciudad_destino"
                      placeholder="Ciudad de destino"
                      value={formData.ciudad_destino}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="fila">
                  <div className="campo">
                    <label>RANGO FECHAS</label>
                    <div className="fechas">
                      <input
                        type="date"
                        name="fecha_ida"
                        value={formData.fecha_ida}
                        onChange={handleChange}
                      />
                      <input
                        type="date"
                        name="fecha_vuelta"
                        value={formData.fecha_vuelta}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="campo">
                    <label htmlFor="pasajeros">PASAJEROS</label>
                    <input
                      id="pasajeros"
                      type="number"
                      name="pasajeros"
                      placeholder="0"
                      value={formData.pasajeros}
                      onChange={handleChange}
                      min="1"
                      max="10"
                    />
                  </div>
                  <button id="btn-buscar" type="submit">BUSCAR</button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Planes */}
        <section id="planes">
          <div className="planes-inner">
            <h2>PLANES</h2>
            <p className="sub">Busca vuelos y alquiler de lugares a nuestros destinos más populares</p>
          </div>

          <div className="lista-planes">
            <article className="card" id="card-tucuman">
              <Link className="card-link" to="/ciudades/tucuman" title="Ver planes en Tucumán">
                <img src="/Imagenes/Tucuman_Foto_home.webp" alt="tucumán argentina" />
                <div className="card-texto">
                  <h3>tucumán, argentina</h3>
                  <p>pasajes · hoteles · resorts</p>
                </div>
              </Link>
            </article>

            <article className="card" id="card-buenos-aires">
              <Link className="card-link" to="/ciudades/buenos-aires" title="Ver planes en Buenos Aires">
                <img src="/Imagenes/Buenos_Aires_Foto_home.jpeg.jpg" alt="buenos aires argentina" />
                <div className="card-texto">
                  <h3>buenos aires, argentina</h3>
                  <p>pasajes · hoteles · resorts</p>
                </div>
              </Link>
            </article>

            <article className="card" id="card-salta">
              <Link className="card-link" to="/ciudades/salta" title="Ver planes en Salta">
                <img src="/Imagenes/Salta_Foto_home.jpeg.jpg" alt="salta argentina" />
                <div className="card-texto">
                  <h3>salta, argentina</h3>
                  <p>pasajes · hoteles · resorts</p>
                </div>
              </Link>
            </article>

            <article className="card" id="card-cordoba">
              <Link className="card-link" to="/ciudades/cordoba" title="Ver planes en Córdoba">
                <img src="/Imagenes/Cordoba_Foto_home.jpg" alt="córdoba argentina" />
                <div className="card-texto">
                  <h3>córdoba, argentina</h3>
                  <p>pasajes · hoteles · resorts</p>
                </div>
              </Link>
            </article>

            <article className="card" id="card-misiones">
              <Link className="card-link" to="/ciudades/misiones" title="Ver planes en Misiones">
                <img src="/Imagenes/Misiones_Foto_home.jpg" alt="misiones argentina" />
                <div className="card-texto">
                  <h3>misiones, argentina</h3>
                  <p>pasajes · hoteles · resorts</p>
                </div>
              </Link>
            </article>

            <article className="card" id="card-ushuaia">
              <Link className="card-link" to="/ciudades/ushuaia" title="Ver planes en Ushuaia">
                <img src="/Imagenes/Ushuaia_Foto_home.jpeg.jpg" alt="ushuaia argentina" />
                <div className="card-texto">
                  <h3>ushuaia, argentina</h3>
                  <p>pasajes · hoteles · resorts</p>
                </div>
              </Link>
            </article>
          </div>
        </section>

        {/* Testimonios */}
        <section id="testimonios">
          <div className="testimonios-inner">
            <h2>Comentarios</h2>
            <p className="sub">Mirá qué opina la gente de nosotros</p>
          </div>

          <div className="grid-testimonios">
            <article className="t-card">
              <div className="t-offset" aria-hidden="true"></div>
              <blockquote className="t-quote">"Excelente experiencia 10/10"</blockquote>
              <div className="t-stars" aria-label="5 de 5 estrellas" title="5 de 5">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="t-author">– Lorenzo Rossi Bossio</p>
              <img className="t-photo" src="/Imagenes/Comentarios-1.jpeg" alt="Paisaje de lagos y montañas en la Patagonia" />
            </article>

            <article className="t-card">
              <div className="t-offset" aria-hidden="true"></div>
              <blockquote className="t-quote">"Atención excelente"</blockquote>
              <div className="t-stars" aria-label="5 de 5 estrellas" title="5 de 5">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="t-author">– Andrés Romanutti</p>
              <img className="t-photo" src="/Imagenes/Comentario3.jpg" alt="Auroras en el cielo nocturno" />
            </article>

            <article className="t-card">
              <div className="t-offset" aria-hidden="true"></div>
              <blockquote className="t-quote">"Gran relación calidad-precio"</blockquote>
              <div className="t-stars" aria-label="5 de 5 estrellas" title="5 de 5">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="t-author">– Federico Esteban Almada "El Chino"</p>
              <img className="t-photo" src="/Imagenes/Comentario2.jpg" alt="Interior de glaciar con turista" />
            </article>

            <article className="t-card">
              <div className="t-offset" aria-hidden="true"></div>
              <blockquote className="t-quote">"Estuvo bien, pero podría mejorar el servicio."</blockquote>
              <div className="t-stars" aria-label="3 de 5 estrellas" title="3 de 5">
                <span>★</span><span>★</span><span>★</span>
              </div>
              <p className="t-author">– Octavio Del Fabro</p>
              <img className="t-photo" src="/Imagenes/Comentario4.jpeg" alt="Interior de glaciar con turista" />
            </article>

            <article className="t-card">
              <div className="t-offset" aria-hidden="true"></div>
              <blockquote className="t-quote">"Correcto, aunque esperaba más opciones"</blockquote>
              <div className="t-stars" aria-label="3 de 5 estrellas" title="3 de 5">
                <span>★</span><span>★</span><span>★</span>
              </div>
              <p className="t-author">– Juan Gil</p>
              <img className="t-photo" src="/Imagenes/Comentario5.jpeg" alt="Interior de glaciar con turista" />
            </article>

            <article className="t-card">
              <div className="t-offset" aria-hidden="true"></div>
              <blockquote className="t-quote">"Muy recomendable, todo salió perfecto"</blockquote>
              <div className="t-stars" aria-label="5 de 5 estrellas" title="5 de 5">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="t-author">– Valentina López</p>
              <img className="t-photo" src="/Imagenes/Comentario6.jpg" alt="Interior de glaciar con turista" />
            </article>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="pie" className="pie-hero">
        <div className="pie-inner">
          <div className="pie-brand">
            <img src="/Imagenes/Logo-Rutas-Argentinas.jpeg.jpg" alt="Rutas Argentinas" className="pie-logo" />
            <h3 className="pie-title">
              Rutas Argentinas
              <span className="pie-slogan">TURISMO POR EL PAÍS</span>
            </h3>
          </div>

          <nav className="pie-social" aria-label="redes sociales">
            <ul>
              <li>
                <a href="https://www.facebook.com/rutasargentinas" aria-label="facebook" target="_blank" rel="noopener noreferrer">
                  facebook
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/rutasargentinas" aria-label="linkedin" target="_blank" rel="noopener noreferrer">
                  linkedin
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@rutasargentinas" aria-label="youtube" target="_blank" rel="noopener noreferrer">
                  youtube
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/rutasargentinas" aria-label="instagram" target="_blank" rel="noopener noreferrer">
                  instagram
                </a>
              </li>
            </ul>
          </nav>
          <p>&copy; 2025 Rutas Argentinas. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
