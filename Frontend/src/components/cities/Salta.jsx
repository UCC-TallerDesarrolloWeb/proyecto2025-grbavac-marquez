import CityTemplate from './CityTemplate'

export default function Salta() {
  const cityData = {
    cityName: "Salta",
    description: "Salta, conocida como 'La Linda', es una de las ciudades coloniales mejor preservadas de Argentina. Ubicada en el noroeste del país, se destaca por su arquitectura colonial española, sus museos de alto nivel y los impresionantes paisajes de la región, desde los coloridos cerros hasta los viñedos de altura.",
    activities: [
      {
        name: "Tren a las Nubes",
        description: "Embárcate en uno de los ferrocarriles más altos del mundo, atravesando paisajes espectaculares."
      },
      {
        name: "Quebrada de Humahuaca",
        description: "Explora este valle colorido declarado Patrimonio de la Humanidad por la UNESCO."
      },
      {
        name: "Casco Histórico",
        description: "Recorre el centro histórico con su arquitectura colonial y su famosa Plaza 9 de Julio."
      }
    ],
    imageUrl: "/images/salta.jpg"
  }

  return <CityTemplate {...cityData} />
}