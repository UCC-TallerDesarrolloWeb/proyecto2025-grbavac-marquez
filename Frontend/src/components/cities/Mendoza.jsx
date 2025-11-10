import CityTemplate from './CityTemplate'

export default function Mendoza() {
  const cityData = {
    cityName: "Mendoza",
    description: "Mendoza es el corazón de la región vitivinícola argentina, famosa por sus Malbecs y otros vinos de altura. Situada al pie de la Cordillera de los Andes, la ciudad ofrece impresionantes vistas montañosas, bodegas de primer nivel y es punto de partida para actividades de aventura y alta montaña.",
    activities: [
      {
        name: "Ruta del Vino",
        description: "Visita las bodegas más prestigiosas de la región y degusta los mejores vinos argentinos."
      },
      {
        name: "Aconcagua",
        description: "Excursión al Parque Provincial Aconcagua, hogar de la montaña más alta de América."
      },
      {
        name: "City Tour Histórico",
        description: "Recorrido por los principales puntos históricos y culturales de la ciudad, incluyendo la Plaza Independencia."
      }
    ],
    imageUrl: "/images/mendoza.jpg"
  }

  return <CityTemplate {...cityData} />
}