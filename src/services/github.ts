import {
  GitHubUser,
  GitHubRepo,
  GitHubLanguages,
  GitHubEvent,
  ProcessedProject,
  ProcessedStats,
  ProcessedActivity,
} from '../types'
import { getCache, setCache } from '../utils/cache'
import { portfolioConfig } from '../config/portfolio.config'

const GITHUB_API_BASE = 'https://api.github.com'
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

/**
 * GitHub API Service
 *
 * Fetches and processes data from GitHub's public API
 */

// Language colors (common programming languages)
const LANGUAGE_COLORS: { [key: string]: string } = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3776ab',
  'C#': '#178600',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#1572b6',
  PHP: '#777bb4',
  Ruby: '#701516',
  Go: '#00add8',
  Rust: '#dea584',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
}

/**
 * Fetch user profile information
 */
export async function fetchUserProfile(username: string = portfolioConfig.social.github): Promise<GitHubUser | null> {
  const cacheKey = `user_${username}`
  const cached = getCache<GitHubUser>(cacheKey)

  if (cached) {
    return cached
  }

  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`)
    }

    const data: GitHubUser = await response.json()
    setCache(cacheKey, data, CACHE_TTL)
    return data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

/**
 * Fetch all user repositories
 */
export async function fetchUserRepos(
  username: string = portfolioConfig.social.github,
  page: number = 1,
  perPage: number = 100
): Promise<GitHubRepo[]> {
  const cacheKey = `repos_${username}_${page}_${perPage}`
  const cached = getCache<GitHubRepo[]>(cacheKey)

  if (cached) {
    return cached
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch repos: ${response.statusText}`)
    }

    const data: GitHubRepo[] = await response.json()
    setCache(cacheKey, data, CACHE_TTL)
    return data
  } catch (error) {
    console.error('Error fetching repositories:', error)
    return []
  }
}

/**
 * Fetch languages for a specific repository
 */
export async function fetchRepoLanguages(
  username: string,
  repoName: string
): Promise<GitHubLanguages> {
  const cacheKey = `languages_${username}_${repoName}`
  const cached = getCache<GitHubLanguages>(cacheKey)

  if (cached) {
    return cached
  }

  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${username}/${repoName}/languages`)
    if (!response.ok) {
      throw new Error(`Failed to fetch languages: ${response.statusText}`)
    }

    const data: GitHubLanguages = await response.json()
    setCache(cacheKey, data, CACHE_TTL)
    return data
  } catch (error) {
    console.error('Error fetching repository languages:', error)
    return {}
  }
}

/**
 * Fetch user events (activity feed)
 */
export async function fetchUserEvents(
  username: string = portfolioConfig.social.github,
  page: number = 1,
  perPage: number = 30
): Promise<GitHubEvent[]> {
  const cacheKey = `events_${username}_${page}`
  const cached = getCache<GitHubEvent[]>(cacheKey)

  if (cached) {
    return cached
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/events/public?page=${page}&per_page=${perPage}`
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`)
    }

    const data: GitHubEvent[] = await response.json()
    setCache(cacheKey, data, CACHE_TTL)
    return data
  } catch (error) {
    console.error('Error fetching user events:', error)
    return []
  }
}

/**
 * Process repositories into project data
 */
export async function getProcessedProjects(
  username: string = portfolioConfig.social.github
): Promise<ProcessedProject[]> {
  const repos = await fetchUserRepos(username)
  const featuredRepoNames = portfolioConfig.featuredProjects.map(p => p.repo)

  const projects: ProcessedProject[] = []

  for (const repo of repos) {
    // Skip forks if you want
    // if (repo.fork) continue

    const isFeatured = featuredRepoNames.includes(repo.name)
    const featuredConfig = portfolioConfig.featuredProjects.find(p => p.repo === repo.name)

    const project: ProcessedProject = {
      id: repo.id,
      title: repo.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      description: repo.description || 'No description available',
      image: `https://opengraph.githubassets.com/1/${username}/${repo.name}`,
      tech: repo.topics || (repo.language ? [repo.language] : []),
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language || 'Unknown',
      github: repo.html_url,
      demo: featuredConfig?.demoUrl || repo.homepage || null,
      isFeatured,
      lastUpdated: new Date(repo.updated_at).toLocaleDateString(),
    }

    projects.push(project)
  }

  // Sort: featured first, then by stars
  projects.sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1
    if (!a.isFeatured && b.isFeatured) return 1
    return b.stars - a.stars
  })

  return projects
}

/**
 * Calculate statistics from repositories
 */
