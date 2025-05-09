import { DashboardLayout } from '@/components/layouts/DashboardLayout'

export default function UserPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
