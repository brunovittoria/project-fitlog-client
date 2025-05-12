'use client'

import { useState } from 'react'
import { WorkoutsHeader } from './components/workouts-header'
import { WorkoutsSearch } from './components/workouts-search'
import { WorkoutsTable } from './components/workouts-table'
import { EmptyWorkouts } from './components/empty-workouts'

export function WorkoutsTemplate() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

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

  return (
    <div className="space-y-6">
      <WorkoutsHeader />

      <WorkoutsSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {filteredWorkouts.length > 0 ? (
        <WorkoutsTable
          workouts={filteredWorkouts}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
      ) : (
        <EmptyWorkouts searchTerm={searchTerm} />
      )}
    </div>
  )
}
