import { useState, useEffect } from 'react'
import { getRestaurants } from '../api/restaurants.js'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar.jsx'
import RestaurantCard from '../components/RestaurantCard.jsx'

function Home() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const data = await getRestaurants()
        setRestaurants(data)
      } catch (err) {
        setError('Failed to load restaurants')
      } finally {
        setLoading(false)
      }
    }
    fetchRestaurants()
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading restaurants...</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">{error}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar/>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Restaurants near you 🍽️
        </h2>

        {restaurants.length === 0 ? (
          <p className="text-gray-500">No restaurants found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map(restaurant => (
              <RestaurantCard 
                key = {restaurant.id}
                restaurant = {restaurant}
                onClick = {() => navigate(`/restaurant/${restaurant.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home