import { useEffect, useState } from 'react'
import { getReplayStats } from '../services/github'
import { GitHubReplayStats } from '../types'
import { useLanguage } from '../contexts/LanguageContext'
import './GitHubReplay.css'

export default function GitHubReplay() {
  const { t } = useLanguage()
  const [stats, setStats] = useState<GitHubReplayStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [isAnimating, setIsAnimating] = useState(false)

  const currentYear = new Date().getFullYear()
  const availableYears = [currentYear, currentYear - 1, currentYear - 2]

  useEffect(() => {
    loadStats()
  }, [selectedYear])

  const loadStats = async () => {
    setLoading(true)
    const data = await getReplayStats(undefined, selectedYear)
    setStats(data)
    setLoading(false)
  }

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % 6)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + 6) % 6)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  if (loading) {
    return (
      <div className="github-replay">
        <div className="replay-header">
          <h2>{t.replayTitle}</h2>
          <div className="year-selector">
            <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="replay-loading">
          <div className="loading-spinner"></div>
          <p>{t.replayLoading}</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="github-replay">
        <div className="replay-header">
          <h2>{t.replayTitle}</h2>
        </div>
        <div className="replay-error">
          <p>{t.replayError}</p>
        </div>
      </div>
    )
  }

  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return (
          <div className="slide slide-overview">
            <div className="slide-emoji">🎮</div>
            <h3>{t.replayOverviewTitle}</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{stats.totalCommits.toLocaleString()}</div>
                <div className="stat-label">{t.replayOverviewCommits}</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.mostActiveMonth}</div>
                <div className="stat-label">{t.replayOverviewMostActiveMonth}</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.longestStreak}</div>
                <div className="stat-label">{t.replayOverviewLongestStreak}</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.daysCoded}</div>
                <div className="stat-label">{t.replayOverviewDaysCoded}</div>
              </div>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="slide slide-language">
            <div className="slide-emoji">💻</div>
            <h3>{t.replayLanguageTitle}</h3>
            <div className="language-hero">
              <div
                className="language-circle"
                style={{ borderColor: stats.topLanguage.color }}
              >
                <div className="language-percentage">{stats.topLanguage.percentage}%</div>
                <div className="language-name">{stats.topLanguage.name}</div>
              </div>
              <p className="language-subtitle">
                {t.replayLanguageSubtitle.replace('{language}', stats.topLanguage.name)}
              </p>
            </div>
            <div className="language-breakdown">
              {stats.languageBreakdown.map((lang, index) => (
                <div key={index} className="language-bar">
                  <div className="language-info">
                    <span className="language-dot" style={{ backgroundColor: lang.color }}></span>
                    <span className="language-text">{lang.name}</span>
                    <span className="language-percent">{lang.percentage}%</span>
                  </div>
                  <div className="language-progress">
                    <div
                      className="language-fill"
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: lang.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="slide slide-impact">
            <div className="slide-emoji">⭐</div>
            <h3>{t.replayImpactTitle}</h3>
            <div className="impact-stats">
              <div className="impact-primary">
                <div className="impact-number">{stats.starsEarned.toLocaleString()}</div>
                <div className="impact-label">{t.replayImpactStarsEarned}</div>
              </div>
              <div className="impact-grid">
                <div className="impact-item">
                  <div className="impact-icon">🍴</div>
                  <div className="impact-value">{stats.forksGained}</div>
                  <div className="impact-text">{t.replayImpactForks}</div>
                </div>
                <div className="impact-item">
                  <div className="impact-icon">📦</div>
                  <div className="impact-value">{stats.reposCreated}</div>
                  <div className="impact-text">{t.replayImpactReposCreated}</div>
                </div>
              </div>
              {stats.topStarredRepo.name !== 'N/A' && (
                <div className="top-repo">
                  <p className="top-repo-label">{t.replayImpactTopRepo}</p>
                  <p className="top-repo-name">{stats.topStarredRepo.name}</p>
                  <p className="top-repo-stars">⭐ {stats.topStarredRepo.stars}</p>
                </div>
              )}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="slide slide-productivity">
            <div className="slide-emoji">⏰</div>
            <h3>{t.replayProductivityTitle}</h3>
            <div className="productivity-stats">
              <div className="productivity-row">
                <div className="productivity-card">
                  <div className="productivity-day">{stats.mostProductiveDay}</div>
                  <div className="productivity-label">{t.replayProductivityMostProductiveDay}</div>
                </div>
                <div className="productivity-card">
                  <div className="productivity-hour">
                    {stats.peakCodingHour === 0 ? '12 AM' :
                     stats.peakCodingHour < 12 ? `${stats.peakCodingHour} AM` :
                     stats.peakCodingHour === 12 ? '12 PM' :
                     `${stats.peakCodingHour - 12} PM`}
                  </div>
                  <div className="productivity-label">{t.replayProductivityPeakHour}</div>
                </div>
              </div>
              <div className="productivity-badges">
                {stats.lateNightCommits > 10 && (
                  <div className="badge">
                    <div className="badge-icon">🌙</div>
                    <div className="badge-text">{t.replayProductivityNightOwl}</div>
                    <div className="badge-count">{stats.lateNightCommits} commits after midnight</div>
                  </div>
                )}
                {stats.weekendCommits > 20 && (
                  <div className="badge">
                    <div className="badge-icon">🏖️</div>
                    <div className="badge-text">{t.replayProductivityWeekendWarrior}</div>
                    <div className="badge-count">{stats.weekendCommits} weekend commits</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="slide slide-collaboration">
            <div className="slide-emoji">🤝</div>
            <h3>{t.replayCollaborationTitle}</h3>
            <div className="collab-stats">
              <div className="collab-row">
                <div className="collab-item">
                  <div className="collab-number">{stats.pullRequestsCreated}</div>
                  <div className="collab-label">{t.replayCollaborationPrsCreated}</div>
                </div>
                <div className="collab-item">
                  <div className="collab-number">{stats.pullRequestsMerged}</div>
                  <div className="collab-label">{t.replayCollaborationPrsMerged}</div>
                </div>
                <div className="collab-item">
                  <div className="collab-number">{stats.issuesClosed}</div>
                  <div className="collab-label">{t.replayCollaborationIssuesClosed}</div>
                </div>
              </div>
              {stats.topCollaboratedRepo !== 'N/A' && (
                <div className="collab-top-repo">
                  <p className="collab-repo-label">{t.replayCollaborationTopCollabRepo}</p>
                  <p className="collab-repo-name">{stats.topCollaboratedRepo}</p>
                </div>
              )}
            </div>
          </div>
        )
      case 5:
        return (
          <div className="slide slide-growth">
            <div className="slide-emoji">📈</div>
            <h3>{t.replayGrowthTitle}</h3>
            <div className="growth-stats">
              <div className="growth-item">
                <div className="growth-icon">👥</div>
                <div className="growth-number">{stats.followerGrowth.toLocaleString()}</div>
                <div className="growth-label">{t.replayGrowthFollowers}</div>
              </div>
              <div className="growth-item">
                <div className="growth-icon">📦</div>
                <div className="growth-number">{stats.repoGrowth}</div>
                <div className="growth-label">{t.replayGrowthTotalRepos}</div>
              </div>
            </div>
            <div className="growth-heatmap">
              <p className="heatmap-title">{t.replayGrowthContributionGraph}</p>
              <div className="heatmap-grid">
                {stats.contributionDays.slice(0, 52).map((week, weekIndex) => (
                  <div key={weekIndex} className="heatmap-week">
                    {week.map((day, dayIndex) => {
                      const intensity = day === 0 ? 0 :
                                       day <= 2 ? 1 :
                                       day <= 5 ? 2 :
                                       day <= 10 ? 3 : 4
                      return (
                        <div
                          key={dayIndex}
                          className={`heatmap-day intensity-${intensity}`}
                          title={`${day} contributions`}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
            <div className="replay-footer">
              <p>{t.replayGrowthFooter.replace('{year}', String(stats.year))}</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="github-replay">
      <div className="replay-header">
        <h2>{t.replayTitle}</h2>
        <div className="year-selector">
          <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="replay-carousel">
        <button
          className="carousel-nav prev"
          onClick={prevSlide}
          aria-label="Previous slide"
          disabled={isAnimating}
        >
          ◀
        </button>

        <div className={`carousel-content ${isAnimating ? 'animating' : ''}`}>
          {renderSlide()}
        </div>

        <button
          className="carousel-nav next"
          onClick={nextSlide}
          aria-label="Next slide"
          disabled={isAnimating}
        >
          ▶
        </button>
      </div>

      <div className="carousel-dots">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <button
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
