import { TaskItem } from './TaskItem'
import { Skeleton } from './ui/skeleton'
import { Card, CardContent } from './ui/card'

interface Task {
  id: string
  content: string
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date
  ownerId: string
}

interface TaskListProps {
  tasks: Task[]
  isLoading?: boolean
}

export function TaskList({ tasks, isLoading = false }: TaskListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="flex items-center gap-3 p-4">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No tasks yet. Add one above!
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}