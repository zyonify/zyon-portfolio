// Portfolio Configuration Types
export interface PersonalInfo {
  name: string
  title: string
  location: string
  bio: string
  email: string
  phone?: string
  birthday?: string
  avatar?: string // Optional: will use GitHub avatar if not provided
  banner?: string // Optional: custom banner image
  resumeUrl?: string // Optional: path to resume PDF
}

export interface SocialLinks {
  github: string
  linkedin?: string
  twitter?: string
  website?: string
}

export interface FeaturedProject {
  repo: string
  demoUrl?: string
  featured?: boolean
}

export interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  logo?: string // Optional: path to badge/logo image
  year?: number
  unlocked: boolean
  rarity?: 'common' | 'rare' | 'epic' | 'legendary' // Achievement rarity level
}

export interface WorkStatus {
  status: 'available' | 'employed' | 'away' | 'busy'
  message: string
}

export interface PortfolioConfig {
  personal: PersonalInfo
  social: SocialLinks
  workStatus: WorkStatus
  featuredProjects: FeaturedProject[]
  achievements: Achievement[]
  technicalSkills: { [category: string]: string[] }
  showTestimonials: boolean
  showAllRepos: boolean
}

// GitHub API Response Types
export interface GitHubUser {
  login: string
  avatar_url: string
  name: string
  bio: string
  location: string
  email: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  watchers_count: number
  forks_count: number
  fork: boolean
  language: string | null
  languages_url: string
  created_at: string
  updated_at: string
  pushed_at: string
  topics: string[]
}

export interface GitHubLanguages {
  [key: string]: number
}

export interface GitHubEvent {
  id: string
  type: string
  actor: {
    login: string
    avatar_url: string
  }
  repo: {
    name: string
    url: string
  }
  payload: any
  created_at: string
}

export interface GitHubContributorStats {
  total: number
  weeks: Array<{
    w: number
    a: number
    d: number
    c: number
  }>
}

// Processed/Computed Types
export interface ProcessedProject {
  id: number
  title: string
  description: string
  image?: string
  tech: string[]
  stars: number
  forks: number
  language: string
  github: string
  demo: string | null
  isFeatured: boolean
  lastUpdated: string
}

export interface ProcessedStats {
  totalProjects: number
  totalStars: number
  totalForks: number
  totalCommits: number
  languages: Array<{
    name: string
    percentage: number
    color: string
  }>
  completionRate: number
}

export interface ProcessedActivity {
  id: string
  type: 'commit' | 'release' | 'star' | 'pr' | 'issue' | 'fork'
  action: string
  target: string
  time: string
  icon: string
}

// Cache Types
export interface CachedData<T> {
  data: T
  timestamp: number
  expiresAt: number
}
