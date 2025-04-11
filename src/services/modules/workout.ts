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
import { API_ENDPOINTS } from '@/types/api/base'

export const workoutService = {
  async getAllWorkouts({ userId }: GetAllWorkoutsRequest): Promise<Workout[]> {
    const response = await api<GetAllWorkoutsResponse>({
      method: 'GET',
      endpoint: API_ENDPOINTS.WORKOUTS,
      config: {
        params: { userId },
      },
    })
    return response.data.data
  },

  async getWorkout(params: GetWorkoutRequest): Promise<Workout> {
    const response = await api<GetWorkoutResponse>({
      method: 'GET',
      endpoint: API_ENDPOINTS.WORKOUT_BY_ID(params.id),
    })
    return response.data.data
  },

  async createWorkout(workoutData: CreateWorkoutRequest): Promise<Workout> {
    const response = await api<CreateWorkoutResponse>({
      method: 'POST',
      endpoint: API_ENDPOINTS.WORKOUT,
      config: {
        data: workoutData,
      },
    })
    return response.data.data
  },

  async updateWorkout(workoutData: UpdateWorkoutRequest): Promise<Workout> {
    const { id, ...data } = workoutData
    const response = await api<UpdateWorkoutResponse>({
      method: 'PUT',
      endpoint: API_ENDPOINTS.WORKOUT_BY_ID(id),
      config: {
        data,
      },
    })
    return response.data.data
  },

  async deleteWorkout(id: string): Promise<{ message: string }> {
    const response = await api<DeleteWorkoutResponse>({
      method: 'DELETE',
      endpoint: API_ENDPOINTS.WORKOUT_BY_ID(id),
    })
    return { message: response.message || 'Workout deleted successfully' }
  },
}
