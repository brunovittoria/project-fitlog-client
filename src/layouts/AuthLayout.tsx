import { Dumbbell } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Brand section */}
      <div className="from-primary to-primary/80 hidden flex-col items-center justify-center bg-gradient-to-br p-8 text-white lg:flex lg:w-1/2">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <Dumbbell size={64} />
          </div>

          <h1 className="mb-6 text-4xl font-bold">FitLog</h1>

          <p className="mb-8 text-xl">
            Track your fitness journey, monitor your progress, and achieve your
            goals with FitLog.
          </p>

          <div className="space-y-6">
            <Card className="border-0 bg-white/10">
              <CardContent className="p-4">
                <h3 className="mb-2 text-lg font-semibold">
                  Track Your Progress
                </h3>
                <p>
                  Log weights, reps, and sets to see how you improve over time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/10">
              <CardContent className="p-4">
                <h3 className="mb-2 text-lg font-semibold">
                  Achieve Your Goals
                </h3>
                <p>
                  Set targets and watch as you get closer to your fitness
                  objectives.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/10">
              <CardContent className="p-4">
                <h3 className="mb-2 text-lg font-semibold">Complete Control</h3>
                <p>
                  Customize your workouts and exercises to match your fitness
                  routine.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="flex w-full items-center justify-center p-4 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-6 flex justify-center lg:hidden">
            <div className="flex items-center">
              <Dumbbell size={36} className="text-primary mr-2" />
              <span className="text-primary text-2xl font-bold">FitLog</span>
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
