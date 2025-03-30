import React, { createContext, useState, JSX } from 'react'
import type { ReactNode } from 'react'

export interface MenuContextType {
  expandMenu: boolean
  openMenu: boolean
  handleExpandMenu: () => void
  handleOpenMenu: () => void
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined)

export const MenuProvider = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => {
  const [expandMenu, setExpandMenu] = useState<boolean>(true)
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const handleExpandMenu = (): void => {
    setExpandMenu((prev) => !prev)
  }

  const handleOpenMenu = (): void => {
    setOpenMenu((prev) => !prev)
  }

  return (
    <MenuContext.Provider
      value={{ expandMenu, handleExpandMenu, openMenu, handleOpenMenu }}
    >
      {children}
    </MenuContext.Provider>
  )
}
