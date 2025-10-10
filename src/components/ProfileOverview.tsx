import { useState, useEffect } from 'react'
import './ProfileOverview.css'
import { portfolioConfig } from '../config/portfolio.config'
import { fetchUserProfile } from '../services/github'

function ProfileOverview() {
    const [avatarUrl, setAvatarUrl] = useState<string>(portfolioConfig.personal.avatar || '')

    useEffect(() => {
        // Fetch GitHub profile data
        const loadGitHubData = async () => {
            const profile = await fetchUserProfile()
            if (profile) {
                setAvatarUrl(profile.avatar_url)
            }
        }

        if (!portfolioConfig.personal.avatar) {
            loadGitHubData()
        }
    }, [])

    return (
        <section className="profile-overview card" id="profile">
            <div className="profile-content">
                <div className="profile-left">
                    <div className="avatar-container">
                        <img
                            src={avatarUrl || `https://github.com/${portfolioConfig.social.github}.png`}
                            alt={`${portfolioConfig.personal.name} Avatar`}
                            className="avatar"
                        />
                        <div className="avatar-frame"></div>
                    </div>
                </div>
                <div className="profile-center">
                    <h1 className="profile-name">{portfolioConfig.personal.name}</h1>
                    <p className="profile-title">{portfolioConfig.personal.title}</p>
                    <div className="profile-location">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0C5.2 0 3 2.2 3 5c0 3.5 5 11 5 11s5-7.5 5-11c0-2.8-2.2-5-5-5zm0 7.5c-1.4 0-2.5-1.1-2.5-2.5S6.6 2.5 8 2.5s2.5 1.1 2.5 2.5S9.4 7.5 8 7.5z" />
                        </svg>
                        <span>{portfolioConfig.personal.location}</span>
                    </div>
                </div>
                <div className="profile-right">
                    <div className="profile-actions">
                        <a
                            href={`https://github.com/${portfolioConfig.social.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="profile-btn primary"
                        >
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                            GitHub
                        </a>
                        {portfolioConfig.social.linkedin && (
                            <a
                                href={portfolioConfig.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="profile-btn secondary"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                LinkedIn
                            </a>
                        )}
                        <a href={`mailto:${portfolioConfig.personal.email}`} className="profile-btn secondary">
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                            </svg>
                            Contact
                        </a>
                        <a href={`${portfolioConfig.social.strava}`} className="profile-btn secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M6.731 0 2 9.125h2.788L6.73 5.497l1.93 3.628h2.766zm4.694 9.125-1.372 2.756L8.66 9.125H6.547L10.053 16l3.484-6.875z" />
                            </svg>
                            Strava
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfileOverview
