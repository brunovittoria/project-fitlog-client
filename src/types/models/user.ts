export type UserPermissions = 'user' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  permissions: UserPermissions
  subscriptionId: string
  phone: string
  weight: number
  height: number
  created_at?: Date
  updated_at?: Date
}
