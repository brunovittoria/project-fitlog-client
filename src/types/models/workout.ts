import type { Exercise } from './exercise'

export type WorkoutStatus = 'active' | 'inactive'

export interface Workout {
  id: string
  userId: string
  name: string
  description?: string
  status: WorkoutStatus
  exercises: Exercise[] | string[] // Can be either expanded exercises or just IDs
  created_at?: Date
  updated_at?: Date
}
