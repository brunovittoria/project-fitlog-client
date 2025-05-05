import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Award } from 'lucide-react'

export function Achievements() {
  return (
    <Card>
      <CardHeader className="border-b border-gray-200 px-6 py-5">
        <h2 className="text-lg font-medium">Achievements</h2>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-6">
        <div className="text-center">
          <Award className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-2 text-gray-500">
            Complete workouts to earn achievements
          </p>
          <Button
            variant="link"
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            View all achievements
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
