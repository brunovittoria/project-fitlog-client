import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface ExercisesCategoriesProps {
  categories: string[]
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export function ExercisesCategories({
  categories,
  activeCategory,
  setActiveCategory,
}: ExercisesCategoriesProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-2 pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'secondary' : 'ghost'}
            onClick={() => setActiveCategory(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
