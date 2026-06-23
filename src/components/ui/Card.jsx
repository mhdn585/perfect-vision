import './Card.css'

function Card({
  children,
  icon,
  title,
  description,
  className = '',
  tilt = false,
  glow = false,
  ...props
}) {
  const cardClassName = `card ${tilt ? 'card-3d' : ''} ${glow ? 'card-glow-container' : ''} ${className}`

  return (
    <article className={cardClassName} {...props}>
      {glow && <div className="card-glow"></div>}
      {icon && (
        <div className="card-icon" aria-hidden="true">
          {icon}
        </div>
      )}
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
      {children}
    </article>
  )
}

export default Card