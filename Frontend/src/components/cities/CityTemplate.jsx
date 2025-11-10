import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function CityTemplate({ 
  cityName, 
  description, 
  activities, 
  imageUrl 
}) {
  return (
    <div className="city-page">
      <h1>{cityName}</h1>
      
      <div className="city-content">
        <div className="city-info card">
          <img src={imageUrl} alt={cityName} className="city-image" />
          <p>{description}</p>
        </div>

        <div className="activities-section card">
          <h2>Actividades Destacadas</h2>
          <ul className="activities-list">
            {activities.map((activity, index) => (
              <li key={index}>
                <h3>{activity.name}</h3>
                <p>{activity.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <Link to="/actividades" className="button">Ver todas las actividades</Link>
      </div>
    </div>
  )
}

CityTemplate.propTypes = {
  cityName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  imageUrl: PropTypes.string.isRequired
}