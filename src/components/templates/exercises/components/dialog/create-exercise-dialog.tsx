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
import { createExerciseSchema } from '../../validation'
import type { Workout } from '@/types/models/workout'

type CreateExerciseForm = z.infer<typeof createExerciseSchema>

interface CreateExerciseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  categories: string[]
  workouts: Workout[]
  onSubmit: (data: z.infer<typeof createExerciseSchema>) => Promise<void>
}

export function CreateExerciseDialog({
  open,
  onOpenChange,
  categories,
  workouts,
  onSubmit,
}: CreateExerciseDialogProps) {
  const form = useForm<CreateExerciseForm>({
    resolver: zodResolver(createExerciseSchema),
    defaultValues: {
      name: '',
      category: '',
      equipment: '',
      weight: '',
      workoutId: '',
      reps: '',
      sets: '',
    },
  })

  const handleSubmitWithLog = async (
    data: z.infer<typeof createExerciseSchema>,
  ) => {
    console.log('CreateExerciseDialog onSubmit', data)
    await onSubmit(data)
  }

  return (
    <DialogWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Create Exercise"
    >
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(handleSubmitWithLog)}
      >
        <div className="space-y-2">
          <Label htmlFor="workoutId">Workout</Label>
          <Select
            value={form.watch('workoutId')}
            onValueChange={(value) => form.setValue('workoutId', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a workout" />
            </SelectTrigger>
            <SelectContent>
              {workouts.map((workout) => (
                <SelectItem key={workout.id} value={workout.id}>
                  {workout.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.workoutId && (
            <span className="xs text-red-500">
              {form.formState.errors.workoutId.message as string}
            </span>
          )}
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="reps">Reps</Label>
          <Input
            id="reps"
            type="number"
            {...form.register('reps')}
            placeholder="Enter number of reps"
            min="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sets">Sets</Label>
          <Input
            id="sets"
            type="number"
            {...form.register('sets')}
            placeholder="Enter number of sets"
            min="0"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={workouts.length === 0}>
            <Save className="mr-2 h-4 w-4" />
            Create Exercise
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </DialogWrapper>
  )
}
