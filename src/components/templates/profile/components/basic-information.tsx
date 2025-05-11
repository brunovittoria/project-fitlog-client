import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from 'lucide-react'

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

interface BasicInformationProps {
  userData: UserData
  setUserData: (data: UserData) => void
  editMode: boolean
}

export function BasicInformation({
  userData,
  setUserData,
  editMode,
}: BasicInformationProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <User className="text-muted-foreground h-5 w-5" />
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            {editMode ? (
              <Input
                id="name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            ) : (
              <p className="text-sm">{userData.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <p className="text-sm">{userData.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
