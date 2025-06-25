import { Exercise } from '../../models/exercise'

export interface CreateExerciseRequest {
  workoutId: string
  name: string
  category: string
  equipment: string
  type: 'strength' | 'cardio' | 'mobility'
  reps?: number
  sets?: number
  weight?: number
  lastWeight?: number
  personalBest?: number
  duration?: number
  progressData?: Array<{
    date: string
    weight: number
    reps?: number
    sets?: number
  }>
}

export type ExerciseWithStringDuration = Omit<Exercise, 'duration'> & {
  duration?: string
}

export interface UpdateExerciseRequest {
  id: string
  name?: string
  category?: string
  equipment?: string
  type?: 'strength' | 'cardio' | 'mobility'
  reps?: number
  sets?: number
  weight?: number
  lastWeight?: number | null
  personalBest?: number | null
  duration?: number | null
  progressData?: Array<{
    date: string
    weight: number
    reps?: number
    sets?: number
  }>
}

export interface GetExerciseRequest {
  id: string
}

export interface DeleteExerciseRequest {
  id: string
}

export interface GetAllExercisesRequest extends Record<string, unknown> {
  workoutId?: string
  category?: string
  type?: 'strength' | 'cardio' | 'mobility'
}
