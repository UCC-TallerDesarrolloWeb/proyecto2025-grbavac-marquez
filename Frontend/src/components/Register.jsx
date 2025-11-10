import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <>
      <div id="fondo">
        <img
          src="/images/Lago_Ushuaia_LOGIN.webp"
          alt="lago y montañas en argentina"
        />
      </div>

      <div id="contenedor">
        <main id="contenido">
          <section
            id="registro"
            aria-labelledby="tit-registro"
            role="dialog"
            aria-modal="true"
          >
            <div className="modal">
              <Link
                id="btn-cerrar"
                className="cerrar"
                aria-label="volver al inicio"
                to="/"
                title="volver al inicio"
              >
                ×
              </Link>

              <header className="modal-encabezado">
                <img
                  id="logo-modal"
                  src="/images/Logo-Rutas-Argentinas.jpeg.jpg"
                  alt="logotipo rutas argentinas"
                />
                <h1 id="tit-registro">registro</h1>
                <p className="subtitulo">¿No tenes cuenta? Regístrate</p>
              </header>

              <section className="modal-social" aria-label="ingresar con redes">
                <button type="button" className="btn-social btn-facebook">
                  <img src="/images/Logo_Facebook_LOGIN.png" alt="facebook" />
                  <span>Log in with facebook</span>
                </button>
                <button type="button" className="btn-social btn-google">
                  <img src="/images/Logo_Google_LOGIN.png" alt="google" />
                  <span>Log in with google</span>
                </button>
              </section>

              <div className="separador" role="separator" aria-label="o">
                o
              </div>

              <form
                id="form-login"
                onSubmit={handleSubmit}
                autoComplete="on"
                noValidate
              >
                <div className="campo">
                  <label htmlFor="email">Tu email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Tu@mail.com"
                    size="28"
                    maxLength="40"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="password">tu clave</label>
                  <div className="campo-password">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder=""
                      size="28"
                      maxLength="30"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="acciones">
                  <Link
                    to="/"
                    id="btn-ingresar"
                    className="btn btn-primary btn-lg"
                    title="Ir al inicio"
                  >
                    Ingresar
                  </Link>
                </div>
              </form>
            </div>
          </section>
        </main>

        <footer id="pie" role="contentinfo">
          <div className="pie-inner">
            <section className="marca" aria-label="marca">
              <img
                className="marca-logo"
                src="/images/Logo-Rutas-Argentinas.jpeg.jpg"
                alt="logo rutas argentinas"
              />
              <p className="marca-nombre">rutas argentinas</p>
              <p className="marca-eslogan">turismo por el país</p>
            </section>
            <nav id="social" aria-label="redes sociales">
              <ul className="social-list">
                <li>
                  <a
                    href="https://www.facebook.com/rutasargentinas"
                    aria-label="facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/rutasargentinas"
                    aria-label="linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@rutasargentinas"
                    aria-label="youtube"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    youtube
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/rutasargentinas"
                    aria-label="instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    instagram
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    </>
  )
}