import CityTemplate from './CityTemplate'

export default function Bariloche() {
  const cityData = {
    cityName: "Bariloche",
    description: "San Carlos de Bariloche es una ciudad ubicada en la región de la Patagonia argentina, famosa por sus paisajes de lagos y montañas que recuerdan a los Alpes suizos. Centro de deportes de invierno y destino turístico durante todo el año, Bariloche ofrece una combinación única de naturaleza, aventura y gastronomía.",
    activities: [
      {
        name: "Cerro Catedral",
        description: "El centro de esquí más grande de Sudamérica, ideal para deportes de invierno y trekking en verano."
      },
      {
        name: "Circuito Chico",
        description: "Recorrido panorámico que incluye lagos, miradores y el famoso Hotel Llao Llao."
      },
      {
        name: "Isla Victoria",
        description: "Excursión en barco por el Lago Nahuel Huapi visitando bosques milenarios."
      }
    ],
    imageUrl: "/images/bariloche.jpg"
  }

  return <CityTemplate {...cityData} />
}