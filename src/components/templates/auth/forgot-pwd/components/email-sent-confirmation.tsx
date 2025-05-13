import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

interface EmailSentConfirmationProps {
  email: string
  onTryAgain: () => void
}

export function EmailSentConfirmation({
  email,
  onTryAgain,
}: EmailSentConfirmationProps) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
        <Mail className="h-6 w-6 text-emerald-600" />
      </div>

      <h3 className="mb-2 text-lg font-medium">Check your email</h3>

      <p className="text-muted-foreground mb-6">
        Weve sent a password reset link to <strong>{email}</strong>
      </p>

      <p className="text-muted-foreground text-sm">
        Didnt receive the email? Check your spam folder or{' '}
        <Button
          onClick={onTryAgain}
          variant="link"
          className="text-blue-600 hover:text-blue-800"
        >
          try again
        </Button>
      </p>
    </div>
  )
}
