export interface ApiError {
  message: string
  code?: string
  status?: number
  errors?: Record<string, string[]>
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

export interface ApiResponse<T> {
  data: T
  status?: number
  message?: string
}

export interface QueryParams {
  [key: string]: string | number | boolean | undefined
}

export interface SortParams {
  field: string
  order: 'asc' | 'desc'
}

export interface FilterParams {
  field: string
  value: string | number | boolean
  operator?: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in'
}

export type ApiRequestConfig = {
  params?: QueryParams
  data?: unknown
  headers?: Record<string, string>
  pagination?: PaginationParams
  sort?: SortParams[]
  filters?: FilterParams[]
}

// HTTP Methods type
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
