import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import './Header.css'
import logoImg from '/imagenes/logos/logo-principal.png'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const navRef = useRef(null)
  const menuToggleRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMenuOpen &&
        navRef.current &&
        !navRef.current.contains(e.target) &&
        menuToggleRef.current &&
        !menuToggleRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false)
        menuToggleRef.current.setAttribute('aria-expanded', 'false')
        menuToggleRef.current.setAttribute('aria-label', 'Abrir menú')
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  const toggleMenu = () => {
    const newState = !isMenuOpen
    setIsMenuOpen(newState)
    if (menuToggleRef.current) {
      menuToggleRef.current.setAttribute('aria-expanded', newState)
      menuToggleRef.current.setAttribute(
        'aria-label',
        newState ? 'Cerrar menú' : 'Abrir menú'
      )
    }
  }

  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      const offset = 80
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
    if (isMenuOpen) {
      setIsMenuOpen(false)
      if (menuToggleRef.current) {
        menuToggleRef.current.setAttribute('aria-expanded', 'false')
        menuToggleRef.current.setAttribute('aria-label', 'Abrir menú')
      }
    }
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} id="header" role="banner">
      <div className="container header-container">
        <div className="logo">
          <img
            src={logoImg}
            alt="Perfect Vision - Logotipo"
            className="logo-img"
            width="55"
            height="55"
          />
          <span className="logo-text">Perfect Vision</span>
        </div>
        <nav className={`nav ${isMenuOpen ? 'active' : ''}`} id="nav" ref={navRef} aria-label="Navegación principal">
          <ul className="nav-list">
            <li>
              <a
                href="#inicio"
                onClick={(e) => handleNavLinkClick(e, '#inicio')}
                aria-current="page"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#servicios"
                onClick={(e) => handleNavLinkClick(e, '#servicios')}
              >
                Servicios
              </a>
            </li>
            <li>
              <a
                href="#acerca"
                onClick={(e) => handleNavLinkClick(e, '#acerca')}
              >
                Nosotros
              </a>
            </li>
            <li>
              <a
                href="#testimonios"
                onClick={(e) => handleNavLinkClick(e, '#testimonios')}
              >
                Testimonios
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                onClick={(e) => handleNavLinkClick(e, '#contacto')}
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            title="Cambiar tema claro/oscuro"
          >
            <span className="theme-icon" aria-hidden="true">
              {theme === 'dark' ? '☀️' : '🌙'}
            </span>
          </button>
          <button
            className="menu-toggle"
            id="menuToggle"
            ref={menuToggleRef}
            onClick={toggleMenu}
            aria-label="Abrir menú"
            aria-expanded="false"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header