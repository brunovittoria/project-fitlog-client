import { DialogWrapper } from '@/components/molecules/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const editWorkoutSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  duration: z.string().min(1, 'Duration is required'),
})

type EditWorkoutForm = z.infer<typeof editWorkoutSchema>

interface EditWorkoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  workout: {
    name: string
    category: string
    duration: string
  }
  onSubmit: (data: EditWorkoutForm) => void
}

export function EditWorkoutDialog({
  open,
  onOpenChange,
  workout,
  onSubmit,
}: EditWorkoutDialogProps) {
  const form = useForm<EditWorkoutForm>({
    resolver: zodResolver(editWorkoutSchema),
    defaultValues: {
      name: workout.name,
      category: workout.category,
      duration: workout.duration,
    },
  })

  return (
    <DialogWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Workout"
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </>
      }
    >
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Workout Name</Label>
          <Input
            id="name"
            {...form.register('name')}
            placeholder="Enter workout name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={form.watch('category')}
            onValueChange={(value) => form.setValue('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {['Strength', 'Cardio', 'Flexibility', 'HIIT'].map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            {...form.register('duration')}
            placeholder="e.g. 45 min"
          />
        </div>
      </form>
    </DialogWrapper>
  )
}
