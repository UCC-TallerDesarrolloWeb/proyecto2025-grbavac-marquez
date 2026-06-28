import { useState } from "react";
import Card from "@components/ui/Card";

// Estado inicial del formulario de contacto.
const initialForm = {
  email: "",
  tema: "",
  message: "",
};

// REGEX: expresion regular para validar formato basico de email.
const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// Pagina de contacto: maneja formulario, estimador de espera y datos visibles.
const Contact = () => {
  // Datos del formulario de contacto.
  const [formData, setFormData] = useState(initialForm);
  // Indica si el formulario fue enviado correctamente.
  const [sent, setSent] = useState(false);
  // Datos seleccionados para calcular espera estimada.
  const [waitData, setWaitData] = useState({ dia: "laboral", franja: "tarde" });
  // Resultado visible del estimador.
  const [waitResult, setWaitResult] = useState("—");

  // Actualiza el formulario usando el name del campo editado.
  const handleChange = (event) => {
    // DESESTRUCTURACION DE OBJETOS: obtiene name y value desde event.target.
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSent(false);
  };

  // Actualiza los campos del estimador de espera.
  const handleWaitChange = (event) => {
    // DESESTRUCTURACION DE OBJETOS: obtiene name y value desde event.target.
    const { name, value } = event.target;
    setWaitData((prev) => ({ ...prev, [name]: value }));
  };

  // Calcula la espera usando una tabla de valores segun dia y franja.
  const handleEstimate = () => {
    const table = {
      laboral: { maniana: "5 a 8 min", tarde: "10 a 15 min", noche: "8 a 12 min" },
      fin: { maniana: "12 a 18 min", tarde: "18 a 25 min", noche: "15 a 20 min" },
    };
    setWaitResult(table[waitData.dia][waitData.franja]);
  };

  // Valida el email antes de simular el envio del formulario.
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateEmail(formData.email)) return;
    setSent(true);
    setFormData(initialForm);
  };

  return (
    <div id="contenedor" className="page-contacto">
      <section id="intro" className="section" aria-labelledby="tit-intro">
        <div className="intro-inner">
          <h2 id="tit-intro">Estamos Para Ayudarte</h2>
          <p>
            Elegí el canal que prefieras para tu consulta: ChatBot (Carlitos),
            Formulario o Teléfonos por país
          </p>
        </div>
      </section>

      <div className="layout">
        <aside
          id="herramientas"
          className="col-izq"
          aria-labelledby="tit-herramientas"
        >
          <h2 id="tit-herramientas">Herramientas</h2>

          <section
            className="widget"
            id="widget-tiempo"
            aria-labelledby="tit-tiempo"
          >
            <h3 className="widget-titulo" id="tit-tiempo">
              Estimador De Espera
            </h3>
            <form id="form-tiempo" onSubmit={(event) => event.preventDefault()}>
              <div className="campo">
                <label htmlFor="dia">Día</label>
                <select
                  id="dia"
                  name="dia"
                  value={waitData.dia}
                  onChange={handleWaitChange}
                >
                  <option value="laboral">laboral</option>
                  <option value="fin">fin de semana</option>
                </select>
              </div>
              <div className="campo">
                <label htmlFor="franja">Franja horaria</label>
                <select
                  id="franja"
                  name="franja"
                  value={waitData.franja}
                  onChange={handleWaitChange}
                >
                  <option value="maniana">mañana</option>
                  <option value="tarde">tarde</option>
                  <option value="noche">noche</option>
                </select>
              </div>
              <div className="acciones">
                <button type="button" id="btn-estimar" onClick={handleEstimate}>
                  estimar
                </button>
              </div>
              <p id="resultado" className="resultado" aria-live="polite">
                Espera estimada: {waitResult}
              </p>
            </form>
          </section>
        </aside>

        <section id="canales" className="col-der" aria-labelledby="tit-canales">
          <h2 id="tit-canales" className="visually-hidden">
            Canales
          </h2>

          <Card className="canal" id="canal-chat">
            <div className="card-media">
              <img src="/imagenes/ChatBot_Contacto.jpg" alt="ilustración de chatbot" />
            </div>
            <div className="card-body">
              <h3 className="card-titulo">Chat</h3>
              <p>
                Iniciá una conversación con nuestro asistente virtual para resolver
                dudas frecuentes.
              </p>
              <div className="acciones">
                <button type="button" id="btn-abrir-chat" title="abrir chat">
                  Abrir chat
                </button>
              </div>
            </div>
          </Card>

          <Card className="canal" id="canal-formulario">
            <div className="card-media">
              <img src="/imagenes/Formulario_Contacto.png" alt="icono formulario" />
            </div>
            <div className="card-body">
              <h3 className="card-titulo">Formulario De Contacto</h3>
              <p>Completá el formulario y te responderemos por correo.</p>

              <form id="form-contacto" onSubmit={handleSubmit} autoComplete="on" noValidate>
                <div className="campo">
                  <label htmlFor="contacto-email">tu email</label>
                  <input
                    type="email"
                    id="contacto-email"
                    name="email"
                    placeholder="tu@mail.com"
                    maxLength="40"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={
                      formData.email && !validateEmail(formData.email)
                        ? "true"
                        : "false"
                    }
                    aria-describedby={
                      formData.email && !validateEmail(formData.email)
                        ? "contacto-email-error"
                        : undefined
                    }
                    required
                  />
                  {formData.email && !validateEmail(formData.email) && (
                    <p
                      id="contacto-email-error"
                      className="field-error"
                      role="alert"
                    >
                      Ingresá un email válido.
                    </p>
                  )}
                </div>

                <div className="campo">
                  <label htmlFor="contacto-tema">Tema</label>
                  <select
                    id="contacto-tema"
                    name="tema"
                    value={formData.tema}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Elegí una opción</option>
                    <option value="reserva">Mi reserva</option>
                    <option value="equipaje">Equipaje</option>
                    <option value="cambios">Cambios o devoluciones</option>
                    <option value="pagos">Pagos y facturación</option>
                  </select>
                </div>

                <div className="campo">
                  <label htmlFor="contacto-mensaje">Mensaje</label>
                  <textarea
                    id="contacto-mensaje"
                    name="message"
                    rows="5"
                    placeholder="contanos tu consulta"
                    maxLength="500"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="acciones">
                  <button type="submit" id="btn-enviar">
                    enviar
                  </button>
                </div>

                {sent && (
                  <p id="aviso" className="aviso" role="status" aria-live="polite">
                    mensaje enviado
                  </p>
                )}
              </form>
            </div>
          </Card>

          <Card className="canal" id="canal-telefonos">
            <div className="card-media">
              <img src="/imagenes/Telefono_Contacto.jpg" alt="icono teléfono" />
            </div>
            <div className="card-body">
              <h3 className="card-titulo">Teléfonos Por País</h3>
              <p>Llamanos en los siguientes horarios de atención.</p>
              <div className="tabla-wrap" role="region" aria-label="teléfonos de contacto">
                <table className="tabla" id="tabla-telefonos">
                  <caption>
                    Números de teléfono por país y horarios de atención
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">País</th>
                      <th scope="col">Número</th>
                      <th scope="col">Horarios</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Argentina</td>
                      <td>0810-555-xxxx</td>
                      <td>Todos los días 07:00-22:00</td>
                    </tr>
                    <tr>
                      <td>Brasil</td>
                      <td>0800-000-xxxx</td>
                      <td>Lun-Sáb 08:00-18:00, Dom 09:00-16:00</td>
                    </tr>
                    <tr>
                      <td>Otros países</td>
                      <td>+54 11 3987-xxxx</td>
                      <td>Todos los días 07:00-23:00 (hora argentina)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          <Card className="canal" id="canal-alerta">
            <div className="card-media">
              <img src="/imagenes/Alerta_Contacto.webp" alt="ícono de advertencia" />
            </div>
            <div className="card-body">
              <h3 className="card-titulo">¡Importante!</h3>
              <ul className="lista" role="list">
                <li>No ofrecemos atención por whatsapp ni por una app.</li>
                <li>Nunca pedimos contraseñas ni datos bancarios por chat o redes.</li>
              </ul>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Contact;
