import { useRef, useEffect } from 'react';
import '../../styles/components/servicios.css';

const serviciosData = [
  {
    id: 1,
    icon: '👁️',
    title: 'Examen Visual con Auto Refractor',
    description: 'Diagnóstico preciso y rápido con tecnología de última generación para evaluar tu salud visual.'
  },
  {
    id: 2,
    icon: '🔧',
    title: 'Adaptación de Cristales',
    description: 'Montamos tus cristales en monturas nuevas con precisión y garantía de calidad.'
  },
  {
    id: 3,
    icon: '🕶️',
    title: 'Venta de Monturas',
    description: 'Amplia variedad de monturas de las mejores marcas para todos los estilos y presupuestos.'
  },
  {
    id: 4,
    icon: '💎',
    title: 'Fabricación de Cristales',
    description: 'Cristales graduados de alta precisión fabricados con los estándares más exigentes.'
  }
];

function Servicios() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current;
    cards.forEach((card) => {
      if (!card) return;
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform =
          'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-10px) scale(1.02)';
      };
      const handleMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
      };
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  useEffect(() => {
    const cards = cardRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    cards.forEach((card) => {
      if (card) {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
      }
    });
    setTimeout(() => {
      cards.forEach((card) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
            card.style.animationPlayState = 'running';
          }
        }
      });
    }, 200);
    return () => {
      cards.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section id="servicios" className="servicios" aria-labelledby="servicios-title">
      <div className="container">
        <h2 id="servicios-title" className="section-title glass-title">Nuestros Servicios</h2>
        <p className="section-subtitle">Tecnología avanzada y atención personalizada para el cuidado de tu visión</p>
        <div className="cards-grid">
          {serviciosData.map((servicio, index) => (
            <article
              key={servicio.id}
              className="card card-3d"
              ref={(el) => (cardRefs.current[index] = el)}
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="card-glow"></div>
              <div className="card-icon" aria-hidden="true">{servicio.icon}</div>
              <h3>{servicio.title}</h3>
              <p>{servicio.description}</p>
              <span className="card-number" aria-hidden="true">{(index + 1).toString().padStart(2, '0')}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Servicios;