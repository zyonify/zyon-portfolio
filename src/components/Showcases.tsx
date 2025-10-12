import { useState, useEffect } from 'react'
import './Showcases.css'
import { portfolioConfig } from '../config/portfolio.config'
import { getFeaturedProject } from '../services/github'
import { ProcessedProject } from '../types'
import { unlockAchievement, trackAchievementHover, trackSectionVisit } from '../services/achievementService'
import { useLanguage } from '../contexts/LanguageContext'

function Showcases() {
  const [featuredProjects, setFeaturedProjects] = useState<ProcessedProject[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const loadFeaturedProjects = async () => {
      try {
        setLoading(true)
        const projects = await Promise.all(
          portfolioConfig.featuredProjects
            .filter(p => p.featured)
            .map(p => getFeaturedProject(portfolioConfig.social.github, p.repo))
        )
        setFeaturedProjects(projects.filter(p => p !== null) as ProcessedProject[])
      } catch (error) {
        console.error('Error loading featured projects:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedProjects()
  }, [])

  // Track section visits with Intersection Observer
  useEffect(() => {
    const projectsSection = document.getElementById('projects')
    const achievementsSection = document.querySelector('.achievements-showcase')
    const hobbiesSection = document.querySelector('.hobbies-showcase')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'projects') {
              trackSectionVisit('projects')
            } else if (entry.target.classList.contains('achievements-showcase')) {
              trackSectionVisit('achievements')
            } else if (entry.target.classList.contains('hobbies-showcase')) {
              trackSectionVisit('hobbies')
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    if (projectsSection) observer.observe(projectsSection)
    if (achievementsSection) observer.observe(achievementsSection)
    if (hobbiesSection) observer.observe(hobbiesSection)

    return () => {
      if (projectsSection) observer.unobserve(projectsSection)
      if (achievementsSection) observer.unobserve(achievementsSection)
      if (hobbiesSection) observer.unobserve(hobbiesSection)
    }
  }, [])

  return (
    <div className="showcases">
      {/* Featured Projects */}
      <section id="projects" className="showcase-card card featured-projects-section">
        <div className="card-header">{t.featuredProjects}</div>
        {loading ? (
          <div className="featured-projects-grid loading">
            <p className="loading-text">{t.loading}</p>
          </div>
        ) : featuredProjects.length > 0 ? (
          <div className="featured-projects-grid">
            {featuredProjects.map(project => (
              <div key={project.id} className="featured-project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="project-overlay">
                    <div className="project-stats">
                      <div className="stat">
                        <span className="stat-icon">⭐</span>
                        <span className="stat-value">{project.stars}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-icon">🍴</span>
                        <span className="stat-value">{project.forks}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.slice(0, 4).map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                      Code
                    </a>
                    {project.demo && (
                      <a href={project.demo} className="project-link primary" target="_blank" rel="noopener noreferrer">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                        </svg>
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="featured-projects-grid">
            <p className="error-text">Failed to load featured projects</p>
          </div>
        )}
      </section>

      {/* Achievements Showcase */}
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

      {/* Personal Hobbies */}
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

      {/* Technical Skills */}
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
    </div>
  )
}

export default Showcases
