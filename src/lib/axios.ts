import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import type {
  ApiError,
  ApiResponse,
  ApiRequestConfig,
  HttpMethod,
  ApiEndpoints,
} from '@/types/api/base'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use((config) => {
  const { '@fitlog:token': token } = parseCookies()

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Generic request function with types
export async function apiRequest<T>({
  method,
  endpoint,
  config,
}: {
  method: HttpMethod
  endpoint: ApiEndpoints
  config?: ApiRequestConfig
}): Promise<ApiResponse<T>> {
  try {
    const response = await api.request<ApiResponse<T>>({
      method,
      url: endpoint,
      params: config?.params,
      data: config?.pagination || config?.sort || config?.filters,
    })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = new Error() as ApiError
      apiError.message = error.response?.data?.message || 'An error occurred'
      apiError.status = error.response?.status
      apiError.code = error.response?.data?.code
      apiError.errors = error.response?.data?.errors

      throw apiError
    }
    throw error
  }
}
