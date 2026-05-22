import * as orderController from './order.controller.js'
import {authenticateToken} from '../../middlewares/auth.middleware.js'
import express from 'express';

const router = express.Router()

router.post('/orders',authenticateToken,orderController.placeOrder)
router.get('/orders/:id',authenticateToken,orderController.getOrderById)
router.get('/orders', authenticateToken,orderController.getMyOrders)

export default router