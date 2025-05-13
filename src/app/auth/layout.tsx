import AuthLayout from '@/layouts/AuthLayout'

export default function AuthPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthLayout>{children}</AuthLayout>
}
