import { api } from '@/lib/axios'
import type {
  GetWorkoutResponse,
  GetAllWorkoutsResponse,
  CreateWorkoutResponse,
  UpdateWorkoutResponse,
  DeleteWorkoutResponse,
} from '@/types/api/responses/workout'
import type {
  CreateWorkoutRequest,
  UpdateWorkoutRequest,
  GetWorkoutRequest,
  GetAllWorkoutsRequest,
} from '@/types/api/requests/workout'
import { Workout } from '@/types/models/workout'
import { API_ENDPOINTS } from '@/services/routes'

const { WORKOUT, WORKOUTS, WORKOUT_BY_ID } = API_ENDPOINTS

export const workoutService = {
  async getAllWorkouts({ userId }: GetAllWorkoutsRequest): Promise<Workout[]> {
    const response = await api<GetAllWorkoutsResponse>({
      method: 'GET',
      endpoint: WORKOUTS,
      config: {
        params: { userId },
      },
    })
    return response.data ?? []
  },

  async getWorkout(params: GetWorkoutRequest): Promise<Workout> {
    const response = await api<GetWorkoutResponse>({
      method: 'GET',
      endpoint: WORKOUT_BY_ID(params.id),
    })
    return response.data
  },

  async createWorkout(workoutData: CreateWorkoutRequest): Promise<Workout> {
    const response = await api<CreateWorkoutResponse>({
      method: 'POST',
      endpoint: WORKOUT,
      config: {
        data: workoutData,
      },
    })
    return response.data
  },

  async updateWorkout(workoutData: UpdateWorkoutRequest): Promise<Workout> {
    const { id, ...data } = workoutData
    const response = await api<UpdateWorkoutResponse>({
      method: 'PUT',
      endpoint: WORKOUT_BY_ID(id),
      config: {
        data,
      },
    })
    return response.data
  },

  async deleteWorkout(id: string): Promise<{ message: string }> {
    const response = await api<DeleteWorkoutResponse>({
      method: 'DELETE',
      endpoint: WORKOUT_BY_ID(id),
    })
    return { message: response.message || 'Workout deleted successfully' }
  },
}
