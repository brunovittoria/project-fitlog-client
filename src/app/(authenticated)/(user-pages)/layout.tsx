export default function UserPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Add user-specific layout elements here */}
      {children}
    </div>
  )
}
