'use client'

import { createContext, useContext } from 'react'

interface SettingsContextProps {
  // Update
  onUpdate: (name: string, value: string | boolean) => void
  // Direction by lang
  onChangeDirectionByLang: (lang: string) => void
  // Reset
  canReset: boolean
  onReset: VoidFunction
  // Drawer
  open: boolean
  onToggle: VoidFunction
  onClose: VoidFunction
}

export const SettingsContext = createContext({} as SettingsContextProps)

export const useSettingsContext = (): SettingsContextProps => {
  const context = useContext(SettingsContext)

  if (!context)
    throw new Error('useSettingsContext must be use inside SettingsProvider')

  return context
}
