import { Button } from '@/components/ui/button'

interface NavigationButtonsProps {
  isFirst: boolean
  isLast: boolean
  onPrevious: () => void
  onNext: () => void
}

export function NavigationButtons({
  isFirst,
  isLast,
  onPrevious,
  onNext,
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between">
      <Button variant="outline" onClick={onPrevious} disabled={isFirst}>
        Previous
      </Button>
      <Button onClick={onNext}>
        {isLast ? 'Complete Workout' : 'Next Exercise'}
      </Button>
    </div>
  )
}
