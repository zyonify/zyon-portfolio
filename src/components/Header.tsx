import { useState, useEffect } from 'react'
import './Header.css'
import { getAchievementStats, onAchievementUnlock, trackLogoClick } from '../services/achievementService'

interface HeaderProps {
  onOpenAchievements: () => void
}

function Header({ onOpenAchievements }: HeaderProps) {
  const [activeSection, setActiveSection] = useState('profile')
  const [achievementStats, setAchievementStats] = useState(getAchievementStats())

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()

    // Immediately set the active section
    setActiveSection(sectionId)

    const section = document.getElementById(sectionId)
    if (section) {
      const headerOffset = 100
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

  // Update achievement stats when achievements are unlocked
  useEffect(() => {
    const unsubscribe = onAchievementUnlock(() => {
      setAchievementStats(getAchievementStats())
    })

    return unsubscribe
  }, [])

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

  const handleLogoClick = () => {
    trackLogoClick()
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo" onClick={handleLogoClick}>
            <img src="/zyonify-logo.png" alt="Zyonify Logo" className="logo-img" />
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
          <button
            className="achievement-badge-btn"
            onClick={onOpenAchievements}
            title="View Achievements"
          >
            <span className="achievement-icon">🏆</span>
            <span className="achievement-count">
              {achievementStats.unlockedCount}/{achievementStats.totalCount}
            </span>
            {achievementStats.unlockedCount > 0 && achievementStats.unlockedCount < achievementStats.totalCount && (
              <span className="achievement-badge-pulse"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
