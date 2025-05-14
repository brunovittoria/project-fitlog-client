'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { VerificationForm } from './components/verification-form'
import { SuccessMessage } from './components/success-message'
import { BackButton } from './components/back-button'
import { Header } from './components/header'

export function EmailVerificationTemplate() {
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (code: string) => {
    if (code.length !== 6) {
      setError('Please enter a complete verification code')
      return
    }

    setIsLoading(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      // Redirect to password page after showing success message
      setTimeout(() => {
        // In a real app, use router.push
      }, 2000)
    }, 1500)
  }

  const handleResendCode = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setError('A new verification code has been sent to your email')
    }, 1500)
  }

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-8">
        {!isSuccess ? (
          <>
            <BackButton />
            <Header />
            <VerificationForm
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
              isLoading={isLoading}
              error={error}
              onSubmit={handleSubmit}
              onResendCode={handleResendCode}
            />
          </>
        ) : (
          <SuccessMessage />
        )}
      </CardContent>
    </Card>
  )
}
