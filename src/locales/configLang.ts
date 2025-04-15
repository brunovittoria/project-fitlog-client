'use client'

import { format, Locale } from 'date-fns'
import { ptBR, enUS, de, es, fr, it, ru } from 'date-fns/locale'

type LanguageCode = 'en' | 'de' | 'es' | 'fr' | 'it' | 'ru' | 'pt'

// Mapeamento de idiomas para as localizações do date-fns
const locales: Record<LanguageCode, Locale> = {
  en: enUS,
  de,
  es,
  fr,
  it,
  ru,
  pt: ptBR,
}

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    icon: 'flagpack:gb-nir',
  },
  {
    label: 'German',
    value: 'de',
    icon: 'flagpack:de',
  },
  {
    label: 'Spanish',
    value: 'es',
    icon: 'flagpack:es',
  },
  {
    label: 'French',
    value: 'fr',
    icon: 'flagpack:fr',
  },
  {
    label: 'Italian',
    value: 'it',
    icon: 'flagpack:it',
  },
  {
    label: 'Russian',
    value: 'ru',
    icon: 'flagpack:ru',
  },
]

export const defaultLang = {
  label: 'Portuguese (Brazil)',
  value: 'pt',
  icon: 'flagpack:br',
}

// Função para formatar a data com base no idioma selecionado
export const formatDate = (date: Date, lang: LanguageCode): string => {
  const locale = locales[lang] || locales.pt
  return format(date, 'PPPP', { locale })
}

// Exemplo de uso:
// const formattedDate = formatDate(new Date(), 'en'); // Formata a data no idioma inglês
