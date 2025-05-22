import { z } from 'zod'

export const createExerciseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  equipment: z.string().min(1, 'Equipment is required'),
  workoutId: z.string(),
  type: z.enum(['strength', 'cardio', 'mobility']),
  weight: z.string().optional(),
  duration: z.string().optional(),
  progressData: z
    .array(
      z.object({
        date: z.string(),
        weight: z.number(),
      }),
    )
    .optional(),
})

export const editExerciseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  equipment: z.string().min(1, 'Equipment is required'),
  weight: z.string().optional(),
  duration: z.string().optional(),
})

export type CreateExerciseFormData = z.infer<typeof createExerciseSchema>
export type EditExerciseFormData = z.infer<typeof editExerciseSchema>
