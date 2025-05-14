import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Crown, Dumbbell, Lock, Zap } from 'lucide-react'

const freePlanFeatures = [
  'Up to 3 custom workouts',
  'Basic exercise tracking',
  'Limited exercise library',
  'Basic progress tracking',
]

const lockedFeatures = [
  'AI Coach',
  'Unlimited workouts',
  'Advanced analytics',
  'Priority support',
]

const proPlanFeatures = [
  'AI Coach for personalized guidance',
  'Unlimited custom workouts',
  'Complete exercise library',
  'Advanced progress analytics',
  'Priority support',
  'Meal planning assistance',
  'Custom exercise creation',
  'Progress predictions',
]

export function PlanComparison() {
  return (
    <div className="mb-12 grid gap-8 md:grid-cols-2">
      <FreePlan />
      <ProPlan />
    </div>
  )
}

function FreePlan() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center">
          <Dumbbell className="text-muted-foreground mr-2 h-6 w-6" />
          <h3 className="text-xl font-semibold">Free Plan</h3>
        </div>

        <ul className="mb-6 space-y-3">
          {freePlanFeatures.map((feature, index) => (
            <li key={index} className="text-muted-foreground flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              <span>{feature}</span>
            </li>
          ))}
          {lockedFeatures.map((feature, index) => (
            <li
              key={index}
              className="text-muted-foreground/60 flex items-center"
            >
              <Lock className="mr-2 h-5 w-5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="text-muted-foreground text-center">Free Forever</div>
      </CardContent>
    </Card>
  )
}

function ProPlan() {
  return (
    <Card className="border-primary bg-primary/5 relative border-2">
      <Badge
        variant="default"
        className="bg-primary absolute -top-3 right-4 px-4"
      >
        Most Popular
      </Badge>

      <CardContent className="p-6">
        <div className="mb-4 flex items-center">
          <Crown className="text-primary mr-2 h-6 w-6" />
          <h3 className="text-xl font-semibold">PRO Plan</h3>
        </div>

        <ul className="mb-6 space-y-3">
          {proPlanFeatures.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle2 className="text-primary mr-2 h-5 w-5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="text-center">
          <div className="text-muted-foreground mb-1 text-sm">
            Starting from
          </div>
          <div className="mb-1 text-3xl font-bold">
            $9.99<span className="text-muted-foreground text-lg">/month</span>
          </div>
          <div className="text-primary mb-4 text-sm">
            Save 20% with annual billing
          </div>

          <Button className="w-full">
            <Zap className="mr-2 h-5 w-5" />
            Upgrade to PRO
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
