export function createRipple(e, element) {
  const rect = element.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const ripple = document.createElement('span')
  ripple.className = 'ripple'
  const size = Math.max(rect.width, rect.height)
  ripple.style.width = ripple.style.height = size + 'px'
  ripple.style.left = x - size / 2 + 'px'
  ripple.style.top = y - size / 2 + 'px'
  element.appendChild(ripple)
  setTimeout(() => {
    ripple.remove()
  }, 600)
}

export function animateNumber(element, target, suffix = '') {
  let current = 0
  const increment = Math.ceil(target / 40)
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target + suffix
      clearInterval(timer)
    } else {
      element.textContent = current
    }
  }, 30)
}

export function createParticles(container, count = 60) {
  if (!container) return
  const actualCount = window.innerWidth < 768 ? 30 : count
  for (let i = 0; i < actualCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    const size = Math.random() * 4 + 2
    particle.style.width = size + 'px'
    particle.style.height = size + 'px'
    particle.style.left = Math.random() * 100 + '%'
    particle.style.animationDuration = (Math.random() * 20 + 10) + 's'
    particle.style.animationDelay = (Math.random() * 10) + 's'
    particle.style.opacity = Math.random() * 0.3 + 0.1
    container.appendChild(particle)
  }
}

export function clearParticles(container) {
  if (!container) return
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
}

export function typewriterEffect(element, texts, speed = 100, deleteSpeed = 50, pauseDelay = 2000) {
  if (!element) return
  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  let currentText = ''
  let timeoutId = null

  function typeEffect() {
    const fullText = texts[textIndex]
    if (isDeleting) {
      currentText = fullText.substring(0, charIndex - 1)
      charIndex--
    } else {
      currentText = fullText.substring(0, charIndex + 1)
      charIndex++
    }
    element.textContent = currentText
    if (!isDeleting && charIndex === fullText.length) {
      isDeleting = true
      timeoutId = setTimeout(typeEffect, pauseDelay)
      return
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      timeoutId = setTimeout(typeEffect, 500)
      return
    }
    const nextSpeed = isDeleting ? deleteSpeed : speed
    timeoutId = setTimeout(typeEffect, nextSpeed)
  }

  timeoutId = setTimeout(typeEffect, 500)

  return () => {
    if (timeoutId) clearTimeout(timeoutId)
  }
}

export function handle3DCard(e, element) {
  const rect = element.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = (y - centerY) / 20
  const rotateY = (centerX - x) / 20
  element.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-10px) scale(1.02)'
}

export function reset3DCard(element) {
  element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)'
}