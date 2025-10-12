import { useState, useEffect, useRef } from 'react'
import './ActivityFeed.css'
import { portfolioConfig } from '../config/portfolio.config'
import { getProcessedActivity } from '../services/github'
import { ProcessedActivity } from '../types'
import { useLanguage } from '../contexts/LanguageContext'
import { trackSectionVisit } from '../services/achievementService'

// Generate activity heatmap data for last 12 weeks
function generateActivityHeatmap(activities: ProcessedActivity[]) {
  const weeks = 12
  const days = 7
  const heatmap: number[][] = Array(weeks).fill(0).map(() => Array(days).fill(0))

  const now = new Date()
  const startDate = new Date(now)
  startDate.setDate(startDate.getDate() - (weeks * days))

  activities.forEach(activity => {
    // Parse "X days ago" format
    const match = activity.time.match(/(\d+)\s+(second|minute|hour|day|week)s?\s+ago/)
    if (match) {
      const value = parseInt(match[1])
      const unit = match[2]

      let daysAgo = 0
      if (unit === 'second' || unit === 'minute') daysAgo = 0
      else if (unit === 'hour') daysAgo = 0
      else if (unit === 'day') daysAgo = value
      else if (unit === 'week') daysAgo = value * 7

      if (daysAgo < weeks * days) {
        const weekIndex = Math.floor(daysAgo / 7)
        const dayIndex = daysAgo % 7
        if (weekIndex < weeks && dayIndex < days) {
          heatmap[weeks - 1 - weekIndex][dayIndex]++
        }
      }
    }
  })

  return heatmap
}

function ActivityFeed() {
  const [activities, setActivities] = useState<ProcessedActivity[]>([])
  const [loading, setLoading] = useState(true)
  const weeks = 12
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const loadActivity = async () => {
      try {
        setLoading(true)
        const data = await getProcessedActivity()
        setActivities(data)
      } catch (error) {
        console.error('Error loading activity:', error)
      } finally {
        setLoading(false)
      }
    }

    loadActivity()
  }, [])

  // Track section visit with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackSectionVisit('activity')
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const heatmapData = generateActivityHeatmap(activities)
  const maxActivity = Math.max(...heatmapData.flat(), 1)
  const totalContributions = activities.length

  return (
    <section className="card activity-feed" id="activity" ref={sectionRef}>
      <div className="card-header">{t.recentActivity}</div>
      {loading ? (
        <div className="activity-list">
          <p className="loading-text">{t.loading}</p>
        </div>
      ) : activities.length > 0 ? (
        <>
          {/* Contribution Heatmap */}
          <div className="contribution-heatmap">
            <div className="heatmap-header">
              <span className="heatmap-title">
                {totalContributions} {t.contributions}
              </span>
              <div className="heatmap-legend">
                <span className="legend-label">{t.less}</span>
                {[0, 1, 2, 3, 4].map(level => (
                  <div key={level} className={`legend-box intensity-${level}`} title={level === 0 ? 'No contributions' : `${level} contribution level`} />
                ))}
                <span className="legend-label">{t.more}</span>
              </div>
            </div>
            <div className="heatmap-grid">
              <div className="heatmap-labels">
                {['Mon', 'Wed', 'Fri'].map((day, i) => (
                  <div key={day} className="heatmap-day-label" style={{ gridRow: [2, 4, 6][i] }}>
                    {day}
                  </div>
                ))}
              </div>
              <div className="heatmap-weeks">
                {heatmapData.map((week, weekIndex) => (
                  <div key={weekIndex} className="heatmap-week">
                    {week.map((count, dayIndex) => {
                      const intensity = count === 0 ? 0 : Math.ceil((count / maxActivity) * 4)
                      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                      const dateOffset = (weeks * 7) - (weekIndex * 7) - dayIndex
                      const date = new Date()
                      date.setDate(date.getDate() - dateOffset)
                      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

                      return (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          className={`heatmap-day intensity-${intensity}`}
                          title={`${count} contribution${count !== 1 ? 's' : ''} on ${dayNames[dayIndex]}, ${dateStr}`}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="activity-list">
            {activities.slice(0, 8).map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-content">
                  <div className="activity-text">
                    <span className="activity-action">{activity.action}</span>
                    <span className="activity-target">{activity.target}</span>
                  </div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
          <a
            href={`https://github.com/${portfolioConfig.social.github}`}
            className="view-all-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.viewAllActivity} →
          </a>
        </>
      ) : (
        <div className="activity-list">
          <p className="error-text">No recent activity</p>
        </div>
      )}
    </section>
  )
}

export default ActivityFeed
