import { prisma } from '../../../db/prisma.js'

export async function updateOrderStatus(orderId,status,role){
    // 1. find order
    const order = await prisma.order.findUnique({
        where: { id: orderId }
    })
    if (!order) throw new Error('Order not found')

    // 2. validate who can set which status
    const restaurantStatuses = ['ACCEPTED','PREPARING','READY_FOR_PICKUP','CANCELLED']
    const deliveryStatuses = ['PICKED_UP','ON_THE_WAY','DELIVERED']

    if (restaurantStatuses.includes(status) && role !== 'RESTAURANT_OWNER'){
        throw new Error('Only restaurant can set this status')
    }

    if (deliveryStatuses.includes(status) && role !== 'DELIVERY_PARTNER'){
        throw new Error('Only delivery partner can set this status')
    }

    return prisma.order.update({
        where : { id: orderId },
        data: { status }
    })
}