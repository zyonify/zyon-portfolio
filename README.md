# 🎮 Steam-Inspired Portfolio

A stunning, interactive portfolio website inspired by Steam's profile design, built with React, TypeScript, and Vite. Features a cosmic theme, smooth animations, and dynamic GitHub integration.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=for-the-badge&logo=vite)

## 🆕 Recent Updates

### October 13, 2025
- **🏆 Achievement XP Integration**: Achievements now contribute to developer level
  - Unlocking achievements adds XP to your level progress bar (10-200 XP per achievement)
  - Real-time XP bar updates when achievements unlock
  - New "Achievements" stat badge showing unlock count and total XP earned
  - Achievement XP fully integrated into level calculation system
  - Up to 1,000+ bonus XP available from all 18 achievements
- **📝 Documentation Updates**: Enhanced portfolio documentation
  - Updated Info Modal with achievement XP information
  - Added translation reporting feature with GitHub issue templates
  - Improved example calculations to include achievement XP

### October 12, 2025
- **🌐 Multi-Language System**: Added comprehensive language switching feature
  - 6 languages available: English, Sarcasm, Binary, Emoji Only, Lorem Ipsum, and Young Stunnah (Filipino Gen Z slang)
  - Dropdown menu in header with instant language switching
  - LocalStorage persistence - language preference saved across sessions
  - All UI text translates dynamically: headers, navigation, card titles, buttons, stats
  - Satirical language options for entertainment:
    - **Sarcasm**: "Code Dumps", "Pity Stars", "Things I Googled Once", "ZYON'S HUMBLE PORTFOLIO"
    - **Binary**: All text converted to binary code
    - **Emoji Only**: Pure emoji representations (👤 💼 📧 🎯)
    - **Lorem Ipsum**: Classic placeholder Latin text
    - **Young Stunnah**: Filipino Gen Z slang ("Petmalu Profile", "Bet na Bet Projects", "Flex Wall", "Dev Lodi")
  - Translations include: navigation links, card headers, button text, loading states, and more
- **🎨 Header Improvements**: Two-tier Steam-style header layout
  - Top bar: Info button, Achievement badge, User dropdown with language selection
  - Main header: Logo with translated title, navigation links
  - User dropdown menu with Steam-like styling (account details, wallet, language submenu, sign out)
  - Language submenu appears on hover with smooth transitions
  - Translation problem reporting via GitHub issues
- **ℹ️ Info Modal**: Behind-the-scenes portfolio information
  - Explains XP system, level tiers, achievement mechanics, and hidden features
  - Tabbed interface: Level Tiers, Achievements, XP Sources, Notifications
  - Unified styling with Achievement Modal for consistency

### October 10, 2025
- **🏆 Visitor Achievement System**: Added Steam-style achievement system with 18 achievements
  - Real-time toast notifications when achievements are unlocked
  - Achievement modal with filters (all/unlocked/locked) and progress tracking
  - 4 rarity tiers: Common, Rare, Epic, Legendary
  - LocalStorage persistence across sessions
  - Multiple triggers: exploration, engagement, easter eggs (Konami code!)
  - Achievement counter badge in header with pulse animation
- **🔔 Steam Notification System**: Satirical Steam-style friend notifications
  - Appears in bottom-right corner every 5-12 seconds
  - 20+ witty notifications from tech celebrities and real friends
  - Notifications include: "Bill Gates is now online", "Elon Musk is playing Twitter Takeover Simulator", "Roaring Kitty invited you to trade GameStop shares", and more
  - Click to dismiss or auto-dismiss after 6 seconds
  - Color-coded borders by notification type (friend online, playing, invite, achievement, trade, message)
  - Full Cosmic theme support
- **🎨 Profile UI Improvements**:
  - Removed redundant action buttons from profile header (moved to dedicated Contact section)
  - Adjusted profile info positioning to match Steam's layout
  - Relocated work status badge from header to Developer Level card
  - Cleaner, more focused profile overview section

## ✨ Features

### 🌐 Multi-Language Support
- **6 Language Options**: Switch between English, Sarcasm, Binary, Emoji Only, Lorem Ipsum, and Young Stunnah
  - **English**: Standard professional language
  - **Sarcasm**: Humorous self-deprecating versions of all text
  - **Binary**: All text converted to binary code for the tech purists
  - **Emoji Only**: Pure emoji representations (👤 💼 📧 🎯)
  - **Lorem Ipsum**: Classic placeholder Latin text
  - **Young Stunnah**: Filipino Gen Z slang ("Petmalu Profile", "Dev Lodi", "Bet na Bet Projects")
