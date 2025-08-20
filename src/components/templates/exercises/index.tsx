'use client'

import { useCallback, useMemo, useState } from 'react'
import { useExercise } from '@/hooks/services/modules/exercise'
import { formatDuration } from '@/utils/formaters'
import { ExercisesHeader } from './components/exercises-header'
import { ExercisesSearch } from './components/exercises-search'
import { ExercisesCategories } from './components/exercises-categories'
import { ExercisesList } from './components/exercises-list'
import { EmptyExercises } from './components/empty-exercises'
import { EXERCISE_CATEGORIES } from '@/constants/exercises'
import { CreateExerciseDialog } from './components/dialog/create-exercise-dialog'
import { EditExerciseDialog } from './components/dialog/edit-exercise-dialog'
import { DeleteExerciseDialog } from './components/dialog/delete-exercise-dialog'
import { Exercise } from '@/types/models/exercise'
import { z } from 'zod'
import { createExerciseSchema, editExerciseSchema } from './validation'
import { CreateExerciseRequest } from '../../../types'
import { ExerciseWithStringDuration } from '../../../types/api/requests/exercise'
import { useGetProfile } from '@/hooks/services/modules/user'
import { useWorkout } from '@/hooks/services/modules/workout'
import type { Workout } from '@/types/models/workout'

export function ExercisesTemplate() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null)
  const [deletingExercise, setDeletingExercise] = useState<Exercise | null>(
    null,
  )

  const {
    exercises,
    createExercise,
    updateExercise,
    deleteExercise,
    // isLoading,
  } = useExercise()

  const { profile } = useGetProfile()
  const userId = profile?.id
  const { workouts } = useWorkout(userId || '')

  const filteredExercises = useMemo(() => {
    return exercises
      .map((exercise) => ({
        ...exercise,
        duration: exercise.duration
          ? formatDuration(exercise.duration)
          : undefined,
      }))
      .filter(
        (exercise) =>
          (activeCategory === 'All' || exercise.category === activeCategory) &&
          exercise.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ) as Array<Omit<Exercise, 'duration'> & { duration?: string }>
  }, [exercises, activeCategory, searchTerm])

  const getExerciseType = useCallback(
    (category: string): 'strength' | 'cardio' | 'mobility' => {
      const lowerCaseCategory = category.toLowerCase()
      if (lowerCaseCategory === 'cardio') return 'cardio'
      if (lowerCaseCategory === 'mobility') return 'mobility'
      return 'strength'
    },
    [],
  )

  const handleCreate = useCallback(
    async (data: z.infer<typeof createExerciseSchema>) => {
      await createExercise({
        ...data,
        workoutId: data.workoutId,
        type: getExerciseType(data.category),
        duration: data.duration ? Number(data.duration) : undefined,
        weight: data.weight ? Number(data.weight) : undefined,
        reps: data.reps ? Number(data.reps) : undefined,
        sets: data.sets ? Number(data.sets) : undefined,
        progressData: [],
      })
      setIsCreateOpen(false)
    },
    [createExercise, getExerciseType],
  )

  const handleEdit = useCallback((exercise: ExerciseWithStringDuration) => {
    const originalExercise: Exercise = {
      ...exercise,
      duration: exercise.duration
        ? Number(exercise.duration.split(' ')[0])
        : null,
      reps: exercise.reps ?? undefined,
      sets: exercise.sets ?? undefined,
    }
    setEditingExercise(originalExercise)
  }, [])

  const handleEditSubmit = async (data: z.infer<typeof editExerciseSchema>) => {
    if (!editingExercise) return

    await updateExercise({
      ...data,
      id: editingExercise.id,
      type: data.category === 'Cardio' ? 'cardio' : 'strength',
      duration: data.duration ? Number(data.duration) : undefined,
      weight: data.weight ? Number(data.weight) : undefined,
      reps: data.reps ? Number(data.reps) : undefined,
      sets: data.sets ? Number(data.sets) : undefined,
    })
    setEditingExercise(null)
  }

  const handleDelete = (exercise: ExerciseWithStringDuration) => {
    const originalExercise: Exercise = {
      ...exercise,
      duration: exercise.duration
        ? Number(exercise.duration.split(' ')[0])
        : null,
    }
    setDeletingExercise(originalExercise)
  }

  const handleConfirmDelete = async () => {
    if (!deletingExercise) return

    await deleteExercise(deletingExercise.id)
    setDeletingExercise(null)
  }

  const handleDuplicate = async (exercise: ExerciseWithStringDuration) => {
    const type =
      exercise.category === 'Cardio' ? 'cardio' : ('strength' as const)

    const newExercise: CreateExerciseRequest = {
      name: `${exercise.name} (Copy)`,
      workoutId: exercise.workoutId,
      category: exercise.category,
      equipment: exercise.equipment,
      type,
      duration: exercise.duration
        ? Number(exercise.duration.split(' ')[0])
        : undefined,
      weight: exercise.weight,
      progressData: [],
    }

    await createExercise(newExercise)
  }

  return (
    <div className="space-y-6">
      <ExercisesHeader onCreate={() => setIsCreateOpen(true)} />

      <ExercisesSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <ExercisesCategories
        categories={EXERCISE_CATEGORIES}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {filteredExercises.length > 0 ? (
        <ExercisesList
          exercises={filteredExercises}
          expandedExercise={expandedExercise}
          setExpandedExercise={setExpandedExercise}
          onDuplicate={handleDuplicate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <EmptyExercises
          searchTerm={searchTerm}
          activeCategory={activeCategory}
          onCreate={() => setIsCreateOpen(true)}
        />
      )}

      <CreateExerciseDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        categories={EXERCISE_CATEGORIES.filter((cat) => cat !== 'All')}
        workouts={workouts as Workout[]}
        onSubmit={handleCreate}
      />

      <EditExerciseDialog
        open={!!editingExercise}
        onOpenChange={(open) => !open && setEditingExercise(null)}
        exercise={{
          name: editingExercise?.name ?? '',
          category: editingExercise?.category ?? '',
          equipment: editingExercise?.equipment ?? '',
          lastWeight: editingExercise?.lastWeight ?? null,
          reps: editingExercise?.reps ?? null,
          sets: editingExercise?.sets ?? null,
        }}
        categories={EXERCISE_CATEGORIES.filter((cat) => cat !== 'All')}
        onSubmit={handleEditSubmit}
      />

      <DeleteExerciseDialog
        open={!!deletingExercise}
        onOpenChange={(open) => !open && setDeletingExercise(null)}
        exerciseName={deletingExercise?.name ?? ''}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
