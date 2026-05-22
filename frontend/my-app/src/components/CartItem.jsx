function CartItem({ item, onUpdateQuantity, onRemove }) {
    const { id, menuItem, quantity, price } = item;  // ✅ Get price from item (CartItem table)
    const { name } = menuItem;  // ✅ Get name from menuItem
    const subtotal = price * quantity;

    const handleDecrease = () => {
        if (quantity > 1) {
            onUpdateQuantity(id, quantity - 1)
        }
    }

    const handleIncrease = () => {
        onUpdateQuantity(id, quantity + 1)
    }

    return (
        <div className="border rounded p-4 mb-4 flex justify-between items-center">
            <div>
                <h3 className="font-bold">{name}</h3>
                <p className="text-gray-600">₹{price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <button onClick={handleDecrease} className="bg-gray-200 px-3 py-1 rounded">
                        -
                    </button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease} className="bg-gray-200 px-3 py-1 rounded">
                        +
                    </button>
                </div>
                <div className="font-semibold">₹{subtotal.toFixed(2)}</div>
                <button
                    onClick={() => onRemove(id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CartItem