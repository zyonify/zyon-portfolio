import { useState, useEffect } from 'react'
import './ActivityFeed.css'
import { portfolioConfig } from '../config/portfolio.config'
import { getProcessedActivity } from '../services/github'
import { ProcessedActivity } from '../types'

function ActivityFeed() {
  const [activities, setActivities] = useState<ProcessedActivity[]>([])
  const [loading, setLoading] = useState(true)

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

  return (
    <section className="card activity-feed">
      <div className="card-header">Recent Activity</div>
      {loading ? (
        <div className="activity-list">
          <p className="loading-text">Loading activity...</p>
        </div>
      ) : activities.length > 0 ? (
        <>
          <div className="activity-list">
            {activities.map(activity => (
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
            View all activity on GitHub →
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
