'use client'

import { useState } from 'react'
import { ExercisesHeader } from './components/exercises-header'
import { ExercisesSearch } from './components/exercises-search'
import { ExercisesCategories } from './components/exercises-categories'
import { ExercisesList } from './components/exercises-list'
import { EmptyExercises } from './components/empty-exercises'

export function ExercisesTemplate() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null)

  // Mock data
  const categories = [
    'All',
    'Chest',
    'Back',
    'Shoulders',
    'Arms',
    'Legs',
    'Core',
    'Cardio',
  ]
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

  return (
    <div className="space-y-6">
      <ExercisesHeader />

      <ExercisesSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <ExercisesCategories
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {filteredExercises.length > 0 ? (
        <ExercisesList
          exercises={filteredExercises}
          expandedExercise={expandedExercise}
          setExpandedExercise={setExpandedExercise}
        />
      ) : (
        <EmptyExercises
          searchTerm={searchTerm}
          activeCategory={activeCategory}
        />
      )}
    </div>
  )
}
