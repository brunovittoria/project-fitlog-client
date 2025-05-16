'use client'

import { useState } from 'react'
import { ExercisesHeader } from './components/exercises-header'
import { ExercisesSearch } from './components/exercises-search'
import { ExercisesCategories } from './components/exercises-categories'
import { ExercisesList } from './components/exercises-list'
import { EmptyExercises } from './components/empty-exercises'
import { EXERCISE_CATEGORIES } from '@/constants/exercises'
import { CreateExerciseDialog } from './components/dialog/create-exercise-dialog'
import { EditExerciseDialog } from './components/dialog/edit-exercise-dialog'
import { DeleteExerciseDialog } from './components/dialog/delete-exercise-dialog'

export interface Exercise {
  id: number
  name: string
  category: string
  equipment: string
  lastWeight?: number | null
  personalBest?: number | null
  duration?: string
  progressData: Array<{ date: string; weight: number }>
}

export function ExercisesTemplate() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null)
  const [deletingExercise, setDeletingExercise] = useState<Exercise | null>(
    null,
  )

  // Mock data
  const mockExercises = [
    {
      id: 1,
      name: 'Bench Press',
      category: 'Chest',
      equipment: 'Barbell',
      lastWeight: 80,
      personalBest: 90,
      progressData: [
        {
          date: '2023-05-01',
          weight: 75,
        },
        {
          date: '2023-05-08',
          weight: 77.5,
        },
        {
          date: '2023-05-15',
          weight: 80,
        },
        {
          date: '2023-05-22',
          weight: 80,
        },
        {
          date: '2023-05-29',
          weight: 85,
        },
        {
          date: '2023-06-05',
          weight: 90,
        },
        {
          date: '2023-06-12',
          weight: 80,
        },
      ],
    },
    {
      id: 2,
      name: 'Squat',
      category: 'Legs',
      equipment: 'Barbell',
      lastWeight: 120,
      personalBest: 130,
      progressData: [
        {
          date: '2023-05-03',
          weight: 100,
        },
        {
          date: '2023-05-10',
          weight: 110,
        },
        {
          date: '2023-05-17',
          weight: 115,
        },
        {
          date: '2023-05-24',
          weight: 120,
        },
        {
          date: '2023-05-31',
          weight: 125,
        },
        {
          date: '2023-06-07',
          weight: 130,
        },
      ],
    },
    {
      id: 3,
      name: 'Deadlift',
      category: 'Back',
      equipment: 'Barbell',
      lastWeight: 140,
      personalBest: 150,
      progressData: [
        {
          date: '2023-05-05',
          weight: 120,
        },
        {
          date: '2023-05-12',
          weight: 130,
        },
        {
          date: '2023-05-19',
          weight: 135,
        },
        {
          date: '2023-05-26',
          weight: 140,
        },
        {
          date: '2023-06-02',
          weight: 145,
        },
        {
          date: '2023-06-09',
          weight: 150,
        },
      ],
    },
    {
      id: 4,
      name: 'Shoulder Press',
      category: 'Shoulders',
      equipment: 'Dumbbell',
      lastWeight: 20,
      personalBest: 22.5,
      progressData: [
        {
          date: '2023-05-01',
          weight: 17.5,
        },
        {
          date: '2023-05-08',
          weight: 20,
        },
        {
          date: '2023-05-15',
          weight: 20,
        },
        {
          date: '2023-05-22',
          weight: 22.5,
        },
        {
          date: '2023-05-29',
          weight: 22.5,
        },
        {
          date: '2023-06-05',
          weight: 20,
        },
      ],
    },
    {
      id: 5,
      name: 'Bicep Curl',
      category: 'Arms',
      equipment: 'Dumbbell',
      lastWeight: 15,
      personalBest: 17.5,
      progressData: [
        {
          date: '2023-05-03',
          weight: 12.5,
        },
        {
          date: '2023-05-10',
          weight: 15,
        },
        {
          date: '2023-05-17',
          weight: 15,
        },
        {
          date: '2023-05-24',
          weight: 17.5,
        },
        {
          date: '2023-05-31',
          weight: 17.5,
        },
        {
          date: '2023-06-07',
          weight: 15,
        },
      ],
    },
    {
      id: 6,
      name: 'Plank',
      category: 'Core',
      equipment: 'Bodyweight',
      lastWeight: null,
      personalBest: null,
      duration: '60 sec',
      progressData: [],
    },
    {
      id: 7,
      name: 'Treadmill',
      category: 'Cardio',
      equipment: 'Machine',
      lastWeight: null,
      personalBest: null,
      duration: '20 min',
      progressData: [],
    },
  ]

  const filteredExercises = mockExercises.filter(
    (exercise) =>
      (activeCategory === 'All' || exercise.category === activeCategory) &&
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // eslint-disable-next-line
  const handleCreate = (data: any) => {
    console.log('Create exercise', data)
    setIsCreateOpen(false)
    // In a real app, you would call an API here
  }

  // eslint-disable-next-line
  const handleEditSubmit = (data: any) => {
    console.log('Update exercise', editingExercise?.id, data)
    setEditingExercise(null)
    // In a real app, you would call an API here
  }

  const handleDelete = () => {
    console.log('Delete exercise', deletingExercise?.id)
    setDeletingExercise(null)
    // In a real app, you would call an API here
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
