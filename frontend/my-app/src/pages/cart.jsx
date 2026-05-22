import { useState, useEffect } from "react";
import { cartAPI } from "../api/cart.js";
import CartItem from "../components/CartItem";
import Checkout from "./checkout.jsx";
import { useNavigate } from "react-router-dom";

export default function Cart() {  
  const navigate = useNavigate()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      setLoading(true)
      const data = await cartAPI.getCart()
      setCart(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    try {
      await cartAPI.updateItem(cartItemId, newQuantity)
      fetchCart()
    } catch (err) {  
      console.error('Failed to update quantity:', err)
    }
  }

  const handleRemoveItem = async (cartItemId) => {
    try {
      await cartAPI.removeItem(cartItemId)
      fetchCart()
    } catch (err) {
      console.error('Failed to remove item:', err)
    }
  }

  const handleClearCart = async () => {
    try {
      await cartAPI.clearCart()
      fetchCart()
    } catch (err) {
      console.error('Failed to clear cart:', err)
    }
  }

  const cartTotal = cart?.items?.reduce((total, item) => {
  const price = item.price || 0;
  return total + (price * item.quantity);
}, 0) || 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>  {/* ← Removed {user} - where does that come from? */}
      
      {/* Loading State */}
      {loading && <p>Loading cart...</p>}

      {/* Error State */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Empty Cart */}
      {!loading && cart?.items?.length === 0 && (
        <p>Your cart is empty</p>
      )}

      {/* Cart Items */}
      {!loading && cart?.items?.length > 0 && (
        <>
          {cart.items.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
            />
          ))}

          {/* Cart Summary */}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl font-bold">₹{cartTotal.toFixed(2)}</span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleClearCart}
                className="bg-gray-500 text-white px-6 py-2 rounded"
              >
                Clear Cart
              </button>
              <button
                className="bg-green-500 text-white px-6 py-2 rounded flex-1"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}  // ← Close the function