# 🎮 Steam-Inspired Portfolio

A stunning, interactive portfolio website inspired by Steam's profile design, built with React, TypeScript, and Vite. Features a cosmic theme, smooth animations, and dynamic GitHub integration.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=for-the-badge&logo=vite)

## 🆕 Recent Updates

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

### 🎮 Gamification System
- **Developer Level System**: XP-based progression with circular progress ring
  - Calculate level from GitHub stats (repos × 100 + followers × 50 + stars × 10 + years × 500)
  - Animated XP progress bar with shimmer effects
  - Display XP breakdown for each stat source
  - Glowing level badge with Steam-inspired design
- **Visitor Achievement System**: Interactive achievement tracking with 18+ achievements
  - Real-time toast notifications slide in when achievements unlock
  - Achievement modal with filters and progress tracking
  - Triggers: section visits, interactions, time-based, easter eggs (Konami code)
  - LocalStorage persistence - achievements saved across sessions
  - Achievement badge in header showing unlock progress (e.g., "5/18")
- **Rarity-Based Achievements**: Color-coded achievement system
  - **Common** (Gray), **Rare** (Blue), **Epic** (Purple), **Legendary** (Orange)
  - Animated shine effects on unlocked achievements
  - Legendary achievements have pulsing glow animations
  - Year badges showing when achievements were earned

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
1. **Profile Overview**: Name, title, location with Steam profile frame
2. **Developer Level**: XP-based level system with progress ring, stat breakdown, and work status
3. **Visitor Achievements**: Interactive achievement system with toast notifications and modal
4. **Resume Viewer**: Embedded PDF with expand/collapse and download
5. **Featured Projects**: GitHub repos with stars, forks, and tech stacks
6. **Achievement Showcase**: Rarity-based certifications and career milestones
7. **Technical Skills**: Categorized skills with hover animations
8. **GitHub Stats**: Animated counters, language donut chart, and completion rate
9. **Activity Feed**: Contribution heatmap and recent GitHub activity timeline
10. **Social Links**: GitHub, LinkedIn, Email contact info
11. **Steam Notifications**: Satirical friend notifications appearing periodically

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI framework
- **TypeScript 5.6** - Type safety
- **Vite 6.0** - Build tool and dev server
- **CSS3** - Styling with custom properties

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

### 🏆 Developer Level System
The gamification system calculates your developer level based on GitHub activity:
- **Repositories**: 100 XP each
- **Followers**: 50 XP each
- **Stars**: 10 XP each
- **Years of Experience**: 500 XP per year

Level up every 2000 XP! The circular progress ring shows your progress to the next level with smooth animations and glowing effects.

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
