import { useState, useEffect, useRef } from 'react'
import './StatsSection.css'
import { getStats } from '../services/github'
import { ProcessedStats } from '../types'
import { trackSectionVisit } from '../services/achievementService'

// Animated counter hook
function useCountUp(end: number, duration: number = 2000, shouldStart: boolean = false) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!shouldStart || started) return

    setStarted(true)
    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)

      // Easing function (ease-out)
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(startValue + (end - startValue) * easeProgress)

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, shouldStart, started])

  return count
}

function StatsSection() {
  const [stats, setStats] = useState<ProcessedStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true)
        const data = await getStats()
        setStats(data)
      } catch (error) {
        console.error('Error loading stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  // Intersection Observer to trigger animation when visible
  useEffect(() => {
    // If data is loaded and not already animating, start immediately
    if (!loading && stats && !isVisible) {
      // Small delay to ensure component is mounted
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [loading, stats, isVisible])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          // Track stats section visit for achievement
          trackSectionVisit('stats')
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  const animatedProjects = useCountUp(stats?.totalProjects || 0, 2000, isVisible && !loading)
  const animatedStars = useCountUp(stats?.totalStars || 0, 2000, isVisible && !loading)
  const animatedForks = useCountUp(stats?.totalForks || 0, 2000, isVisible && !loading)

  if (loading || !stats) {
    return (
      <div className="stats-section" id="stats">
        <section className="card stats-card">
          <div className="card-header">GitHub Stats</div>
          <div className="stats-content">
            <p className="loading-text">Loading stats...</p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="stats-section" id="stats" ref={sectionRef}>
      <section className="card stats-card">
        <div className="card-header">GitHub Stats</div>
        <div className="stats-content">
          <div className="stat-row">
            <span className="stat-label">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/>
              </svg>
              Total Projects
            </span>
            <span className="stat-value animated-counter">{animatedProjects.toLocaleString()}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
              </svg>
              Total Stars
            </span>
            <span className="stat-value animated-counter">{animatedStars.toLocaleString()}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
              </svg>
              Total Forks
            </span>
            <span className="stat-value animated-counter">{animatedForks.toLocaleString()}</span>
          </div>

          <div className="completion-section">
            <div className="completion-header">
              <span className="stat-label">Active Projects</span>
              <span className="completion-percentage">{stats.completionRate}%</span>
            </div>
            <div className="completion-bar">
              <div className="completion-fill" style={{ width: `${stats.completionRate}%` }}></div>
            </div>
            <p className="completion-note">Updated in the last year</p>
          </div>

          <div className="languages-section">
            <div className="stat-label">Top Languages</div>

            {/* Donut Chart */}
            <div className="language-chart">
              <svg viewBox="0 0 200 200" className="donut-chart">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="rgba(27, 40, 56, 0.8)"
                  strokeWidth="30"
                />
                {stats.languages.reduce((acc, lang, index) => {
                  const previousPercentages = stats.languages
                    .slice(0, index)
                    .reduce((sum, l) => sum + l.percentage, 0)
                  const circumference = 2 * Math.PI * 80
                  const offset = circumference - (previousPercentages / 100) * circumference
                  const dashArray = `${(lang.percentage / 100) * circumference} ${circumference}`

                  return [
                    ...acc,
                    <circle
                      key={lang.name}
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke={lang.color}
                      strokeWidth="30"
                      strokeDasharray={dashArray}
                      strokeDashoffset={-offset}
                      transform="rotate(-90 100 100)"
                      className="language-segment"
                      style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                    />
                  ]
                }, [] as React.ReactElement[])}
                <text
                  x="100"
                  y="100"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="chart-center-text"
                  fontSize="14"
                  fill="var(--text-secondary)"
                >
                  {stats.languages.length}
                </text>
                <text
                  x="100"
                  y="115"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="chart-center-label"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  languages
                </text>
              </svg>
            </div>

            <div className="languages-bars">
              {stats.languages.map(lang => (
                <div key={lang.name} className="language-bar" title={`${lang.name}: ${lang.percentage}%`}>
                  <div
                    className="language-fill"
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color
                    }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="languages-legend">
              {stats.languages.map(lang => (
                <div key={lang.name} className="language-item">
                  <span
                    className="language-dot"
                    style={{ backgroundColor: lang.color }}
                  ></span>
                  <span className="language-name">{lang.name}</span>
                  <span className="language-percentage">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StatsSection
