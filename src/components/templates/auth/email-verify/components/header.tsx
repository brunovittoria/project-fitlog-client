import { Mail } from 'lucide-react'

export function Header() {
  return (
    <div className="mb-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
        <Mail className="h-6 w-6 text-blue-600" />
      </div>

      <h2 className="mb-2 text-2xl font-bold">Email Verification</h2>

      <p className="text-muted-foreground">
        Weve sent a verification code to your email address. Please enter it
        below.
      </p>
    </div>
  )
}
