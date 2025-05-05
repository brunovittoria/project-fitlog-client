import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Calendar, ChevronRight, Clock, Dumbbell } from 'lucide-react'

interface Workout {
  id: number
  name: string
  date: string
  duration: string
}

interface RecentWorkoutsProps {
  workouts: Workout[]
}

export function RecentWorkouts({ workouts }: RecentWorkoutsProps) {
  return (
    <Card>
      <CardHeader className="border-b border-gray-200 px-6 py-5">
        <h2 className="text-lg font-medium">Recent Workouts</h2>
      </CardHeader>
      <CardContent className="divide-y divide-gray-200">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Dumbbell className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium">{workout.name}</h3>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <Calendar className="mr-1 h-3 w-3" />
                  <span>{workout.date}</span>
                  <Clock className="mr-1 ml-3 h-3 w-3" />
                  <span>{workout.duration}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </CardContent>
      <CardFooter className="border-t border-gray-200 px-6 py-4">
        <Button variant="link" className="text-blue-600 hover:text-blue-800">
          View all workouts
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
