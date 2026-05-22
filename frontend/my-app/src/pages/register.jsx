import { useState } from "react";
import { registerUser } from "../api/auth.js";
import { useNavigate,Link} from 'react-router-dom'

function Register(){
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword]=useState('')
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()
    
    async function handleRegister(){
        if (!name || !email || !password){
            setError('All fields are required.')
            return;
        }
        try{
            setLoading(true)
            setError('')
            await registerUser(name,email,password)
            alert("Registered successfully!")
            navigate('/login')
        } catch(err){
            setError(err.response?.data?.error || 'Registration failed')
    } finally{
        setLoading(false)
    }
}
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text=2xl font-bold text-gray-800 mb-6">Welcome!!👋</h1>
                {error && (
                    <p className='text-red-500 text-sm mb-4'>{error}</p>
                )}
                <div className="flex flex-col gap-4">
                <input
                type="text"
                placeholder="Enter your username"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-yellow-400"
                />
                <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-yellow-400"
                />
                <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-400"
                />
                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="bg-yellow-600 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition">
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
                </div>
                
            </div>
        </div>
    )
}

export default Register