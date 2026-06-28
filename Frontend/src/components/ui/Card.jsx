export default function Card({ children, className = "", ...rest }) {
  // Card centraliza el estilo de tarjeta para reutilizarlo en varias paginas.
  // Usa article porque suele representar un bloque de contenido independiente.
  return (
    <article className={`card ${className}`} {...rest}>
      {children}
    </article>
  );
}
