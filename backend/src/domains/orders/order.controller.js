import * as OrderServices from './order.service.js';

export async function placeOrder(req, res) {
    try {
        const userId = req.user.userId;

        const { branch_id, delivery_address, phone_number, payment_method } = req.body;

        const order = await OrderServices.placeOrder(
            userId,
            branch_id,
            delivery_address,
            phone_number,
            payment_method
        );

        res.status(201).json(order);
    } catch (error) {
        console.error("PLACE ORDER ERROR:", error);
        res.status(400).json({ error: error.message });
    }
}

export async function getOrderById(req, res) {
    try {
        const orderId = req.params.id;
        const order = await OrderServices.getOrderById(orderId);
        return res.status(200).json(order);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export async function getMyOrders(req, res) {
    try {
        const userId = req.user.userId;
        const orders = await OrderServices.getMyOrders(userId);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}