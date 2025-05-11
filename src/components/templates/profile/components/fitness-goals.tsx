import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gift, Plus, CheckCircle } from 'lucide-react'

interface FitnessGoalsProps {
  goals: string[]
  editMode: boolean
}

export function FitnessGoals({ goals, editMode }: FitnessGoalsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <Gift className="text-muted-foreground h-5 w-5" />
        <CardTitle>Fitness Goals</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {goals.map((goal, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 shrink-0 text-blue-500" />
              <span className="text-sm">{goal}</span>
            </li>
          ))}
        </ul>

        {editMode && (
          <Button variant="ghost" className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Add New Goal
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
