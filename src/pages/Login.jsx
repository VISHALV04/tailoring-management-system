import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [role, setRole] = useState('admin')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const savedRole = localStorage.getItem('role')
    if (savedRole === 'admin') {
      navigate('/admin/dashboard', { replace: true })
    } else if (savedRole === 'customer') {
      navigate('/customer/dashboard', { replace: true })
    }
  }, [navigate])

  const credentials = {
    admin: { username: 'admin', password: 'admin123' },
    customer: { username: 'customer', password: 'customer123' }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (username === credentials[role].username && password === credentials[role].password) {
      localStorage.setItem('role', role)
      localStorage.setItem('username', username)
      navigate(role === 'admin' ? '/admin/dashboard' : '/customer/dashboard', { replace: true })
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Professional Tailoring Management</h1>
          <p className="text-purple-300 mt-2">நம்பகமான தையல் சேவை - Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Select Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition">
              <option value="admin" className="bg-gray-800">Admin (Tailor)</option>
              <option value="customer" className="bg-gray-800">Customer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-400" placeholder="Enter username" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-400" placeholder="Enter password" required />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition duration-200 shadow-lg hover:shadow-xl">
            Sign In
          </button>
        </form>

        <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
          <p className="text-xs text-gray-300 font-semibold mb-2">Demo Credentials:</p>
          <p className="text-xs text-gray-400">Admin: admin / admin123</p>
          <p className="text-xs text-gray-400">Customer: customer / customer123</p>
        </div>
      </div>
    </div>
  )
}

export default Login
