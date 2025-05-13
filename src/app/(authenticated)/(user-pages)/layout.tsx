import { DashboardLayout } from '@/layouts/DashboardLayout'

export default function UserPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
