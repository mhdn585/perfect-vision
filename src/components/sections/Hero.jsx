import { useEffect, useRef } from 'react';
import '../../styles/components/hero.css';

function Hero() {
  const typewriterRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const texts = [
      'Cuida tu vista con los mejores',
      'Visión clara, vida plena',
      'Tu mirada es nuestra prioridad'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    let timeoutId = null;

    function typeEffect() {
      const fullText = texts[textIndex];
      if (isDeleting) {
        currentText = fullText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        currentText = fullText.substring(0, charIndex + 1);
        charIndex++;
      }
      if (typewriterRef.current) {
        typewriterRef.current.textContent = currentText;
      }
      if (!isDeleting && charIndex === fullText.length) {
        isDeleting = true;
        timeoutId = setTimeout(typeEffect, 2000);
        return;
      }
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        timeoutId = setTimeout(typeEffect, 500);
        return;
      }
      const speed = isDeleting ? 50 : 100;
      timeoutId = setTimeout(typeEffect, speed);
    }

    timeoutId = setTimeout(typeEffect, 500);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    const count = window.innerWidth < 768 ? 30 : 60;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 6 + 3;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particle.style.opacity = Math.random() * 0.2 + 0.05;
      particle.style.setProperty('--duration', (Math.random() * 20 + 10) + 's');
      container.appendChild(particle);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero-particles" id="heroParticles" ref={particlesRef} aria-hidden="true"></div>
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-badge">
            <span>5 años de experiencia</span>
          </span>
          <h1 id="hero-title" className="hero-title">
            <span className="typewriter" id="typewriter" ref={typewriterRef}>
              Cuida tu vista con los mejores
            </span>
          </h1>
          <p className="hero-description">Exámenes completos y la mejor variedad de monturas</p>
          <div className="hero-buttons">
            <a
              href="#contacto"
              className="btn btn-primary btn-ripple"
              onClick={(e) => handleNavClick(e, '#contacto')}
            >
              <span>Pide tu cita</span>
            </a>
            <a
              href="https://wa.me/c/584264869006"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-ripple"
            >
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                WhatsApp
              </span>
            </a>
          </div>
          <div className="hero-info">
            <div className="info-item">
              <span className="info-label">Horario</span>
              <span className="info-value">Lun-Sáb 8am a 5pm</span>
            </div>
            <div className="info-item">
              <span className="info-label">Sucursales</span>
              <span className="info-value">4 ubicaciones</span>
            </div>
            <div className="info-item">
              <span className="info-label">Contacto</span>
              <span className="info-value">0426-4869006</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-decoration">
            <div className="decoration-shape decoration-shape-1"></div>
            <div className="decoration-shape decoration-shape-2"></div>
            <div className="decoration-shape decoration-shape-3"></div>
            <div className="decoration-text">Calidad Visual</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;