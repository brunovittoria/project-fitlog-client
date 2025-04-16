import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/modules/auth'
import type { LoginRequest, RegisterRequest } from '@/types/api/requests/auth'

export function useAuth() {
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })

  const registerMutation = useMutation({
    mutationFn: (userData: RegisterRequest) => authService.register(userData),
    onError: (error) => {
      console.error('Registration failed:', error)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onError: (error) => {
      console.error('Logout failed:', error)
    },
  })

  return {
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoading:
      loginMutation.isPending ||
      registerMutation.isPending ||
      logoutMutation.isPending,
    error:
      loginMutation.error?.message ||
      registerMutation.error?.message ||
      logoutMutation.error?.message,
  }
}
