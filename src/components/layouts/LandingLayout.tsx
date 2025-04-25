import { Footer } from '@/components/landing/Footer'
import { Navbar } from '@/components/landing/Navbar'
import { ScrollToTop } from '@/components/landing/ScrollToTop'

interface LandingLayoutProps {
  children: React.ReactNode
}

export function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  )
}