- **Persistent Preferences**: Language choice saved in LocalStorage across sessions
- **Comprehensive Translation**: All UI elements translate dynamically
  - Navigation links, card headers, button text, stat labels, loading states
  - Portfolio title, section titles, and all user-facing text
- **Steam-Style Language Selector**: Dropdown submenu in header with hover interaction
- **Instant Switching**: No page reload required - changes apply immediately

### 🎮 Gamification System
- **Developer Level System**: XP-based progression with circular progress ring
  - Calculate level from GitHub stats + achievements (repos × 100 + followers × 50 + stars × 10 + years × 500 + achievements)
  - Achievement XP ranges from 10-200 XP per achievement (up to 1,000+ total bonus XP)
  - Real-time XP bar updates when achievements are unlocked
  - Animated XP progress bar with shimmer effects
  - Display XP breakdown for each stat source including achievements
  - 5 stat badges: Repositories, Followers, Stars, Years, and Achievements
  - Glowing level badge with Steam-inspired design
- **Visitor Achievement System**: Interactive achievement tracking with 18+ achievements
  - Real-time toast notifications slide in when achievements unlock
  - Achievement modal with filters and progress tracking
  - Triggers: section visits, interactions, time-based, easter eggs (Konami code)
  - LocalStorage persistence - achievements saved across sessions
  - Achievement badge in header showing unlock progress (e.g., "5/18")
  - **NEW**: Achievement XP contributes to developer level progression
- **Rarity-Based Achievements**: Color-coded achievement system
  - **Common** (Gray, 10-25 XP), **Rare** (Blue, 30-45 XP), **Epic** (Purple, 50-75 XP), **Legendary** (Orange, 100-200 XP)
  - Animated shine effects on unlocked achievements
  - Legendary achievements have pulsing glow animations
  - Year badges showing when achievements were earned
  - XP values displayed on each achievement card

### 🎨 Steam-Inspired Design
- **Cosmic Theme**: Beautiful gradient backgrounds with pink, purple, and green glows
- **Profile Cards**: Steam-style cards with hover effects and animations
- **Avatar Frame**: Steam profile frame around avatar with hover effects
- **Steam Notifications**: Satirical friend notifications in bottom-right corner
  - Tech celebrities and friends with witty status updates
  - "Bill Gates is now online", "Elon Musk is playing Twitter Takeover Simulator"
  - Color-coded by type (online, playing, invite, achievement, trade, message)
  - Appears every 5-12 seconds, auto-dismisses or click to close
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Scroll-triggered animations and transitions throughout

### 🚀 Interactive Navigation
- **Smooth Scrolling**: Click navigation links to smoothly scroll to sections
- **Active States**: Navigation automatically highlights based on scroll position
- **Pulse Animations**: Sections glow when navigated to
- **Mobile-First**: Profile card appears at the top on mobile devices

### 📊 Dynamic Content & Visualizations
- **GitHub Integration**: Automatically fetches repos, stats, and profile data
- **Animated Counters**: Stats count up when scrolling into view with smooth easing
- **Contribution Heatmap**: GitHub-style activity visualization
  - Last 12 weeks of activity
  - 5-level intensity colors
  - Hover tooltips showing contribution counts
  - Responsive grid layout with day labels
- **Language Breakdown Donut Chart**: Visual representation of tech stack
  - Interactive circular chart with hover effects
  - Shows language count in center
  - Color-coded segments matching language colors
  - Complements horizontal bar visualization
- **Featured Projects**: Showcase your best work with live demos
- **Achievement Showcase**: Display your certifications and milestones with rarity tiers
- **Technical Skills**: Organized by category with Steam-style interactive tags
- **Resume Viewer**: Built-in PDF viewer with expand/collapse and download

