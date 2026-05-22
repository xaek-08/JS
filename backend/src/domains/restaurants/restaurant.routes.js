import express from 'express'
import * as restaurantController from './restaurant.controller.js'
import { authenticateToken } from '../../middlewares/auth.middleware.js'
import { authorizeRole } from '../../middlewares/authorizeRole.middleware.js'

export const restaurantRouter = express.Router()
export const branchRouter = express.Router()

// ─── Restaurant ───────────────────────────
restaurantRouter.post('/', authenticateToken, authorizeRole('ADMIN', 'RESTAURANT_OWNER'), restaurantController.createRestaurant)
restaurantRouter.get('/', restaurantController.findAllRestaurants)
restaurantRouter.get('/:id', restaurantController.findRestaurantById)
restaurantRouter.put('/:id', authenticateToken, authorizeRole('ADMIN', 'RESTAURANT_OWNER'), restaurantController.updateRestaurant)
restaurantRouter.delete('/:id', authenticateToken, authorizeRole('ADMIN'), restaurantController.deleteRestaurant)

// ─── Branch ───────────────────────────────
restaurantRouter.post('/:restaurantId/branches', authenticateToken, authorizeRole('ADMIN', 'RESTAURANT_OWNER'), restaurantController.createBranch)
restaurantRouter.get('/:restaurantId/branches', restaurantController.getBranchesByRestaurant)

// ─── Master Menu ──────────────────────────
restaurantRouter.post('/:restaurantId/menu', authenticateToken, authorizeRole('ADMIN', 'RESTAURANT_OWNER'), restaurantController.createMenuItem)
restaurantRouter.get('/:restaurantId/menu', restaurantController.getMenuItemsByRestaurant)

// ─── Branch Menu ──────────────────────────
branchRouter.post('/:branchId/menu', authenticateToken, authorizeRole('ADMIN', 'RESTAURANT_OWNER'), restaurantController.assignMenuItemToBranch)
branchRouter.get('/:branchId/menu', restaurantController.getBranchMenu)
branchRouter.put('/:branchId/menu/:menuItemId', authenticateToken, authorizeRole('ADMIN', 'RESTAURANT_OWNER'), restaurantController.updateBranchMenuItem)
branchRouter.delete('/:branchId/menu/:menuItemId', authenticateToken, authorizeRole('ADMIN', 'RESTAURANT_OWNER'), restaurantController.removeBranchMenuItem)