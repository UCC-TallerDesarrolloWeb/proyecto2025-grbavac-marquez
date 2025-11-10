import CityTemplate from './CityTemplate'

export default function Cordoba() {
  const cityData = {
    cityName: "Córdoba",
    description: "Córdoba, la segunda ciudad más grande de Argentina, combina historia colonial y vida universitaria moderna. Rodeada por las sierras pampeanas, la ciudad es famosa por su arquitectura jesuita, sus universidades centenarias y su vibrante vida cultural. La región que la rodea ofrece hermosos paisajes serranos y destinos turísticos tradicionales.",
    activities: [
      {
        name: "Manzana Jesuítica",
        description: "Visita este complejo histórico declarado Patrimonio de la Humanidad por la UNESCO, que incluye la Universidad Nacional de Córdoba."
      },
      {
        name: "Valle de Punilla",
        description: "Explora uno de los valles más turísticos de la provincia, con destinos como Carlos Paz, Cosquín y La Falda."
      },
      {
        name: "Nueva Córdoba",
        description: "Recorre el barrio más moderno y juvenil de la ciudad, lleno de cafeterías, bares y vida nocturna."
      }
    ],
    imageUrl: "/images/cordoba.jpg"
  }

  return <CityTemplate {...cityData} />
}