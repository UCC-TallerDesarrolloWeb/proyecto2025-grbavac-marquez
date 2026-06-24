export default function Card({ children, className = "", ...rest }) {
  return (
    <article className={`card ${className}`} {...rest}>
      {children}
    </article>
  );
}
