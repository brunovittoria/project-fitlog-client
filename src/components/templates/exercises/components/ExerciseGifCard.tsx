import { useExerciseGifByName } from '@/hooks/services/modules/exercise'

interface ExerciseGifCardProps {
  name: string
}

const ExerciseGifCard = ({ name }: ExerciseGifCardProps) => {
  const { data, isLoading, error } = useExerciseGifByName(name)
  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <div className="bg-muted h-32 w-32 animate-pulse rounded-lg" />
      </div>
    )
  }
  if (error || !data) {
    console.log('error', error)
    console.log('data', data)
    return (
      <div className="text-muted-foreground flex h-48 w-full items-center justify-center text-sm">
        GIF não disponível
      </div>
    )
  }
  return (
    <div className="mb-4 flex flex-col items-center gap-2">
      <img
        src={data.gifUrl}
        alt={data.name}
        className="h-32 w-32 rounded-lg border object-contain"
        loading="lazy"
      />
      <div className="text-base font-semibold capitalize">{data.name}</div>
      <div className="text-muted-foreground flex gap-2 text-xs">
        <span className="rounded px-2 py-0.5">{data.bodyPart}</span>
        <span className="rounded px-2 py-0.5">{data.target}</span>
      </div>
    </div>
  )
}

export default ExerciseGifCard
