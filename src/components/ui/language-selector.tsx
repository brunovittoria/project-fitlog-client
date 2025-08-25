'use client'

import React from 'react'
import { useLanguageContext } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'
import type { LanguageCode } from '@/locales/configLang'

export function LanguageSelector() {
  const {
    currentLanguage,
    availableLanguages,
    changeLanguage,
    isLanguageLoading,
  } = useLanguageContext()

  const currentLang =
    availableLanguages.find((lang) => lang.value === currentLanguage) ||
    availableLanguages[0]

  const handleLanguageChange = async (languageCode: string) => {
    await changeLanguage(languageCode as LanguageCode)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={isLanguageLoading}
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLang.label}</span>
          <span className="sm:hidden">{currentLang.value.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.value}
            onClick={() => handleLanguageChange(language.value)}
            className={`flex cursor-pointer items-center gap-2 ${
              currentLanguage === language.value ? 'bg-accent' : ''
            }`}
          >
            <span className="text-sm">{language.label}</span>
            {currentLanguage === language.value && (
              <span className="text-muted-foreground ml-auto text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
