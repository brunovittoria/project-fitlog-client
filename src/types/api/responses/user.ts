import { User } from '@/types/models/user'

export interface GetUserProfileResponse {
  data: User
  message: string
  status: number
}

export interface UpdateUserResponse {
  data: User
  message: string
  status: number
}

export interface DeleteUserResponse {
  message: string
  status: number
}
