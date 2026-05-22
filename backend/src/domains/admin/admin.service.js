import { prisma } from '../../../db/prisma.js'
export async function getAllOrders() {
  return prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      },
      items: true,
      branch: true
    }
  })
}

export async function getAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      created_at: true
    }
  })
}

export async function assignRole(userId, role) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new Error('User not found')
  
  return prisma.user.update({
    where: { id: userId },
    data: { role }
  })
}