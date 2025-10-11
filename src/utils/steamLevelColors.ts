/**
 * Steam-like Level Border Colors and Effects
 *
 * Provides color schemes and visual effects based on level ranges
 * Adjusted to show awesome effects every 5 levels
 */

export interface LevelStyle {
  color: string
  gradient?: string
  glow?: string
  shimmer?: boolean
  rainbow?: boolean
  name: string
}

/**
 * Get the border color and effect for a given level
 * @param level The current level
 * @returns LevelStyle object with color, effects, and name
 */
export function getLevelBorderStyle(level: number): LevelStyle {
  // Levels 1-4: Gray
  if (level < 5) {
    return {
      color: '#8B8B8B',
      name: 'Novice',
    }
  }

  // Levels 5-9: Blue
  if (level < 10) {
    return {
      color: '#4A90E2',
      gradient: 'linear-gradient(135deg, #4A90E2, #357ABD)',
      name: 'Apprentice',
    }
  }

  // Levels 10-14: Light Blue / Teal
  if (level < 15) {
    return {
      color: '#5BC0DE',
      gradient: 'linear-gradient(135deg, #5BC0DE, #31B0D5)',
      name: 'Intermediate',
    }
  }

  // Levels 15-19: Green
  if (level < 20) {
    return {
      color: '#5CB85C',
      gradient: 'linear-gradient(135deg, #5CB85C, #4CAE4C)',
      name: 'Experienced',
    }
  }

  // Levels 20-24: Bright Green / Lime
  if (level < 25) {
    return {
      color: '#A4D007',
      gradient: 'linear-gradient(135deg, #A4D007, #8AB904)',
      name: 'Proficient',
    }
  }

  // Levels 25-29: Orange
  if (level < 30) {
    return {
      color: '#F39C12',
      gradient: 'linear-gradient(135deg, #F39C12, #E67E22)',
      glow: 'rgba(243, 156, 18, 0.5)',
      name: 'Advanced',
    }
  }

  // Levels 30-34: Red
  if (level < 35) {
    return {
      color: '#E74C3C',
      gradient: 'linear-gradient(135deg, #E74C3C, #C0392B)',
      glow: 'rgba(231, 76, 60, 0.6)',
      name: 'Expert',
    }
  }

  // Levels 35-39: Purple
  if (level < 40) {
    return {
      color: '#9B59B6',
      gradient: 'linear-gradient(135deg, #9B59B6, #8E44AD)',
      glow: 'rgba(155, 89, 182, 0.6)',
      name: 'Elite',
    }
  }

  // Levels 40-44: Pink / Magenta
  if (level < 45) {
    return {
      color: '#E91E63',
      gradient: 'linear-gradient(135deg, #E91E63, #C2185B)',
      glow: 'rgba(233, 30, 99, 0.7)',
      name: 'Master',
    }
  }

  // Levels 45-49: Gold
  if (level < 50) {
    return {
      color: '#FFD700',
      gradient: 'linear-gradient(135deg, #FFD700, #FFA500)',
      glow: 'rgba(255, 215, 0, 0.7)',
      name: 'Grandmaster',
    }
  }

  // Levels 50-74: Shiny Platinum (animated shimmer)
  if (level < 75) {
    return {
      color: '#E5E4E2',
      gradient: 'linear-gradient(135deg, #E5E4E2, #BCC6CC, #E5E4E2)',
      glow: 'rgba(229, 228, 226, 0.8)',
      shimmer: true,
      name: 'Platinum',
    }
  }

  // Levels 75-99: Light Blue with glow
  if (level < 100) {
    return {
      color: '#00D4FF',
      gradient: 'linear-gradient(135deg, #00D4FF, #0099CC)',
      glow: 'rgba(0, 212, 255, 0.9)',
      shimmer: true,
      name: 'Diamond',
    }
  }

  // Levels 100-124: Green glow
  if (level < 125) {
    return {
      color: '#00FF88',
      gradient: 'linear-gradient(135deg, #00FF88, #00CC6A)',
      glow: 'rgba(0, 255, 136, 1)',
      shimmer: true,
      name: 'Emerald',
    }
  }

  // Levels 125-149: Orange glow
  if (level < 150) {
    return {
      color: '#FF8C00',
      gradient: 'linear-gradient(135deg, #FF8C00, #FF6347)',
      glow: 'rgba(255, 140, 0, 1)',
      shimmer: true,
      name: 'Inferno',
    }
  }

  // Levels 150-174: Red glow
  if (level < 175) {
    return {
      color: '#FF2D2D',
      gradient: 'linear-gradient(135deg, #FF2D2D, #CC0000)',
      glow: 'rgba(255, 45, 45, 1)',
      shimmer: true,
      name: 'Crimson',
    }
  }

  // Levels 175-199: Purple glow
  if (level < 200) {
    return {
      color: '#B620E0',
      gradient: 'linear-gradient(135deg, #B620E0, #8B00CC)',
      glow: 'rgba(182, 32, 224, 1)',
      shimmer: true,
      name: 'Mystic',
    }
  }

  // Levels 200-224: Pink glow
  if (level < 225) {
    return {
      color: '#FF1493',
      gradient: 'linear-gradient(135deg, #FF1493, #FF69B4)',
      glow: 'rgba(255, 20, 147, 1)',
      shimmer: true,
      name: 'Celestial',
    }
  }

  // Levels 225-249: Gold glow
  if (level < 250) {
    return {
      color: '#FFD700',
      gradient: 'linear-gradient(135deg, #FFD700, #FFED4E, #FFD700)',
      glow: 'rgba(255, 215, 0, 1)',
      shimmer: true,
      name: 'Radiant',
    }
  }

  // Levels 250-274: Platinum glow
  if (level < 275) {
    return {
      color: '#E5E4E2',
      gradient: 'linear-gradient(135deg, #E5E4E2, #FFFFFF, #E5E4E2)',
      glow: 'rgba(255, 255, 255, 1)',
      shimmer: true,
      name: 'Transcendent',
    }
  }

  // Levels 275+: Rainbow animated border
  return {
    color: '#FF0080',
    gradient: 'linear-gradient(135deg, #FF0080, #FF8C00, #FFD700, #00FF00, #00D4FF, #0080FF, #8000FF)',
    glow: 'rgba(255, 0, 128, 1)',
    rainbow: true,
    shimmer: true,
    name: 'Legendary',
  }
}

/**
 * Get a descriptive rank name based on level
 */
export function getLevelRank(level: number): string {
  return getLevelBorderStyle(level).name
}
