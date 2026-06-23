import { useEffect, useRef, useState } from 'react'
import './Acerca.css'
import acercaImg from '/imagenes/fotos/acerca.jpg'

function Acerca() {
  const [statsAnimated, setStatsAnimated] = useState(false)
  const statsRef = useRef(null)
  const statNumbersRef = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      if (statsAnimated) return
      const container = statsRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      if (rect.top < window.innerHeight - 100) {
        setStatsAnimated(true)
        const stats = statNumbersRef.current
        stats.forEach((stat) => {
          if (!stat) return
          const target = parseInt(stat.getAttribute('data-target'))
          let current = 0
          const increment = Math.ceil(target / 40)
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              stat.textContent = target + (target === 100 ? '%' : '')
              clearInterval(timer)
            } else {
              stat.textContent = current
            }
          }, 30)
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    setTimeout(handleScroll, 500)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [statsAnimated])

  return (
    <section id="acerca" className="acerca" aria-labelledby="acerca-title">
      <div className="container">
        <div className="acerca-container">
          <div className="acerca-content">
            <h2 id="acerca-title" className="section-title">Sobre Nosotros</h2>
            <p>
              En <strong>Perfect Vision</strong> llevamos más de 5 años cuidando la salud visual de nuestra comunidad. Somos una óptica comprometida con la excelencia, combinando tecnología de vanguardia con un trato cercano y personalizado.
            </p>
            <p>
              Nuestro equipo de profesionales está capacitado para ofrecerte el mejor servicio en exámenes visuales, adaptación de lentes y asesoramiento en la elección de tus monturas. Trabajamos con las mejores marcas y garantizamos la más alta calidad en cada uno de nuestros productos.
            </p>
            <p>
              Con sucursales estratégicamente ubicadas en Rattan Plaza, Juan Griego, Calle Igualdad y Galería Francia, estamos siempre cerca de ti para brindarte la atención que mereces.
            </p>
            <div className="acerca-stats" id="statsContainer" ref={statsRef}>
              <div className="stat" data-count="5">
                <span className="stat-number" data-target="5" ref={(el) => (statNumbersRef.current[0] = el)}>0</span>
                <span className="stat-label">Años de experiencia</span>
              </div>
              <div className="stat" data-count="4">
                <span className="stat-number" data-target="4" ref={(el) => (statNumbersRef.current[1] = el)}>0</span>
                <span className="stat-label">Sucursales</span>
              </div>
              <div className="stat" data-count="100">
                <span className="stat-number" data-target="100" ref={(el) => (statNumbersRef.current[2] = el)}>0</span>
                <span className="stat-label">% Clientes satisfechos</span>
              </div>
            </div>
          </div>
          <div className="acerca-image">
            <div className="image-wrapper">
              <img
                src={acercaImg}
                alt="Equipo de Perfect Vision - Profesionales de la salud visual"
                className="acerca-img"
                loading="lazy"
                width="600"
                height="400"
              />
              <div className="image-overlay">
                <span className="overlay-text">Excelencia visual</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Acerca