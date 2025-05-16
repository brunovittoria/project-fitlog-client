import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

interface WorkoutCompleteProps {
  elapsedTime: number
  onFinish: () => void
}

export function WorkoutComplete({
  elapsedTime,
  onFinish,
}: WorkoutCompleteProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-center p-6">
        <div className="bg-primary/20 mb-4 rounded-full p-4">
          <CheckCircle className="text-primary h-8 w-8" />
        </div>
        <h2 className="mb-2 text-xl font-bold">Workout Complete!</h2>
        <p className="text-muted-foreground mb-4">
          Great job! Youve completed all exercises.
        </p>
        <p className="mb-6">
          <span className="font-bold">Total time:</span>{' '}
          {formatTime(elapsedTime)}
        </p>
        <Button onClick={onFinish} size="lg">
          Finish Workout
        </Button>
      </CardContent>
    </Card>
  )
}
