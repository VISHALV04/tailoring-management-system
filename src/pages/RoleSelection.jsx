import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const RoleSelection = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const role = localStorage.getItem('role')
    
    if (isLoggedIn && role) {
      navigate(role === 'admin' ? '/admin/dashboard' : '/customer/dashboard', { replace: true })
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Select Your Role</h1>
          <p className="text-xl text-purple-300">Choose how you want to access the system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Admin Card */}
          <div
            onClick={() => navigate('/login/admin')}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 cursor-pointer hover:bg-white/10 hover:scale-105 transition-all duration-300 shadow-2xl group"
          >
            <div className="text-center">
              <div className="inline-block p-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6 shadow-lg group-hover:shadow-blue-500/50">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Admin (Tailor)</h2>
              <p className="text-gray-300">Manage customers, orders, and measurements</p>
            </div>
          </div>

          {/* Customer Card */}
          <div
            onClick={() => navigate('/login/customer')}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 cursor-pointer hover:bg-white/10 hover:scale-105 transition-all duration-300 shadow-2xl group"
          >
            <div className="text-center">
              <div className="inline-block p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg group-hover:shadow-purple-500/50">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Customer</h2>
              <p className="text-gray-300">Track your orders and delivery status</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-purple-300 hover:text-white transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoleSelection
