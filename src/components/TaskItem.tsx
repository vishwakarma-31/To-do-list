'use client'

import { useTransition } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { toggleTask, deleteTask } from '@/lib/actions'
import { toast } from 'sonner'

interface Task {
  id: string
  content: string
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date
  ownerId: string
}

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    startTransition(async () => {
      try {
        await toggleTask(task.id)
        toast.success(`Task ${task.isCompleted ? 'marked as incomplete' : 'completed'}!`)
      } catch (error) {
        toast.error('Failed to update task')
      }
    })
  }

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteTask(task.id)
        toast.success('Task deleted successfully!')
      } catch (error) {
        toast.error('Failed to delete task')
      }
    })
  }

  return (
    <Card className={`transition-opacity ${isPending ? 'opacity-50' : ''}`}>
      <CardContent className="flex items-center gap-3 p-4">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={handleToggle}
          disabled={isPending}
          className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
        />
        <span
          className={`flex-1 text-sm ${
            task.isCompleted ? 'line-through text-muted-foreground' : ''
          }`}
        >
          {task.content}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDelete}
          disabled={isPending}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  )
}