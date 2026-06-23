import { useEffect, useState } from 'react'
import './Toast.css'

const icons = {
  success: '✅',
  error: '❌',
  info: 'ℹ️'
}

function Toast({ message, type = 'info', duration = 4000, onClose }) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        setIsVisible(false)
        if (onClose) onClose()
      }, 400)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <div className={`toast toast-${type} ${isExiting ? 'toast-out' : ''}`}>
      <span className="toast-icon">{icons[type] || icons.info}</span>
      <span>{message}</span>
    </div>
  )
}

export default Toast