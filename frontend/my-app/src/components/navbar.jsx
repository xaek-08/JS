import { useNavigate, Link } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    function handleLogout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
    }
    return (
        <div className="bg-yellow-500 shadow-sm px-8 py-4 flex items-center justify-between sticky top-0 z-50">

            {/* LEFT */}
            <h1 className="text-xl font-bold text-white">
                🍧 LeFlavor
            </h1>

            {/* CENTER */}
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-[400px]">
                <span className="text-gray-400 mr-2">🔍</span>
                <input
                    type="text"
                    placeholder="Search for restaurants..."
                    className="bg-transparent text-sm outline-none w-full"
                />
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-6">
                {token ? (
                    <>
                        <span className="text-sm text-white">
                            Hi, {user.name} 👋
                        </span>
                        <Link to="/orders" className="text-sm text-white hover:underline">
                            📦 Orders
                        </Link>
                        <Link to="/cart" className="text-sm text-white hover:underline">
                            🛒 Cart
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-red-200 hover:text-red-300"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="bg-black text-white text-sm px-4 py-2 rounded-full font-medium hover:bg-gray-900 transition"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/register"
                            className="text-sm text-gray-600 hover:text-neutral-50 font-medium"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar