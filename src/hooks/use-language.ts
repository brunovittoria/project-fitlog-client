'use client'

import { useTranslation } from 'react-i18next'
import { useLanguageContext } from '@/contexts/LanguageContext'
import type { LanguageCode } from '@/locales/configLang'

export const useLanguage = () => {
  const { t } = useTranslation()
  const languageContext = useLanguageContext()

  return {
    // Translation function
    t,

    // Language context
    currentLanguage: languageContext.currentLanguage,
    availableLanguages: languageContext.availableLanguages,
    changeLanguage: languageContext.changeLanguage,
    isLanguageLoading: languageContext.isLanguageLoading,

    // Helper functions
    getCurrentLanguageLabel: () => {
      const currentLang = languageContext.availableLanguages.find(
        (lang) => lang.value === languageContext.currentLanguage,
      )
      return currentLang?.label || 'Unknown'
    },

    isCurrentLanguage: (languageCode: LanguageCode) => {
      return languageContext.currentLanguage === languageCode
    },

    // Format date with current language
    formatDate: (date: Date) => {
      return new Intl.DateTimeFormat(languageContext.currentLanguage, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date)
    },

    // Format number with current language
    formatNumber: (number: number) => {
      return new Intl.NumberFormat(languageContext.currentLanguage).format(
        number,
      )
    },
  }
}
