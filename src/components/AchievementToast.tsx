import { useState, useEffect } from 'react'
import './AchievementToast.css'
import { VisitorAchievement } from '../types'
import { onAchievementUnlock } from '../services/achievementService'

interface ToastData extends VisitorAchievement {
  id: string
  timestamp: number
}

function AchievementToast() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  useEffect(() => {
    const unsubscribe = onAchievementUnlock((achievement) => {
      const toast: ToastData = {
        ...achievement,
        timestamp: Date.now(),
      }

      setToasts(prev => [...prev, toast])

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.timestamp !== toast.timestamp))
      }, 5000)
    })

    return unsubscribe
  }, [])

  const removeToast = (timestamp: number) => {
    setToasts(prev => prev.filter(t => t.timestamp !== timestamp))
  }

  return (
    <div className="achievement-toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.timestamp}
          className={`achievement-toast ${toast.rarity || 'common'}`}
          onClick={() => removeToast(toast.timestamp)}
        >
          <div className="toast-shine"></div>
          <div className="toast-header">
            <span className="toast-label">Achievement Unlocked!</span>
            {toast.xp && <span className="toast-xp">+{toast.xp} XP</span>}
          </div>
          <div className="toast-content">
            <div className="toast-icon">{toast.icon}</div>
            <div className="toast-info">
              <div className="toast-title">{toast.title}</div>
              <div className="toast-description">{toast.description}</div>
            </div>
          </div>
          <div className="toast-progress">
            <div className="toast-progress-bar"></div>
          </div>
          <button className="toast-close" onClick={() => removeToast(toast.timestamp)}>
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export default AchievementToast
