'use client'

import { useState } from 'react'
import { ProfileHeader } from './components/profile-header'
import { BasicInformation } from './components/basic-information'
import { SubscriptionDetails } from './components/subscription-details'
import { BodyStats } from './components/body-stats'
import { FitnessGoals } from './components/fitness-goals'

export function ProfileTemplate() {
  const [editMode, setEditMode] = useState(false)
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    weight: 75,
    height: 180,
    goals: [
      'Increase bench press by 10kg',
      'Lose 5kg of body fat',
      'Workout 4 times per week',
    ],
    subscription: {
      plan: 'Premium',
      status: 'Active',
      nextBilling: '2023-07-15',
      price: '$9.99/month',
    },
  })

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <ProfileHeader editMode={editMode} setEditMode={setEditMode} />

      <div className="space-y-6">
        <BasicInformation
          userData={userData}
          setUserData={setUserData}
          editMode={editMode}
        />

        <SubscriptionDetails subscription={userData.subscription} />

        <BodyStats
          userData={userData}
          setUserData={setUserData}
          editMode={editMode}
        />

        <FitnessGoals goals={userData.goals} editMode={editMode} />
      </div>
    </div>
  )
}
