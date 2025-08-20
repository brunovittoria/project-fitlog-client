'use client'

import { DashboardHeader } from './components/Header'
import { StatsGrid } from './components/StatsGrid'
import { RecentWorkouts } from './components/RecentWorkouts'
import { ProgressChart } from './components/ProgressChart'
import { Achievements } from './components/Achievements'
import { useMemo } from 'react'

export function DashboardTemplate() {
  // Mock data
  const recentWorkouts = useMemo(
    () => [
      {
        id: 1,
        name: 'Upper Body',
        date: '2023-06-12',
        duration: '45 min',
      },
      {
        id: 2,
        name: 'Leg Day',
        date: '2023-06-10',
        duration: '55 min',
      },
      {
        id: 3,
        name: 'Core Strength',
        date: '2023-06-08',
        duration: '30 min',
      },
    ],
    [],
  )

  const progressStats = useMemo(
    () => [
      {
        name: 'Workouts',
        value: '12',
        change: '+3',
        period: 'this month',
      },
      {
        name: 'Exercises',
        value: '48',
        change: '+5',
        period: 'this month',
      },
      {
        name: 'Weight Lifted',
        value: '3,240',
        change: '+420',
        period: 'this month',
        unit: 'kg',
      },
      {
        name: 'Streak',
        value: '8',
        unit: 'days',
      },
    ],
    [],
  )

  return (
    <div className="space-y-8">
      <DashboardHeader />
      <StatsGrid stats={progressStats} />
      <RecentWorkouts workouts={recentWorkouts} />
      <ProgressChart />
      <Achievements />
    </div>
  )
}
