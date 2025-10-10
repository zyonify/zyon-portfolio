export interface SteamNotification {
  id: string
  type: 'friend-online' | 'playing' | 'invite' | 'achievement' | 'trade' | 'message'
  avatar?: string
  name: string
  message: string
  action?: string
}

export const steamNotifications: SteamNotification[] = [
  // Real Friends (Satire)
  {
    id: 'dwight-playing',
    type: 'playing',
    name: 'Dwight',
    message: 'is now playing',
    action: 'Beet Farm Simulator 2025',
    avatar: 'https://avatars.akamai.steamstatic.com/348bfcc2f5e138027a503aabe6fcc456920c2ffc_full.jpg'
  },
  {
    id: 'jomar-invite',
    type: 'invite',
    name: 'Jomar',
    message: 'has invited you to',
    action: 'the parlor (no escape)',
    avatar: 'https://avatars.akamai.steamstatic.com/292cd01bfcde8d57f15f0c5916ccd6c01a324d99_full.jpg'
  },
  {
    id: 'banjo-achievement',
    type: 'achievement',
    name: 'Banjo',
    message: 'unlocked achievement:',
    action: 'Actually Touched Grass',
    avatar: 'https://avatars.akamai.steamstatic.com/84445a5904b524abdc0ba160401d7b125ec649eb_full.jpg'
  },

  // Friend Online
  {
    id: 'bill-gates-online',
    type: 'friend-online',
    name: 'Bill Gates',
    message: 'is now online',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BillGates'
  },
  {
    id: 'elon-online',
    type: 'friend-online',
    name: 'Elon Musk',
    message: 'is now online',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ElonMusk'
  },
  {
    id: 'zuck-online',
    type: 'friend-online',
    name: 'Mark Zuckerberg',
    message: 'is now online in the Metaverse',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zuckerberg'
  },
  {
    id: 'jobs-online',
    type: 'friend-online',
    name: 'Steve Jobs',
    message: 'is now online',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SteveJobs'
  },

  // Playing Games
  {
    id: 'elon-playing',
    type: 'playing',
    name: 'Elon Musk',
    message: 'is now playing',
    action: 'Twitter Takeover Simulator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ElonMusk'
  },
  {
    id: 'zuck-vr',
    type: 'playing',
    name: 'Mark Zuckerberg',
    message: 'is now playing',
    action: 'Metaverse: Population 1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zuckerberg'
  },
  {
    id: 'bezos-playing',
    type: 'playing',
    name: 'Jeff Bezos',
    message: 'is now playing',
    action: 'Rocket League (literally)',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bezos'
  },
  {
    id: 'gates-minesweeper',
    type: 'playing',
    name: 'Bill Gates',
    message: 'is now playing',
    action: 'Minesweeper (Classic)',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BillGates'
  },
  {
    id: 'satoshi-playing',
    type: 'playing',
    name: 'Satoshi Nakamoto',
    message: 'is now playing',
    action: 'Hide and Seek',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Satoshi'
  },

  // Invites
  {
    id: 'roaring-kitty-trade',
    type: 'invite',
    name: 'Roaring Kitty',
    message: 'has invited you to trade',
    action: 'GameStop shares',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RoaringKitty'
  },
  {
    id: 'buffett-invite',
    type: 'invite',
    name: 'Warren Buffett',
    message: 'has invited you to play',
    action: 'The Long Game',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=WarrenBuffett'
  },
  {
    id: 'vitalik-invite',
    type: 'invite',
    name: 'Vitalik Buterin',
    message: 'has invited you to',
    action: 'merge the mainnet',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vitalik'
  },

  // Achievements
  {
    id: 'linus-achievement',
    type: 'achievement',
    name: 'Linus Torvalds',
    message: 'unlocked achievement:',
    action: 'Built Different',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linus'
  },
  {
    id: 'ada-achievement',
    type: 'achievement',
    name: 'Ada Lovelace',
    message: 'unlocked achievement:',
    action: 'First Programmer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ada'
  },

  // Messages
  {
    id: 'cook-message',
    type: 'message',
    name: 'Tim Cook',
    message: 'sent you a message:',
    action: '"Sent from my iPhone"',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TimCook'
  },
  {
    id: 'carmack-message',
    type: 'message',
    name: 'John Carmack',
    message: 'sent you a message:',
    action: '"Need more FPS"',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carmack'
  },
  {
    id: 'gaben-message',
    type: 'message',
    name: 'Gabe Newell',
    message: 'sent you a message:',
    action: '"Half-Life 3 confirmed?"',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gaben'
  },

  // Trade Offers
  {
    id: 'woz-trade',
    type: 'trade',
    name: 'Steve Wozniak',
    message: 'wants to trade',
    action: 'vintage Apple I for your code',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wozniak'
  },
  {
    id: 'dorsey-trade',
    type: 'trade',
    name: 'Jack Dorsey',
    message: 'wants to trade',
    action: 'first tweet NFT',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dorsey'
  }
]

// Get random notification
export const getRandomNotification = (): SteamNotification => {
  const randomIndex = Math.floor(Math.random() * steamNotifications.length)
  return steamNotifications[randomIndex]
}
