import { Button } from '@/components/ui/button'
import { Dumbbell } from 'lucide-react'

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, John!</h1>
        <p className="text-gray-600">
          Track your progress and crush your fitness goals
        </p>
      </div>
      <div className="mt-4 md:mt-0">
        <Button className="flex items-center">
          <Dumbbell className="mr-2 h-5 w-5" />
          New Workout
        </Button>
      </div>
    </div>
  )
}
