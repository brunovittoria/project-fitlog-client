import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Timer, Zap } from 'lucide-react'

export function FinalCTA() {
  return (
    <Card className="bg-muted/50 mb-8">
      <CardContent className="p-8 text-center">
        <h3 className="mb-4 text-2xl font-bold">
          Ready to Transform Your Fitness Journey?
        </h3>

        <p className="text-muted-foreground mb-6">
          Join FitLog PRO today and get access to all premium features,
          including our revolutionary AI Coach.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg">
            <Zap className="mr-2 h-5 w-5" />
            Upgrade to PRO
          </Button>

          <div className="text-muted-foreground flex items-center">
            <Timer className="mr-2 h-5 w-5" />
            30-day money-back guarantee
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
