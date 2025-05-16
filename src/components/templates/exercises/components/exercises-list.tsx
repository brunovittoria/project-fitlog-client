import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { BarChart2, ChevronDown, ChevronUp, Copy, Info } from 'lucide-react'
import { useState } from 'react'
import { EditExerciseDialog } from './dialog/edit-exercise-dialog'
import { DeleteExerciseDialog } from './dialog/delete-exercise-dialog'
import { EXERCISE_CATEGORIES_ARRAY } from '@/constants/exercises'

interface Exercise {
  id: number
  name: string
  category: string
  equipment: string
  lastWeight?: number | null
  personalBest?: number | null
  duration?: string
  progressData: { date: string; weight: number }[]
}

interface ExercisesListProps {
  exercises: Exercise[]
  expandedExercise: number | null
  setExpandedExercise: (id: number | null) => void
  onDuplicate: (exercise: Exercise) => void
}

export function ExercisesList({
  exercises,
  expandedExercise,
  setExpandedExercise,
  onDuplicate,
}: ExercisesListProps) {
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null)
  const [deletingExercise, setDeletingExercise] = useState<Exercise | null>(
    null,
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditSubmit = (data: any) => {
    console.log('Update exercise', editingExercise?.id, data)
    setEditingExercise(null)
  }

  const handleDelete = () => {
    console.log('Delete exercise', deletingExercise?.id)
    setDeletingExercise(null)
  }

  return (
    <>
      <div className="space-y-4">
        {exercises.map((exercise) => (
          <Card key={exercise.id}>
            <Collapsible open={expandedExercise === exercise.id}>
              <CollapsibleTrigger
                onClick={() =>
                  setExpandedExercise(
                    expandedExercise === exercise.id ? null : exercise.id,
                  )
                }
                className="w-full"
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="text-lg font-medium">{exercise.name}</h3>
                    <div className="mt-1 flex items-center">
                      <Badge variant="secondary" className="mr-2">
                        {exercise.category}
                      </Badge>
                      <span className="text-muted-foreground text-sm">
                        {exercise.equipment}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {exercise.lastWeight && (
                      <div className="mr-6 text-right">
                        <div className="text-muted-foreground text-sm">
                          Last Weight
                        </div>
                        <div className="font-semibold">
                          {exercise.lastWeight} kg
                        </div>
                      </div>
                    )}
                    {exercise.duration && (
                      <div className="mr-6 text-right">
                        <div className="text-muted-foreground text-sm">
                          Duration
                        </div>
                        <div className="font-semibold">{exercise.duration}</div>
                      </div>
                    )}
                    {expandedExercise === exercise.id ? (
                      <ChevronUp className="text-muted-foreground h-4 w-4" />
                    ) : (
                      <ChevronDown className="text-muted-foreground h-4 w-4" />
                    )}
                  </div>
                </CardContent>
              </CollapsibleTrigger>

              <CollapsibleContent>
                {/* Exercise Details Section */}
                <CardContent className="bg-muted/50 border-t p-4">
                  <div className="flex flex-col gap-4 md:flex-row">
                    {/* Stats */}
                    <div className="md:w-1/3">
                      <h4 className="text-muted-foreground mb-2 text-sm font-medium">
                        Stats
                      </h4>
                      <Card>
                        <CardContent className="space-y-2 p-4">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Personal Best:
                            </span>
                            <span className="font-medium">
                              {exercise.personalBest
                                ? `${exercise.personalBest} kg`
                                : exercise.duration || 'N/A'}
                            </span>
                          </div>
                          {/* ... other stats ... */}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Progress Chart */}
                    <div className="md:w-2/3">
                      <h4 className="text-muted-foreground mb-2 text-sm font-medium">
                        Progress
                      </h4>
                      <Card>
                        <CardContent className="flex h-48 items-center justify-center p-4">
                          {exercise.progressData.length > 0 ? (
                            <div className="flex items-center">
                              <BarChart2 className="text-muted-foreground h-12 w-12" />
                              <span className="text-muted-foreground ml-2">
                                Progress chart would appear here
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Info className="text-muted-foreground mr-2 h-5 w-5" />
                              <span className="text-muted-foreground">
                                No progress data available yet
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between gap-6">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setEditingExercise(exercise)}
                      >
                        Edit Progress
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => setDeletingExercise(exercise)}
                      >
                        Delete Exercise
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button>Log Exercise</Button>
                      <Button
                        variant={'outline'}
                        onClick={() => onDuplicate(exercise)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate Exercise
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      <EditExerciseDialog
        open={!!editingExercise}
        onOpenChange={(open) => !open && setEditingExercise(null)}
        exercise={{
          name: editingExercise?.name ?? '',
          category: editingExercise?.category ?? '',
          equipment: editingExercise?.equipment ?? '',
          lastWeight: editingExercise?.lastWeight ?? null,
        }}
        categories={EXERCISE_CATEGORIES_ARRAY.filter((cat) => cat !== 'All')}
        onSubmit={handleEditSubmit}
      />

      <DeleteExerciseDialog
        open={!!deletingExercise}
        onOpenChange={(open) => !open && setDeletingExercise(null)}
        exerciseName={deletingExercise?.name ?? ''}
        onConfirm={handleDelete}
      />
    </>
  )
}
