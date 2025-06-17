import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { exerciseService } from '@/services/modules/exercise'
import type { ApiError } from '@/types/api/base'
import type {
  CreateExerciseRequest,
  UpdateExerciseRequest,
  GetExerciseRequest,
  GetAllExercisesRequest,
} from '@/types/api/requests/exercise'

export function useExercise(params?: GetAllExercisesRequest) {
  const queryClient = useQueryClient()
  const exercisesQuery = useQuery({
    queryKey: ['exercises', params?.workoutId],
    queryFn: () => exerciseService.getAllExercises(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  })

  // Handle query errors with a side effect
  if (exercisesQuery.error) {
    toast.error(`Failed to fetch exercises: ${exercisesQuery.error.message}`)
  }

  const exerciseMutation = useMutation({
    mutationFn: (params: GetExerciseRequest) =>
      exerciseService.getExercise(params),
    onError: (error: ApiError) => {
      toast.error(`Failed to fetch exercise: ${error.message}`)
    },
  })

  const createMutation = useMutation({
    mutationFn: (data: CreateExerciseRequest) =>
      exerciseService.createExercise(data),
    onSuccess: () => {
      toast.success('Exercise created successfully!')
      queryClient.invalidateQueries({ queryKey: ['exercises'] })
    },
    onError: (error: ApiError) => {
      toast.error(`Failed to create exercise: ${error.message}`)
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: UpdateExerciseRequest) =>
      exerciseService.updateExercise(data),
    onSuccess: () => {
      toast.success('Exercise updated successfully!')
    },
    onError: (error: ApiError) => {
      toast.error(`Failed to update exercise: ${error.message}`)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => exerciseService.deleteExercise(id),
    onSuccess: () => {
      toast.success('Exercise deleted successfully!')
    },
    onError: (error: ApiError) => {
      toast.error(`Failed to delete exercise: ${error.message}`)
    },
  })

  return {
    exercises: exercisesQuery.data ?? [],
    getExercise: exerciseMutation.mutateAsync,
    createExercise: createMutation.mutateAsync,
    updateExercise: updateMutation.mutateAsync,
    deleteExercise: deleteMutation.mutateAsync,
    isLoading:
      exercisesQuery.isLoading ||
      exerciseMutation.isPending ||
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
    error:
      exercisesQuery.error?.message ||
      exerciseMutation.error?.message ||
      createMutation.error?.message ||
      updateMutation.error?.message ||
      deleteMutation.error?.message,
  }
}
