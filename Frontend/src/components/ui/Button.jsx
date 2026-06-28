export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  ...rest
}) {
  // Componente generico para botones.
  // children es el contenido interno del boton.
  // ...rest permite pasar props extra como id, disabled o aria-label.
  return (
    <button type={type} onClick={onClick} className={`btn ${className}`} {...rest}>
      {children}
    </button>
  );
}
