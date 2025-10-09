import { useState, useEffect } from 'react'
import './ProfileStats.css'
import { getYearsOfExperience, getAge } from '../config/portfolio.config'
import { fetchUserProfile } from '../services/github'

function ProfileStats() {
  const [totalRepos, setTotalRepos] = useState<number>(0)
  const yearsOfExperience = getYearsOfExperience()

  useEffect(() => {
    const loadGitHubData = async () => {
      const profile = await fetchUserProfile()
      if (profile) {
        setTotalRepos(profile.public_repos)
      }
    }

    loadGitHubData()
  }, [])

  return (
    <div className="profile-stats-card card">
      <div className="card-header">Profile Stats</div>
      <div className="profile-stats-badges">
        <div className="stat-badge level-badge">
          <span className="stat-badge-label">Level</span>
          <span className="stat-badge-value">{getAge()} yo</span>
        </div>
        <div className="stat-badge experience-badge">
          <span className="stat-badge-label">Experience</span>
          <span className="stat-badge-value">{yearsOfExperience}+ Years</span>
        </div>
        <div className="stat-badge projects-badge">
          <span className="stat-badge-label">Total Projects</span>
          <span className="stat-badge-value">{totalRepos || '...'}</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileStats
