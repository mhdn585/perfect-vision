import { useState, useRef } from 'react'
import '../../styles/components/contacto.css'
import { isValidEmail } from '../../utils/validators'
import Button from '../ui/Button'

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [touched, setTouched] = useState({})
  const formRef = useRef(null)

  const validateField = (name, value) => {
    if (name === 'nombre') {
      if (!value.trim()) return 'Por favor ingresa tu nombre'
      return ''
    }
    if (name === 'email') {
      if (!value.trim()) return 'Por favor ingresa tu email'
      if (!isValidEmail(value.trim())) return 'Por favor ingresa un email válido'
      return ''
    }
    if (name === 'mensaje') {
      if (!value.trim()) return 'Por favor ingresa tu mensaje'
      return ''
    }
    return ''
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
    
    if (touched[id]) {
      const error = validateField(id, value)
      setErrors(prev => ({ ...prev, [id]: error }))
    }
  }

  const handleBlur = (e) => {
    const { id, value } = e.target
    setTouched(prev => ({ ...prev, [id]: true }))
    const error = validateField(id, value)
    setErrors(prev => ({ ...prev, [id]: error }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    let isValid = true
    
    Object.keys(formData).forEach(key => {
      if (key === 'telefono') return
      const error = validateField(key, formData[key])
      if (error) {
        newErrors[key] = error
        isValid = false
      }
    })
    
    setErrors(newErrors)
    setTouched({
      nombre: true,
      email: true,
      mensaje: true
    })
    
    if (!isValid) {
      showToast('Por favor corrige los campos marcados', 'error')
      return
    }
    
    setIsLoading(true)
    
    setTimeout(() => {
      setIsLoading(false)
      showToast('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success')
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
      })
      setErrors({})
      setTouched({})
    }, 1500)
  }

  const showToast = (message, type) => {
    const event = new CustomEvent('showToast', {
      detail: { message, type }
    })
    window.dispatchEvent(event)
  }

  const getFieldStatus = (fieldName) => {
    if (!touched[fieldName]) return ''
    if (errors[fieldName]) return 'error'
    if (formData[fieldName].trim()) return 'success'
    return ''
  }

  return (
    <section id="contacto" className="contacto" aria-labelledby="contacto-title">
      <div className="container">
        <h2 id="contacto-title" className="section-title">Contáctanos</h2>
        <p className="section-subtitle">Pide tu cita o escríbenos para más información</p>
        <div className="contacto-grid">
          <div className="contacto-info glass-effect">
            <div className="contacto-details">
              <div className="detail-item">
                <span className="detail-icon" aria-hidden="true">📍</span>
                <div>
                  <h4>Sucursales</h4>
                  <p>Rattan Plaza, Juan Griego, Calle Igualdad, Galería Francia</p>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon" aria-hidden="true">📞</span>
                <div>
                  <h4>Teléfono</h4>
                  <p><a href="tel:04264869006">0426-4869006</a></p>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon" aria-hidden="true">🕐</span>
                <div>
                  <h4>Horario</h4>
                  <p>Lunes a sábado, 8:00 am - 5:00 pm</p>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon" aria-hidden="true">📱</span>
                <div>
                  <h4>Redes sociales</h4>
                  <div className="social-links">
                    <Button
                      href="https://wa.me/c/584264869006"
                      variant="whatsapp"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="social-btn"
                    >
                      WhatsApp
                    </Button>
                    <Button
                      href="https://www.instagram.com/opticaperfectvission?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      variant="whatsapp"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="social-btn"
                    >
                      Instagram
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form className="contact-form" id="contactForm" ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className={`form-group floating-label ${getFieldStatus('nombre')}`}>
              <input
                type="text"
                id="nombre"
                placeholder=" "
                required
                value={formData.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-invalid={!!errors.nombre}
                aria-describedby="nombre-error"
              />
              <label htmlFor="nombre">Nombre completo</label>
              <span className="form-error" id="nombre-error" aria-live="polite">
                {errors.nombre || ''}
              </span>
            </div>
            <div className={`form-group floating-label ${getFieldStatus('email')}`}>
              <input
                type="email"
                id="email"
                placeholder=" "
                required
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
              />
              <label htmlFor="email">Correo electrónico</label>
              <span className="form-error" id="email-error" aria-live="polite">
                {errors.email || ''}
              </span>
            </div>
            <div className="form-group floating-label">
              <input
                type="tel"
                id="telefono"
                placeholder=" "
                value={formData.telefono}
                onChange={handleChange}
              />
              <label htmlFor="telefono">Teléfono (opcional)</label>
            </div>
            <div className={`form-group floating-label ${getFieldStatus('mensaje')}`}>
              <textarea
                id="mensaje"
                rows="4"
                placeholder=" "
                required
                value={formData.mensaje}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-invalid={!!errors.mensaje}
                aria-describedby="mensaje-error"
              ></textarea>
              <label htmlFor="mensaje">Mensaje</label>
              <span className="form-error" id="mensaje-error" aria-live="polite">
                {errors.mensaje || ''}
              </span>
            </div>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="submit-btn"
            >
              Enviar mensaje
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contacto