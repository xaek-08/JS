import express from 'express'
import { authenticateToken } from '../../middlewares/auth.middleware.js'
import { authorizeRole } from '../../middlewares/authorizeRole.middleware.js'
import * as statusController from './order.status.controller.js'

const router = express.Router()

router.put('/orders/:id/status', authenticateToken, authorizeRole('RESTAURANT_OWNER', 'DELIVERY_PARTNER', 'ADMIN'), statusController.updateOrderStatus)

export default router