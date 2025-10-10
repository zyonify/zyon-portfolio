import { VisitorAchievement } from '../types'

/**
 * Visitor Achievements Configuration
 *
 * Steam-style achievements that unlock as visitors interact with the portfolio.
 * Achievements are stored in localStorage and persist across sessions.
 */

export const visitorAchievements: VisitorAchievement[] = [
  // Auto-unlock achievements
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Welcome to my portfolio! Thanks for visiting.',
    icon: '👋',
    unlocked: false,
    trigger: 'auto',
    rarity: 'common',
    xp: 10,
  },

  // Exploration achievements
  {
    id: 'curious-mind',
    title: 'Curious Mind',
    description: 'Explored all main sections of the portfolio',
    icon: '🔍',
    unlocked: false,
    trigger: 'scroll',
    triggerCondition: 'all-sections',
    rarity: 'common',
    xp: 25,
  },
  {
    id: 'detail-oriented',
    title: 'Detail Oriented',
    description: 'Opened and viewed the resume',
    icon: '📖',
    unlocked: false,
    trigger: 'click',
    triggerCondition: 'resume-expand',
    rarity: 'common',
    xp: 15,
  },
  {
    id: 'fellow-gamer',
    title: 'Fellow Gamer',
    description: 'You noticed I\'m a gamer too! 🎮',
    icon: '🎮',
    unlocked: false,
    trigger: 'click',
    triggerCondition: 'gaming-hobby',
    rarity: 'rare',
    xp: 30,
  },
  {
    id: 'star-gazer',
    title: 'Star Gazer',
    description: 'Checked out my GitHub profile',
    icon: '⭐',
    unlocked: false,
    trigger: 'click',
    triggerCondition: 'github-link',
    rarity: 'common',
    xp: 20,
  },
  {
    id: 'socially-active',
    title: 'Socially Active',
    description: 'Visited my LinkedIn profile',
    icon: '💼',
    unlocked: false,
    trigger: 'click',
    triggerCondition: 'linkedin-link',
    rarity: 'common',
    xp: 20,
  },
  {
    id: 'project-hunter',
    title: 'Project Hunter',
    description: 'Viewed all featured projects',
    icon: '🚀',
    unlocked: false,
    trigger: 'click',
    triggerCondition: 'all-projects',
    rarity: 'rare',
    xp: 35,
  },

  // Engagement achievements
  {
    id: 'committed-visitor',
    title: 'Committed Visitor',
    description: 'Spent over 2 minutes exploring the portfolio',
    icon: '⏱️',
    unlocked: false,
    trigger: 'time',
    triggerCondition: '120000', // 2 minutes in milliseconds
    rarity: 'rare',
    xp: 40,
  },
  {
    id: 'achievement-collector',
    title: 'Achievement Collector',
    description: 'Hovered over all professional achievements',
    icon: '🏅',
    unlocked: false,
    trigger: 'click',
    triggerCondition: 'all-achievements',
    rarity: 'rare',
    xp: 30,
  },
  {
    id: 'tech-savvy',
    title: 'Tech Savvy',
    description: 'Explored the technical skills section',
    icon: '🛠️',
    unlocked: false,
    trigger: 'scroll',
    triggerCondition: 'skills-section',
    rarity: 'common',
    xp: 15,
  },
  {
    id: 'stats-enthusiast',
    title: 'Stats Enthusiast',
    description: 'Checked out my GitHub statistics',
    icon: '📊',
    unlocked: false,
    trigger: 'scroll',
    triggerCondition: 'stats-section',
    rarity: 'common',
    xp: 15,
  },

  // Easter egg achievements
  {
    id: 'konami-code-master',
    title: 'Konami Code Master',
    description: 'You know the secret! ↑↑↓↓←→←→BA',
    icon: '🎹',
    unlocked: false,
    trigger: 'easter-egg',
    triggerCondition: 'konami-code',
    rarity: 'legendary',
    xp: 100,
  },
  {
    id: 'secret-sequence',
    title: 'Secret Sequence',
    description: 'Found the hidden click sequence',
    icon: '🔢',
    unlocked: false,
    trigger: 'easter-egg',
    triggerCondition: 'logo-clicks',
    rarity: 'epic',
    xp: 75,
  },
  {
    id: 'night-owl',
    title: 'Night Owl',
    description: 'Visited between midnight and 6 AM',
    icon: '🌙',
    unlocked: false,
    trigger: 'time',
    triggerCondition: 'night-visit',
    rarity: 'epic',
    xp: 50,
  },
  {
    id: 'birthday-surprise',
    title: 'Birthday Surprise',
    description: 'Visited on my birthday! 🎉',
    icon: '🎂',
    unlocked: false,
    trigger: 'time',
    triggerCondition: 'birthday',
    rarity: 'legendary',
    xp: 150,
  },
  {
    id: 'contact-initiator',
    title: 'Contact Initiator',
    description: 'Clicked to reach out via email',
    icon: '📧',
    unlocked: false,
    trigger: 'click',
    triggerCondition: 'email-click',
    rarity: 'rare',
    xp: 45,
  },
  {
    id: 'hobby-enthusiast',
    title: 'Hobby Enthusiast',
    description: 'Explored my personal hobbies section',
    icon: '🎨',
    unlocked: false,
    trigger: 'scroll',
    triggerCondition: 'hobbies-section',
    rarity: 'common',
    xp: 15,
  },
  {
    id: 'profile-completionist',
    title: 'Profile Completionist',
    description: 'Unlocked 10 or more achievements!',
    icon: '🏆',
    unlocked: false,
    trigger: 'auto',
    triggerCondition: 'achievement-count-10',
    rarity: 'legendary',
    xp: 200,
  },
]

// Helper function to get total possible XP
export const getTotalPossibleXP = (): number => {
  return visitorAchievements.reduce((sum, achievement) => sum + (achievement.xp || 0), 0)
}

// Helper function to get achievements by rarity
export const getAchievementsByRarity = (rarity: string): VisitorAchievement[] => {
  return visitorAchievements.filter(achievement => achievement.rarity === rarity)
}

// Helper function to get achievement by ID
export const getAchievementById = (id: string): VisitorAchievement | undefined => {
  return visitorAchievements.find(achievement => achievement.id === id)
}
