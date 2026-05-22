import { prisma } from '../../../db/prisma.js'

// ---------------Restaurant------------------

export async function createRestaurant(data) {
  if (!data.name) throw new Error('Restaurant name is required')
  return prisma.restaurant.create({ data })
}

export async function findAllRestaurants() {
  return prisma.restaurant.findMany()
}

export async function findRestaurantById(id) {
  return prisma.restaurant.findUnique({ where: { id } })
}

export async function updateRestaurant(id, data) {
  const existing = await prisma.restaurant.findUnique({ where: { id } })
  if (!existing) throw new Error('Restaurant not found')
  return prisma.restaurant.update({ where: { id }, data })
}

export async function deleteRestaurant(id) {
  const existing = await prisma.restaurant.findUnique({ where: { id } })
  if (!existing) throw new Error('Restaurant not found')
  return prisma.restaurant.delete({ where: { id } })
}

// --------------Branch---------------
export async function createBranch(restaurantId,data){
  return prisma.branch.create({
    data: {
      ...data,
      restaurant_id: restaurantId,
      opens_at: new Date(data.opens_at),
      closes_at: new Date(data.closes_at),
    }
  })
}

export async function getBranchesByRestaurant(restaurantId){
  return prisma.branch.findMany({
    where: { restaurant_id: restaurantId }
  })
}

// ----------Menu Item(master dish)----------

export async function createMenuItem(restaurantId,data){
  return await prisma.menuItem.create({
    data: {
      ...data,
      restaurant_id: restaurantId
    }
  })
}

export async function getMenuItemsByRestaurant(restaurantId){
  return prisma.menuItem.findMany({
    where: { restaurant_id : restaurantId }
  })
}

// ----------Branch Menu(junction)------------

export async function assignMenuItemToBranch(branchId,menuItemId,price){
  return prisma.branchMenuItem.create({
    data: {
      branch_id: branchId,
      menu_item_id: menuItemId,
      price
    }
  })
}

export async function getBranchMenu(branchId){
  return prisma.branchMenuItem.findMany({
    where: { branch_id: branchId },
    include: { menuItem: true }
  })
}

export async function updateBranchMenuItem(branchId,menuItemId,data){
  return prisma.branchMenuItem.update({
    where: {
      branch_id_menu_item_id: {
        branch_id: branchId,
        menu_item_id: menuItemId
      }
    },
    data
  })
}

export async function removeBranchMenuItem(branchId, menuItemId) {
  return prisma.branchMenuItem.delete({
    where: {
      branch_id_menu_item_id: {
        branch_id: branchId,
        menu_item_id: menuItemId
      }
    }
  })
}