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
import { API_ENDPOINTS } from '@/services/routes'

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
    return response.data
  },

  async getExercise(params: GetExerciseRequest): Promise<Exercise> {
    const response = await api<GetExerciseResponse>({
      method: 'GET',
      endpoint: `${EXERCISE}/${params.id}`,
    })
    return response.data
  },

  async createExercise(exerciseData: CreateExerciseRequest): Promise<Exercise> {
    const response = await api<CreateExerciseResponse>({
      method: 'POST',
      endpoint: EXERCISE,
      config: {
        data: exerciseData,
      },
    })
    return response.data
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
    return response.data
  },

  async deleteExercise(id: string): Promise<{ message: string }> {
    const response = await api<DeleteExerciseResponse>({
      method: 'DELETE',
      endpoint: `${EXERCISE}/${id}`,
    })
    return { message: response.message || 'Exercise deleted successfully' }
  },

  // Fetch exercise GIF and details from RapidAPI ExerciseDB by name
  async getExerciseGifByName(name: string): Promise<{
    name: string
    gifUrl: string
    bodyPart: string
    target: string
  } | null> {
    const apiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY
    console.log('apiKey', apiKey)
    if (!apiKey) throw new Error('RapidAPI key not set')
    const url = `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(name)}`
    try {
      const response = await api<GetExerciseResponse>({
        method: 'GET',
        endpoint: url,
        config: {
          headers: {
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
            'X-RapidAPI-Key': apiKey,
          },
        },
      })
      const data = response.data
      if (!Array.isArray(data) || data.length === 0) return null
      const { name: exerciseName, gifUrl, bodyPart, target } = data[0]
      return { name: exerciseName, gifUrl, bodyPart, target }
    } catch (error) {
      console.error('Error fetching exercise GIF:', error)
      return null
    }
  },
}
