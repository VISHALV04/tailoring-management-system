import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Login = () => {
  const { role } = useParams()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Redirect if already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const savedRole = localStorage.getItem('role')
    
    if (isLoggedIn && savedRole) {
      navigate(savedRole === 'admin' ? '/admin/dashboard' : '/customer/dashboard', { replace: true })
    }

    // Validate role parameter
    if (role !== 'admin' && role !== 'customer') {
      navigate('/select-role', { replace: true })
    }
  }, [role, navigate])

  const credentials = {
    admin: { username: 'admin', password: 'admin123' },
    customer: { username: 'customer', password: 'customer123' }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (username === credentials[role].username && password === credentials[role].password) {
      localStorage.setItem('role', role)
      localStorage.setItem('isLoggedIn', 'true')
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
              {role === 'admin' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              )}
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white capitalize">{role} Login</h1>
          <p className="text-purple-300 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-400"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-400"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition duration-200 shadow-lg hover:shadow-xl"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
          <p className="text-xs text-gray-300 font-semibold mb-2">Demo Credentials:</p>
          <p className="text-xs text-gray-400">
            {role === 'admin' ? 'Username: admin | Password: admin123' : 'Username: customer | Password: customer123'}
          </p>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/select-role')}
            className="text-purple-300 hover:text-white transition text-sm"
          >
            ← Back to Role Selection
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
