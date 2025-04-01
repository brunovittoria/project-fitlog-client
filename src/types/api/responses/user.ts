import { User } from '@/types/models/user'

export interface GetUserProfileResponse {
  data: User
}

export interface UpdateUserResponse {
  data: User
  message: string
}

export interface DeleteUserResponse {
  message: string
}