### 🎯 Key Sections
1. **Header Navigation**: Two-tier Steam-style header with language selector, info button, and achievements
2. **Profile Overview**: Name, title, location with Steam profile frame
3. **Developer Level**: XP-based level system with progress ring, 5 stat badges (GitHub + Achievements), and work status
4. **Visitor Achievements**: Interactive achievement system with toast notifications, modal, and XP rewards
5. **Resume Viewer**: Embedded PDF with expand/collapse and download
6. **Featured Projects**: GitHub repos with stars, forks, and tech stacks
7. **Achievement Showcase**: Rarity-based certifications and career milestones
8. **Personal Hobbies**: Interactive hobby cards with engagement tracking
9. **Technical Skills**: Categorized skills with hover animations
10. **GitHub Stats**: Animated counters, language donut chart, and completion rate
11. **Activity Feed**: Contribution heatmap and recent GitHub activity timeline
12. **Social Links**: GitHub, LinkedIn, Email contact info
13. **Steam Notifications**: Satirical friend notifications appearing periodically
14. **Info Modal**: Behind-the-scenes details about portfolio mechanics, XP system, and features

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI framework with hooks (useState, useEffect, useContext)
- **TypeScript 5.6** - Type safety and interfaces
- **Vite 6.0** - Build tool and dev server with HMR
- **CSS3** - Styling with custom properties and animations
- **React Context API** - Global state management for language switching
- **LocalStorage API** - Persistent user preferences across sessions

### APIs & Services
- **GitHub REST API** - Fetch repos and user data
- **GitHub GraphQL API** - Contribution graphs and advanced queries
- **DiceBear Avatars API** - Generate avatar images for Steam notifications

### Deployment
- **Vercel** - Optimized for deployment
- **GitHub Pages** - Alternative deployment option

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/zyonify/steam-profile-portfolio.git
cd steam-profile-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure your portfolio**

   Edit `src/config/portfolio.config.ts`:
   ```typescript
   export const portfolioConfig = {
     personal: {
       name: 'Your Name',
       title: 'Your Title',
       email: 'your.email@example.com',
       // ... more settings
     },
     social: {
       github: 'your-github-username',
       linkedin: 'https://linkedin.com/in/your-profile',
     },
     // ... more configuration
   }
   ```

4. **Add your assets to `public/` folder**
   - `profile-avatar.gif` - Your animated avatar
   - `profile-background.jpg` - Background image
   - `resume.pdf` - Your resume PDF
   - `zyonify-logo.png` - Your logo

5. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:5173` to see your portfolio!

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy!

### Deploy to GitHub Pages

1. Update `vite.config.ts` with your repo name:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
})
```

2. Build and deploy:
```bash
npm run build
npm run deploy
```

## ⚙️ Configuration

### Portfolio Config
All customization is done through `src/config/portfolio.config.ts`:

```typescript
export const portfolioConfig = {
  personal: {
    name: 'Your Name',
    title: 'Your Title',
    location: 'Your Location',
    email: 'your.email@example.com',
    banner: '/steam-profile-portfolio/profile-background.jpg',
    avatar: '/steam-profile-portfolio/profile-avatar.gif',
  },

  featuredProjects: [
    {
      repo: 'your-repo-name',
      demoUrl: 'https://demo-url.com',
      featured: true,
    },
  ],

  achievements: [
    {
      title: 'Your Achievement',
      description: 'Description',
      icon: '🏆',
      logo: '/your-badge-logo.png', // Optional: path to badge image
      year: 2024,
      unlocked: true,
      rarity: 'legendary', // 'common' | 'rare' | 'epic' | 'legendary'
    },
  ],

  technicalSkills: {
    'Languages & Frameworks': ['C#', '.NET', 'TypeScript'],
    'Front-end & UI': ['React', 'Tailwind CSS'],
    // ... more categories
  },
}
```

### Theme Customization
Edit `src/styles/index.css` for cosmic theme colors:
```css
body.CosmicTheme {
  --gradient-right: rgba(248, 70, 180, 0.301);
  --gradient-left: rgba(9, 243, 99, 0.247);
  --gradient-background: rgba(46, 13, 36, 0.93);
}
```

## 🎨 Features Showcase

### 🌐 Multi-Language System

Switch between 6 different languages for a completely different experience:

**English (Standard)**
- Navigation: Profile, Projects, Contact, Skills
- Stats: Developer Level, Years of Experience, Repositories
- Headers: Featured Projects, Achievement Showcase, Recent Activity

