'use client'

import { useState } from 'react'
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
import { CreateExerciseRequest, UpdateExerciseRequest } from '../../../types'

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

  const filteredExercises = exercises
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
    )

  const handleCreate = async (data: CreateExerciseRequest) => {
    await createExercise({
      ...data,
      duration: data.duration ? parseInt(data.duration) : null,
      type: data.category === 'Cardio' ? 'cardio' : 'strength',
    })
    setIsCreateOpen(false)
  }

  const handleEditSubmit = async (data: UpdateExerciseRequest) => {
    if (!editingExercise) return

    await updateExercise({
      id: editingExercise.id,
      ...data,
      duration: data.duration ? parseInt(data.duration) : null,
    })
    setEditingExercise(null)
  }

  const handleDelete = async () => {
    if (!deletingExercise) return

    await deleteExercise(deletingExercise.id)
    setDeletingExercise(null)
  }

  const handleDuplicate = (exercise: Exercise) => {
    const newExercise = {
      ...exercise,
      id: Date.now(),
      name: `${exercise.name} (Copy)`,
      progressData: [],
    }
    console.log('Duplicate exercise', newExercise)
    // In a real app, you would call an API here
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
          onEdit={setEditingExercise}
          onDelete={setDeletingExercise}
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
        }}
        categories={EXERCISE_CATEGORIES.filter((cat) => cat !== 'All')}
        onSubmit={handleEditSubmit}
      />

      <DeleteExerciseDialog
        open={!!deletingExercise}
        onOpenChange={(open) => !open && setDeletingExercise(null)}
        exerciseName={deletingExercise?.name ?? ''}
        onConfirm={handleDelete}
      />
    </div>
  )
}
