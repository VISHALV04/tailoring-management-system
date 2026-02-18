import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {
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
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-2xl">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
            </svg>
          </div>
          <h1 className="text-6xl font-bold text-white mb-4">Professional Tailoring Management</h1>
          <p className="text-xl text-purple-300 mb-12">உங்கள் ஸ்டைல், எங்கள் தையல் - Excellence in every stitch</p>
        </div>
        
        <button
          onClick={() => navigate('/select-role')}
          className="px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Home
