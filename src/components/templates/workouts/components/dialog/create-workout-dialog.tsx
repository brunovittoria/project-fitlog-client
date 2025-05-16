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

const createWorkoutSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  duration: z.string().min(1, 'Duration is required'),
})

type CreateWorkoutForm = z.infer<typeof createWorkoutSchema>

interface CreateWorkoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: CreateWorkoutForm) => void
}

export function CreateWorkoutDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateWorkoutDialogProps) {
  const form = useForm<CreateWorkoutForm>({
    resolver: zodResolver(createWorkoutSchema),
    defaultValues: {
      name: '',
      category: '',
      duration: '',
    },
  })

  return (
    <DialogWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Create Workout"
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} type="submit">
            <Save className="mr-2 h-4 w-4" />
            Create Workout
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
