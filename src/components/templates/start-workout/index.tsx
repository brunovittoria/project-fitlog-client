import { useState } from 'react'
import { StartWorkoutHeader } from './components/start-workout-header'
import { WorkoutProgress } from './components/workout-progress'
import { CurrentExercise } from './components/current-exercise'
import { ExercisesList } from './components/exercises-list'
import { WorkoutComplete } from './components/workout-complete'
import { NavigationButtons } from './components/navigation-buttons'

interface Exercise {
  id: number
  name: string
  sets: number
  reps: number
  weight?: number
}

interface Workout {
  id: number
  name: string
  category: string
  duration: string
  exercises: Exercise[]
}

interface StartWorkoutTemplateProps {
  workout: Workout
  onFinishWorkout: () => void
}

export function StartWorkoutTemplate({
  workout,
  onFinishWorkout,
}: StartWorkoutTemplateProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<number[]>([])
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [elapsedTime, setElapsedTime] = useState(0)

  const currentExercise = workout.exercises[currentExerciseIndex]
  const progress = (completedExercises.length / workout.exercises.length) * 100
  const isAllCompleted = completedExercises.length === workout.exercises.length

  const handleNextExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCompletedExercises([...completedExercises, currentExerciseIndex])
      setCurrentExerciseIndex(currentExerciseIndex + 1)
    } else {
      setCompletedExercises([...completedExercises, currentExerciseIndex])
    }
  }

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1)
      setCompletedExercises(
        completedExercises.filter((i) => i !== currentExerciseIndex - 1),
      )
    }
  }

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning)

  return (
    <div className="min-h-screen">
      <StartWorkoutHeader
        onBack={onFinishWorkout}
        isTimerRunning={isTimerRunning}
        elapsedTime={elapsedTime}
        setElapsedTime={setElapsedTime}
        onToggleTimer={toggleTimer}
      />

      <main className="container mx-auto space-y-6 px-4 py-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{workout.name}</h1>
          <WorkoutProgress
            category={workout.category}
            duration={workout.duration}
            completedCount={completedExercises.length}
            totalCount={workout.exercises.length}
            progress={progress}
          />
        </div>

        {isAllCompleted ? (
          <WorkoutComplete
            elapsedTime={elapsedTime}
            onFinish={onFinishWorkout}
          />
        ) : (
          <>
            <CurrentExercise
              exercise={currentExercise}
              onComplete={handleNextExercise}
            />

            <ExercisesList
              exercises={workout.exercises}
              currentIndex={currentExerciseIndex}
              completedExercises={completedExercises}
            />

            <NavigationButtons
              isFirst={currentExerciseIndex === 0}
              isLast={currentExerciseIndex === workout.exercises.length - 1}
              onPrevious={handlePreviousExercise}
              onNext={handleNextExercise}
            />
          </>
        )}
      </main>
    </div>
  )
}
