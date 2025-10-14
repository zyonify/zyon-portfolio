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
import InfoModal from './components/InfoModal'
import WalletModal from './components/WalletModal'
import SteamNotification from './components/SteamNotification'
import SignOutSatire from './components/SignOutSatire'
import { LanguageProvider } from './contexts/LanguageContext'
import { portfolioConfig } from './config/portfolio.config'
import { initializeAchievementSystem, trackKonamiKey } from './services/achievementService'
import './styles/App.css'

function App() {
  const [showAchievementModal, setShowAchievementModal] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)

  // Simple routing - check if we're on the satire sign out page
  const isSignOutPage = window.location.pathname === '/satire-signout'

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

  // Show satire sign out page
  if (isSignOutPage) {
    return <SignOutSatire />
  }

  // Show main portfolio
  return (
    <LanguageProvider>
      <div className="app" style={backgroundStyle}>
        <Header
          onOpenAchievements={() => setShowAchievementModal(true)}
          onOpenInfo={() => setShowInfoModal(true)}
          onOpenWallet={() => setShowWalletModal(true)}
        />
        <AchievementToast />
        <SteamNotification />
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
        <InfoModal
          isOpen={showInfoModal}
          onClose={() => setShowInfoModal(false)}
        />
        <WalletModal
          isOpen={showWalletModal}
          onClose={() => setShowWalletModal(false)}
        />
      </div>
    </LanguageProvider>
  )
}

export default App
