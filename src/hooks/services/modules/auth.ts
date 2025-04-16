import { useState } from 'react'
import { authService } from '@/services/modules/auth'
import type { LoginRequest, RegisterRequest } from '@/types/api/requests/auth'
import type {
  LoginResponse,
  RegisterResponse,
} from '@/types/api/responses/auth'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function login(
    credentials: LoginRequest,
  ): Promise<LoginResponse | null> {
    try {
      setIsLoading(true)
      setError(null)
      return await authService.login(credentials)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  async function register(
    userData: RegisterRequest,
  ): Promise<RegisterResponse | null> {
    try {
      setIsLoading(true)
      setError(null)
      return await authService.register(userData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  async function logout(): Promise<void> {
    try {
      setIsLoading(true)
      setError(null)
      await authService.logout()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to logout')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    login,
    register,
    logout,
  }
}
