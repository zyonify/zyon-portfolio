import { Language } from '../services/languageService'

export interface Translations {
  // Header Navigation
  profile: string
  projects: string
  contact: string
  skills: string
  info: string
  portfolioTitle: string

  // Profile Section
  developerLevel: string
  yearsOfExperience: string
  repositories: string
  followers: string
  totalStars: string
  achievements: string

  // Sections
  recentActivity: string
  contributions: string
  viewAllActivity: string
  featuredProjects: string
  achievementShowcase: string
  personalHobbies: string
  technicalSkills: string
  connectWithMe: string
  githubFollowers: string

  // Buttons
  viewResume: string
  viewAll: string
  sendMessage: string

  // Stats
  level: string
  developer: string

  // Common
  loading: string
  more: string
  less: string
}

export const translations: Record<Language, Translations> = {
  english: {
    profile: 'Profile',
    projects: 'Projects',
    contact: 'Contact',
    skills: 'Skills',
    info: 'Info',
    portfolioTitle: "ZYON'S PORTFOLIO",

    developerLevel: 'Developer Level',
    yearsOfExperience: 'Years of Experience',
    repositories: 'Repositories',
    followers: 'Followers',
    totalStars: 'Total Stars',
    achievements: 'Achievements',

    recentActivity: 'Recent Activity',
    contributions: 'contributions in last 12 weeks',
    viewAllActivity: 'View all activity on GitHub',
    featuredProjects: 'Featured Projects',
    achievementShowcase: 'Achievement Showcase',
    personalHobbies: 'Personal Hobbies & Interests',
    technicalSkills: 'Technical Skills',
    connectWithMe: 'Connect With Me',
    githubFollowers: 'GitHub Followers',

    viewResume: 'View Resume',
    viewAll: 'View All',
    sendMessage: 'Send Message',

    level: 'Level',
    developer: 'Developer',

    loading: 'Loading...',
    more: 'More',
    less: 'Less'
  },

  sarcasm: {
    profile: 'Profile (Totally Unique)',
    projects: 'Projects (Revolutionary)',
    contact: 'Contact (I\'ll Respond, Promise)',
    skills: 'Skills (World-Class, Obviously)',
    info: 'Info (Spoilers)',
    portfolioTitle: "ZYON'S HUMBLE PORTFOLIO",

    developerLevel: 'Developer Level (Self-Proclaimed)',
    yearsOfExperience: 'Years of Pretending',
    repositories: 'Code Dumps',
    followers: 'Stalkers',
    totalStars: 'Pity Stars',
    achievements: 'Participation Trophies',

    recentActivity: 'Recent Excuses',
    contributions: 'attempts at productivity',
    viewAllActivity: 'See all my procrastination',
    featuredProjects: 'Featured Experiments',
    achievementShowcase: 'Trophy Case (Empty Soon)',
    personalHobbies: 'Time Wasters & Distractions',
    technicalSkills: 'Things I Googled Once',
    connectWithMe: 'Contact Me (At Your Own Risk)',
    githubFollowers: 'People Who Clicked Wrong',

    viewResume: 'Read My Life Story',
    viewAll: 'See Everything (If You Must)',
    sendMessage: 'Spam Me',

    level: 'Imaginary Level',
    developer: 'Code Monkey',

    loading: 'Pretending to load...',
    more: 'Ugh, More',
    less: 'Thank God, Less'
  },

  binary: {
    profile: '01010000 01110010 01101111',
    projects: '01010000 01110010 01101111 01101010',
    contact: '01000011 01101111 01101110',
    skills: '01010011 01101011 01101001',
    info: '01001001 01101110 01100110',
    portfolioTitle: '01011010 01011001 01001111 01001110',

    developerLevel: '01000100 01100101 01110110',
    yearsOfExperience: '01011001 01100101 01100001',
    repositories: '01010010 01100101 01110000',
    followers: '01000110 01101111 01101100',
    totalStars: '01010011 01110100 01100001',
    achievements: '01000001 01100011 01101000',

    recentActivity: '01000001 01100011 01110100',
    contributions: '01100011 01101111 01101110 01110100',
    viewAllActivity: '01110110 01101001 01100101 01110111',
    featuredProjects: '01000110 01100101 01100001 01110100',
    achievementShowcase: '01000001 01100011 01101000 01101001',
    personalHobbies: '01001000 01101111 01100010 01100010',
    technicalSkills: '01010100 01100101 01100011 01101000',
    connectWithMe: '01000011 01101111 01101110 01101110',
    githubFollowers: '01000111 01101001 01110100 01001000',

    viewResume: '01010010 01100101 01110011',
    viewAll: '01000001 01101100 01101100',
    sendMessage: '01001101 01110011 01100111',

    level: '01001100 01110110 01101100',
    developer: '01000100 01100101 01110110',

    loading: '01001100 01101111 01100001 01100100',
    more: '01001101 01101111 01110010 01100101',
    less: '01001100 01100101 01110011 01110011'
  },

  emoji: {
    profile: '👤',
    projects: '💼',
    contact: '📧',
    skills: '🎯',
    info: 'ℹ️',
    portfolioTitle: '🎨 ZYON 🚀',

    developerLevel: '👨‍💻 📊',
    yearsOfExperience: '📅 ⏳',
    repositories: '📦',
    followers: '👥',
    totalStars: '⭐',
    achievements: '🏆',

    recentActivity: '⚡ 📋',
    contributions: '🎯',
    viewAllActivity: '👀 📊',
    featuredProjects: '⭐ 💼',
    achievementShowcase: '🏆 ✨',
    personalHobbies: '🎮 🎨 ⚽',
    technicalSkills: '💻 🛠️',
    connectWithMe: '🤝 📱',
    githubFollowers: '👥 💻',

    viewResume: '📄 👀',
    viewAll: '👀 ✨',
    sendMessage: '📨 ✉️',

    level: '📈',
    developer: '👨‍💻',

    loading: '⏳...',
    more: '➕',
    less: '➖'
  },

  lorem: {
    profile: 'Lorem',
    projects: 'Ipsum',
    contact: 'Dolor',
    skills: 'Sit Amet',
    info: 'Info',
    portfolioTitle: 'PORTFOLIO LOREM',

    developerLevel: 'Lorem Ipsum Dolor',
    yearsOfExperience: 'Consectetur Adipiscing',
    repositories: 'Sed Do Eiusmod',
    followers: 'Tempor Incididunt',
    totalStars: 'Ut Labore',
    achievements: 'Dolore Magna',

    recentActivity: 'Magna Aliqua',
    contributions: 'dolor sit amet',
    viewAllActivity: 'Ut enim ad minim veniam',
    featuredProjects: 'Quis Nostrud',
    achievementShowcase: 'Exercitation Ullamco',
    personalHobbies: 'Nisi Ut Aliquip',
    technicalSkills: 'Ex Ea Commodo',
    connectWithMe: 'Duis Aute Irure',
    githubFollowers: 'Reprehenderit In',

    viewResume: 'Lorem Ipsum',
    viewAll: 'Dolor Sit',
    sendMessage: 'Consectetur',

    level: 'Nivel',
    developer: 'Codex',

    loading: 'Expectans...',
    more: 'Magis',
    less: 'Minus'
  },

  youngStunnah: {
    profile: 'Petmalu Profile',
    projects: 'Werpa Projects',
    contact: 'Chika Tayo',
    skills: 'Swabe Skills',
    info: 'Chismis',
    portfolioTitle: 'PORTFOLIO NI ZYON',

    developerLevel: 'Dev Lodi Level',
    yearsOfExperience: 'G na G Years',
    repositories: 'Code Sesh',
    followers: 'Tropa',
    totalStars: 'Solid Stars',
    achievements: 'Flex Badges',

    recentActivity: 'Latest Gawa',
    contributions: 'lodi moves',
    viewAllActivity: 'Tignan lahat sa GitHub',
    featuredProjects: 'Bet na Bet Projects',
    achievementShowcase: 'Flex Wall',
    personalHobbies: 'Tambay at Chill',
    technicalSkills: 'Tech Skillz',
    connectWithMe: 'Tara Usap',
    githubFollowers: 'GitHub Tropa',

    viewResume: 'Basahin Resume',
    viewAll: 'Tignan Lahat',
    sendMessage: 'Chat Tayo',

    level: 'Antas',
    developer: 'Dev Lodi',

    loading: 'Sandali lang...',
    more: 'Pa-more',
    less: 'Sakto na'
  }
}

export function getTranslation(language: Language): Translations {
  return translations[language] || translations.english
}
