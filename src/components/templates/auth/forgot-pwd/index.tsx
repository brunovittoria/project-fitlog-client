'use client'

import { useState } from 'react'
import { ForgotPasswordForm } from './components/forgot-password-form'
import { EmailSentConfirmation } from './components/email-sent-confirmation'
import { BackToLogin } from './components/back-to-login'
import { Card, CardContent } from '@/components/ui/card'

export function ForgotPasswordTemplate() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail)
    setIsSubmitted(true)
    // In a real app, you would handle the API call here
  }

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-8">
        <BackToLogin />

        <div className="text-center">
          <h2 className="mb-6 text-2xl font-bold">Reset your password</h2>
        </div>

        {!isSubmitted ? (
          <ForgotPasswordForm onSubmit={handleSubmit} />
        ) : (
          <EmailSentConfirmation
            email={email}
            onTryAgain={() => setIsSubmitted(false)}
          />
        )}
      </CardContent>
    </Card>
  )
}
