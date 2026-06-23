import { useRef } from 'react'
import './Button.css'

function Button({
  children,
  variant = 'primary',
  type = 'button',
  isLoading = false,
  onClick,
  className = '',
  href,
  target,
  rel,
  ...props
}) {
  const buttonRef = useRef(null)

  const handleRipple = (e) => {
    const btn = buttonRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const ripple = document.createElement('span')
    ripple.className = 'ripple'
    const size = Math.max(rect.width, rect.height)
    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = x - size / 2 + 'px'
    ripple.style.top = y - size / 2 + 'px'
    btn.appendChild(ripple)
    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  const handleClick = (e) => {
    if (isLoading) return
    handleRipple(e)
    if (onClick) onClick(e)
  }

  const btnClass = `btn btn-${variant} btn-ripple ${isLoading ? 'loading' : ''} ${className}`

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={btnClass}
        onClick={handleClick}
        {...props}
      >
        <span className="btn-text">{children}</span>
        <span className="btn-spinner" aria-hidden="true"></span>
      </a>
    )
  }

  return (
    <button
      ref={buttonRef}
      type={type}
      className={btnClass}
      onClick={handleClick}
      disabled={isLoading}
      {...props}
    >
      <span className="btn-text">{children}</span>
      <span className="btn-spinner" aria-hidden="true"></span>
    </button>
  )
}

export default Button