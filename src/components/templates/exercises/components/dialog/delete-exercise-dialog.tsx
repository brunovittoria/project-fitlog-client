import { DialogWrapper } from '@/components/molecules/dialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface DeleteExerciseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  exerciseName: string
  onConfirm: () => void
}

export function DeleteExerciseDialog({
  open,
  onOpenChange,
  exerciseName,
  onConfirm,
}: DeleteExerciseDialogProps) {
  return (
    <DialogWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Exercise"
      description={`Are you sure you want to delete "${exerciseName}"? This action cannot be undone.`}
      variant="destructive"
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Exercise
          </Button>
        </>
      }
    />
  )
}
