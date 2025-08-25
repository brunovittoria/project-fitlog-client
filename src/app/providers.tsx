'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import { MenuProvider } from '@/contexts/MenuContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { LanguageProvider } from '@/contexts/LanguageContext'

interface ProvidersProps {
  children: React.ReactNode
}

export const queryClient = new QueryClient()

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="fitlog-theme">
        <LanguageProvider>
          <AuthProvider>
            <MenuProvider>
              <Toaster richColors expand theme="system" />
              {children}
            </MenuProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
