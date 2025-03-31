export type SubscriptionStatus = 'active' | 'canceled' | 'expired'

export interface Subscription {
  id: string
  userId: string
  priceId: string
  status: SubscriptionStatus
  created_at?: Date
  updated_at?: Date
}
