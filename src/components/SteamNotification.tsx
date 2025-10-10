import { useState, useEffect } from 'react'
import './SteamNotification.css'
import { getRandomNotification, SteamNotification as NotificationType } from '../config/steamNotifications.config'

interface ActiveNotification extends NotificationType {
  timestamp: number
}

function SteamNotification() {
  const [notifications, setNotifications] = useState<ActiveNotification[]>([])

  useEffect(() => {
    let timeoutId: number | null = null

    // Function to schedule next notification
    const scheduleNextNotification = () => {
      const randomDelay = Math.random() * 7000 + 5000 // 5-12 seconds
      timeoutId = window.setTimeout(() => {
        showRandomNotification()
        scheduleNextNotification()
      }, randomDelay)
    }

    // Show first notification after 5 seconds, then start scheduling
    timeoutId = window.setTimeout(() => {
      showRandomNotification()
      scheduleNextNotification()
    }, 5000)

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  const showRandomNotification = () => {
    const notification = getRandomNotification()
    const activeNotification: ActiveNotification = {
      ...notification,
      timestamp: Date.now()
    }

    setNotifications(prev => [...prev, activeNotification])

    // Auto-remove after 6 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.timestamp !== activeNotification.timestamp))
    }, 6000)
  }

  const handleClose = (timestamp: number) => {
    setNotifications(prev => prev.filter(n => n.timestamp !== timestamp))
  }

  return (
    <div className="steam-notification-container">
      {notifications.map((notification) => (
        <div
          key={notification.timestamp}
          className={`steam-notification steam-notification-${notification.type}`}
          onClick={() => handleClose(notification.timestamp)}
        >
          <div className="steam-notification-icon">
            {notification.avatar ? (
              <img src={notification.avatar} alt={notification.name} />
            ) : (
              <div className="steam-notification-icon-placeholder">👤</div>
            )}
          </div>
          <div className="steam-notification-content">
            <div className="steam-notification-title">{notification.name}</div>
            <div className="steam-notification-message">
              {notification.message}
              {notification.action && (
                <span className="steam-notification-action"> {notification.action}</span>
              )}
            </div>
          </div>
          <button
            className="steam-notification-close"
            onClick={(e) => {
              e.stopPropagation()
              handleClose(notification.timestamp)
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export default SteamNotification
