import { useEffect, useRef } from 'react'
import './Testimonios.css'

const testimoniosData = [
  {
    id: 1,
    text: '"Excelente atención y profesionalismo. Me hicieron un examen visual completo y quedé encantada con la variedad de monturas. ¡Recomiendo Perfect Vision al 100%!"',
    name: 'María González',
    role: 'Cliente desde 2023'
  },
  {
    id: 2,
    text: '"La adaptación de mis nuevos lentes fue rápida y perfecta. El personal es muy amable y te asesoran con paciencia. Sin duda, la mejor óptica de la zona."',
    name: 'Carlos Rodríguez',
    role: 'Cliente desde 2024'
  },
  {
    id: 3,
    text: '"He visitado varias ópticas, pero Perfect Vision supera todas mis expectativas. La calidad de sus cristales y la atención personalizada me han fidelizado."',
    name: 'Ana Martínez',
    role: 'Cliente desde 2022'
  }
]

function Testimonios() {
  const cardRefs = useRef([])

  useEffect(() => {
    const cards = cardRefs.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running'
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    cards.forEach((card) => {
      if (card) {
        card.style.animationPlayState = 'paused'
        observer.observe(card)
      }
    })
    setTimeout(() => {
      cards.forEach((card) => {
        if (card) {
          const rect = card.getBoundingClientRect()
          if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
            card.style.animationPlayState = 'running'
          }
        }
      })
    }, 200)
    return () => {
      cards.forEach((card) => {
        if (card) observer.unobserve(card)
      })
    }
  }, [])

  return (
    <section id="testimonios" className="testimonios" aria-labelledby="testimonios-title">
      <div className="container">
        <h2 id="testimonios-title" className="section-title">Lo que dicen nuestros clientes</h2>
        <p className="section-subtitle">La opinión de quienes confían en nosotros</p>
        <div className="testimonios-grid">
          {testimoniosData.map((testimonio, index) => (
            <blockquote
              key={testimonio.id}
              className="testimonial-card glass-effect"
              ref={(el) => (cardRefs.current[index] = el)}
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <p>{testimonio.text}</p>
              <cite>
                <span className="cite-name">{testimonio.name}</span>
                <span className="cite-role">{testimonio.role}</span>
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonios