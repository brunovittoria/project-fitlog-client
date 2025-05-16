import { useEffect } from 'react'

interface WorkoutTimerProps {
  isRunning: boolean
  elapsedTime: number
  setElapsedTime: (time: number) => void
}

export function WorkoutTimer({
  isRunning,
  elapsedTime,
  setElapsedTime,
}: WorkoutTimerProps) {
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(elapsedTime + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, elapsedTime, setElapsedTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="text-lg font-medium tabular-nums">
      {formatTime(elapsedTime)}
    </div>
  )
}
