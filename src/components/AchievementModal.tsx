import { useState, useEffect } from 'react'
import './AchievementModal.css'
import { VisitorAchievement } from '../types'
import { getAchievementStats } from '../services/achievementService'

interface AchievementModalProps {
  isOpen: boolean
  onClose: () => void
}

function AchievementModal({ isOpen, onClose }: AchievementModalProps) {
  const [stats, setStats] = useState(getAchievementStats())
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')

  useEffect(() => {
    if (isOpen) {
      setStats(getAchievementStats())
    }
  }, [isOpen])

  if (!isOpen) return null

  const filteredAchievements = stats.achievements.filter(achievement => {
    if (filter === 'unlocked') return achievement.unlocked
    if (filter === 'locked') return !achievement.unlocked
    return true
  })

  const groupedByRarity = {
    legendary: filteredAchievements.filter(a => a.rarity === 'legendary'),
    epic: filteredAchievements.filter(a => a.rarity === 'epic'),
    rare: filteredAchievements.filter(a => a.rarity === 'rare'),
    common: filteredAchievements.filter(a => a.rarity === 'common'),
  }

  return (
    <div className="achievement-modal-overlay" onClick={onClose}>
      <div className="achievement-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Visitor Achievements</h2>
            <p className="modal-subtitle">
              {stats.unlockedCount} / {stats.totalCount} Unlocked ({stats.percentage}%) • {stats.totalXP} XP Earned
            </p>
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({stats.totalCount})
          </button>
          <button
            className={`filter-btn ${filter === 'unlocked' ? 'active' : ''}`}
            onClick={() => setFilter('unlocked')}
          >
            Unlocked ({stats.unlockedCount})
          </button>
          <button
            className={`filter-btn ${filter === 'locked' ? 'active' : ''}`}
            onClick={() => setFilter('locked')}
          >
            Locked ({stats.totalCount - stats.unlockedCount})
          </button>
        </div>

        <div className="modal-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
        </div>

        <div className="modal-content">
          {Object.entries(groupedByRarity).map(([rarity, achievements]) => {
            if (achievements.length === 0) return null

            return (
              <div key={rarity} className="rarity-group">
                <h3 className={`rarity-title ${rarity}`}>
                  {rarity.charAt(0).toUpperCase() + rarity.slice(1)} ({achievements.length})
                </h3>
                <div className="achievements-grid">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'} ${achievement.rarity || 'common'}`}
                    >
                      <div className="achievement-card-icon">
                        {achievement.unlocked ? achievement.icon : '🔒'}
                      </div>
                      <div className="achievement-card-content">
                        <div className="achievement-card-header">
                          <h4 className="achievement-card-title">
                            {achievement.unlocked ? achievement.title : '???'}
                          </h4>
                          {achievement.unlocked && achievement.xp && (
                            <span className="achievement-card-xp">+{achievement.xp} XP</span>
                          )}
                        </div>
                        <p className="achievement-card-description">
                          {achievement.unlocked ? achievement.description : 'Hidden achievement'}
                        </p>
                        {achievement.unlocked && achievement.unlockedAt && (
                          <span className="achievement-card-date">
                            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      {achievement.unlocked && (
                        <div className="achievement-card-check">✓</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AchievementModal
