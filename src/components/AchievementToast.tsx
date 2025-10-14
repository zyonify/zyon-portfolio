import { useState, useEffect } from 'react'
import './AchievementToast.css'
import { VisitorAchievement } from '../types'
import { onAchievementUnlock } from '../services/achievementService'

interface ToastData extends VisitorAchievement {
  id: string
  timestamp: number
  toastId: string
}

function AchievementToast() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  useEffect(() => {
    const unsubscribe = onAchievementUnlock((achievement) => {
      // Generate unique toast ID using achievement ID and timestamp
      const toastId = `${achievement.id}-${Date.now()}-${Math.random()}`

      const toast: ToastData = {
        ...achievement,
        timestamp: Date.now(),
        toastId,
      }

      setToasts(prev => [...prev, toast])

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.toastId !== toastId))
      }, 5000)
    })

    return unsubscribe
  }, [])

  const removeToast = (toastId: string) => {
    setToasts(prev => prev.filter(t => t.toastId !== toastId))
  }

  return (
    <div className="achievement-toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.toastId}
          className={`achievement-toast ${toast.rarity || 'common'}`}
          onClick={() => removeToast(toast.toastId)}
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
          <button className="toast-close" onClick={() => removeToast(toast.toastId)}>
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export default AchievementToast
