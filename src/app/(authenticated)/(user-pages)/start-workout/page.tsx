'use client'

import { StartWorkoutTemplate } from '@/components/templates/start-workout'
import { useRouter } from 'next/navigation'

export default function StartWorkoutPage() {
  const router = useRouter()

  // In a real app, you would fetch this data from an API
  const mockWorkout = {
    id: 1,
    name: 'Upper Body Strength',
    category: 'Strength',
    duration: '45 min',
    exercises: [
      {
        id: 1,
        name: 'Bench Press',
        sets: 4,
        reps: 10,
        weight: 80,
      },
      {
        id: 2,
        name: 'Overhead Press',
        sets: 3,
        reps: 12,
        weight: 40,
      },
      {
        id: 3,
        name: 'Lat Pulldown',
        sets: 3,
        reps: 12,
        weight: 60,
      },
      {
        id: 4,
        name: 'Bicep Curls',
        sets: 3,
        reps: 15,
        weight: 15,
      },
    ],
  }

  const handleFinishWorkout = () => {
    // In a real app, you would save the workout data here
    router.push('/workouts')
  }

  return (
    <StartWorkoutTemplate
      workout={mockWorkout}
      onFinishWorkout={handleFinishWorkout}
    />
  )
}
