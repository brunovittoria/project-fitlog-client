export interface RegisterResponse {
  token: string
}

export interface LoginResponse {
  token: string
}

export interface AuthErrorResponse {
  errors: string[]
  status: number
}
