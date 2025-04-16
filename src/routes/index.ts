// Base API endpoints type
export const API_ENDPOINTS = {
  REGISTER: '/register',
  LOGIN: '/login',
  PROFILE: '/me',
  SUBSCRIPTION_CREATE: '/subcription/create',
  SUBSCRIPTION_STATUS: '/subcription/status',
  EXERCISE: '/exercise',
  EXERCISES: '/exercises',
  WORKOUT: '/workout',
  WORKOUTS: '/workouts',
  WORKOUT_BY_ID: (id: string) => `/workout/${id}`,
} as const

export type ApiEndpoint =
  | string
  | ReturnType<typeof API_ENDPOINTS.WORKOUT_BY_ID>
