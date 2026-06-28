export default function Input({
  id,
  label,
  type = "text",
  value,
  onChange,
  name,
  placeholder,
  required,
  error,
  ...rest
}) {
  // Input reutilizable: junta label, input y mensaje de error accesible.
  // Sirve para no repetir la misma estructura en cada formulario.
  return (
    <div className="campo">
      {/* htmlFor conecta el label con el input mediante el id. */}
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        // TERNARIO: si hay error marca true, si no marca false.
        // aria-invalid informa a lectores de pantalla si el campo esta mal.
        aria-invalid={error ? "true" : "false"}
        // TERNARIO: si hay error conecta el input con el mensaje; si no, queda undefined.
        // aria-describedby conecta el input con el mensaje de error.
        aria-describedby={error ? `${id}-error` : undefined}
        required={required}
        {...rest}
      />
      {/* role="alert" hace que el error sea anunciado cuando aparece. */}
      {error && (
        <div id={`${id}-error`} className="field-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
