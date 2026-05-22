import {useState} from 'react'
import {loginUser} from '../api/auth.js'
import { Link, useNavigate } from 'react-router-dom'


function Login(){
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function handleLogin(){
        if(!email || !password){
            setError('All fields are required.')
            return;
        }
        try{
            setLoading(true)
            setError('')

            const data = await loginUser(email, password)

            localStorage.setItem('token',data.token)
            localStorage.setItem('user',JSON.stringify(data.user))
            navigate('/')

            alert('Logged in successfully!')
        } catch(err){
            setError(err.response?.data?.error || 'Login failed')
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-x1 shadow-md w-full max-w-md">
                <h1 className="text-2x1 font-bold text-gray-800 mb-6">
                    Welcome back👋
                </h1>
                {error && (
                    <p className='text-red-500 text-sm mb-4'>{error}</p>
                )}
                <div className="flex flex-col gap-4">
                    <input 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-400"
                    />
                    <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition">
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>

                <p className="text-sm text-gray-500 text-center mt-4">
                Don't have an account? 
                <Link to="/register" className='text-orange-500 font-medium'>Register</Link>
                </p>

            </div>
        </div>
    )
}
export default Login