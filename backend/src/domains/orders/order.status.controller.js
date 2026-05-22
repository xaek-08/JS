import * as StatusServices from './order.status.service.js'

export async function updateOrderStatus(req,res){
    try{
        const orderId = req.params.id
        const status = req.body.status
        const role = req.user.role
        const orderStatus = await StatusServices.updateOrderStatus(orderId,status,role)
        res.status(200).json(orderStatus)
    } catch(err){
        res.status(400).json({ error: err.message})
    }
} 