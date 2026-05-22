import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import { Routes, Route ,Navigate} from 'react-router-dom'
import Home from './pages/home.jsx'
import RestaurantDetail from './components/MenuItem.jsx'
import Cart from './pages/cart.jsx'
import Checkout from './pages/checkout.jsx'
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import Orders from './pages/orders.jsx'
import OrderDetail from './pages/orderDetails.jsx'

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/restaurant/:restaurantId' element={<RestaurantDetail/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/order-confirmation/:orderId' element={<OrderConfirmation/>}/>
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<OrderDetail />} />
      <Route path='*' element={<Navigate to ="/login"/>}/>
      
      
    </Routes>
  )
}

export default App
