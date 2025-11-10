import { useState } from 'react'
import PropTypes from 'prop-types'

export default function BuenosAires() {
  const [formData, setFormData] = useState({
    fechaDesde: '',
    fechaHasta: '',
    cantidad: '',
    categoria: 'eco'
  })

  const [subtotal, setSubtotal] = useState(0)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleCalculate = () => {
    // Base price per person
    const basePrices = {
      eco: 50000,
      std: 75000,
      prm: 100000
    }

    const basePrice = basePrices[formData.categoria]
    const people = parseInt(formData.cantidad) || 0
    const total = basePrice * people

    setSubtotal(total)
    setMessage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.fechaDesde || !formData.fechaHasta || !formData.cantidad) {
      setMessage('Por favor, completa todos los campos')
      return
    }
    setMessage('¡Reserva confirmada!')
  }

  return (
    <div id="contenedor">
      <main id="main">
        <section className="hero section" aria-labelledby="titulo-ciudad">
          <div className="hero-text">
            <h2 id="titulo-ciudad" className="page-title">"Buenos Aires"</h2>
            <p className="subdato">
              Buenos Aires, Argentina ·
              <span aria-label="calificación">3.9/5 con +800 opiniones</span>
            </p>
          </div>
        </section>

        <section className="layout section">
          <article className="col col-left">
            <figure className="media">
              <img
                src="/images/turismo-BuenosAires.jpg"
                alt="Obelisco y Av. 9 de Julio en Buenos Aires"
              />
              <figcaption>Obelisco y Av. 9 de Julio</figcaption>
            </figure>

            <div className="highlights">
              <div className="item">
                <img
                  src="/images/cancelacion-png.webp"
                  alt="Cancelación gratis"
                  className="icon"
                />
                <div>
                  <h3 className="h-item">Cancelación gratis</h3>
                  <p>
                    Podés cancelar hasta 24 h antes para recibir reembolso
                    total.
                  </p>
                </div>
              </div>
              <div className="item">
                <img
                  src="/images/salud.png"
                  alt="Medidas sanitarias"
                  className="icon"
                />
                <div>
                  <h3 className="h-item">Medidas sanitarias</h3>
                  <p>Protocolos de higiene y seguridad vigentes.</p>
                </div>
              </div>
              <div className="item">
                <img
                  src="/images/ticket.png"
                  alt="Ticket móvil"
                  className="icon"
                />
                <div>
                  <h3 className="h-item">Ticket móvil</h3>
                  <p>Usá tu celular, no hace falta imprimir.</p>
                </div>
              </div>
              <div className="item">
                <img
                  src="/images/reloj.jpg"
                  alt="Duración aproximada: 3.5 horas"
                  className="icon"
                />
                <div>
                  <h3 className="h-item">Duración 3.5 horas</h3>
                  <p>Verificá horarios disponibles antes de reservar.</p>
                </div>
              </div>
            </div>

            <section className="descripcion" aria-labelledby="tit-desc">
              <h3 id="tit-desc">Descripción</h3>
              <p>
                Buenos Aires es una ciudad cosmopolita que mezcla historia,
                cultura y modernidad. Barrios como San Telmo y La Boca conviven
                con zonas contemporáneas como Puerto Madero y Palermo. La oferta
                cultural es enorme: teatros, museos, librerías, milongas y
                gastronomía de primer nivel.
              </p>
            </section>

            <section className="actividades" aria-labelledby="tit-act">
              <h3 id="tit-act">Actividades</h3>
              <ul className="lista">
                <li>Paseo por el Obelisco, Plaza de Mayo y Casa Rosada.</li>
                <li>
                  Recorrer Caminito en La Boca y San Telmo (ferias y arte
                  urbano).
                </li>
                <li>Visitar el Teatro Colón y museos de Recoleta.</li>
                <li>Noche de tango: show con cena opcional.</li>
                <li>Caminar por Puerto Madero y los bosques de Palermo.</li>
                <li>Opcional: excursión a Tigre y Delta del Paraná.</li>
              </ul>
            </section>

            <section className="incluye" aria-labelledby="tit-inc">
              <h3 id="tit-inc">Qué incluye / No incluye</h3>
              <div className="grid-two">
                <div>
                  <h4>Incluye</h4>
                  <ul className="lista">
                    <li>
                      Pasaje a Buenos Aires (ómnibus o avión, según paquete).
                    </li>
                    <li>Información turística y asistencia 24/7.</li>
                    <li>Posibilidad de paquetes con hotel y traslados.</li>
                  </ul>
                </div>
                <div>
                  <h4>No incluye</h4>
                  <ul className="lista">
                    <li>Comidas y bebidas no especificadas.</li>
                    <li>Excursiones fuera de itinerario.</li>
                    <li>Gastos personales.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="seguridad" aria-labelledby="tit-seg">
              <h3 id="tit-seg">Seguridad</h3>
              <ul className="lista">
                <li>Unidades con limpieza y desinfección frecuente.</li>
                <li>Equipo capacitado en seguridad e higiene.</li>
                <li>Control de aforos en transporte y actividades.</li>
              </ul>
            </section>

            <section className="mapa" aria-labelledby="tit-mapa">
              <h3 id="tit-mapa">Ubicación</h3>
              <div className="map-wrapper">
                <iframe
                  src="https://www.google.com/maps?q=Buenos%20Aires%2C%20Argentina&output=embed"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de Buenos Aires"
                ></iframe>
              </div>
            </section>
          </article>

          <aside className="col col-right card" aria-labelledby="tit-booking">
            <h3 id="tit-booking">Reserva</h3>
            <form id="form-reserva" className="form" onSubmit={handleSubmit} noValidate>
              <div className="campo">
                <label htmlFor="fecha-desde">Desde</label>
                <input
                  type="date"
                  id="fecha-desde"
                  name="fechaDesde"
                  value={formData.fechaDesde}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="campo">
                <label htmlFor="fecha-hasta">Hasta</label>
                <input
                  type="date"
                  id="fecha-hasta"
                  name="fechaHasta"
                  value={formData.fechaHasta}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="campo">
                <label htmlFor="cantidad">Personas</label>
                <input
                  type="number"
                  id="cantidad"
                  name="cantidad"
                  min="1"
                  max="10"
                  placeholder="2"
                  size="6"
                  maxLength="2"
                  value={formData.cantidad}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="campo">
                <label htmlFor="categoria">Alojamiento</label>
                <select
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                >
                  <option value="eco">Económico</option>
                  <option value="std">Standard</option>
                  <option value="prm">Premium</option>
                </select>
              </div>

              <div className="subtotal">
                <span>Subtotal</span>
                <strong id="subtotal">${subtotal.toLocaleString()}</strong>
              </div>

              <button
                type="button"
                id="btn-calcular"
                className="btn-outline"
                onClick={handleCalculate}
              >
                Calcular
              </button>
              <button
                type="submit"
                id="btn-reservar"
                className="btn-primary"
              >
                Confirmar reserva
              </button>
              <p className="msg" id="msg" role="alert" aria-live="polite">
                {message}
              </p>
            </form>
          </aside>
        </section>
      </main>
    </div>
  )
}

BuenosAires.propTypes = {
  initialSubtotal: PropTypes.number
}