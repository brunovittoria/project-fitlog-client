export type ExerciseType = 'strength' | 'cardio' | 'mobility'

export interface Exercise {
  id: string
  workoutId: string
  name: string
  category: string
  equipment: string
  type: ExerciseType
  reps?: number
  sets?: number
  weight?: number
  lastWeight: number | null
  personalBest: number | null
  duration: number | null
  progressData: Array<{
    date: string
    weight: number
  }>
  createdAt: string
  updatedAt: string
}
