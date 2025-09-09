'use server'

import { revalidatePath } from 'next/cache'
import { auth } from './auth'
import { prisma } from './prisma'

export async function createTask(content: string) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  await prisma.task.create({
    data: {
      content,
      ownerId: session.user.id,
    },
  })

  revalidatePath('/')
}

export async function toggleTask(id: string) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const task = await prisma.task.findUnique({
    where: { id },
  })

  if (!task || task.ownerId !== session.user.id) {
    throw new Error('Task not found or unauthorized')
  }

  await prisma.task.update({
    where: { id },
    data: {
      isCompleted: !task.isCompleted,
    },
  })

  revalidatePath('/')
}

export async function deleteTask(id: string) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const task = await prisma.task.findUnique({
    where: { id },
  })

  if (!task || task.ownerId !== session.user.id) {
    throw new Error('Task not found or unauthorized')
  }

  await prisma.task.delete({
    where: { id },
  })

  revalidatePath('/')
}