import { DialogWrapper } from '@/components/molecules/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { InfoIcon, Save } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { editExerciseSchema } from '../../validation'
import { useEffect } from 'react'

type EditExerciseForm = z.infer<typeof editExerciseSchema>

interface EditExerciseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  exercise: {
    name: string
    category: string
    equipment: string
    lastWeight?: number | null
    reps?: number | null
    sets?: number | null
  }
  categories: string[]
  onSubmit: (data: z.infer<typeof editExerciseSchema>) => Promise<void>
}

export function EditExerciseDialog({
  open,
  onOpenChange,
  exercise,
  categories,
  onSubmit,
}: EditExerciseDialogProps) {
  const form = useForm<EditExerciseForm>({
    resolver: zodResolver(editExerciseSchema),
    defaultValues: {
      name: exercise.name,
      category: exercise.category,
      equipment: exercise.equipment,
      weight: exercise.lastWeight?.toString() || '',
      reps:
        exercise.reps !== undefined && exercise.reps !== null
          ? exercise.reps.toString()
          : '',
      sets:
        exercise.sets !== undefined && exercise.sets !== null
          ? exercise.sets.toString()
          : '',
    },
  })

  useEffect(() => {
    if (exercise) {
      form.reset({
        name: exercise.name,
        category: exercise.category,
        equipment: exercise.equipment,
      })
    }
  }, [exercise, form])

  const handleFormSubmit = async (data: EditExerciseForm) => {
    await onSubmit(data)
    onOpenChange(false)
  }

  return (
    <DialogWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Exercise"
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(handleFormSubmit)} type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
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

        <div className="flex justify-between gap-2">
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
                {categories
                  .filter((cat) => cat !== 'All')
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="weight">Current Weight (kg)</Label>
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
        </div>

        <div className="flex gap-2">
          <div className="w-full space-y-2">
            <Label htmlFor="reps">Reps</Label>
            <Input
              id="reps"
              type="number"
              {...form.register('reps')}
              placeholder="Enter number of reps"
              min="0"
            />
          </div>
          <div className="w-full space-y-2">
            <Label htmlFor="sets">Sets</Label>
            <Input
              id="sets"
              type="number"
              {...form.register('sets')}
              placeholder="Enter number of sets"
              min="0"
            />
          </div>
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
      </form>
    </DialogWrapper>
  )
}
