'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { RedefinePasswordForm } from './components/redefine-password-form'
import { SuccessMessage } from './components/success-message'
import { BackButton } from './components/back-button'

export function RedefinePasswordTemplate() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitted(true)
    // In a real app, you would handle the API call here

    // Simulate redirect after success
    setTimeout(() => {
      // router.push('/auth/login')
    }, 3000)
  }

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-8">
        <BackButton />

        <div className="text-center">
          <h2 className="mb-6 text-2xl font-bold">Create new password</h2>
        </div>

        {!isSubmitted ? (
          <>
            <p className="text-muted-foreground mb-6 text-center">
              Your new password must be different from previously used
              passwords.
            </p>
            <RedefinePasswordForm onSubmit={handleSubmit} />
          </>
        ) : (
          <SuccessMessage />
        )}
      </CardContent>
    </Card>
  )
}
