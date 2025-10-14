import { useState } from 'react'
import './InfoModal.css'
import { getLevelBorderStyle } from '../utils/steamLevelColors'
import { visitorAchievements, getTotalPossibleXP } from '../config/achievements.config'

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
}

type TabType = 'levels' | 'xp' | 'achievements' | 'notifications'

function InfoModal({ isOpen, onClose }: InfoModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('levels')

  if (!isOpen) return null

  const levelTiers = [
    { range: '1-4', name: 'Novice', level: 1 },
    { range: '5-9', name: 'Apprentice', level: 5 },
    { range: '10-14', name: 'Intermediate', level: 10 },
    { range: '15-19', name: 'Experienced', level: 15 },
    { range: '20-24', name: 'Proficient', level: 20 },
    { range: '25-29', name: 'Advanced', level: 25 },
    { range: '30-34', name: 'Expert', level: 30 },
    { range: '35-39', name: 'Elite', level: 35 },
    { range: '40-44', name: 'Master', level: 40 },
    { range: '45-49', name: 'Grandmaster', level: 45 },
    { range: '50-74', name: 'Platinum', level: 50 },
    { range: '75-99', name: 'Diamond', level: 75 },
    { range: '100-124', name: 'Emerald', level: 100 },
    { range: '125-149', name: 'Inferno', level: 125 },
    { range: '150-174', name: 'Crimson', level: 150 },
    { range: '175-199', name: 'Mystic', level: 175 },
    { range: '200-224', name: 'Celestial', level: 200 },
    { range: '225-249', name: 'Radiant', level: 225 },
    { range: '250-274', name: 'Transcendent', level: 250 },
    { range: '275+', name: 'Legendary', level: 275 },
  ]

  const achievementsByRarity = {
    legendary: visitorAchievements.filter(a => a.rarity === 'legendary'),
    epic: visitorAchievements.filter(a => a.rarity === 'epic'),
    rare: visitorAchievements.filter(a => a.rarity === 'rare'),
    common: visitorAchievements.filter(a => a.rarity === 'common'),
  }

  return (
    <div className="achievement-modal-overlay" onClick={onClose}>
      <div className="info-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Portfolio Behind the Scenes</h2>
            <p className="modal-subtitle">
              Portfolio mechanics, XP systems, and hidden features
            </p>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-filters">
          <button
            className={`filter-btn ${activeTab === 'levels' ? 'active' : ''}`}
            onClick={() => setActiveTab('levels')}
          >
            Level Tiers
          </button>
          <button
            className={`filter-btn ${activeTab === 'xp' ? 'active' : ''}`}
            onClick={() => setActiveTab('xp')}
          >
            XP System
          </button>
          <button
            className={`filter-btn ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            Achievements
          </button>
          <button
            className={`filter-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
        </div>

        <div className="modal-content">
          {activeTab === 'levels' && (
            <div className="info-section">
              <h3>Developer Level Tiers</h3>
              <p className="info-description">
                Your level is determined by total XP earned. Each tier brings unique visual effects!
              </p>
              <div className="level-tiers-grid">
                {levelTiers.map((tier) => {
                  const style = getLevelBorderStyle(tier.level)
                  return (
                    <div key={tier.range} className="level-tier-card">
                      <div
                        className="level-tier-preview"
                        style={{
                          borderColor: style.color,
                          background: style.gradient || style.color,
                          boxShadow: style.glow ? `0 0 20px ${style.glow}` : 'none'
                        }}
                      >
                        <span className="level-tier-range">{tier.range}</span>
                      </div>
                      <div className="level-tier-info">
                        <div className="level-tier-name">{tier.name}</div>
                        <div className="level-tier-effects">
                          {style.gradient && <span className="effect-badge">Gradient</span>}
                          {style.glow && <span className="effect-badge">Glow</span>}
                          {style.shimmer && <span className="effect-badge">Shimmer</span>}
                          {style.rainbow && <span className="effect-badge rainbow">Rainbow</span>}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {activeTab === 'xp' && (
            <div className="info-section">
              <h3>XP Calculation System</h3>
              <p className="info-description">
                Your developer level is calculated using a Steam-like XP system based on GitHub stats and experience.
              </p>

              <div className="xp-sources">
                <h4>XP Sources</h4>
                <div className="xp-source-list">
                  <div className="xp-source-item">
                    <span className="xp-source-icon">📦</span>
                    <div className="xp-source-details">
                      <div className="xp-source-name">Repositories</div>
                      <div className="xp-source-value">+100 XP each</div>
                    </div>
                  </div>
                  <div className="xp-source-item">
                    <span className="xp-source-icon">👥</span>
                    <div className="xp-source-details">
                      <div className="xp-source-name">Followers</div>
                      <div className="xp-source-value">+50 XP each</div>
                    </div>
                  </div>
                  <div className="xp-source-item">
                    <span className="xp-source-icon">⭐</span>
                    <div className="xp-source-details">
                      <div className="xp-source-name">Total Stars</div>
                      <div className="xp-source-value">+10 XP each</div>
                    </div>
                  </div>
                  <div className="xp-source-item">
                    <span className="xp-source-icon">📅</span>
                    <div className="xp-source-details">
                      <div className="xp-source-name">Years of Experience</div>
                      <div className="xp-source-value">+500 XP each</div>
                    </div>
                  </div>
                  <div className="xp-source-item">
                    <span className="xp-source-icon">🏆</span>
                    <div className="xp-source-details">
                      <div className="xp-source-name">Achievements</div>
                      <div className="xp-source-value">Variable XP (10-200)</div>
                    </div>
                  </div>
                </div>
                <p className="xp-note">
                  💡 <strong>New!</strong> Unlocking visitor achievements now contributes to your level. The XP bar updates in real-time when you unlock achievements!
                </p>
              </div>

              <div className="xp-progression">
                <h4>Level Progression</h4>
                <p className="xp-progression-description">
                  XP requirements increase every 10 levels using a bracket system:
                </p>
                <div className="xp-bracket-list">
                  <div className="xp-bracket">Levels 1-10: <strong>100 XP per level</strong></div>
                  <div className="xp-bracket">Levels 11-20: <strong>200 XP per level</strong></div>
                  <div className="xp-bracket">Levels 21-30: <strong>300 XP per level</strong></div>
                  <div className="xp-bracket">Levels 31-40: <strong>400 XP per level</strong></div>
                  <div className="xp-bracket-etc">And so on... (+100 XP per bracket)</div>
                </div>
              </div>

              <div className="xp-formula">
                <h4>Example Calculation</h4>
                <div className="xp-example">
                  <div className="xp-example-input">
                    20 repos (2,000 XP) + 50 followers (2,500 XP) + 100 stars (1,000 XP) + 3 years (1,500 XP) + 5 achievements (150 XP)
                  </div>
                  <div className="xp-example-result">
                    = <strong>7,150 Total XP</strong> → Approximately Level 16
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="info-section">
              <h3>Visitor Achievements</h3>
              <p className="info-description">
                {visitorAchievements.length} achievements worth <strong>{getTotalPossibleXP()} total XP</strong>.
                Each achievement triggers only once with race condition protection. Explore the portfolio to unlock them all!
              </p>

              {Object.entries(achievementsByRarity).map(([rarity, achievements]) => (
                achievements.length > 0 && (
                  <div key={rarity} className="achievement-rarity-section">
                    <h4 className={`rarity-title rarity-${rarity}`}>
                      {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                      <span className="achievement-count">({achievements.length})</span>
                    </h4>
                    <div className="achievements-list">
                      {achievements.map(achievement => (
                        <div key={achievement.id} className={`achievement-info-card rarity-${rarity}`}>
                          <span className="achievement-info-icon">{achievement.icon}</span>
                          <div className="achievement-info-details">
                            <div className="achievement-info-title">{achievement.title}</div>
                            <div className="achievement-info-description">{achievement.description}</div>
                            <div className="achievement-info-xp">+{achievement.xp} XP</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}

              <div className="easter-egg-hint">
                <h4>Hidden Secrets</h4>
                <p>Some achievements are hidden easter eggs. Try exploring, clicking around, or maybe even try some classic gaming sequences... 🎮</p>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="info-section">
              <h3>Steam Notification System</h3>
              <p className="info-description">
                Satirical friend notifications appear throughout your visit for that authentic Steam experience.
              </p>

              <div className="notification-stats">
                <div className="notification-stat-card">
                  <div className="notification-stat-value">5-12s</div>
                  <div className="notification-stat-label">Random Interval</div>
                </div>
                <div className="notification-stat-card">
                  <div className="notification-stat-value">6s</div>
                  <div className="notification-stat-label">Display Duration</div>
                </div>
                <div className="notification-stat-card">
                  <div className="notification-stat-value">30+</div>
                  <div className="notification-stat-label">Unique Messages</div>
                </div>
                <div className="notification-stat-card">
                  <div className="notification-stat-value">5s</div>
                  <div className="notification-stat-label">Initial Delay</div>
                </div>
              </div>

              <div className="notification-types">
                <h4>Notification Types</h4>
                <div className="notification-type-list">
                  <div className="notification-type-item">
                    <span className="notification-type-icon">🟢</span>
                    <div>
                      <strong>Friend Online</strong>
                      <p>Tech icons coming online</p>
                    </div>
                  </div>
                  <div className="notification-type-item">
                    <span className="notification-type-icon">🎮</span>
                    <div>
                      <strong>Now Playing</strong>
                      <p>Satirical game titles</p>
                    </div>
                  </div>
                  <div className="notification-type-item">
                    <span className="notification-type-icon">✉️</span>
                    <div>
                      <strong>Messages</strong>
                      <p>Funny messages from tech leaders</p>
                    </div>
                  </div>
                  <div className="notification-type-item">
                    <span className="notification-type-icon">🎯</span>
                    <div>
                      <strong>Invites</strong>
                      <p>Game and trade invitations</p>
                    </div>
                  </div>
                  <div className="notification-type-item">
                    <span className="notification-type-icon">🏆</span>
                    <div>
                      <strong>Achievements</strong>
                      <p>Friends unlocking achievements</p>
                    </div>
                  </div>
                  <div className="notification-type-item">
                    <span className="notification-type-icon">💱</span>
                    <div>
                      <strong>Trade Offers</strong>
                      <p>Humorous trade proposals</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="notification-note">
                <p><strong>Note:</strong> Notifications are randomized from a pool of tech industry satire and gaming culture references. Click any notification to dismiss it early!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InfoModal
