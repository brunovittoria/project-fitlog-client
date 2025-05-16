import { DialogWrapper } from '@/components/molecules/dialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface DeleteWorkoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  workoutName: string
  onConfirm: () => void
}

export function DeleteWorkoutDialog({
  open,
  onOpenChange,
  workoutName,
  onConfirm,
}: DeleteWorkoutDialogProps) {
  return (
    <DialogWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Workout"
      description={`Are you sure you want to delete "${workoutName}"? This action cannot be undone.`}
      variant="destructive"
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Workout
          </Button>
        </>
      }
    />
  )
}
