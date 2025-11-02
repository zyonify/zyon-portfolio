import { useEffect } from 'react'
import './Showcases.css'
import { portfolioConfig } from '../config/portfolio.config'
import { trackSectionVisit } from '../services/achievementService'
import { useLanguage } from '../contexts/LanguageContext'

function TechnicalSkills() {
  const { t } = useLanguage()

  // Track section visits with Intersection Observer
  useEffect(() => {
    const skillsSection = document.getElementById('skills')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.id === 'skills') {
            trackSectionVisit('skills')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (skillsSection) observer.observe(skillsSection)

    return () => {
      if (skillsSection) observer.unobserve(skillsSection)
    }
  }, [])

  return (
    <section id="skills" className="showcase-card card tech-stack">
      <div className="card-header">{t.technicalSkills}</div>
      <div className="skills-showcase">
        {Object.entries(portfolioConfig.technicalSkills).map(([category, skills]) => (
          <div key={category} className="skill-category">
            <h3 className="skill-category-title">{category}</h3>
            <div className="skill-tags">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TechnicalSkills
