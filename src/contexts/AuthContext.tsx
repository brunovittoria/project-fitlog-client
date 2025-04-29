'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'
import { parseCookies, setCookie } from 'nookies'
import { useAuth } from '@/hooks/services/modules/auth'
import { userService } from '@/services/modules/user'
import type { User } from '@/types/models/user'
import type { LoginRequest, RegisterRequest } from '@/types/api/requests/auth'

interface AuthContextData {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: LoginRequest) => Promise<void>
  register: (userData: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const {
    login: authLogin,
    register: authRegister,
    logout: authLogout,
    isLoading,
    error,
  } = useAuth()
  const router = useRouter()

  const logout = useCallback(async () => {
    await authLogout()
    setUser(null)
    router.push('/login')
  }, [authLogout, router])

  useEffect(() => {
    const loadUserProfile = async () => {
      const { '@fitlog:token': token } = parseCookies()

      if (token) {
        const userData = await userService.getUserProfile()
        if (userData) {
          setUser(userData)
        } else {
          await logout()
        }
      }
    }

    loadUserProfile()
  }, [logout])

  const login = async (credentials: LoginRequest) => {
    const response = await authLogin(credentials)

    setCookie(undefined, '@fitlog:token', response.token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })

    const userData: User = {
      id: response.id,
      name: response.name,
      email: response.email,
      subscriptionId: response.subscriptions?.id || null,
      permissions: 'user',
      phone: null,
      weight: null,
      height: null,
    }

    setUser(userData)
    router.push('/dashboard')
  }

  const register = async (userData: RegisterRequest) => {
    await authRegister(userData)
    router.push('/auth/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error: error || null,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }

  return context
}
