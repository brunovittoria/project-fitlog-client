'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => void
}

export function ForgotPasswordForm({ onSubmit }: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmitForm = (data: ForgotPasswordForm) => {
    onSubmit(data.email)
  }

  return (
    <>
      <p className="text-muted-foreground mb-6 text-center">
        Enter your email address and we will send you a link to reset your
        password.
      </p>

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
            <Input
              id="email"
              type="email"
              {...register('email')}
              className="pl-10"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
            />
          </div>
          {errors.email && (
            <p className="text-destructive text-sm">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          <Send className="mr-2 h-5 w-5" />
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
    </>
  )
}
