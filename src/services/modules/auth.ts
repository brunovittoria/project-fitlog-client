import { api } from '@/lib/axios'
import { destroyCookie } from 'nookies'
import type { LoginRequest, RegisterRequest } from '@/types/api/requests/auth'
import type {
  LoginResponse,
  RegisterResponse,
} from '@/types/api/responses/auth'
import { API_ENDPOINTS } from '@/services/routes'

const { LOGIN, REGISTER } = API_ENDPOINTS

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api<LoginResponse>({
      method: 'POST',
      endpoint: LOGIN,
      config: {
        data: credentials,
      },
    })
    return response
  },

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    const response = await api<RegisterResponse>({
      method: 'POST',
      endpoint: REGISTER,
      config: {
        data: userData,
      },
    })
    return response
  },

  async logout(): Promise<void> {
    destroyCookie(undefined, '@fitlog:token')
  },
}
