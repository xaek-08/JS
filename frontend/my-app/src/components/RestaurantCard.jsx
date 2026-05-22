function RestaurantCard({ restaurant, onClick }){
    return(
        <div
            onClick={onClick}
            className="bg-fuschia-200 rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition"
        >
            <div className="w-full h-32 bg-fuschia-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">🍽️</span>
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">
                {restaurant.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
                {restaurant.is_available ? '🟢 Open' : '🔴 Closed'}
            </p>
        </div>
    )
}

export default RestaurantCard