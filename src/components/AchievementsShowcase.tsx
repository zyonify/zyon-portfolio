import { useEffect } from 'react'
import './Showcases.css'
import { portfolioConfig } from '../config/portfolio.config'
import { trackAchievementHover, trackSectionVisit } from '../services/achievementService'
import { useLanguage } from '../contexts/LanguageContext'

function AchievementsShowcase() {
  const { t } = useLanguage()

  // Track section visits with Intersection Observer
  useEffect(() => {
    const achievementsSection = document.querySelector('.achievements-showcase')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.classList.contains('achievements-showcase')) {
            trackSectionVisit('achievements')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (achievementsSection) observer.observe(achievementsSection)

    return () => {
      if (achievementsSection) observer.unobserve(achievementsSection)
    }
  }, [])

  return (
    <section className="showcase-card card achievements-showcase">
      <div className="card-header">{t.achievementShowcase}</div>
      <div className="achievements-grid">
        {portfolioConfig.achievements.slice(0, 6).map(achievement => (
          <div
            key={achievement.id}
            className={`achievement ${achievement.unlocked ? 'unlocked' : 'locked'} ${achievement.rarity || 'common'}`}
            data-rarity={achievement.rarity || 'common'}
            onMouseEnter={() => trackAchievementHover(achievement.id.toString())}
          >
            <div className="achievement-icon">
              {achievement.logo ? (
                <img src={achievement.logo} alt={achievement.title} className="achievement-logo" />
              ) : (
                achievement.icon
              )}
            </div>
            <div className="achievement-info">
              <div className="achievement-header">
                <h4 className="achievement-title">{achievement.title}</h4>
                {achievement.rarity && (
                  <span className={`rarity-badge ${achievement.rarity}`}>
                    {achievement.rarity.toUpperCase()}
                  </span>
                )}
              </div>
              <p className="achievement-description">{achievement.description}</p>
              {achievement.year && (
                <span className="achievement-year">Earned in {achievement.year}</span>
              )}
            </div>
            {achievement.unlocked && (
              <div className="achievement-check">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default AchievementsShowcase