export async function getStats(username: string = portfolioConfig.social.github): Promise<ProcessedStats> {
  const repos = await fetchUserRepos(username)
  const user = await fetchUserProfile(username)

  let totalStars = 0
  let totalForks = 0
  const languageTotals: { [key: string]: number } = {}

  repos.forEach(repo => {
    if (!repo.fork) { // Don't count forked repos
      totalStars += repo.stargazers_count
      totalForks += repo.forks_count

      if (repo.language) {
        languageTotals[repo.language] = (languageTotals[repo.language] || 0) + 1
      }
    }
  })

  // Calculate language percentages
  const totalRepos = Object.values(languageTotals).reduce((sum, count) => sum + count, 0)
  const languages = Object.entries(languageTotals)
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / totalRepos) * 100),
      color: LANGUAGE_COLORS[name] || '#6e7681',
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5) // Top 5 languages

  // Estimate completion rate (repos with recent activity)
  const recentRepos = repos.filter(repo => {
    const daysSinceUpdate = (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24)
    return daysSinceUpdate < 365 // Updated in last year
  })
  const completionRate = Math.round((recentRepos.length / repos.length) * 100)

  return {
    totalProjects: user?.public_repos || repos.length,
    totalStars,
    totalForks,
    totalCommits: 0, // GitHub API doesn't provide total commits easily
    languages,
    completionRate,
  }
}

/**
 * Process events into activity feed
 */
export async function getProcessedActivity(
  username: string = portfolioConfig.social.github
): Promise<ProcessedActivity[]> {
  const events = await fetchUserEvents(username)
  const activities: ProcessedActivity[] = []

  events.forEach(event => {
    let activity: ProcessedActivity | null = null

    switch (event.type) {
      case 'PushEvent':
        activity = {
          id: event.id,
          type: 'commit',
          action: 'Pushed commits to',
          target: event.repo.name.split('/')[1],
          time: getTimeAgo(event.created_at),
          icon: '📝',
        }
        break
      case 'CreateEvent':
        if (event.payload.ref_type === 'tag') {
          activity = {
            id: event.id,
            type: 'release',
            action: 'Released',
            target: event.repo.name.split('/')[1],
            time: getTimeAgo(event.created_at),
            icon: '🚀',
          }
        }
        break
      case 'WatchEvent':
        activity = {
          id: event.id,
          type: 'star',
          action: 'Starred',
          target: event.repo.name.split('/')[1],
          time: getTimeAgo(event.created_at),
          icon: '⭐',
        }
        break
      case 'PullRequestEvent':
        if (event.payload.action === 'closed' && event.payload.pull_request.merged) {
          activity = {
            id: event.id,
            type: 'pr',
            action: 'Merged pull request in',
            target: event.repo.name.split('/')[1],
            time: getTimeAgo(event.created_at),
            icon: '🔀',
          }
        }
        break
      case 'IssuesEvent':
        if (event.payload.action === 'closed') {
          activity = {
            id: event.id,
            type: 'issue',
            action: 'Closed issue in',
            target: event.repo.name.split('/')[1],
            time: getTimeAgo(event.created_at),
            icon: '✅',
          }
        }
        break
      case 'ForkEvent':
        activity = {
          id: event.id,
          type: 'fork',
          action: 'Forked',
          target: event.repo.name.split('/')[1],
          time: getTimeAgo(event.created_at),
          icon: '🍴',
        }
        break
    }

    if (activity) {
      activities.push(activity)
    }
  })

  return activities.slice(0, 10) // Return top 10 activities
}

/**
 * Helper function to convert timestamp to "time ago" format
 */
function getTimeAgo(timestamp: string): string {
  const seconds = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / 1000)

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ]

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds)
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`
    }
  }

  return 'just now'
}

/**
 * Get a featured project with full details
 */
export async function getFeaturedProject(
  username: string = portfolioConfig.social.github,
  repoName: string
): Promise<ProcessedProject | null> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${username}/${repoName}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch repo: ${response.statusText}`)
    }

    const repo: GitHubRepo = await response.json()
    const languages = await fetchRepoLanguages(username, repoName)
    const featuredConfig = portfolioConfig.featuredProjects.find(p => p.repo === repoName)

    return {
      id: repo.id,
      title: repo.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      description: repo.description || 'No description available',
      image: `https://opengraph.githubassets.com/1/${username}/${repo.name}`,
      tech: Object.keys(languages).slice(0, 6),
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language || 'Unknown',
      github: repo.html_url,
      demo: featuredConfig?.demoUrl || repo.homepage || null,
      isFeatured: true,
      lastUpdated: new Date(repo.updated_at).toLocaleDateString(),
    }
  } catch (error) {
    console.error('Error fetching featured project:', error)
    return null
  }
}
