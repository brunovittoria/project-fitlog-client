import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface ExercisesHeaderProps {
  onCreate: () => void
}

export function ExercisesHeader({ onCreate }: ExercisesHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold">Exercises</h1>
        <p className="text-muted-foreground">
          Track your progress and set new personal records
        </p>
      </div>
      <Button onClick={() => onCreate()} className="mt-4 md:mt-0">
        <Plus className="mr-2 h-4 w-4" />
        Add Exercise
      </Button>
    </div>
  )
}
