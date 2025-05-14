import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function BackButton() {
  return (
    <Link
      href="/auth/forgot-password"
      className="mb-6 flex items-center text-sm text-blue-600 hover:text-blue-800"
    >
      <ArrowLeft className="mr-1 h-4 w-4" />
      Back to forgot password
    </Link>
  )
}
