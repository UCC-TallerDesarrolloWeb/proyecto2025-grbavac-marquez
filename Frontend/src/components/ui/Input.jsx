import React from "react";

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
  return (
    <div className="campo">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        required={required}
        {...rest}
      />
      {error && (
        <div
          id={`${id}-error`}
          role="alert"
          style={{ color: "#b91c1c", marginTop: 6 }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
