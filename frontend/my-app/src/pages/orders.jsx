import { useEffect, useState } from "react";
import { orderAPI } from "../api/orders.js";
import { useNavigate } from "react-router-dom";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        orderAPI.getMyOrders()
            .then((data) => {
                console.log("ORDERS:", data);
                setOrders(data); // if backend returns {orders: []}, change to data.orders
            })
            .catch((err) => {
                console.error("ERROR:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading orders...</p>;
    }

    return (
        <div>
            <h2>My Orders</h2>

            {orders.length === 0 ? (
                <p>No Orders yet</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                        <p><b>Order ID:</b> {order.id}</p>
                        <p><b>Status:</b> {order.status}</p>
                        <p><b>Total:</b> {order.total_amount}</p>

                        <button onClick={() => navigate(`/orders/${order.id}`)}>
                            View Details
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default Orders;