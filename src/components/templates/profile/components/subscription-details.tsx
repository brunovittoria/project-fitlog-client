import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Star } from 'lucide-react'

interface SubscriptionDetailsProps {
  subscription: {
    plan: string
    status: string
    nextBilling: string
    price: string
  }
}

export function SubscriptionDetails({
  subscription,
}: SubscriptionDetailsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <CreditCard className="text-muted-foreground h-5 w-5" />
        <CardTitle>Subscription Details</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <h3 className="font-medium">{subscription.plan}</h3>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              Next billing: {subscription.nextBilling}
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold">{subscription.price}</p>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {subscription.status}
            </Badge>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button variant="outline">Change Plan</Button>
          <Button variant="destructive">Cancel Subscription</Button>
        </div>
      </CardContent>
    </Card>
  )
}
