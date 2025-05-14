import { Badge } from '@/components/ui/badge'
import { Crown } from 'lucide-react'

export function Header() {
  return (
    <div className="mb-12 text-center">
      <Badge
        variant="secondary"
        className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-1 px-4 py-1"
      >
        <Crown className="h-4 w-4" />
        Unlock Premium Features
      </Badge>

      <h1 className="mb-4 text-4xl font-bold">
        Upgrade to <span className="text-primary">PRO</span> and Transform Your
        Fitness Journey
      </h1>

      <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
        Join thousands of users who have elevated their training with FitLog PRO
        and our revolutionary AI Coach.
      </p>
    </div>
  )
}
