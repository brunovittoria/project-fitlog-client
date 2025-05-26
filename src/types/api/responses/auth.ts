export interface RegisterResponse {
  data: {
    token: string
  }
  message?: string
}

export interface LoginResponse {
  id: string
  name: string
  email: string
  token: string
  subscriptions: null | {
    id: string
    status: string
  }
}

export interface AuthErrorResponse {
  errors: string[]
  status: number
}
