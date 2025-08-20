'use client'

import { useCallback, useMemo, useState } from 'react'
import { WorkoutsHeader } from './components/workouts-header'
import { WorkoutsSearch } from './components/workouts-search'
import { WorkoutsTable } from './components/workouts-table'
import { EmptyWorkouts } from './components/empty-workouts'
import { CreateWorkoutDialog } from './components/dialog/create-workout-dialog'
import { EditWorkoutDialog } from './components/dialog/edit-workout-dialog'
import { DeleteWorkoutDialog } from './components/dialog/delete-workout-dialog'

export interface Workout {
  id: number
  name: string
  exercises: number
  lastPerformed: string
  duration: string
  category: string
}

// Move mockWorkouts outside component to avoid ESLint issues
const mockWorkouts: Workout[] = [
  {
    id: 1,
    name: 'Upper Body Strength',
    exercises: 8,
    lastPerformed: '2023-06-10',
    duration: '45 min',
    category: 'Strength',
  },
  {
    id: 2,
    name: 'Lower Body Strength',
    exercises: 6,
    lastPerformed: '2023-06-15',
    duration: '30 min',
    category: 'Strength',
  },
  {
    id: 3,
    name: 'Cardio HIIT',
    exercises: 5,
    lastPerformed: '2023-06-20',
    duration: '25 min',
    category: 'Cardio',
  },
  {
    id: 4,
    name: 'Mobility Yoga',
    exercises: 4,
    lastPerformed: '2023-06-25',
    duration: '20 min',
    category: 'Mobility',
  },
]

export function WorkoutsTemplate() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null)
  const [deletingWorkout, setDeletingWorkout] = useState<Workout | null>(null)

  const filteredWorkouts = useMemo(() => {
    return mockWorkouts.filter(
      (workout) =>
        workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  const handleCreate = useCallback((data: unknown) => {
    console.log('Create workout', data)
    setIsCreateOpen(false)
  }, [])

  const handleEditSubmit = useCallback(
    (data: unknown) => {
      console.log('Update workout', editingWorkout?.id, data)
      setEditingWorkout(null)
    },
    [editingWorkout?.id],
  )

  const handleDelete = useCallback(() => {
    console.log('Delete workout', deletingWorkout?.id)
    setDeletingWorkout(null)
  }, [deletingWorkout?.id])

  const handleDuplicate = useCallback((workout: Workout) => {
    const newWorkout = {
      ...workout,
      id: Date.now(), // In a real app, this would be handled by the backend
      name: `${workout.name} (Copy)`,
      lastPerformed: '', // Reset last performed date
    }

    console.log('Duplicate workout', newWorkout)
  }, [])

  return (
    <div className="space-y-6">
      <WorkoutsHeader onCreate={() => setIsCreateOpen(true)} />

      <WorkoutsSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {filteredWorkouts.length > 0 ? (
        <WorkoutsTable
          workouts={filteredWorkouts}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          onEdit={setEditingWorkout}
          onDelete={setDeletingWorkout}
          onDuplicate={handleDuplicate}
        />
      ) : (
        <EmptyWorkouts
          searchTerm={searchTerm}
          onCreate={() => setIsCreateOpen(true)}
        />
      )}

      <CreateWorkoutDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreate}
      />

      <EditWorkoutDialog
        open={!!editingWorkout}
        onOpenChange={(open) => !open && setEditingWorkout(null)}
        workout={{
          name: editingWorkout?.name ?? '',
          category: editingWorkout?.category ?? '',
          duration: editingWorkout?.duration ?? '',
        }}
        onSubmit={handleEditSubmit}
      />

      <DeleteWorkoutDialog
        open={!!deletingWorkout}
        onOpenChange={(open) => !open && setDeletingWorkout(null)}
        workoutName={deletingWorkout?.name ?? ''}
        onConfirm={handleDelete}
      />
    </div>
  )
}
