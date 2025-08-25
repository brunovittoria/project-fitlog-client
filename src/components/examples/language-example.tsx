'use client'

import React from 'react'
import { useLanguage } from '@/hooks/use-language'
import { LanguageSelector } from '@/components/ui/language-selector'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function LanguageExample() {
  const {
    t,
    currentLanguage,
    formatDate,
    formatNumber,
    getCurrentLanguageLabel,
  } = useLanguage()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Language Management Example</CardTitle>
          <CardDescription>
            This component demonstrates how to use the language context in your
            app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Language Selector */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Current Language</h3>
              <p className="text-muted-foreground text-sm">
                {getCurrentLanguageLabel()} ({currentLanguage})
              </p>
            </div>
            <LanguageSelector />
          </div>

          {/* Translation Examples */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Translation Examples</h3>
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <div>
                <strong>Profile:</strong> {t('profile')}
              </div>
              <div>
                <strong>Settings:</strong> {t('general')}
              </div>
              <div>
                <strong>Dashboard:</strong> {t('overview')}
              </div>
              <div>
                <strong>Account:</strong> {t('account')}
              </div>
            </div>
          </div>

          {/* Formatting Examples */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Formatting Examples</h3>
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <div>
                <strong>Date:</strong> {formatDate(new Date())}
              </div>
              <div>
                <strong>Number:</strong> {formatNumber(1234567.89)}
              </div>
            </div>
          </div>

          {/* Language Information */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Language Information</h3>
            <div className="text-muted-foreground text-sm">
              <p>
                Current language code:{' '}
                <code className="bg-muted rounded px-1">{currentLanguage}</code>
              </p>
              <p>Language label: {getCurrentLanguageLabel()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
