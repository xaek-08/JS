import { useParams } from "react-router-dom";

export default function OrderConfirmation() {
    const { orderId } = useParams();

    return (
        <div className="max-w-2xl mx-auto p-6 text-center">
            <h1 className="text-2xl font-bold text-green-600 mb-4">
                Order Placed Successfully 🎉
            </h1>
            <p>Your order ID:</p>
            <p className="font-mono mt-2">{orderId}</p>
        </div>
    );
}