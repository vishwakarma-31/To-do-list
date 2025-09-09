'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { createTask } from '@/lib/actions'
import { toast } from 'sonner'

export function AddTaskForm() {
  const [content, setContent] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    startTransition(async () => {
      try {
        await createTask(content.trim())
        setContent('')
        router.refresh()
        toast.success('Task added successfully!')
      } catch (error) {
        toast.error('Failed to add task')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isPending}
        className="flex-1"
      />
      <Button type="submit" disabled={isPending || !content.trim()}>
        {isPending ? 'Adding...' : 'Add Task'}
      </Button>
    </form>
  )
}