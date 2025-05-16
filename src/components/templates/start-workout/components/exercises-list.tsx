import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CheckCircle } from 'lucide-react'

interface Exercise {
  name: string
  sets: number
  reps: number
}

interface ExercisesListProps {
  exercises: Exercise[]
  currentIndex: number
  completedExercises: number[]
}

export function ExercisesList({
  exercises,
  currentIndex,
  completedExercises,
}: ExercisesListProps) {
  const isExerciseCompleted = (index: number) =>
    completedExercises.includes(index)

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Exercises</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {exercises.map((exercise, index) => (
          <div
            key={index}
            className={cn(
              'flex items-center rounded-lg border p-4',
              index === currentIndex && 'bg-muted',
            )}
          >
            <div className="mr-3">
              {isExerciseCompleted(index) ? (
                <CheckCircle className="text-primary h-5 w-5" />
              ) : index === currentIndex ? (
                <div className="bg-primary h-5 w-5 rounded-full" />
              ) : (
                <div className="border-muted-foreground h-5 w-5 rounded-full border-2" />
              )}
            </div>
            <div className="flex-1">
              <p
                className={cn(
                  'font-medium',
                  isExerciseCompleted(index) &&
                    'text-muted-foreground line-through',
                )}
              >
                {exercise.name}
              </p>
              <p className="text-muted-foreground text-sm">
                {exercise.sets} sets × {exercise.reps} reps
              </p>
            </div>
            {index === currentIndex && (
              <span className="text-primary text-sm font-medium">CURRENT</span>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
