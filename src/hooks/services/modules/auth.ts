import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authService } from '@/services/modules/auth'
import type { LoginRequest, RegisterRequest } from '@/types/api/requests/auth'

export function useAuth() {
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: () => {
      toast.success('Login successful!')
    },
    onError: (error) => {
      toast.error(`Login failed: ${error.message || 'Please try again'}`)
    },
  })

  const registerMutation = useMutation({
    mutationFn: (userData: RegisterRequest) => authService.register(userData),
    onSuccess: () => {
      toast.success('Registration successful!')
    },
    onError: (error) => {
      toast.error(`Registration failed: ${error.message || 'Please try again'}`)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      toast.success('Logged out successfully!')
    },
    onError: (error) => {
      toast.error(`Logout failed: ${error.message || 'Please try again'}`)
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
