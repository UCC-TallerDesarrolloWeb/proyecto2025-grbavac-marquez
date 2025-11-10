import CityTemplate from './CityTemplate'

export default function Ushuaia() {
  const cityData = {
    cityName: "Ushuaia",
    description: "Ushuaia, la ciudad más austral del mundo, se encuentra en Tierra del Fuego, rodeada por la cordillera y el Canal Beagle. Esta ciudad única combina paisajes impresionantes de montañas, glaciares y bosques, siendo además punto de partida para expediciones a la Antártida.",
    activities: [
      {
        name: "Tren del Fin del Mundo",
        description: "Viaja en el tren más austral del mundo a través del Parque Nacional Tierra del Fuego."
      },
      {
        name: "Canal Beagle",
        description: "Navega por el canal observando fauna marina y las islas cercanas."
      },
      {
        name: "Glaciar Martial",
        description: "Excursión al glaciar con vistas panorámicas de la ciudad y el canal Beagle."
      }
    ],
    imageUrl: "/images/ushuaia.jpg"
  }

  return <CityTemplate {...cityData} />
}