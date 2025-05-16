import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import {
  MoreVertical,
  Calendar,
  Clock,
  ChevronRight,
  Edit,
  Copy,
  Trash,
} from 'lucide-react'

interface Workout {
  id: number
  name: string
  exercises: number
  lastPerformed: string
  duration: string
  category: string
}

interface WorkoutsTableProps {
  workouts: Workout[]
  activeDropdown: number | null
  setActiveDropdown: (id: number | null) => void
  onEdit: (workout: Workout) => void
  onDelete: (workout: Workout) => void
  onDuplicate: (workout: Workout) => void
}

export function WorkoutsTable({
  // activeDropdown,
  // setActiveDropdown,
  workouts,
  onEdit,
  onDelete,
  onDuplicate,
}: WorkoutsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Workout Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Exercises</TableHead>
            <TableHead>Last Performed</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workouts.map((workout) => (
            <TableRow key={workout.id}>
              <TableCell className="font-medium">{workout.name}</TableCell>
              <TableCell>
                <Badge variant="secondary">{workout.category}</Badge>
              </TableCell>
              <TableCell>{workout.exercises} exercises</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {workout.lastPerformed}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {workout.duration}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Start Workout
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(workout)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDuplicate(workout)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(workout)}
                      className="text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
