import { useMutation, useQuery } from '@tanstack/react-query'
import { exerciseService } from '@/services/modules/exercise'
import type {
  CreateExerciseRequest,
  UpdateExerciseRequest,
  GetExerciseRequest,
} from '@/types/api/requests/exercise'

export function useExercise() {
  const exercisesQuery = useQuery({
    queryKey: ['exercises'],
    queryFn: () => exerciseService.getAllExercises(),
  })

  const exerciseMutation = useMutation({
    mutationFn: (params: GetExerciseRequest) =>
      exerciseService.getExercise(params),
    onError: (error) => {
      console.error('Failed to fetch exercise:', error)
    },
  })

  const createMutation = useMutation({
    mutationFn: (data: CreateExerciseRequest) =>
      exerciseService.createExercise(data),
    onError: (error) => {
      console.error('Failed to create exercise:', error)
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: UpdateExerciseRequest) =>
      exerciseService.updateExercise(data),
    onError: (error) => {
      console.error('Failed to update exercise:', error)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => exerciseService.deleteExercise(id),
    onError: (error) => {
      console.error('Failed to delete exercise:', error)
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
