export type UserPermissions = 'user' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  permissions: UserPermissions
  subscriptionId: string | null
  phone: string | null
  weight: number | null
  height: number | null
  created_at?: Date
  updated_at?: Date
}
