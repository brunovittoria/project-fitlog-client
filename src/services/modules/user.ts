import { api } from '@/lib/axios'
import type {
  GetUserProfileResponse,
  UpdateUserResponse,
  DeleteUserResponse,
} from '@/types/api/responses/user'
import type { UpdateUserRequest } from '@/types/api/requests/user'
import { User } from '@/types/models/user'
import { API_ENDPOINTS } from '@/types/api/base'

const { PROFILE } = API_ENDPOINTS

export const userService = {
  async getUserProfile(): Promise<User> {
    const response = await api<GetUserProfileResponse>({
      method: 'GET',
      endpoint: PROFILE,
    })
    return response.data.data
  },

  async updateUser(userData: UpdateUserRequest): Promise<User> {
    const response = await api<UpdateUserResponse>({
      method: 'PUT',
      endpoint: PROFILE,
      config: {
        data: userData,
      },
    })
    return response.data.data
  },

  async deleteUser(): Promise<{ message: string }> {
    const response = await api<DeleteUserResponse>({
      method: 'DELETE',
      endpoint: PROFILE,
    })
    return { message: response.message || 'User deleted successfully' }
  },
}
