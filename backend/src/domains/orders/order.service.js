import { prisma } from '../../../db/prisma.js';

export async function placeOrder(userId, branchId, deliveryAddress, phoneNumber, paymentMethod) {
    // 1. get cart 
    const cart = await prisma.cart.findUnique({
        where : {
            user_id: userId
        },
        include: {
            items: {
                include:{
                    menuItem:{
                        include: {
                            branchMenus:{
                                where: {branch_id: branchId}
                            }
                        }
                    }
                }
            }
        }

    })
   // 2. validate 
    if (!cart || cart.items.length==0){
        throw new Error("Cart is empty")
    }
    // 3. Calculate total
    const total = cart.items.reduce((accumulator,item)=>{
        const price = item.price
        const quantity = item.quantity
        return accumulator+(price*quantity)
    },0)

    // 4. Create Order
    const order = await prisma.order.create({
        data: {
            user_id:userId,
            branch_id: branchId,
            delivery_address:deliveryAddress,
            phone_number: phoneNumber,       
            payment_method: paymentMethod,
            total_amount:total,
            status: 'PENDING'

        }
    })
    // 5. Create order items
    await prisma.orderItem.createMany({
        data: cart.items.map(item => ({
            order_id: order.id,
            menu_item_id: item.menu_item_id,
            quantity: item.quantity,
            price: item.price
        }))
    })
    // 6. Clear cart
    await prisma.cartItem.deleteMany({
        where : { cart_id: cart.id }
    })
    // 7. return order with items
    return prisma.order.findUnique({
        where: {id: order.id },
        include: { items: true }
    })
}

export async function getOrderById(orderId){
    return await prisma.order.findUnique({
        where: { id: orderId },
        include: {
            items: {
                include: {
                    menuItem: true
                }
            }

        }
    })
}

export async function getMyOrders(userId){
    return await prisma.order.findMany({
        where : { user_id: userId },
        include:{ items:true},
        orderBy: {created_at : 'desc'}
    })
}