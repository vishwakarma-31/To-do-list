import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { AddTaskForm } from '@/components/AddTaskForm'
import { TaskList } from '@/components/TaskList'

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/login')
  }

  const tasks = await prisma.task.findMany({
    where: {
      ownerId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const activeTasks = tasks.filter(task => !task.isCompleted).length

  return (
    <div className="min-h-screen bg-background py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Welcome back, {session.user.name || session.user.email}!
          </h1>
          <p className="text-muted-foreground">
            You have {activeTasks} active task{activeTasks !== 1 ? 's' : ''}.
          </p>
        </div>

        <AddTaskForm />

        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">Your Tasks</h2>
          <TaskList tasks={tasks} />
        </div>
      </div>
    </div>
  )
}
