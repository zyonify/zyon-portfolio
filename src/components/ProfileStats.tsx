import { useState, useEffect } from 'react'
import './ProfileStats.css'
import { getYearsOfExperience, portfolioConfig, getWorkStatusConfig } from '../config/portfolio.config'
import { fetchUserProfile, getStats } from '../services/github'
import { calculateXPFromSources, calculateLevelFromXP } from '../utils/steamXP'
import { getLevelBorderStyle } from '../utils/steamLevelColors'
import { useLanguage } from '../contexts/LanguageContext'
import { getAchievementStats, onAchievementUnlock } from '../services/achievementService'

// Calculate developer level based on GitHub stats + achievements using Steam-like XP system
function calculateLevel(stats: { repos: number; followers: number; stars: number; years: number; achievementsXP?: number }) {
  // Calculate total XP from all sources including achievements
  const totalXP = calculateXPFromSources(stats)

  // Use Steam-like leveling system
  return calculateLevelFromXP(totalXP)
}

// Extract colors from gradient string for SVG
function extractGradientColors(gradientString: string): { start: string; end: string } {
  // Extract colors from gradient string like "linear-gradient(135deg, #F39C12, #E67E22)"
  const colorMatches = gradientString.match(/#[0-9A-Fa-f]{6}/g)
  if (colorMatches && colorMatches.length >= 2) {
    return { start: colorMatches[0], end: colorMatches[1] }
  }
  // Fallback to first color if only one found
  if (colorMatches && colorMatches.length === 1) {
    return { start: colorMatches[0], end: colorMatches[0] }
  }
  // Fallback
  return { start: '#4A90E2', end: '#357ABD' }
}

function ProfileStats() {
  const [repos, setRepos] = useState<number>(0)
  const [followers, setFollowers] = useState<number>(0)
  const [stars, setStars] = useState<number>(0)
  const [achievementsXP, setAchievementsXP] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const yearsOfExperience = getYearsOfExperience()
  const statusConfig = getWorkStatusConfig(portfolioConfig.workStatus.status)
  const { t } = useLanguage()

  const stats = { repos, followers, stars, years: yearsOfExperience, achievementsXP }
  const { level, currentLevelXP, nextLevelXP, progress } = calculateLevel(stats)
  const levelStyle = getLevelBorderStyle(level)

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

  // Load achievement XP and listen for unlocks
  useEffect(() => {
    // Load initial achievement XP
    const achievementStats = getAchievementStats()
    setAchievementsXP(achievementStats.totalXP)

    // Listen for new achievement unlocks
    const unsubscribe = onAchievementUnlock(() => {
      const updatedStats = getAchievementStats()
      setAchievementsXP(updatedStats.totalXP)
    })

    return unsubscribe
  }, [])

  // CSS custom properties for dynamic level styling
  const levelCSSVars = {
    '--level-color': levelStyle.color,
    '--level-glow-color': levelStyle.glow || levelStyle.color,
    '--level-badge-bg': `${levelStyle.color}15`,
  } as React.CSSProperties

  // Extract gradient colors for SVG
  const gradientColors = levelStyle.gradient ? extractGradientColors(levelStyle.gradient) : { start: levelStyle.color, end: levelStyle.color }

  return (
    <div className="profile-stats-card card" style={levelCSSVars}>
      <div className="card-header">{t.developerLevel}</div>

      {/* Level Badge */}
      <div className="level-section">
        <div className="level-display">
          <div className="level-circle">
            <svg
              className={`level-ring ${levelStyle.glow ? 'has-glow' : ''} ${levelStyle.shimmer ? 'has-shimmer' : ''} ${levelStyle.rainbow ? 'has-rainbow' : ''}`}
              viewBox="0 0 120 120"
            >
              <defs>
                {levelStyle.rainbow ? (
                  <linearGradient id={`level-gradient-${level}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF0080" />
                    <stop offset="16%" stopColor="#FF8C00" />
                    <stop offset="33%" stopColor="#FFD700" />
                    <stop offset="50%" stopColor="#00FF00" />
                    <stop offset="66%" stopColor="#00D4FF" />
                    <stop offset="83%" stopColor="#0080FF" />
                    <stop offset="100%" stopColor="#8000FF" />
                  </linearGradient>
                ) : levelStyle.gradient ? (
                  <linearGradient id={`level-gradient-${level}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={gradientColors.start} />
                    <stop offset="100%" stopColor={gradientColors.end} />
                  </linearGradient>
                ) : null}
              </defs>
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={levelStyle.gradient || levelStyle.rainbow ? `url(#level-gradient-${level})` : levelStyle.color}
                strokeWidth="8"
              />
            </svg>
            <div className={`level-number ${levelStyle.glow ? 'has-glow' : ''} ${levelStyle.rainbow ? 'has-rainbow' : ''}`}>
              {loading ? '...' : level}
            </div>
          </div>
          <div className="level-info">
            <h3 className="level-title">{t.level} {loading ? '...' : level} {t.developer}</h3>
            <p className="level-subtitle">{yearsOfExperience}+ {t.yearsOfExperience}</p>
            <div className="work-status-badge" style={{ borderColor: statusConfig.color }}>
              <span className="status-dot" style={{ background: statusConfig.color, boxShadow: `0 0 8px ${statusConfig.color}` }}></span>
              {t.workStatus}
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
            {loading ? t.loading : `${currentLevelXP.toLocaleString()} / ${nextLevelXP.toLocaleString()} XP`}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="profile-stats-badges">
        <div className="stat-badge projects-badge">
          <span className="stat-badge-label">{t.repositories}</span>
          <span className="stat-badge-value">{loading ? '...' : repos}</span>
          <span className="stat-badge-xp">+{(repos * 100).toLocaleString()} XP</span>
        </div>
        <div className="stat-badge followers-badge">
          <span className="stat-badge-label">{t.followers}</span>
          <span className="stat-badge-value">{loading ? '...' : followers}</span>
          <span className="stat-badge-xp">+{(followers * 50).toLocaleString()} XP</span>
        </div>
        <div className="stat-badge stars-badge">
          <span className="stat-badge-label">{t.totalStars}</span>
          <span className="stat-badge-value">{loading ? '...' : stars}</span>
          <span className="stat-badge-xp">+{(stars * 10).toLocaleString()} XP</span>
        </div>
        <div className="stat-badge experience-badge">
          <span className="stat-badge-label">{t.yearsOfExperience}</span>
          <span className="stat-badge-value">{yearsOfExperience}+</span>
          <span className="stat-badge-xp">+{(yearsOfExperience * 500).toLocaleString()} XP</span>
        </div>
        <div className="stat-badge achievements-badge">
          <span className="stat-badge-label">{t.achievements}</span>
          <span className="stat-badge-value">{achievementsXP > 0 ? `${getAchievementStats().unlockedCount}/${getAchievementStats().totalCount}` : '0/18'}</span>
          <span className="stat-badge-xp">+{achievementsXP.toLocaleString()} XP</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileStats
