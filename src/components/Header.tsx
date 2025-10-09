import { useState, useEffect } from 'react'
import './Header.css'
import { portfolioConfig, getWorkStatusConfig } from '../config/portfolio.config'

function Header() {
  const statusConfig = getWorkStatusConfig(portfolioConfig.workStatus.status)
  const [activeSection, setActiveSection] = useState('profile')

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()

    // Immediately set the active section
    setActiveSection(sectionId)

    const section = document.getElementById(sectionId)
    if (section) {
      const headerOffset = 80
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      // Add highlight animation
      section.classList.add('highlight-pulse')
      setTimeout(() => {
        section.classList.remove('highlight-pulse')
      }, 2000)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['profile', 'projects', 'contact', 'skills']

      // Get the center of the viewport for more accurate detection
      const scrollPosition = window.scrollY + window.innerHeight / 3

      let currentSection = 'profile'
      let closestDistance = Infinity

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const rect = section.getBoundingClientRect()
          const sectionTop = rect.top + window.scrollY
          const sectionMiddle = sectionTop + (rect.height / 2)

          // Calculate distance from scroll position to section middle
          const distance = Math.abs(scrollPosition - sectionMiddle)

          // The section with the smallest distance is the active one
          if (distance < closestDistance) {
            closestDistance = distance
            currentSection = sectionId
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <img src={`${import.meta.env.BASE_URL}zyonify-logo.png`} alt="Zyonify Logo" className="logo-img" />
            <span className="logo-text">ZYON'S PORTFOLIO</span>
          </div>
          <nav className="nav">
            <a
              href="#profile"
              className={`nav-link ${activeSection === 'profile' ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, 'profile')}
            >
              Profile
            </a>
            <a
              href="#projects"
              className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, 'projects')}
            >
              Projects
            </a>
            <a
              href="#contact"
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, 'contact')}
            >
              Contact
            </a>
            <a
              href="#skills"
              className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, 'skills')}
            >
              Skills
            </a>
          </nav>
        </div>
        <div className="header-right">
          <div className={`status-badge ${statusConfig.badge}`} style={{ borderColor: statusConfig.color }}>
            <span className="status-dot" style={{ background: statusConfig.color, boxShadow: `0 0 8px ${statusConfig.color}` }}></span>
            {portfolioConfig.workStatus.message}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
