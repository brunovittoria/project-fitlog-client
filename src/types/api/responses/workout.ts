import { Workout } from '@/types/models/workout'

export interface GetWorkoutResponse {
  data: Workout
}

export interface GetAllWorkoutsResponse {
  data: Workout[]
}

export interface CreateWorkoutResponse {
  data: Workout
  message: string
}

export interface UpdateWorkoutResponse {
  data: Workout
  message: string
}

export interface DeleteWorkoutResponse {
  message: string
}
