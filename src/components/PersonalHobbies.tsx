import { useEffect } from 'react'
import './Showcases.css'
import { portfolioConfig } from '../config/portfolio.config'
import { unlockAchievement, trackSectionVisit } from '../services/achievementService'
import { useLanguage } from '../contexts/LanguageContext'

function PersonalHobbies() {
  const { t } = useLanguage()

  // Track section visits with Intersection Observer
  useEffect(() => {
    const hobbiesSection = document.querySelector('.hobbies-showcase')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.classList.contains('hobbies-showcase')) {
            trackSectionVisit('hobbies')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (hobbiesSection) observer.observe(hobbiesSection)

    return () => {
      if (hobbiesSection) observer.unobserve(hobbiesSection)
    }
  }, [])

  return (
    <section className="showcase-card card hobbies-showcase">
      <div className="card-header">{t.personalHobbies}</div>
      <div className="hobbies-grid">
        {portfolioConfig.hobbies.map(hobby => (
          <div
            key={hobby.id}
            className="hobby-card"
            onClick={() => {
              if (hobby.id === 3) {
                unlockAchievement('fellow-gamer')
              }
            }}
          >
            <div className="hobby-icon">{hobby.icon}</div>
            <div className="hobby-content">
              <div className="hobby-header">
                <h4 className="hobby-title">{hobby.title}</h4>
                {hobby.status && (
                  <span className="hobby-status">{hobby.status}</span>
                )}
              </div>
              <p className="hobby-description">{hobby.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PersonalHobbies
