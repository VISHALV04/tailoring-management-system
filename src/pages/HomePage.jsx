import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const HomePage = () => {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const images = ['/img1.jpg', '/img2.jpg']

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role === 'admin') {
      navigate('/admin/dashboard', { replace: true })
    } else if (role === 'customer') {
      navigate('/customer/dashboard', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Hero Section with Image Slider */}
      <div className="relative h-screen overflow-hidden">
        {/* Continuous Sliding Images */}
        <div className="absolute inset-0">
          <div 
            className="flex h-full"
            style={{
              width: '400%',
              animation: 'slideRightToLeft 12s linear infinite'
            }}
          >
            <img src="/img1.jpg" alt="Slide 1" className="w-1/4 h-full object-cover" />
            <img src="/img2.jpg" alt="Slide 2" className="w-1/4 h-full object-cover" />
            <img src="/img1.jpg" alt="Slide 1" className="w-1/4 h-full object-cover" />
            <img src="/img2.jpg" alt="Slide 2" className="w-1/4 h-full object-cover" />
          </div>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Navigation Bar */}
        <nav className="relative z-10 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-rose-500 rounded-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Professional Tailoring</h1>
                  <p className="text-sm text-orange-300 font-medium">தரமான தையல் சேவை</p>
                </div>
              </div>
              <button
                onClick={handleLogin}
                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-orange-600 hover:to-rose-600 transition-all duration-300"
              >
                Login
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white/90 mb-4 tracking-wider drop-shadow-lg">
              TAILORING MANAGEMENT SYSTEM
            </h2>
            
            <div className="mb-8 inline-block">
              <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl">
                <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                </svg>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Your Style, Our Craftsmanship
            </h1>

            <p className="text-2xl md:text-3xl font-semibold text-orange-300 mb-8 drop-shadow-lg">
              உங்கள் ஸ்டைல், எங்கள் தையல்
            </p>

            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Premium tailoring services for Men, Women, and Kids. Combining traditional expertise with modern precision for perfect fit and finish.
            </p>

            <button
              onClick={handleLogin}
              className="px-12 py-5 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300 hover:from-orange-600 hover:to-rose-600"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideRightToLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-orange-500 to-rose-500 py-16 -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-xl text-orange-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">15+</div>
              <div className="text-xl text-orange-100">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">98%</div>
              <div className="text-xl text-orange-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600">என் எங்களை தேர்வு செய்ய வேண்டும்</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
              <div className="mb-6 inline-block p-5 bg-gradient-to-br from-orange-50 to-rose-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-14 h-14 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Precision Measurements</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Advanced measurement techniques ensuring perfect fit every time. Digital tracking for accuracy and consistency.</p>
            </div>

            {/* Card 2 */}
            <div className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
              <div className="mb-6 inline-block p-5 bg-gradient-to-br from-orange-50 to-rose-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-14 h-14 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Quality</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Expert craftsmanship with attention to detail. Professional finishing and quality materials for lasting durability.</p>
            </div>

            {/* Card 3 */}
            <div className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
              <div className="mb-6 inline-block p-5 bg-gradient-to-br from-orange-50 to-rose-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-14 h-14 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Timely Delivery</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Reliable service with guaranteed delivery dates. Real-time order tracking and status updates for your convenience.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-24 px-4 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive tailoring solutions for all your needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <div className="text-4xl mb-4">👔</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Men's Wear</h4>
              <p className="text-gray-600">Shirts, Pants, Suits & More</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <div className="text-4xl mb-4">👗</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Women's Wear</h4>
              <p className="text-gray-600">Blouses, Sarees, Churidars</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <div className="text-4xl mb-4">👶</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Kids' Wear</h4>
              <p className="text-gray-600">All Types of Children's Clothing</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <div className="text-4xl mb-4">✂️</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Alterations</h4>
              <p className="text-gray-600">Expert Fitting & Repairs</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-rose-500 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience Excellence?
          </h2>
          <p className="text-xl text-orange-100 mb-10">
            Join hundreds of satisfied customers today
          </p>
          <button
            onClick={handleLogin}
            className="px-12 py-5 bg-white text-orange-600 text-xl font-bold rounded-full shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300 hover:bg-gray-50"
          >
            Login Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-rose-500 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Professional Tailoring</h3>
            </div>
            <p className="text-gray-400 mb-2">தரமான தையல் சேவை</p>
            <p className="text-gray-500 text-sm">&copy; 2024 Professional Tailoring Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
