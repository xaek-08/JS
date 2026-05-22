import express from 'express';
import { authenticateToken } from '../../middlewares/auth.middleware.js';
import { authorizeRole } from '../../middlewares/authorizeRole.middleware.js'
import * as cartController from './cart.controller.js';

const router = express.Router();

router.get('/cart', authenticateToken,authorizeRole('CUSTOMER'), cartController.getCart);
router.post('/cart/items', authenticateToken,authorizeRole('CUSTOMER'), cartController.addToCart);
router.put('/cart/items/:id', authenticateToken,authorizeRole('CUSTOMER'), cartController.updateCartItem);
router.delete('/cart/items/:id', authenticateToken,authorizeRole('CUSTOMER'), cartController.removeCartItem);
router.delete('/cart', authenticateToken,authorizeRole('CUSTOMER'), cartController.clearCart);

export default router;
