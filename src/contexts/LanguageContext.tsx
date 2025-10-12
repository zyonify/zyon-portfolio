import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, getLanguage, setLanguage as setLang, onLanguageChange } from '../services/languageService'
import { getTranslation, Translations } from '../locales/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getLanguage())
  const [t, setT] = useState<Translations>(getTranslation(language))

  useEffect(() => {
    // Subscribe to language changes
    const unsubscribe = onLanguageChange((newLanguage) => {
      setLanguageState(newLanguage)
      setT(getTranslation(newLanguage))
    })

    return unsubscribe
  }, [])

  const setLanguage = (lang: Language) => {
    setLang(lang)
    setLanguageState(lang)
    setT(getTranslation(lang))
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
