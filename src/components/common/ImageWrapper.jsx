import './ImageWrapper.css'

function ImageWrapper({ src, alt, overlayText, className = '', ...props }) {
  return (
    <div className={`image-wrapper ${className}`}>
      <img src={src} alt={alt} loading="lazy" {...props} />
      {overlayText && (
        <div className="image-overlay">
          <span className="overlay-text">{overlayText}</span>
        </div>
      )}
    </div>
  )
}

export default ImageWrapper