import { useEffect, useState } from 'react'
import Header from './components/Header'
import ProfileOverview from './components/ProfileOverview'
import Showcases from './components/Showcases'
import ResumeViewer from './components/ResumeViewer'
import ProfileStats from './components/ProfileStats'
import StatsSection from './components/StatsSection'
import ActivityFeed from './components/ActivityFeed'
import SocialSection from './components/SocialSection'
import AchievementToast from './components/AchievementToast'
import AchievementModal from './components/AchievementModal'
import { portfolioConfig } from './config/portfolio.config'
import { initializeAchievementSystem, trackKonamiKey } from './services/achievementService'
import './styles/App.css'

function App() {
  const [showAchievementModal, setShowAchievementModal] = useState(false)

  const backgroundStyle = {
    backgroundImage: `url(${portfolioConfig.personal.banner})`,
  }

  // Initialize achievement system
  useEffect(() => {
    initializeAchievementSystem()

    // Konami code tracking
    const handleKeyDown = (e: KeyboardEvent) => {
      trackKonamiKey(e.code)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="app" style={backgroundStyle}>
      <Header onOpenAchievements={() => setShowAchievementModal(true)} />
      <AchievementToast />
      <main className="container">
        <div className="content-wrapper">
          <div className="main-content">
            <ProfileOverview />
            <ResumeViewer />
            <Showcases />
          </div>
          <aside className="sidebar">
            <ProfileStats />
            <StatsSection />
            <ActivityFeed />
            <SocialSection />
          </aside>
        </div>
      </main>
      <AchievementModal
        isOpen={showAchievementModal}
        onClose={() => setShowAchievementModal(false)}
      />
    </div>
  )
}

export default App
