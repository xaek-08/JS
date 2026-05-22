import * as cartService from './cart.service.js'

// ➕ Add to cart
export async function addToCart(req, res) {
    try {
        const { menuItemId, quantity, branch_id } = req.body;

        // 🔹 basic validation (fail fast)
        if (!menuItemId) {
            return res.status(400).json({ error: "menuItemId is required" });
        }

        if (!branch_id) {
            return res.status(400).json({ error: "branch_id is required" });
        }

        const cartItem = await cartService.addToCart(
            req.user.userId,
            menuItemId,
            quantity,
            null, // price not needed anymore
            branch_id
        );

        res.status(201).json(cartItem);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


// 🛒 Get cart
export async function getCart(req, res) {
    try {
        const cart = await cartService.getCart(req.user.userId);
        return res.status(200).json(cart);
    } catch (err) {
        console.error("GET CART ERROR:", err);
        res.status(400).json({ error: err.message });
    }
}


// 🔄 Update quantity
export async function updateCartItem(req, res) {
    try {
        const cartItemId = req.params.id;
        const { quantity } = req.body;

        if (!quantity) {
            return res.status(400).json({ error: "Quantity is required" });
        }

        const updatedItem = await cartService.updateCartItem(cartItemId, quantity);
        res.json(updatedItem);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


// ❌ Remove item
export async function removeCartItem(req, res) {
    try {
        const cartItemId = req.params.id;
        await cartService.removeCartItem(cartItemId);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


// 🧹 Clear cart
export async function clearCart(req, res) {
    try {
        await cartService.clearCart(req.user.userId);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}