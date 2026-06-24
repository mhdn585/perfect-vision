import { useState, useEffect } from 'react'
import Toast from './Toast'
import '../../styles/components/toast-container.css'

function ToastContainer() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const handleShowToast = (event) => {
      const { message, type } = event.detail
      const id = Date.now()
      setToasts((prev) => [...prev, { id, message, type }])
    }

    window.addEventListener('showToast', handleShowToast)
    return () => window.removeEventListener('showToast', handleShowToast)
  }, [])

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  if (toasts.length === 0) return null

  return (
    <div className="toast-container" id="toastContainer" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}

export default ToastContainer