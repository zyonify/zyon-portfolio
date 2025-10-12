import { VisitorAchievement } from '../types'
import { visitorAchievements } from '../config/achievements.config'

const STORAGE_KEY = 'portfolio_achievements'
const TRACKING_KEY = 'portfolio_tracking'

// Event emitter for achievement unlocks
type AchievementListener = (achievement: VisitorAchievement) => void
const listeners: AchievementListener[] = []

export const onAchievementUnlock = (callback: AchievementListener) => {
  listeners.push(callback)
  return () => {
    const index = listeners.indexOf(callback)
    if (index > -1) {
      listeners.splice(index, 1)
    }
  }
}

const emitAchievementUnlock = (achievement: VisitorAchievement) => {
  listeners.forEach(listener => listener(achievement))
}

// Load achievements from localStorage
export const loadAchievements = (): VisitorAchievement[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const unlockedData = stored ? JSON.parse(stored) as { [key: string]: { unlocked: boolean; unlockedAt: number } } : {}

    // Always return new objects to prevent mutation of the original config
    return visitorAchievements.map(achievement => ({
      ...achievement,
      unlocked: unlockedData[achievement.id]?.unlocked || false,
      unlockedAt: unlockedData[achievement.id]?.unlockedAt,
    }))
  } catch (error) {
    console.error('Error loading achievements:', error)
    // Return new objects, not references to the original config
    return visitorAchievements.map(achievement => ({ ...achievement, unlocked: false }))
  }
}

// Save achievements to localStorage
const saveAchievements = (achievements: VisitorAchievement[]) => {
  try {
    const toSave = achievements.reduce((acc, achievement) => {
      if (achievement.unlocked) {
        acc[achievement.id] = {
          unlocked: true,
          unlockedAt: achievement.unlockedAt || Date.now(),
        }
      }
      return acc
    }, {} as { [key: string]: { unlocked: boolean; unlockedAt: number } })

    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  } catch (error) {
    console.error('Error saving achievements:', error)
  }
}

// Unlock an achievement
export const unlockAchievement = (achievementId: string): VisitorAchievement | null => {
  const achievements = loadAchievements()
  const achievement = achievements.find(a => a.id === achievementId)

  if (!achievement || achievement.unlocked) {
    return null
  }

  achievement.unlocked = true
  achievement.unlockedAt = Date.now()

  saveAchievements(achievements)
  emitAchievementUnlock(achievement)

  // Check for meta-achievements (achievements that unlock based on other achievements)
  checkMetaAchievements(achievements)

  return achievement
}

// Check meta-achievements (e.g., unlock 10 achievements)
const checkMetaAchievements = (achievements: VisitorAchievement[]) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length

  // Profile Completionist: Unlock 10 or more achievements
  if (unlockedCount >= 10) {
    const completionist = achievements.find(a => a.id === 'profile-completionist')
    if (completionist && !completionist.unlocked) {
      unlockAchievement('profile-completionist')
    }
  }
}

// Get tracking data (for scroll, time, etc.)
interface TrackingData {
  visitStartTime: number
  sectionsVisited: string[]
  projectsViewed: string[]
  achievementsHovered: string[]
  logoClicks: number
  konamiProgress: number
}

export const getTrackingData = (): TrackingData => {
  try {
    const stored = localStorage.getItem(TRACKING_KEY)
    if (!stored) {
      return {
        visitStartTime: Date.now(),
        sectionsVisited: [],
        projectsViewed: [],
        achievementsHovered: [],
        logoClicks: 0,
        konamiProgress: 0,
      }
    }
    return JSON.parse(stored)
  } catch (error) {
    return {
      visitStartTime: Date.now(),
      sectionsVisited: [],
      projectsViewed: [],
      achievementsHovered: [],
      logoClicks: 0,
      konamiProgress: 0,
    }
  }
}

export const updateTrackingData = (updates: Partial<TrackingData>) => {
  try {
    const current = getTrackingData()
    const updated = { ...current, ...updates }
    localStorage.setItem(TRACKING_KEY, JSON.stringify(updated))
    return updated
  } catch (error) {
    console.error('Error updating tracking data:', error)
    return getTrackingData()
  }
}

