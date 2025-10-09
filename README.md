# 🎮 Steam-Inspired Portfolio

A stunning, interactive portfolio website inspired by Steam's profile design, built with React, TypeScript, and Vite. Features a cosmic theme, smooth animations, and dynamic GitHub integration.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=for-the-badge&logo=vite)

## ✨ Features

### 🎨 Steam-Inspired Design
- **Cosmic Theme**: Beautiful gradient backgrounds with pink, purple, and green glows
- **Profile Cards**: Steam-style cards with hover effects and animations
- **Avatar Frame**: Animated flame frame around profile picture
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices

### 🚀 Interactive Navigation
- **Smooth Scrolling**: Click navigation links to smoothly scroll to sections
- **Active States**: Navigation automatically highlights based on scroll position
- **Pulse Animations**: Sections glow when navigated to
- **Mobile-First**: Profile card appears at the top on mobile devices

### 📊 Dynamic Content
- **GitHub Integration**: Automatically fetches repos, stats, and profile data
- **Featured Projects**: Showcase your best work with live demos
- **Achievement Showcase**: Display your certifications and milestones
- **Technical Skills**: Organized by category with Steam-style tags
- **Resume Viewer**: Built-in PDF viewer with download option

### 🎯 Key Sections
1. **Profile Overview**: Name, title, location, and quick actions
2. **Resume Viewer**: Embedded PDF with expand/collapse and download
3. **Featured Projects**: GitHub repos with stars, forks, and tech stacks
4. **Achievement Showcase**: Certifications and career milestones
5. **Technical Skills**: Categorized skills in Steam showcase style
6. **Profile Stats**: Level, experience, and project count
7. **GitHub Stats**: Contributions, streak, and language breakdown
8. **Activity Feed**: Recent GitHub activity
9. **Social Links**: GitHub, LinkedIn, Email contact info

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI framework
- **TypeScript 5.6** - Type safety
- **Vite 6.0** - Build tool and dev server
- **CSS3** - Styling with custom properties

### APIs & Services
- **GitHub REST API** - Fetch repos and user data
- **GitHub GraphQL API** - Contribution graphs and advanced queries

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
      year: 2024,
      unlocked: true,
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
