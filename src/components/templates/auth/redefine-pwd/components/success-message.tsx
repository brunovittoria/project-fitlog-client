import { Check } from 'lucide-react'

export function SuccessMessage() {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
        <Check className="h-6 w-6 text-emerald-600" />
      </div>

      <h3 className="mb-2 text-lg font-medium">Password reset successful!</h3>

      <p className="text-muted-foreground mb-6">
        Your password has been successfully reset. You will be redirected to the
        login page.
      </p>
    </div>
  )
}
