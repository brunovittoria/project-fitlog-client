'use client'

import i18n, { InitOptions } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { localStorageGetItem } from '@/utils/storageAvailable'
import { defaultLang } from './configLang'

import langEn from './langs/en.json'
import langFr from './langs/fr.json'
import langEs from './langs/es.json'
import langIt from './langs/it.json'
import langDe from './langs/de.json'
import langRu from './langs/ru.json'
import langPtBr from './langs/pt-BR.json'

const lng = localStorageGetItem('i18nextLng', defaultLang.value) || undefined

const options: InitOptions = {
  resources: {
    en: { translations: langEn },
    fr: { translations: langFr },
    es: { translations: langEs },
    it: { translations: langIt },
    de: { translations: langDe },
    ru: { translations: langRu },
    pt: { translations: langPtBr },
  },
  lng: lng || defaultLang.value,
  fallbackLng: defaultLang.value,
  debug: false,
  ns: ['translations'],
  defaultNS: 'translations',
  interpolation: {
    escapeValue: false,
  },
}

i18n.use(LanguageDetector).use(initReactI18next).init(options)

export default i18n
