import '../../styles/components/footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      const offset = 80
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-container">
        <div className="footer-brand">
          <span className="footer-logo-icon" aria-hidden="true">👁</span>
          <span className="footer-brand-name">Perfect Vision</span>
          <p>&copy; {currentYear} Perfect Vision - Todos los derechos reservados</p>
        </div>
        <div className="footer-links">
          <a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')}>
            Inicio
          </a>
          <a href="#servicios" onClick={(e) => handleNavClick(e, '#servicios')}>
            Servicios
          </a>
          <a href="#acerca" onClick={(e) => handleNavClick(e, '#acerca')}>
            Nosotros
          </a>
          <a href="#testimonios" onClick={(e) => handleNavClick(e, '#testimonios')}>
            Testimonios
          </a>
          <a href="#contacto" onClick={(e) => handleNavClick(e, '#contacto')}>
            Contacto
          </a>
        </div>
        <div className="footer-social">
          <a
            href="https://wa.me/c/584264869006"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            WhatsApp
          </a>
          <a
            href="https://www.instagram.com/opticaperfectvission?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer