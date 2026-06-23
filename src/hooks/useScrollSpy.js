import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds, offset = 120) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = ''
      sectionIds.forEach((id) => {
        const section = document.getElementById(id)
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= offset && rect.bottom > offset) {
            currentSection = id
          }
        }
      })
      setActiveSection(currentSection)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeSection
}