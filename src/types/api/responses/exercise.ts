import { Exercise } from '@/types/models/exercise'

export interface GetExerciseResponse {
  data: Exercise
}

export interface CreateExerciseResponse {
  data: Exercise
  message: string
}

export interface UpdateExerciseResponse {
  data: Exercise
  message: string
}

export interface DeleteExerciseResponse {
  message: string
}
