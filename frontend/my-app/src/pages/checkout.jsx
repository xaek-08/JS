import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartAPI } from "../api/cart";
import { orderAPI } from "../api/orders";

export default function Checkout() {
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [cart, setCart] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const data = await cartAPI.getCart();
                setCart(data);
            } catch (err) {
                setError("Failed to load cart");
            }
        };
        fetchCart();
    }, []);

    const cartSubtotal =
        cart?.items?.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0) || 0;

    const handlePlaceOrder = async () => {
        if (!address.trim()) {
            setError("Please enter delivery address");
            return;
        }

        if (!phone.trim()) {
            setError("Please enter phone number");
            return;
        }

        if (!cart?.items?.length) {
            setError("Cart is empty");
            return;
        }

        try {
            setLoading(true);
            setError("");

            // ✅ FIXED: get branch_id from cart (not items)
            const branchId = cart?.branch_id;

            console.log("Branch ID:", branchId);

            if (!branchId) {
                setError("No branch found in cart");
                return;
            }

            // ✅ FIXED: match backend naming (snake_case)
            const orderData = {
                branch_id: branchId,
                delivery_address: address,
                phone_number: phone,
                payment_method: paymentMethod,
            };

            console.log("Sending order data:", orderData);

            const order = await orderAPI.createOrder(orderData);

            // redirect after success
            navigate(`/order-confirmation/${order.id}`);
        } catch (err) {
            console.error("Order error:", err?.response?.data || err);
            setError("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {!cart && !error && <p>Loading cart...</p>}

            {cart && (
                <>
                    {/* Order Summary */}
                    <div className="bg-white p-4 rounded shadow mb-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Order Summary
                        </h2>

                        {cart.items?.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between mb-2"
                            >
                                <span>
                                    {item.menuItem?.name} x {item.quantity}
                                </span>
                                <span>
                                    ₹{item.price * item.quantity}
                                </span>
                            </div>
                        ))}

                        <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>₹{cartSubtotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Fee:</span>
                                <span>₹40</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg mt-2">
                                <span>Total:</span>
                                <span>₹{cartSubtotal + 40}</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Details */}
                    <div className="bg-white p-4 rounded shadow mb-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Delivery Details
                        </h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Delivery Address *
                            </label>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full border rounded p-2"
                                rows="3"
                                placeholder="Enter your complete address"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border rounded p-2"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Payment Method *
                            </label>

                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="COD"
                                        checked={paymentMethod === "COD"}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        className="mr-2"
                                    />
                                    Cash on Delivery
                                </label>

                                <label className="flex items-center text-gray-400">
                                    <input
                                        type="radio"
                                        value="CARD"
                                        disabled
                                        className="mr-2"
                                    />
                                    Card Payment (Coming Soon)
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Place Order Button */}
                    <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
                    >
                        {loading ? "Placing Order..." : "Place Order"}
                    </button>
                </>
            )}
        </div>
    );
}