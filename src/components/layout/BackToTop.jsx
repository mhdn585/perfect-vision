import { useEffect, useState } from 'react'
import './ProgressBar.css'

function ProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progressValue = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(progressValue)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="progress-bar"
      id="progressBar"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin="0"
      aria-valuemax="100"
      style={{ width: `${progress}%` }}
    ></div>
  )
}

export default ProgressBar