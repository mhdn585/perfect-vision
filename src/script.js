(function() {
  'use strict';

  const App = {
    init: function() {
      this.menuToggle = document.getElementById('menuToggle');
      this.nav = document.getElementById('nav');
      this.contactForm = document.getElementById('contactForm');
      this.navLinks = document.querySelectorAll('.nav-list a');
      this.themeToggle = document.getElementById('themeToggle');
      this.themeIcon = document.querySelector('.theme-icon');
      this.header = document.getElementById('header');
      this.backToTop = document.getElementById('backToTop');
      this.progressBar = document.getElementById('progressBar');
      this.toastContainer = document.getElementById('toastContainer');
      this.submitBtn = document.getElementById('submitBtn');

      this.setupRippleEffect();
      this.setupParticles();
      this.setupTypewriter();
      this.setupCard3D();
      this.setupStatsCounter();
      this.setupMenuToggle();
      this.setupContactForm();
      this.setupNavLinks();
      this.setupScrollSpy();
      this.setupThemeToggle();
      this.setupScrollAnimations();
      this.setupProgressBar();
      this.setupBackToTop();
      this.setupHeaderScroll();
      this.setupReducedMotion();
      this.setupFocusVisible();
    },

    setupRippleEffect: function() {
      const buttons = document.querySelectorAll('.btn-ripple');
      buttons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const ripple = document.createElement('span');
          ripple.className = 'ripple';
          const size = Math.max(rect.width, rect.height);
          ripple.style.width = ripple.style.height = size + 'px';
          ripple.style.left = x - size/2 + 'px';
          ripple.style.top = y - size/2 + 'px';
          btn.appendChild(ripple);
          setTimeout(function() {
            ripple.remove();
          }, 600);
        });
      });
    },

    setupParticles: function() {
      const container = document.getElementById('heroParticles');
      if (!container) return;
      const count = window.innerWidth < 768 ? 30 : 60;
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        container.appendChild(particle);
      }
    },

    setupTypewriter: function() {
      const element = document.getElementById('typewriter');
      if (!element) return;
      const texts = ['Cuida tu vista con los mejores', 'Visión clara, vida plena', 'Tu mirada es nuestra prioridad'];
      let textIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let currentText = '';

      function typeEffect() {
        const fullText = texts[textIndex];
        if (isDeleting) {
          currentText = fullText.substring(0, charIndex - 1);
          charIndex--;
        } else {
          currentText = fullText.substring(0, charIndex + 1);
          charIndex++;
        }
        element.textContent = currentText;
        if (!isDeleting && charIndex === fullText.length) {
          isDeleting = true;
          setTimeout(typeEffect, 2000);
          return;
        }
        if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          setTimeout(typeEffect, 500);
          return;
        }
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
      }
      setTimeout(typeEffect, 500);
    },

    setupCard3D: function() {
      const cards = document.querySelectorAll('.card-3d');
      cards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;
          card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
        });
      });
    },

    setupStatsCounter: function() {
      const stats = document.querySelectorAll('.stat-number');
      let hasAnimated = false;

      function animateStats() {
        if (hasAnimated) return;
        const container = document.getElementById('statsContainer');
        if (!container) return;
        const rect = container.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          hasAnimated = true;
          stats.forEach(function(stat) {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = Math.ceil(target / 40);
            const timer = setInterval(function() {
              current += increment;
              if (current >= target) {
                stat.textContent = target + (target === 100 ? '%' : '');
                clearInterval(timer);
              } else {
                stat.textContent = current;
              }
            }, 30);
          });
        }
      }
      window.addEventListener('scroll', animateStats, { passive: true });
      setTimeout(animateStats, 500);
    },

    setupMenuToggle: function() {
      if (!this.menuToggle || !this.nav) return;
      this.menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        this.nav.classList.toggle('active');
        const expanded = this.nav.classList.contains('active');
        this.menuToggle.setAttribute('aria-expanded', expanded);
        this.menuToggle.setAttribute('aria-label', expanded ? 'Cerrar menú' : 'Abrir menú');
      }.bind(this));
      document.addEventListener('click', function(e) {
        if (this.nav.classList.contains('active') &&
            !this.nav.contains(e.target) &&
            !this.menuToggle.contains(e.target)) {
          this.nav.classList.remove('active');
          this.menuToggle.setAttribute('aria-expanded', 'false');
          this.menuToggle.setAttribute('aria-label', 'Abrir menú');
        }
      }.bind(this));
    },

    setupContactForm: function() {
      if (!this.contactForm) return;
      this.contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const telefono = document.getElementById('telefono');
        const mensaje = document.getElementById('mensaje');
        let isValid = true;
        const fields = [
          { el: nombre, error: 'Por favor ingresa tu nombre' },
          { el: email, error: 'Por favor ingresa un email válido' },
          { el: mensaje, error: 'Por favor ingresa tu mensaje' }
        ];
        fields.forEach(function(field) {
          const group = field.el.closest('.form-group');
          const errorEl = group ? group.querySelector('.form-error') : null;
          if (group) group.classList.remove('error', 'success');
          if (!field.el.value.trim() || (field.el.type === 'email' && !App.isValidEmail(field.el.value.trim()))) {
            if (group) group.classList.add('error');
            if (errorEl) errorEl.textContent = field.error;
            isValid = false;
          } else if (field.el.type === 'email' && App.isValidEmail(field.el.value.trim())) {
            if (group) group.classList.add('success');
          } else {
            if (group) group.classList.add('success');
          }
        });
        if (!isValid) {
          App.showNotification('Por favor corrige los campos marcados', 'error');
          return;
        }
        const formData = {
          nombre: nombre.value.trim(),
          email: email.value.trim(),
          telefono: telefono ? telefono.value.trim() : '',
          mensaje: mensaje.value.trim()
        };
        console.log('Formulario enviado:', formData);
        if (App.submitBtn) {
          App.submitBtn.classList.add('loading');
          App.submitBtn.disabled = true;
        }
        setTimeout(function() {
          if (App.submitBtn) {
            App.submitBtn.classList.remove('loading');
            App.submitBtn.disabled = false;
          }
          App.showNotification('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
          App.contactForm.reset();
          document.querySelectorAll('.form-group').forEach(function(g) {
            g.classList.remove('success');
          });
        }, 1500);
      }.bind(this));
    },

    isValidEmail: function(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    showNotification: function(message, type) {
      if (!this.toastContainer) return;
      const icons = { success: '✅', error: '❌', info: 'ℹ️' };
      const toast = document.createElement('div');
      toast.className = 'toast toast-' + type;
      toast.innerHTML = '<span class="toast-icon">' + (icons[type] || 'ℹ️') + '</span><span>' + message + '</span>';
      this.toastContainer.appendChild(toast);
      setTimeout(function() {
        toast.classList.add('toast-out');
        setTimeout(function() {
          if (toast.parentNode) toast.remove();
        }, 400);
      }, 4000);
    },

    setupNavLinks: function() {
      this.navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          if (this.nav && this.nav.classList.contains('active')) {
            this.nav.classList.remove('active');
            this.menuToggle.setAttribute('aria-expanded', 'false');
            this.menuToggle.setAttribute('aria-label', 'Abrir menú');
          }
          const targetId = link.getAttribute('href');
          if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
              const offset = 80;
              const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
              window.scrollTo({ top: top, behavior: 'smooth' });
              link.setAttribute('aria-current', 'page');
              this.navLinks.forEach(function(l) {
                if (l !== link) l.removeAttribute('aria-current');
              });
            }
          }
        }.bind(this));
      }.bind(this));
    },

    setupScrollSpy: function() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = this.navLinks;
      if (!sections.length || !navLinks.length) return;
      let ticking = false;
      window.addEventListener('scroll', function() {
        if (!ticking) {
          window.requestAnimationFrame(function() {
            let currentSection = '';
            sections.forEach(function(section) {
              const rect = section.getBoundingClientRect();
              if (rect.top <= 120 && rect.bottom > 120) {
                currentSection = section.getAttribute('id');
              }
            });
            navLinks.forEach(function(link) {
              const href = link.getAttribute('href');
              if (href === '#' + currentSection) {
                link.setAttribute('aria-current', 'page');
              } else {
                link.removeAttribute('aria-current');
              }
            });
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    },

    setupThemeToggle: function() {
      if (!this.themeToggle) return;
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      this.updateThemeIcon(savedTheme);
      this.themeToggle.addEventListener('click', function() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        this.updateThemeIcon(next);
        this.themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(function() {
          this.themeToggle.style.transform = '';
        }.bind(this), 500);
      }.bind(this));
    },

    updateThemeIcon: function(theme) {
      if (this.themeIcon) {
        this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
      }
    },

    setupScrollAnimations: function() {
      const elements = document.querySelectorAll('.card, .testimonial-card, .stat, .detail-item');
      if (!elements.length) return;
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      elements.forEach(function(el) {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
      });
      setTimeout(function() {
        elements.forEach(function(el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
            el.style.animationPlayState = 'running';
          }
        });
      }, 200);
    },

    setupProgressBar: function() {
      if (!this.progressBar) return;
      window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        this.progressBar.style.width = progress + '%';
        this.progressBar.setAttribute('aria-valuenow', Math.round(progress));
      }.bind(this), { passive: true });
    },

    setupBackToTop: function() {
      if (!this.backToTop) return;
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
          this.backToTop.classList.add('visible');
        } else {
          this.backToTop.classList.remove('visible');
        }
      }.bind(this), { passive: true });
      this.backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },

    setupHeaderScroll: function() {
      if (!this.header) return;
      let lastScroll = 0;
      window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
          this.header.classList.add('scrolled');
        } else {
          this.header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
      }.bind(this), { passive: true });
    },

    setupReducedMotion: function() {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (prefersReduced.matches) {
        document.documentElement.style.setProperty('--transition', '0.01s ease');
        document.querySelectorAll('.card, .testimonial-card, .stat').forEach(function(el) {
          el.style.animationDuration = '0.01ms';
        });
      }
    },

    setupFocusVisible: function() {
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
          document.body.classList.add('user-is-tabbing');
        }
      });
      document.addEventListener('mousedown', function() {
        document.body.classList.remove('user-is-tabbing');
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      App.init();
    });
  } else {
    App.init();
  }

})();