import './SectionTitle.css';

function SectionTitle({ 
  title, 
  subtitle, 
  className = '', 
  neon = false,
  glass = false,
  gradient = false,
  align = 'center'
}) {
  const titleClass = `section-title ${
    neon ? 'neon-text' : ''
  } ${
    glass ? 'glass-title' : ''
  } ${
    gradient ? 'gradient-text' : ''
  } ${
    align === 'center' ? 'text-center' : align === 'left' ? 'text-left' : 'text-right'
  } ${className}`;

  const subtitleClass = `section-subtitle ${
    align === 'center' ? 'text-center' : align === 'left' ? 'text-left' : 'text-right'
  }`;

  return (
    <div className="section-header">
      <h2 className={titleClass}>
        {title}
      </h2>
      {subtitle && <p className={subtitleClass}>{subtitle}</p>}
    </div>
  );
}

export default SectionTitle;