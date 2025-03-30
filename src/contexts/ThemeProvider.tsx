'use client'

import React, { JSX } from 'react'
import { ThemeProvider } from 'next-themes'

export function Providers({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      enableColorScheme={false}
    >
      {children}
    </ThemeProvider>
  )
}

export { ThemeProvider }
