import { useState, useEffect } from 'react'
import './StatsSection.css'
import { getStats } from '../services/github'
import { ProcessedStats } from '../types'

function StatsSection() {
  const [stats, setStats] = useState<ProcessedStats | null>(null)
  const [loading, setLoading] = useState(true)

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

  if (loading || !stats) {
    return (
      <div className="stats-section" id="skills">
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
    <div className="stats-section" id="skills">
      <section className="card stats-card">
        <div className="card-header">GitHub Stats</div>
        <div className="stats-content">
          <div className="stat-row">
            <span className="stat-label">Total Projects</span>
            <span className="stat-value">{stats.totalProjects}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Total Stars</span>
            <span className="stat-value">{stats.totalStars.toLocaleString()}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Total Forks</span>
            <span className="stat-value">{stats.totalForks.toLocaleString()}</span>
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
            <div className="languages-bars">
              {stats.languages.map(lang => (
                <div key={lang.name} className="language-bar">
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
