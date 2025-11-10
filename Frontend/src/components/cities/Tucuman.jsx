import CityTemplate from './CityTemplate'

export default function Tucuman() {
  const cityData = {
    cityName: "Tucumán",
    description: "San Miguel de Tucumán, la ciudad más importante del noroeste argentino, es conocida como el 'Jardín de la República' y cuna de la independencia argentina. Rodeada de montañas y selvas, la ciudad combina historia, cultura y naturaleza, ofreciendo una experiencia única para los visitantes.",
    activities: [
      {
        name: "Casa Histórica",
        description: "Visita la Casa de la Independencia, donde se declaró la independencia argentina en 1816."
      },
      {
        name: "Tafí del Valle",
        description: "Explora este hermoso valle de altura, ideal para el turismo aventura y la gastronomía local."
      },
      {
        name: "Parque Sierra de San Javier",
        description: "Disfruta de las vistas panorámicas de la ciudad y realiza actividades al aire libre."
      }
    ],
    imageUrl: "/images/tucuman.jpg"
  }

  return <CityTemplate {...cityData} />
}