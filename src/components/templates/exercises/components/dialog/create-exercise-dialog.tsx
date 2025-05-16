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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { InfoIcon, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const createExerciseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  equipment: z.string().min(1, 'Equipment is required'),
  weight: z.string().optional(),
})

type CreateExerciseForm = z.infer<typeof createExerciseSchema>

interface CreateExerciseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  categories: string[]
  onSubmit: (data: CreateExerciseForm) => void
}

export function CreateExerciseDialog({
  open,
  onOpenChange,
  categories,
  onSubmit,
}: CreateExerciseDialogProps) {
  const form = useForm<CreateExerciseForm>({
    resolver: zodResolver(createExerciseSchema),
    defaultValues: {
      name: '',
      category: '',
      equipment: '',
      weight: '',
    },
  })

  return (
    <DialogWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Create Exercise"
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} type="submit">
            <Save className="mr-2 h-4 w-4" />
            Create Exercise
          </Button>
        </>
      }
    >
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Exercise Name</Label>
          <Input
            id="name"
            {...form.register('name')}
            placeholder="Enter exercise name"
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
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="equipment">Equipment</Label>
          <Select
            value={form.watch('equipment')}
            onValueChange={(value) => form.setValue('equipment', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select equipment" />
            </SelectTrigger>
            <SelectContent>
              {[
                'Barbell',
                'Dumbbell',
                'Machine',
                'Bodyweight',
                'Cable',
                'Other',
              ].map((equipment) => (
                <SelectItem key={equipment} value={equipment}>
                  {equipment}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="weight">Initial Weight (kg)</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="text-muted-foreground h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>
                Leave empty for bodyweight exercises
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="weight"
            type="number"
            {...form.register('weight')}
            placeholder="Enter weight in kg"
            step="0.5"
            min="0"
          />
        </div>
      </form>
    </DialogWrapper>
  )
}
