import { Button } from '@/components/ui/button'
import { Edit, Save } from 'lucide-react'

interface ProfileHeaderProps {
  editMode: boolean
  setEditMode: (value: boolean) => void
}

export function ProfileHeader({ editMode, setEditMode }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <Button
        variant={editMode ? 'default' : 'outline'}
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </>
        ) : (
          <>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </>
        )}
      </Button>
    </div>
  )
}
