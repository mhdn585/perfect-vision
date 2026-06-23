import { useEffect, useRef } from 'react'

export function useIntersectionObserver(options = {}) {
  const elementRef = useRef(null)
  const isVisibleRef = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          element.style.animationPlayState = 'running'
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options }
    )

    element.style.animationPlayState = 'paused'
    observer.observe(element)

    const checkVisibility = () => {
      const rect = element.getBoundingClientRect()
      if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
        element.style.animationPlayState = 'running'
        isVisibleRef.current = true
      }
    }

    setTimeout(checkVisibility, 200)

    return () => {
      observer.unobserve(element)
    }
  }, [options])

  return elementRef
}