export interface UpdateUserRequest {
  name?: string
  email?: string
  phone?: string
  weight?: number
  height?: number
}

export interface GetUserProfileRequest {
  user_id: string
}

export interface DeleteUserRequest {
  id: string
}
