const ciudadesUrl = new URL("../data/ciudades.json", import.meta.url).href;
const actividadesUrl = new URL("../data/actividades.json", import.meta.url).href;

// Funcion generica para pedir un JSON con fetch.
// async/await permite escribir codigo asincronico de forma mas legible.
const fetchJson = async (url) => {
  const response = await fetch(url);

  // response.ok es false si el servidor responde con error, por ejemplo 404.
  if (!response.ok) {
    throw new Error("No se pudieron cargar los datos.");
  }

  // Convierte la respuesta HTTP en un objeto/arreglo de JavaScript.
  return response.json();
};

// API local del frontend: obtiene las ciudades desde el JSON del proyecto.
export const fetchCiudades = async () => fetchJson(ciudadesUrl);

// API local del frontend: obtiene las actividades desde el JSON del proyecto.
export const fetchActividades = async () => fetchJson(actividadesUrl);
