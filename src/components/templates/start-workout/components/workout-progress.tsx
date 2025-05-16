import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Clock } from 'lucide-react'

interface WorkoutProgressProps {
  category: string
  duration: string
  completedCount: number
  totalCount: number
  progress: number
}

export function WorkoutProgress({
  category,
  duration,
  completedCount,
  totalCount,
  progress,
}: WorkoutProgressProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Badge variant="secondary">{category}</Badge>
        <span className="text-muted-foreground flex items-center">
          <Clock className="mr-1 h-4 w-4" />
          Est. {duration}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>
            {completedCount}/{totalCount} exercises
          </span>
        </div>
        <Progress value={progress} />
      </div>
    </div>
  )
}
