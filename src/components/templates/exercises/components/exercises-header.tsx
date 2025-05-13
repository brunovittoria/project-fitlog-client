import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function ExercisesHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold">Exercises</h1>
        <p className="text-muted-foreground">
          Track your progress and set new personal records
        </p>
      </div>
      <Button className="mt-4 md:mt-0">
        <Plus className="mr-2 h-4 w-4" />
        Add Exercise
      </Button>
    </div>
  )
}
