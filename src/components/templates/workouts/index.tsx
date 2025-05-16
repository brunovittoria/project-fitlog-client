'use client'

import { useState } from 'react'
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

export function WorkoutsTemplate() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null)
  const [deletingWorkout, setDeletingWorkout] = useState<Workout | null>(null)

  const mockWorkouts = [
    {
      id: 1,
      name: 'Upper Body Strength',
      exercises: 8,
      lastPerformed: '2023-06-10',
      duration: '45 min',
      category: 'Strength',
    },
  ]

  const filteredWorkouts = mockWorkouts.filter(
    (workout) =>
      workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  // eslint-disable-next-line
  const handleCreate = (data: any) => {
    console.log('Create workout', data)
    setIsCreateOpen(false)
    // In a real app, you would call an API here;
  }
  // eslint-disable-next-line
  const handleEditSubmit = (data: any) => {
    console.log('Update workout', editingWorkout?.id, data)
    setEditingWorkout(null)
  }

  const handleDelete = () => {
    console.log('Delete workout', deletingWorkout?.id)
    setDeletingWorkout(null)
  }

  // eslint-disable-next-line
  const handleDuplicate = (workout: any) => {
    const newWorkout = {
      ...workout,
      id: Date.now(), // In a real app, this would be handled by the backend
      name: `${workout.name} (Copy)`,
      lastPerformed: '', // Reset last performed date
    }

    // In a real app, you would call an API here
    console.log('Duplicate workout', newWorkout)
  }

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
