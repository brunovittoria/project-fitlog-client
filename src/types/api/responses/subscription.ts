export interface CreateSubscriptionResponse {
  message: string
  stripeCustomerId: string
}

export interface CheckSubscriptionResponse {
  status: 'active' | 'canceled' | 'expired'
  data: {
    subscriptionId: string
    customerId: string
    priceId: string
  }
}

export interface PortalSessionResponse {
  sessionId: string
}
