import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";

const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const validatePassword = (value) => value.length >= 6;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailError = !validateEmail(formData.email) ? "Email inválido" : "";
    const passwordError = !validatePassword(formData.password)
      ? "La clave debe tener al menos 6 caracteres"
      : "";

    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      try {
        localStorage.setItem("raf_user_email", formData.email);
      } catch {
        /* localStorage puede no estar disponible en algunos navegadores */
      }
      navigate("/");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Email inválido",
      }));
    }

    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value)
          ? ""
          : "La clave debe tener al menos 6 caracteres",
      }));
    }
  };

  return (
    <div className="register-page">
      <div id="fondo">
        <img src="/imagenes/Lago_Ushuaia_LOGIN.webp" alt="lago y montañas en argentina" />
      </div>

      <main id="contenido">
        <section id="registro" aria-labelledby="tit-registro">
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
                src="/imagenes/Logo-Rutas-Argentinas.jpeg.jpg"
                alt="logotipo rutas argentinas"
              />
              <h1 id="tit-registro">registro</h1>
              <p className="subtitulo">¿No tenes cuenta? Regístrate</p>
            </header>

            <section className="modal-social" aria-label="ingresar con redes">
              <button type="button" className="btn-social btn-facebook">
                <img src="/imagenes/Logo_Facebook_LOGIN.png" alt="facebook" />
                <span>Log in with facebook</span>
              </button>
              <button type="button" className="btn-social btn-google">
                <img src="/imagenes/Logo_Google_LOGIN.png" alt="google" />
                <span>Log in with google</span>
              </button>
            </section>

            <div className="separador" role="separator" aria-label="o">
              o
            </div>

            <form id="form-login" onSubmit={handleSubmit} autoComplete="on" noValidate>
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
    </div>
  );
};

export default Register;
