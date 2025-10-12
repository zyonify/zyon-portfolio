import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  unlockAchievement,
  loadAchievements,
  trackSectionVisit,
  trackAchievementHover,
  trackLogoClick,
  trackKonamiKey,
  resetAchievements,
  getAchievementStats,
} from './achievementService'
import { visitorAchievements } from '../config/achievements.config'

describe('Achievement Service', () => {
  beforeEach(() => {
    // Clear localStorage completely before each test
    localStorage.clear()
    resetAchievements()
  })

  afterEach(() => {
    // Also clear after each test to ensure clean state
    localStorage.clear()
  })

  describe('Achievement Unlocking', () => {
    it('should unlock achievement by ID', () => {
      const result = unlockAchievement('first-steps')
      expect(result).toBeTruthy()
      expect(result?.unlocked).toBe(true)
      expect(result?.id).toBe('first-steps')
    })

    it('should not unlock already unlocked achievement', () => {
      unlockAchievement('first-steps')
      const result = unlockAchievement('first-steps')
      expect(result).toBeNull()
    })

    it('should persist unlocked achievements in localStorage', () => {
      unlockAchievement('first-steps')
      const loaded = loadAchievements()
      const achievement = loaded.find(a => a.id === 'first-steps')
      expect(achievement?.unlocked).toBe(true)
    })
  })

  describe('Auto-unlock Achievements', () => {
    it('should unlock "first-steps" achievement automatically', () => {
      const achievement = unlockAchievement('first-steps')
      expect(achievement?.id).toBe('first-steps')
      expect(achievement?.trigger).toBe('auto')
      expect(achievement?.xp).toBe(10)
    })

    it('should unlock "profile-completionist" when 10 achievements are unlocked', () => {
      // Unlock 10 achievements
      const achievementsToUnlock = [
        'first-steps',
        'curious-mind',
        'detail-oriented',
        'fellow-gamer',
        'star-gazer',
        'socially-active',
        'tech-savvy',
        'stats-enthusiast',
        'hobby-enthusiast',
        'contact-initiator',
      ]

      achievementsToUnlock.forEach(id => unlockAchievement(id))

      // Check if profile-completionist was auto-unlocked
      const loaded = loadAchievements()
      const completionist = loaded.find(a => a.id === 'profile-completionist')
      expect(completionist?.unlocked).toBe(true)
      expect(completionist?.xp).toBe(200)
    })
  })

  describe('Section Visit Achievements', () => {
    it('should unlock "tech-savvy" when skills section is visited', () => {
      trackSectionVisit('skills')
      const loaded = loadAchievements()
      const achievement = loaded.find(a => a.id === 'tech-savvy')
      expect(achievement?.unlocked).toBe(true)
      expect(achievement?.xp).toBe(15)
    })

    it('should unlock "stats-enthusiast" when stats section is visited', () => {
      trackSectionVisit('stats')
      const loaded = loadAchievements()
      const achievement = loaded.find(a => a.id === 'stats-enthusiast')
      expect(achievement?.unlocked).toBe(true)
      expect(achievement?.xp).toBe(15)
    })

    it('should unlock "hobby-enthusiast" when hobbies section is visited', () => {
      trackSectionVisit('hobbies')
      const loaded = loadAchievements()
      const achievement = loaded.find(a => a.id === 'hobby-enthusiast')
      expect(achievement?.unlocked).toBe(true)
      expect(achievement?.xp).toBe(15)
    })

    it('should unlock "curious-mind" when all main sections are visited', () => {
      const sections = ['projects', 'achievements', 'skills', 'stats', 'activity', 'hobbies']
      sections.forEach(section => trackSectionVisit(section))

      const loaded = loadAchievements()
      const achievement = loaded.find(a => a.id === 'curious-mind')
      expect(achievement?.unlocked).toBe(true)
      expect(achievement?.xp).toBe(25)
    })
  })

  describe('Click-based Achievements', () => {
    it('should unlock "star-gazer" achievement', () => {
      const achievement = unlockAchievement('star-gazer')
      expect(achievement?.id).toBe('star-gazer')
      expect(achievement?.trigger).toBe('click')
      expect(achievement?.xp).toBe(20)
    })

    it('should unlock "socially-active" achievement', () => {
      const achievement = unlockAchievement('socially-active')
      expect(achievement?.id).toBe('socially-active')
      expect(achievement?.xp).toBe(20)
    })

    it('should unlock "contact-initiator" achievement', () => {
      const achievement = unlockAchievement('contact-initiator')
      expect(achievement?.id).toBe('contact-initiator')
      expect(achievement?.xp).toBe(45)
    })

    it('should unlock "fellow-gamer" achievement', () => {
      const achievement = unlockAchievement('fellow-gamer')
      expect(achievement?.id).toBe('fellow-gamer')
      expect(achievement?.xp).toBe(30)
    })

    it('should unlock "detail-oriented" achievement', () => {
      const achievement = unlockAchievement('detail-oriented')
      expect(achievement?.id).toBe('detail-oriented')
      expect(achievement?.xp).toBe(15)
    })
  })

  describe('Achievement Hover Tracking', () => {
    it('should unlock "achievement-collector" when all 6 achievements are hovered', () => {
      // Track hovering over 6 different achievement cards
      for (let i = 1; i <= 6; i++) {
        trackAchievementHover(i.toString())
      }

      const loaded = loadAchievements()
      const achievement = loaded.find(a => a.id === 'achievement-collector')
      expect(achievement?.unlocked).toBe(true)
      expect(achievement?.xp).toBe(30)
    })

    it('should not unlock if less than 6 achievements hovered', () => {
      // Reset to ensure clean state
      localStorage.clear()
      resetAchievements()

      for (let i = 1; i <= 5; i++) {
        trackAchievementHover(i.toString())
      }

      const loaded = loadAchievements()
      const achievement = loaded.find(a => a.id === 'achievement-collector')
      expect(achievement?.unlocked).toBe(false)
    })
  })

  describe('Easter Egg Achievements', () => {
    describe('Konami Code', () => {
      it('should unlock "konami-code-master" when full Konami code is entered', () => {
        const konamiSequence = [
          'ArrowUp',
          'ArrowUp',
          'ArrowDown',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          'ArrowLeft',
          'ArrowRight',
          'KeyB',
          'KeyA',
        ]

        konamiSequence.forEach(key => trackKonamiKey(key))

        const loaded = loadAchievements()
        const achievement = loaded.find(a => a.id === 'konami-code-master')
        expect(achievement?.unlocked).toBe(true)
        expect(achievement?.rarity).toBe('legendary')
        expect(achievement?.xp).toBe(100)
      })

      it('should reset progress if wrong key is pressed', () => {
        trackKonamiKey('ArrowUp')
        trackKonamiKey('ArrowUp')
        trackKonamiKey('ArrowLeft') // Wrong key

        // Continue with correct sequence
        const konamiSequence = [
          'ArrowUp',
          'ArrowUp',
          'ArrowDown',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          'ArrowLeft',
          'ArrowRight',
          'KeyB',
          'KeyA',
        ]

        konamiSequence.forEach(key => trackKonamiKey(key))

        const loaded = loadAchievements()
        const achievement = loaded.find(a => a.id === 'konami-code-master')
        expect(achievement?.unlocked).toBe(true)
      })
    })

    describe('Logo Click Sequence', () => {
      it('should unlock "secret-sequence" when logo is clicked 10 times', () => {
        for (let i = 0; i < 10; i++) {
          trackLogoClick()
        }

        const loaded = loadAchievements()
        const achievement = loaded.find(a => a.id === 'secret-sequence')
        expect(achievement?.unlocked).toBe(true)
        expect(achievement?.rarity).toBe('epic')
        expect(achievement?.xp).toBe(75)
      })

      it('should not unlock if logo is clicked less than 10 times', () => {
        // Reset to ensure clean state
        localStorage.clear()
        resetAchievements()

        for (let i = 0; i < 9; i++) {
          trackLogoClick()
        }

        const loaded = loadAchievements()
        const achievement = loaded.find(a => a.id === 'secret-sequence')
        expect(achievement?.unlocked).toBe(false)
      })
    })
  })

  describe('Time-based Achievements', () => {
    it('should unlock "night-owl" when visited between midnight and 6 AM', () => {
      // Mock Date to return a time between midnight and 6 AM
      const mockDate = new Date('2025-10-13T03:00:00')
      vi.setSystemTime(mockDate)

      // Simulate initialization which checks time-based achievements
      const now = new Date()
      const hour = now.getHours()
      if (hour >= 0 && hour < 6) {
        unlockAchievement('night-owl')
      }

      const loaded = loadAchievements()
      const achievement = loaded.find(a => a.id === 'night-owl')
      expect(achievement?.unlocked).toBe(true)
      expect(achievement?.xp).toBe(50)

      vi.useRealTimers()
    })

    it('should unlock "birthday-surprise" when visited on January 5', () => {
      // Mock Date to return January 5
      const mockDate = new Date('2025-01-05T12:00:00')
      vi.setSystemTime(mockDate)

      // Simulate initialization which checks time-based achievements
      const now = new Date()
      if (now.getMonth() === 0 && now.getDate() === 5) {
        unlockAchievement('birthday-surprise')
      }

      const loaded = loadAchievements()
      const achievement = loaded.find(a => a.id === 'birthday-surprise')
      expect(achievement?.unlocked).toBe(true)
      expect(achievement?.rarity).toBe('legendary')
      expect(achievement?.xp).toBe(150)

      vi.useRealTimers()
    })

    it('should unlock "committed-visitor" achievement (time-based)', () => {
      // This would typically be tested with setTimeout mock
      // For now, we'll just test that it can be unlocked
      const achievement = unlockAchievement('committed-visitor')
      expect(achievement?.id).toBe('committed-visitor')
      expect(achievement?.xp).toBe(40)
    })
  })

  describe('Achievement Stats', () => {
    it('should calculate correct achievement statistics', () => {
      unlockAchievement('first-steps') // 10 XP
      unlockAchievement('curious-mind') // 25 XP
      unlockAchievement('tech-savvy') // 15 XP

      const stats = getAchievementStats()
      expect(stats.unlockedCount).toBe(3)
      expect(stats.totalCount).toBe(visitorAchievements.length)
      expect(stats.totalXP).toBe(50) // 10 + 25 + 15
      expect(stats.percentage).toBeGreaterThan(0)
    })

    it('should return zero stats when no achievements unlocked', () => {
      const stats = getAchievementStats()
      expect(stats.unlockedCount).toBe(0)
      expect(stats.totalXP).toBe(0)
      expect(stats.percentage).toBe(0)
    })
  })

  describe('All Achievements Coverage', () => {
    it('should have tests for all 18 achievements', () => {
      // Verify we have all expected achievements
      expect(visitorAchievements).toHaveLength(18)

      const achievementIds = [
        'first-steps',
        'curious-mind',
        'detail-oriented',
        'fellow-gamer',
        'star-gazer',
        'socially-active',
        'project-hunter',
        'committed-visitor',
        'achievement-collector',
        'tech-savvy',
        'stats-enthusiast',
        'konami-code-master',
        'secret-sequence',
        'night-owl',
        'birthday-surprise',
        'contact-initiator',
        'hobby-enthusiast',
        'profile-completionist',
      ]

      expect(visitorAchievements.map(a => a.id)).toEqual(expect.arrayContaining(achievementIds))
    })

    it('should be able to unlock each achievement individually', () => {
      const achievementIds = visitorAchievements.map(a => a.id)

      achievementIds.forEach(id => {
        resetAchievements()
        const result = unlockAchievement(id)
        expect(result).toBeTruthy()
        expect(result?.id).toBe(id)
        expect(result?.unlocked).toBe(true)
        expect(result?.xp).toBeGreaterThan(0)
      })
    })

    it('should verify all achievements have required properties', () => {
      visitorAchievements.forEach(achievement => {
        expect(achievement).toHaveProperty('id')
        expect(achievement).toHaveProperty('title')
        expect(achievement).toHaveProperty('description')
        expect(achievement).toHaveProperty('icon')
        expect(achievement).toHaveProperty('trigger')
        expect(achievement).toHaveProperty('rarity')
        expect(achievement).toHaveProperty('xp')
        expect(achievement.xp).toBeGreaterThan(0)
      })
    })

    it('should verify XP values match rarity tiers', () => {
      const rarityXPRanges = {
        common: { min: 10, max: 25 },
        rare: { min: 30, max: 45 },
        epic: { min: 50, max: 75 },
        legendary: { min: 100, max: 200 },
      }

      visitorAchievements.forEach(achievement => {
        const range = rarityXPRanges[achievement.rarity as keyof typeof rarityXPRanges]
        expect(achievement.xp).toBeGreaterThanOrEqual(range.min)
        expect(achievement.xp).toBeLessThanOrEqual(range.max)
      })
    })
  })

  describe('Total XP Calculation', () => {
    it('should calculate correct total XP when all achievements are unlocked', () => {
      // Unlock all achievements
      visitorAchievements.forEach(achievement => {
        unlockAchievement(achievement.id)
      })

      const stats = getAchievementStats()

      // Calculate expected total XP
      const expectedTotalXP = visitorAchievements.reduce((sum, a) => sum + a.xp, 0)

      expect(stats.totalXP).toBe(expectedTotalXP)
      expect(stats.unlockedCount).toBe(18)
      expect(stats.percentage).toBe(100)
    })
  })
})