// Initialize achievement system
export const initializeAchievementSystem = () => {
  // Check auto-unlock achievements
  unlockAchievement('first-steps')

  // Check time-based achievements
  checkTimedAchievements()

  // Set up time tracking for "Committed Visitor"
  const trackingData = getTrackingData()
  const timeOnSite = Date.now() - trackingData.visitStartTime

  if (timeOnSite >= 120000) { // 2 minutes
    unlockAchievement('committed-visitor')
  } else {
    setTimeout(() => {
      unlockAchievement('committed-visitor')
    }, 120000 - timeOnSite)
  }
}

// Check time-based achievements
const checkTimedAchievements = () => {
  const now = new Date()
  const hour = now.getHours()

  // Night Owl: Between midnight and 6 AM
  if (hour >= 0 && hour < 6) {
    unlockAchievement('night-owl')
  }

  // Birthday Surprise: January 5
  if (now.getMonth() === 0 && now.getDate() === 5) {
    unlockAchievement('birthday-surprise')
  }
}

// Track section visit
export const trackSectionVisit = (sectionId: string) => {
  const trackingData = getTrackingData()

  if (!trackingData.sectionsVisited.includes(sectionId)) {
    trackingData.sectionsVisited.push(sectionId)
    updateTrackingData({ sectionsVisited: trackingData.sectionsVisited })

    // Check for section-specific achievements
    if (sectionId === 'skills') {
      unlockAchievement('tech-savvy')
    } else if (sectionId === 'stats') {
      unlockAchievement('stats-enthusiast')
    } else if (sectionId === 'hobbies') {
      unlockAchievement('hobby-enthusiast')
    }

    // Check if all main sections visited
    const mainSections = ['projects', 'achievements', 'skills', 'stats', 'activity', 'hobbies']
    const allVisited = mainSections.every(section => trackingData.sectionsVisited.includes(section))
    if (allVisited) {
      unlockAchievement('curious-mind')
    }
  }
}

// Track project view
export const trackProjectView = (projectId: string) => {
  const trackingData = getTrackingData()

  if (!trackingData.projectsViewed.includes(projectId)) {
    trackingData.projectsViewed.push(projectId)
    updateTrackingData({ projectsViewed: trackingData.projectsViewed })

    // Check if all projects viewed (you'll need to pass total count)
    // This will be checked when clicking project demo/code links
  }
}

// Track achievement hover
export const trackAchievementHover = (achievementId: string) => {
  const trackingData = getTrackingData()

  if (!trackingData.achievementsHovered.includes(achievementId)) {
    trackingData.achievementsHovered.push(achievementId)
    updateTrackingData({ achievementsHovered: trackingData.achievementsHovered })

    // Check if all achievements hovered (6 total from config)
    if (trackingData.achievementsHovered.length >= 6) {
      unlockAchievement('achievement-collector')
    }
  }
}

// Track logo clicks (for secret sequence)
export const trackLogoClick = () => {
  const trackingData = getTrackingData()
  const newCount = trackingData.logoClicks + 1
  updateTrackingData({ logoClicks: newCount })

  if (newCount === 10) {
    unlockAchievement('secret-sequence')
    // Reset counter
    updateTrackingData({ logoClicks: 0 })
  }
}

// Konami code sequence
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']

export const trackKonamiKey = (key: string) => {
  const trackingData = getTrackingData()
  const expectedKey = konamiCode[trackingData.konamiProgress]

  if (key === expectedKey) {
    const newProgress = trackingData.konamiProgress + 1
    updateTrackingData({ konamiProgress: newProgress })

    if (newProgress === konamiCode.length) {
      unlockAchievement('konami-code-master')
      updateTrackingData({ konamiProgress: 0 })
    }
  } else {
    // Reset if wrong key
    updateTrackingData({ konamiProgress: 0 })
  }
}

// Get achievement statistics
export const getAchievementStats = () => {
  const achievements = loadAchievements()
  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.length
  const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + (a.xp || 0), 0)

  return {
    unlockedCount,
    totalCount,
    percentage: Math.round((unlockedCount / totalCount) * 100),
    totalXP,
    achievements,
  }
}

// Reset all achievements (for testing)
export const resetAchievements = () => {
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(TRACKING_KEY)
}
