import { Button } from '@/components/ui/button'
import { ArrowLeft, Pause, Play } from 'lucide-react'
import { WorkoutTimer } from './workout-timer'

interface StartWorkoutHeaderProps {
  onBack: () => void
  isTimerRunning: boolean
  elapsedTime: number
  setElapsedTime: (time: number) => void
  onToggleTimer: () => void
}

export function StartWorkoutHeader({
  onBack,
  isTimerRunning,
  elapsedTime,
  setElapsedTime,
  onToggleTimer,
}: StartWorkoutHeaderProps) {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Workouts
        </Button>

        <div className="flex items-center gap-2">
          <WorkoutTimer
            isRunning={isTimerRunning}
            elapsedTime={elapsedTime}
            setElapsedTime={setElapsedTime}
          />
          <Button size="icon" variant="outline" onClick={onToggleTimer}>
            {isTimerRunning ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
