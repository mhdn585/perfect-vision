import './ImageWrapper.css'

function ImageWrapper({ alt, overlayText, className = '', ...props }) {
  return (
    <div className={`image-wrapper ${className}`}>
      <div className="image-placeholder">
        <div className="placeholder-content">
          <span className="placeholder-icon" aria-hidden="true">✦</span>
          <span className="placeholder-text">{overlayText || 'Imagen'}</span>
        </div>
      </div>
      {overlayText && (
        <div className="image-overlay">
          <span className="overlay-text">{overlayText}</span>
        </div>
      )}
    </div>
  )
}

export default ImageWrapper