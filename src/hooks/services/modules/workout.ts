import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { workoutService } from '@/services/modules/workout'
import type { ApiError } from '@/types/api/base'
import type {
  CreateWorkoutRequest,
  UpdateWorkoutRequest,
  GetWorkoutRequest,
} from '@/types/api/requests/workout'

export function useWorkout(userId: string) {
  const workoutsQuery = useQuery({
    queryKey: ['workouts', userId],
    queryFn: () => workoutService.getAllWorkouts({ userId }),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })

  // Handle query errors with a side effect
  if (workoutsQuery.error) {
    toast.error(`Failed to fetch workouts: ${workoutsQuery.error.message}`)
  }

  const workoutMutation = useMutation({
    mutationFn: (params: GetWorkoutRequest) =>
      workoutService.getWorkout(params),
    onError: (error: ApiError) => {
      toast.error(`Failed to fetch workout: ${error.message}`)
    },
  })

  const createMutation = useMutation({
    mutationFn: (data: CreateWorkoutRequest) =>
      workoutService.createWorkout(data),
    onSuccess: () => {
      toast.success('Workout created successfully!')
    },
    onError: (error: ApiError) => {
      toast.error(`Failed to create workout: ${error.message}`)
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: UpdateWorkoutRequest) =>
      workoutService.updateWorkout(data),
    onSuccess: () => {
      toast.success('Workout updated successfully!')
    },
    onError: (error: ApiError) => {
      toast.error(`Failed to update workout: ${error.message}`)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => workoutService.deleteWorkout(id),
    onSuccess: () => {
      toast.success('Workout deleted successfully!')
    },
    onError: (error: ApiError) => {
      toast.error(`Failed to delete workout: ${error.message}`)
    },
  })

  return {
    workouts: workoutsQuery.data ?? [],
    getWorkout: workoutMutation.mutateAsync,
    createWorkout: createMutation.mutateAsync,
    updateWorkout: updateMutation.mutateAsync,
    deleteWorkout: deleteMutation.mutateAsync,
    isLoading:
      workoutsQuery.isLoading ||
      workoutMutation.isPending ||
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
    error:
      workoutsQuery.error?.message ||
      workoutMutation.error?.message ||
      createMutation.error?.message ||
      updateMutation.error?.message ||
      deleteMutation.error?.message,
  }
}
