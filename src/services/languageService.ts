// Language Service for managing language state across the app

export type Language =
  | 'english'
  | 'sarcasm'
  | 'binary'
  | 'emoji'
  | 'lorem'
  | 'youngStunnah'

const LANGUAGE_KEY = 'portfolio_language'
const listeners: Array<(language: Language) => void> = []

// Get current language from localStorage or default to English
export function getLanguage(): Language {
  const saved = localStorage.getItem(LANGUAGE_KEY)
  return (saved as Language) || 'english'
}

// Set language and notify all listeners
export function setLanguage(language: Language): void {
  localStorage.setItem(LANGUAGE_KEY, language)

  // Notify all listeners
  listeners.forEach(listener => listener(language))
}

// Subscribe to language changes
export function onLanguageChange(callback: (language: Language) => void): () => void {
  listeners.push(callback)

  // Return unsubscribe function
  return () => {
    const index = listeners.indexOf(callback)
    if (index > -1) {
      listeners.splice(index, 1)
    }
  }
}
