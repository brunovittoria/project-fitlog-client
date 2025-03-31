export interface CreateWorkoutRequest {
  userId: string
  name: string
  description?: string
  status: 'active' | 'inactive'
  exercises?: string[]
}

export interface UpdateWorkoutRequest {
  id: string
  name?: string
  description?: string
  status?: 'active' | 'inactive'
  exercises?: string[]
}

export interface GetWorkoutRequest {
  id: string
}

export interface DeleteWorkoutRequest {
  id: string
}

export interface GetAllWorkoutsRequest {
  userId: string
}
