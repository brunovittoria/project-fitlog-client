import { useMutation, useQuery } from '@tanstack/react-query'
import { workoutService } from '@/services/modules/workout'
import type {
  CreateWorkoutRequest,
  UpdateWorkoutRequest,
  GetWorkoutRequest,
} from '@/types/api/requests/workout'

export function useWorkout(userId: string) {
  const workoutsQuery = useQuery({
    queryKey: ['workouts', userId],
    queryFn: () => workoutService.getAllWorkouts({ userId }),
  })

  const workoutMutation = useMutation({
    mutationFn: (params: GetWorkoutRequest) =>
      workoutService.getWorkout(params),
    onError: (error) => {
      console.error('Failed to fetch workout:', error)
    },
  })

  const createMutation = useMutation({
    mutationFn: (data: CreateWorkoutRequest) =>
      workoutService.createWorkout(data),
    onError: (error) => {
      console.error('Failed to create workout:', error)
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: UpdateWorkoutRequest) =>
      workoutService.updateWorkout(data),
    onError: (error) => {
      console.error('Failed to update workout:', error)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => workoutService.deleteWorkout(id),
    onError: (error) => {
      console.error('Failed to delete workout:', error)
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
