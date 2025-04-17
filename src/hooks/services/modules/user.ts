import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { userService } from '@/services/modules/user'

export function useGetProfile() {
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.getUserProfile(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  })

  // Handle query errors with a side effect
  if (profileQuery.error) {
    toast.error(`Failed to fetch profile: ${profileQuery.error.message}`)
  }

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    error: profileQuery.error?.message,
  }
}
