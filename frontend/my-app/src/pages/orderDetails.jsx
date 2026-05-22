import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { orderAPI } from "../api/orders.js";

function OrderDetail() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        orderAPI.getOrderById(id)
            .then(setOrder)
            .catch(err => console.error(err));
    }, [id]);

    if (!order) return <p>Loading...</p>;

    return (
        <div>
            <h2>Order Details</h2>

            <p>Status: {order.status}</p>
            <p>Address: {order.delivery_address}</p>
            <p>Phone: {order.phone_number}</p>

            <h3>Items</h3>
            {order.items?.map(item => (
                <div key={item.id}>
                    <p>{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: {item.price}</p>
                </div>
            ))}
        </div>
    );
}

export default OrderDetail;