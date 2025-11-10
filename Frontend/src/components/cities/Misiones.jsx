import CityTemplate from './CityTemplate'

export default function Misiones() {
  const cityData = {
    cityName: "Misiones",
    description: "Misiones es una provincia única en Argentina, conocida mundialmente por las Cataratas del Iguazú, una de las Siete Maravillas Naturales del mundo. Su selva subtropical, las ruinas jesuíticas y su rica biodiversidad la convierten en un destino imperdible para los amantes de la naturaleza y la historia.",
    activities: [
      {
        name: "Cataratas del Iguazú",
        description: "Visita una de las maravillas naturales del mundo, con sus impresionantes caídas de agua y pasarelas."
      },
      {
        name: "Ruinas de San Ignacio",
        description: "Explora las ruinas jesuíticas mejor preservadas de Argentina, Patrimonio de la Humanidad por la UNESCO."
      },
      {
        name: "Selva Misionera",
        description: "Aventúrate en la selva subtropical con guías especializados para descubrir su flora y fauna única."
      }
    ],
    imageUrl: "/images/misiones.jpg"
  }

  return <CityTemplate {...cityData} />
}