import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Award } from 'lucide-react'

interface UserData {
  weight: number
  height: number
  name: string
  email: string
  goals: string[]
  subscription: {
    plan: string
    status: string
    nextBilling: string
    price: string
  }
}

interface BodyStatsProps {
  userData: UserData
  setUserData: (data: UserData) => void
  editMode: boolean
}

export function BodyStats({ userData, setUserData, editMode }: BodyStatsProps) {
  const calculateBMI = () => {
    const heightInMeters = userData.height / 100
    return (userData.weight / (heightInMeters * heightInMeters)).toFixed(1)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <Award className="text-muted-foreground h-5 w-5" />
        <CardTitle>Body Stats</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            {editMode ? (
              <Input
                id="weight"
                type="number"
                value={userData.weight}
                onChange={(e) =>
                  setUserData({ ...userData, weight: Number(e.target.value) })
                }
              />
            ) : (
              <p className="text-sm">{userData.weight} kg</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            {editMode ? (
              <Input
                id="height"
                type="number"
                value={userData.height}
                onChange={(e) =>
                  setUserData({ ...userData, height: Number(e.target.value) })
                }
              />
            ) : (
              <p className="text-sm">{userData.height} cm</p>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <Label>BMI (Body Mass Index)</Label>
          <p className="text-sm">{calculateBMI()}</p>
          <p className="text-muted-foreground text-xs">
            Body Mass Index is calculated based on your weight and height
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
