import express from 'express'
import { authenticateToken } from '../../middlewares/auth.middleware.js'
import { authorizeRole } from '../../middlewares/authorizeRole.middleware.js'
import * as adminController from './admin.controller.js'

const router = express.Router()

router.get('/orders', authenticateToken, authorizeRole('ADMIN'), adminController.getAllOrders)
router.get('/users', authenticateToken, authorizeRole('ADMIN'), adminController.getAllUsers)
router.put('/users/:id/role', authenticateToken, authorizeRole('ADMIN'), adminController.assignRole)

export default router