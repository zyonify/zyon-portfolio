import { useState, useEffect } from 'react'
import './ProfileStats.css'
import { getYearsOfExperience, portfolioConfig, getWorkStatusConfig } from '../config/portfolio.config'
import { fetchUserProfile, getStats } from '../services/github'

// Calculate developer level based on GitHub stats
function calculateLevel(stats: { repos: number; followers: number; stars: number; years: number }) {
  // XP formula: repos * 100 + followers * 50 + stars * 10 + years * 500
  const xp = stats.repos * 100 + stats.followers * 50 + stats.stars * 10 + stats.years * 500

  // Level up every 2000 XP
  const level = Math.floor(xp / 2000) + 1
  const currentLevelXP = xp % 2000
  const nextLevelXP = 2000
  const progress = (currentLevelXP / nextLevelXP) * 100

  return { level, currentLevelXP, nextLevelXP, progress, totalXP: xp }
}

function ProfileStats() {
  const [repos, setRepos] = useState<number>(0)
  const [followers, setFollowers] = useState<number>(0)
  const [stars, setStars] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const yearsOfExperience = getYearsOfExperience()
  const statusConfig = getWorkStatusConfig(portfolioConfig.workStatus.status)

  const stats = { repos, followers, stars, years: yearsOfExperience }
  const { level, currentLevelXP, nextLevelXP, progress } = calculateLevel(stats)

  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        const profile = await fetchUserProfile()
        const repoStats = await getStats()

        if (profile) {
          setRepos(profile.public_repos)
          setFollowers(profile.followers)
        }

        if (repoStats) {
          setStars(repoStats.totalStars)
        }
      } catch (error) {
        console.error('Error loading GitHub data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadGitHubData()
  }, [])

  return (
    <div className="profile-stats-card card">
      <div className="card-header">Developer Level</div>

      {/* Level Badge */}
      <div className="level-section">
        <div className="level-display">
          <div className="level-circle">
            <svg className="level-ring" viewBox="0 0 120 120">
              <circle
                className="level-ring-bg"
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="rgba(26, 159, 255, 0.1)"
                strokeWidth="8"
              />
              <circle
                className="level-ring-progress"
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 54}`}
                strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
                transform="rotate(-90 60 60)"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-blue)" />
                  <stop offset="100%" stopColor="var(--accent-blue-hover)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="level-number">{loading ? '...' : level}</div>
          </div>
          <div className="level-info">
            <h3 className="level-title">Level {loading ? '...' : level} Developer</h3>
            <p className="level-subtitle">{yearsOfExperience}+ Years Experience</p>
            <div className="work-status-badge" style={{ borderColor: statusConfig.color }}>
              <span className="status-dot" style={{ background: statusConfig.color, boxShadow: `0 0 8px ${statusConfig.color}` }}></span>
              {portfolioConfig.workStatus.message}
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="xp-progress">
          <div className="xp-bar-container">
            <div className="xp-bar-fill" style={{ width: `${progress}%` }}>
              <div className="xp-bar-glow"></div>
            </div>
          </div>
          <div className="xp-text">
            {loading ? 'Loading...' : `${currentLevelXP.toLocaleString()} / ${nextLevelXP.toLocaleString()} XP`}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="profile-stats-badges">
        <div className="stat-badge projects-badge">
          <span className="stat-badge-label">Repositories</span>
          <span className="stat-badge-value">{loading ? '...' : repos}</span>
          <span className="stat-badge-xp">+{(repos * 100).toLocaleString()} XP</span>
        </div>
        <div className="stat-badge followers-badge">
          <span className="stat-badge-label">Followers</span>
          <span className="stat-badge-value">{loading ? '...' : followers}</span>
          <span className="stat-badge-xp">+{(followers * 50).toLocaleString()} XP</span>
        </div>
        <div className="stat-badge stars-badge">
          <span className="stat-badge-label">Total Stars</span>
          <span className="stat-badge-value">{loading ? '...' : stars}</span>
          <span className="stat-badge-xp">+{(stars * 10).toLocaleString()} XP</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileStats
