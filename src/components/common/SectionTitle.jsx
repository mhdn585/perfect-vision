import './SectionTitle.css'

function SectionTitle({ title, subtitle, className = '', neon = false }) {
  return (
    <>
      <h2 className={`section-title ${neon ? 'neon-text' : ''} ${className}`}>
        {title}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </>
  )
}

export default SectionTitle