export interface CreateSubscriptionRequest {
  user_id: string
}

export interface CheckSubscriptionRequest {
  user_id: string
}

export interface UpdateSubscriptionRequest {
  id: string
  status: 'active' | 'canceled' | 'expired'
}
