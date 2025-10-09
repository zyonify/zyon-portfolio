import Header from './components/Header'
import ProfileOverview from './components/ProfileOverview'
import Showcases from './components/Showcases'
import ResumeViewer from './components/ResumeViewer'
import ProfileStats from './components/ProfileStats'
import StatsSection from './components/StatsSection'
import ActivityFeed from './components/ActivityFeed'
import SocialSection from './components/SocialSection'
import { portfolioConfig } from './config/portfolio.config'
import './styles/App.css'

function App() {
  const backgroundStyle = {
    backgroundImage: `url(${portfolioConfig.personal.banner})`,
  }

  return (
    <div className="app" style={backgroundStyle}>
      <Header />
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
    </div>
  )
}

export default App
