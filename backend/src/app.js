import express from 'express'
import cors from 'cors';
import { restaurantRouter, branchRouter } from './domains/restaurants/restaurant.routes.js'
import userRouter from './domains/users/user.routes.js'
import cartRouter from './domains/cart/cart.routes.js'
import orderRouter from './domains/orders/order.routes.js'
import statusRouter from './domains/orders/order.status.routes.js'
import adminRouter from './domains/admin/admin.routes.js'
import 'dotenv/config'

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:5174','http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/restaurants', restaurantRouter)
app.use('/branches', branchRouter)
app.use('/auth', userRouter)
app.use('/', cartRouter)
app.use('/', orderRouter)
app.use('/', statusRouter)
app.use('/admin', adminRouter)

app.listen(3000, () => console.log('Server running on port 3000'))
