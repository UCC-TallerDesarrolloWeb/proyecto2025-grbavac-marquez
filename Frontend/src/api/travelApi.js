const ciudadesUrl = new URL("../data/ciudades.json", import.meta.url).href;
const actividadesUrl = new URL("../data/actividades.json", import.meta.url).href;

const fetchJson = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los datos.");
  }

  return response.json();
};

export const fetchCiudades = async () => fetchJson(ciudadesUrl);

export const fetchActividades = async () => fetchJson(actividadesUrl);
