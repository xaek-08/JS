import { prisma } from '../../../db/prisma.js';

// ➕ Add to cart
export async function addToCart(userId, menuItemId, quantity, _price, branch_id) {

    // 🔹 validations
    if (!menuItemId) {
        throw new Error('menuItemId is required');
    }

    if (!quantity || quantity < 1) {
        throw new Error('Quantity must be at least 1');
    }

    if (!branch_id) {
        throw new Error('branch_id is required');
    }

    // 🔹 fetch correct price from DB (DON’T trust frontend)
    const branchMenuItem = await prisma.branchMenuItem.findUnique({
        where: {
            branch_id_menu_item_id: {
                branch_id,
                menu_item_id: menuItemId
            }
        }
    });

    if (!branchMenuItem) {
        throw new Error('Item not available in this branch');
    }

    const price = branchMenuItem.price;

    // 🔹 get or create cart
    let cart = await prisma.cart.findUnique({
        where: { user_id: userId },
        include: { items: true }
    });

    if (!cart) {
        cart = await prisma.cart.create({
            data: {
                user_id: userId,
                branch_id // ✅ set branch here
            },
            include: { items: true }
        });
    }

    // 🔹 if cart exists but branch not set
    if (!cart.branch_id) {
        await prisma.cart.update({
            where: { id: cart.id },
            data: { branch_id }
        });
        cart.branch_id = branch_id;
    }

    // 🔥 enforce single-branch cart
    if (cart.branch_id !== branch_id) {
        // clear old items
        await prisma.cartItem.deleteMany({
            where: { cart_id: cart.id }
        });

        // update cart to new branch
        await prisma.cart.update({
            where: { id: cart.id },
            data: { branch_id }
        });

        cart.branch_id = branch_id;
    }

    // 🔹 check if item already exists
    const existingCartItem = await prisma.cartItem.findFirst({
        where: {
            cart_id: cart.id,
            menu_item_id: menuItemId
        }
    });

    // 🔁 update quantity if exists
    if (existingCartItem) {
        return prisma.cartItem.update({
            where: { id: existingCartItem.id },
            data: {
                quantity: existingCartItem.quantity + quantity
            },
            include: {
                menuItem: true
            }
        });
    }

    // 🆕 create new item (NO branch_id here)
    return prisma.cartItem.create({
        data: {
            cart_id: cart.id,
            menu_item_id: menuItemId,
            quantity,
            price
            
        },
        include: {
            menuItem: true
        }
    });
}


// 🛒 Get cart
export async function getCart(userId) {
    return prisma.cart.findUnique({
        where: { user_id: userId },
        include: {
            items: {
                include: {
                    menuItem: true
                }
            }
        }
    });
}


// ❌ Remove single item
export async function removeCartItem(cartItemId) {
    return prisma.cartItem.delete({
        where: { id: cartItemId }
    });
}


// 🔄 Update quantity
export async function updateCartItem(cartItemId, quantity) {
    if (!quantity || quantity < 1) {
        throw new Error('Quantity must be at least 1');
    }

    return prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity }
    });
}


// 🧹 Clear entire cart
export async function clearCart(userId) {
    const cart = await prisma.cart.findUnique({
        where: { user_id: userId }
    });

    if (!cart) return null;

    return prisma.cartItem.deleteMany({
        where: { cart_id: cart.id }
    });
}