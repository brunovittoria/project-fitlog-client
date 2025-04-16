import { api } from '@/lib/axios'
import type {
  GetExerciseResponse,
  GetAllExercisesResponse,
  CreateExerciseResponse,
  UpdateExerciseResponse,
  DeleteExerciseResponse,
} from '@/types/api/responses/exercise'
import type {
  CreateExerciseRequest,
  UpdateExerciseRequest,
  GetExerciseRequest,
  GetAllExercisesRequest,
} from '@/types/api/requests/exercise'
import { Exercise } from '@/types/models/exercise'
import { QueryParams } from '@/types/api/base'
import { API_ENDPOINTS } from '@/routes'

const { EXERCISE, EXERCISES } = API_ENDPOINTS

export const exerciseService = {
  async getAllExercises(params?: GetAllExercisesRequest): Promise<Exercise[]> {
    const response = await api<GetAllExercisesResponse>({
      method: 'GET',
      endpoint: EXERCISES,
      config: {
        params: params as QueryParams,
      },
    })
    return response.data.data
  },

  async getExercise(params: GetExerciseRequest): Promise<Exercise> {
    const response = await api<GetExerciseResponse>({
      method: 'GET',
      endpoint: `${EXERCISE}/${params.id}`,
    })
    return response.data.data
  },

  async createExercise(exerciseData: CreateExerciseRequest): Promise<Exercise> {
    const response = await api<CreateExerciseResponse>({
      method: 'POST',
      endpoint: EXERCISE,
      config: {
        data: exerciseData,
      },
    })
    return response.data.data
  },

  async updateExercise(exerciseData: UpdateExerciseRequest): Promise<Exercise> {
    const { id, ...data } = exerciseData
    const response = await api<UpdateExerciseResponse>({
      method: 'PUT',
      endpoint: `${EXERCISE}/${id}`,
      config: {
        data,
      },
    })
    return response.data.data
  },

  async deleteExercise(id: string): Promise<{ message: string }> {
    const response = await api<DeleteExerciseResponse>({
      method: 'DELETE',
      endpoint: `${EXERCISE}/${id}`,
    })
    return { message: response.message || 'Exercise deleted successfully' }
  },
}
