import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

interface Exercise {
  name: string
  sets: number
  reps: number
  weight?: number
}

interface CurrentExerciseProps {
  exercise: Exercise
  onComplete: () => void
}

export function CurrentExercise({
  exercise,
  onComplete,
}: CurrentExerciseProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Exercise</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{exercise.name}</h3>
          <p className="text-muted-foreground">
            {exercise.sets} sets × {exercise.reps} reps
            {exercise.weight && ` @ ${exercise.weight}kg`}
          </p>
        </div>

        <Button onClick={onComplete} className="w-full">
          <CheckCircle className="mr-2 h-4 w-4" />
          Complete Exercise
        </Button>
      </CardContent>
    </Card>
  )
}
