export type ExerciseType = 'strength' | 'cardio' | 'mobility'

export interface Exercise {
  id: string
  workoutId: string
  name: string
  type: ExerciseType
  reps?: number
  sets?: number
  weight?: number
  duration?: number
  created_at?: Date
  updated_at?: Date
}
