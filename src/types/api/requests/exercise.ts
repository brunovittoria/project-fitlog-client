export interface CreateExerciseRequest {
  workoutId: string
  name: string
  type: 'strength' | 'cardio' | 'mobility'
  reps?: number
  sets?: number
  weight?: number
  duration?: number
}

export interface UpdateExerciseRequest {
  id: string
  name?: string
  type?: 'strength' | 'cardio' | 'mobility'
  reps?: number
  sets?: number
  weight?: number
  duration?: number
}

export interface GetExerciseRequest {
  id: string
}

export interface DeleteExerciseRequest {
  id: string
}
