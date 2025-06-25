'use client'

import { Progress } from '@/components/ui/progress'
import { useAuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Progress value={50} className="w-1/2" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div>
      {/* You can add common layout elements here, like navigation, sidebar, etc */}
      {children}
    </div>
  )
}
