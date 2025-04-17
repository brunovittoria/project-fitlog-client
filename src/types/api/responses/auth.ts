export interface RegisterResponse {
  token: string
}

export interface LoginResponse {
  id: string
  name: string
  email: string
  token: string
  subscriptions: {
    id: string
    status: string
  } | null
}

export interface AuthErrorResponse {
  errors: string[]
  status: number
}
