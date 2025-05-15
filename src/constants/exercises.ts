export const EXERCISE_CATEGORIES = [
  'All',
  'Chest',
  'Back',
  'Shoulders',
  'Arms',
  'Legs',
  'Core',
  'Cardio',
] as const

// Mutable version for when we need a regular array
export const EXERCISE_CATEGORIES_ARRAY = [
  'All',
  'Chest',
  'Back',
  'Shoulders',
  'Arms',
  'Legs',
  'Core',
  'Cardio',
]

export type ExerciseCategory = (typeof EXERCISE_CATEGORIES)[number]

export const EQUIPMENT_CATEGORIES = [
  'Barbell',
  'Dumbbell',
  'Machine',
  'Bodyweight',
  'Cable',
  'Other',
] as const
