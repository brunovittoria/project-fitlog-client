'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { allLangs, defaultLang, type LanguageCode } from '@/locales/configLang'

interface LanguageContextData {
  currentLanguage: string
  availableLanguages: typeof allLangs
  changeLanguage: (languageCode: LanguageCode) => Promise<void>
  isLanguageLoading: boolean
}

const LanguageContext = createContext({} as LanguageContextData)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState<string>(
    defaultLang.value,
  )
  const [isLanguageLoading, setIsLanguageLoading] = useState(false)

  // Initialize language from localStorage or default
  useEffect(() => {
    const initializeLanguage = async () => {
      if (!i18n.isInitialized) {
        await new Promise((resolve) => {
          const checkInitialized = () => {
            if (i18n.isInitialized) {
              resolve(true)
            } else {
              setTimeout(checkInitialized, 10)
            }
          }
          checkInitialized()
        })
      }

      const savedLanguage = localStorage.getItem('i18nextLng')
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage)
        await i18n.changeLanguage(savedLanguage)
      } else {
        setCurrentLanguage(defaultLang.value)
        await i18n.changeLanguage(defaultLang.value)
      }
    }

    initializeLanguage()
  }, [i18n])

  const changeLanguage = useCallback(
    async (languageCode: LanguageCode) => {
      setIsLanguageLoading(true)
      try {
        await i18n.changeLanguage(languageCode)
        setCurrentLanguage(languageCode)
        localStorage.setItem('i18nextLng', languageCode)
      } catch (error) {
        console.error('Error changing language:', error)
      } finally {
        setIsLanguageLoading(false)
      }
    },
    [i18n],
  )

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        availableLanguages: allLangs,
        changeLanguage,
        isLanguageLoading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguageContext = () => {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider')
  }

  return context
}
