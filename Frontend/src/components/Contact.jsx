import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData)
    alert('Gracias por tu mensaje. Nos pondremos en contacto pronto.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="contact-page">
      <h1>Contacto</h1>
      
      <div className="contact-content">
        <div className="contact-info card">
          <h2>Información de Contacto</h2>
          <p>¿Tienes alguna pregunta? No dudes en contactarnos.</p>
          
          <div className="contact-details">
            <div className="contact-item">
              <strong>Email:</strong>
              <p>info@argentinatravel.com</p>
            </div>
            <div className="contact-item">
              <strong>Teléfono:</strong>
              <p>+54 11 1234-5678</p>
            </div>
            <div className="contact-item">
              <strong>Dirección:</strong>
              <p>Av. Corrientes 1234, Buenos Aires, Argentina</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form card">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Asunto</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
            />
          </div>

          <button type="submit" className="button">Enviar Mensaje</button>
        </form>
      </div>
    </div>
  )
}