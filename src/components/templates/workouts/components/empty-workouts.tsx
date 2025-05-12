import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'

interface EmptyWorkoutsProps {
  searchTerm: string
}

export function EmptyWorkouts({ searchTerm }: EmptyWorkoutsProps) {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <div className="text-muted-foreground mx-auto h-12 w-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>

        <h3 className="mt-2 text-sm font-medium">No workouts found</h3>

        <p className="text-muted-foreground mt-1 text-sm">
          {searchTerm
            ? 'Try adjusting your search term.'
            : 'Get started by creating a new workout.'}
        </p>

        {!searchTerm && (
          <div className="mt-6">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Workout
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
