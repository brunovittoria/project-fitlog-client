import { CheckCircle } from 'lucide-react'

export function SuccessMessage() {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
        <CheckCircle className="h-6 w-6 text-emerald-600" />
      </div>

      <h3 className="mb-2 text-lg font-medium">Verification Successful</h3>

      <p className="text-muted-foreground">
        Your email has been verified. Redirecting you to reset your password...
      </p>
    </div>
  )
}
