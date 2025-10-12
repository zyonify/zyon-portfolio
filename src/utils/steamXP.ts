/**
 * Steam-like XP Calculation System
 *
 * Based on Steam's actual leveling system:
 * - Each badge typically provides 100 XP
 * - XP required per level increases every 10 levels:
 *   - Levels 1-10: 100 XP per level
 *   - Levels 11-20: 200 XP per level
 *   - Levels 21-30: 300 XP per level
 *   - And so on...
 */

/**
 * Calculate XP required for a specific level
 * @param level The level to calculate XP for
 * @returns XP required to reach the next level from this level
 */
export function getXPRequiredForLevel(level: number): number {
  // Determine which 10-level bracket the level is in
  // Levels 1-10 are bracket 1, 11-20 are bracket 2, etc.
  const bracket = Math.floor((level - 1) / 10) + 1

  // XP per level = bracket * 100
  return bracket * 100
}

/**
 * Calculate total XP required to reach a specific level
 * @param targetLevel The level to calculate total XP for
 * @returns Total XP needed to reach this level from level 1
 */
export function getTotalXPForLevel(targetLevel: number): number {
  let totalXP = 0

  for (let level = 1; level < targetLevel; level++) {
    totalXP += getXPRequiredForLevel(level)
  }

  return totalXP
}

/**
 * Calculate level and progress from total XP
 * @param totalXP Total XP earned
 * @returns Object containing current level, XP progress, and XP needed for next level
 */
export function calculateLevelFromXP(totalXP: number): {
  level: number
  currentLevelXP: number
  nextLevelXP: number
  progress: number
  totalXP: number
} {
  let level = 1
  let xpConsumed = 0

  // Calculate level based on cumulative XP
  while (true) {
    const xpForNextLevel = getXPRequiredForLevel(level)

    if (xpConsumed + xpForNextLevel > totalXP) {
      // We found the current level
      const currentLevelXP = totalXP - xpConsumed
      const nextLevelXP = xpForNextLevel
      const progress = (currentLevelXP / nextLevelXP) * 100

      return {
        level,
        currentLevelXP: Math.floor(currentLevelXP),
        nextLevelXP,
        progress,
        totalXP
      }
    }

    xpConsumed += xpForNextLevel
    level++

    // Safety check to prevent infinite loop
    if (level > 10000) {
      break
    }
  }

  // Fallback
  return {
    level: 1,
    currentLevelXP: 0,
    nextLevelXP: 100,
    progress: 0,
    totalXP: 0
  }
}

/**
 * Calculate XP from various sources (Steam-like)
 * @param sources Object containing different XP sources
 * @returns Total XP calculated
 */
export function calculateXPFromSources(sources: {
  repos: number       // Like "games owned" - 100 XP each (like a badge)
  followers: number   // Community engagement - 50 XP each
  stars: number       // Achievements/Recognition - 10 XP each
  years: number       // Account anniversary - 500 XP per year
  achievementsXP?: number  // Visitor achievements - variable XP
}): number {
  return (
    sources.repos * 100 +      // Each repo = 1 game badge
    sources.followers * 50 +   // Community engagement
    sources.stars * 10 +       // Stars as achievements
    sources.years * 500 +      // Years of experience (account age)
    (sources.achievementsXP || 0)  // Visitor achievements
  )
}
