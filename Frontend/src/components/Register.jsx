import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import assetImg from "@/assets/travel-asset.svg";

const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const validatePassword = (v) => v.length >= 6;

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // final validation
    const eEmail = !validateEmail(formData.email) ? "Email inválido" : "";
    const ePass = !validatePassword(formData.password)
      ? "La clave debe tener al menos 6 caracteres"
      : "";
    setErrors({ email: eEmail, password: ePass });
    if (!eEmail && !ePass) {
      // guardar ejemplo en localStorage
      try {
        localStorage.setItem("raf_user_email", formData.email);
      } catch (e) {}
      console.log("Form submitted:", formData);
      alert("Registro simulado: " + formData.email);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // realtime validations
    if (name === "email")
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Email inválido",
      }));
    if (name === "password")
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value)
          ? ""
          : "La clave debe tener al menos 6 caracteres",
      }));
  };

  return (
    <>
      <div id="fondo">
        <img src="/travel-public.svg" alt="lago y montañas en argentina" />
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
                  src={assetImg}
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
                <Input
                  id="email"
                  name="email"
                  label="Tu email"
                  type="email"
                  placeholder="Tu@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={errors.email}
                />

                <Input
                  id="password"
                  name="password"
                  label="tu clave"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  error={errors.password}
                />

                <div className="acciones">
                  <Button type="submit" className="btn-primary btn-lg">
                    Ingresar
                  </Button>
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
                src={assetImg}
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
  );
}
