import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function WorkoutsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold">My Workouts</h1>
        <p className="text-muted-foreground">
          Manage and track your workout routines
        </p>
      </div>
      <Button className="mt-4 md:mt-0">
        <Plus className="mr-2 h-4 w-4" />
        Create Workout
      </Button>
    </div>
  )
}
