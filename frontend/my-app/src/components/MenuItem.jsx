import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { cartAPI } from "../api/cart";


function RestaurantDetail() {
    const { restaurantId } = useParams()
    const [restaurant, setRestaurant] = useState(null)
    const [branches, setBranches] = useState([])
    const [selectedBranchId, setSelectedBranchId] = useState(null)
    const [menuItems, setMenuItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [addingToCart, setAddingToCart] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        fetchRestaurantDetails()
    }, [restaurantId])

    const fetchRestaurantDetails = async () => {
        try {
            // First call - get restaurant
            const restaurantRes = await fetch(`http://localhost:3000/restaurants/${restaurantId}`)
            const restaurantData = await restaurantRes.json();

            // Second call - get branches
            const branchesRes = await fetch(`http://localhost:3000/restaurants/${restaurantId}/branches`)
            const branchesData = await branchesRes.json();

            setRestaurant(restaurantData)
            setBranches(branchesData)

            if (branchesData.length > 0) {
                setSelectedBranchId(branchesData[0].id)
            }
        } catch (error) {
            console.error("Error fetching restaurant:", error)
        }
    }

    useEffect(() => {
        if (selectedBranchId) {
            fetchMenuItems();
        }
    }, [selectedBranchId]);


    const fetchMenuItems = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `http://localhost:3000/branches/${selectedBranchId}/menu`
            );
            const data = await response.json();
            console.log(data);
            setMenuItems(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching menu:', error);
            setLoading(false);
        }
    };

    const handleAddToCart = async (menuItemId, itemName, price, branch_id) => {
        try {
            setAddingToCart(menuItemId)
            await cartAPI.addItem(menuItemId, 1, price, branch_id)
            setMessage(`${itemName} added to cart!`)
            setTimeout(() => setMessage(null), 3000)
        } catch (error) {
            setMessage('Failed to add item to cart')
            setTimeout(() => setMessage(null), 3000)
        } finally {
            setAddingToCart(null)
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Restaurant Header */}
            {restaurant && (
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">{restaurant.name}</h1>
                    <p className="text-gray-600">{restaurant.cuisines}</p>
                    <p className="text-yellow-600">⭐ {restaurant.rating}</p>
                </div>
            )}

            {/* Branch Selector Dropdown */}
            <div className="mb-6">
                <label className="block mb-2 font-semibold">Select Branch:</label>
                <select
                    value={selectedBranchId || ''}
                    onChange={(e) => setSelectedBranchId(e.target.value)}
                    className="border rounded px-4 py-2 w-full"
                >
                    {branches.map(branch => (
                        <option key={branch.id} value={branch.id}>
                            {branch.name} - {branch.address}
                        </option>
                    ))}
                </select>
            </div>

            {/* Menu Items Grid */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Menu</h2>
                {loading ? (
                    <p>Loading menu...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {menuItems.map(item => (
                            <div key={item.id} className="border rounded p-4">
                                <h3 className="font-bold">{item.menuItem?.name}</h3>
                                <p className="text-gray-600 text-sm">{item.menuItem?.cuisine_type}</p>
                                <p className="text-green-600 font-semibold mt-2">₹{item.price}</p>
                                <p className={item.is_available ? "text-green-500" : "text-red-500"}>
                                    {item.is_available ? "Available" : "Not Available"}
                                </p>
                                <button
                                    onClick={() => handleAddToCart(
                                        item.menuItem.id,
                                        item.menuItem.name,
                                        item.price,
                                        selectedBranchId
                                    )}
                                    disabled={!item.is_available || addingToCart === item.menuItem.id}
                                    className={`mt-3 w-full py-2 rounded font-semibold ${item.is_available
                                            ? 'bg-yellow-600 text-black hover: bg-yellow-400'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    {addingToCart === item.menuItem.id ? 'Adding...' : 'Add to Cart'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

}

export default RestaurantDetail