**Sarcasm (Humorous)**
- Navigation: Profile (Totally Unique), Projects (Revolutionary), Contact (I'll Respond, Promise)
- Stats: Developer Level (Self-Proclaimed), Years of Pretending, Code Dumps
- Headers: Featured Experiments, Trophy Case (Empty Soon), Recent Excuses

**Binary (Tech Purist)**
- Everything converted to binary code
- Navigation: `01010000 01110010 01101111` (Profile)
- Complete binary representation of all text

**Emoji Only (Visual)**
- Navigation: 👤 (Profile), 💼 (Projects), 📧 (Contact), 🎯 (Skills)
- Stats: 👨‍💻 📊 (Developer Level), 📅 ⏳ (Years), 📦 (Repositories)
- Pure emoji-based communication

**Lorem Ipsum (Classic)**
- Navigation: Lorem, Ipsum, Dolor, Sit Amet
- Headers: Quis Nostrud, Exercitation Ullamco, Magna Aliqua
- Traditional placeholder Latin text throughout

**Young Stunnah (Filipino Gen Z Slang)**
- Navigation: Petmalu Profile, Werpa Projects, Chika Tayo, Swabe Skills
- Stats: Dev Lodi Level, G na G Years, Code Sesh
- Headers: Bet na Bet Projects, Flex Wall, Latest Gawa
- Portfolio Title: PORTFOLIO NI ZYON

**How to Use:**
1. Click on your name in the top-right header
2. Hover over "Change language"
3. Select your preferred language from the submenu
4. Watch all text instantly transform!
5. Your choice is saved automatically for future visits

### 🏆 Developer Level System
The gamification system calculates your developer level based on GitHub activity and visitor achievements:
- **Repositories**: 100 XP each
- **Followers**: 50 XP each
- **Stars**: 10 XP each
- **Years of Experience**: 500 XP per year
- **Achievements**: Variable XP (10-200 per achievement)
  - Common achievements: 10-25 XP
  - Rare achievements: 30-45 XP
  - Epic achievements: 50-75 XP
  - Legendary achievements: 100-200 XP

Level up using a Steam-like bracket system! The circular progress ring shows your progress to the next level with smooth animations and glowing effects. Unlock achievements to boost your XP and level up faster!

### 🎯 Achievement Rarity Tiers
Achievements are color-coded by rarity:
- **Common**: Gray - Basic achievements and certifications
- **Rare**: Blue - Notable accomplishments
- **Epic**: Purple - Significant milestones and advanced certifications
- **Legendary**: Orange - Top-tier achievements with pulsing glow effect

Each tier has unique visual effects including borders, backgrounds, and animations.

### 📊 Data Visualizations

#### Contribution Heatmap
- GitHub-style grid showing last 12 weeks of activity
- 5 intensity levels from light to bright blue
- Hover to see exact contribution counts
- Automatically generated from your recent GitHub events

#### Language Breakdown Chart
- Interactive donut chart showing your top programming languages
- Color-coded segments matching each language's official color
- Hover effects that brighten and enlarge segments
- Displays total language count in the center

#### Animated Stat Counters
- Numbers count up smoothly when scrolling into view
- Smooth easing animations (ease-out cubic)
- Icons with hover glow effects
- Triggered by Intersection Observer for performance

### Navigation System
- Smooth scroll with offset for sticky header
- Active link highlighting based on scroll position
- Pulse animation on section navigation
- Mobile-responsive navigation

### Skills Display
Skills organized in Steam showcase style:
- **Languages & Frameworks**: C#, .NET, Python, JavaScript
- **Front-end & UI**: React, HTML5, CSS3, Tailwind
- **Database**: MS SQL Server, Supabase, Firebase
- **Tools & Platforms**: Visual Studio, Git, Azure DevOps
- **Practices**: Agile Scrum, CI/CD, Code Reviews

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Victor Zyon Tiangson**
- GitHub: [@zyonify](https://github.com/zyonify)
- LinkedIn: [Victor Zyon Tiangson](https://www.linkedin.com/in/zyontiangson/)
- Email: tiangsonzyon@gmail.com

## 🙏 Acknowledgments

- Inspired by [Steam Community](https://steamcommunity.com/) profile design
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)
- Cosmic theme inspired by Steam's profile customization

---

**Note**: Don't forget to star ⭐ this repository if you found it helpful!

Made with 💜 and inspired by Steam
