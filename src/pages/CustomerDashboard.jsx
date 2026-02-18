import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const CustomerDashboard = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const pastOrders = [
    { id: 1, item: 'Shirt', finishedDate: '10/03/2024', deliveryStatus: 'received', rating: 0 },
    { id: 2, item: 'Kurta', finishedDate: '05/03/2024', deliveryStatus: 'not-received', rating: 0 },
    { id: 3, item: 'Pant', finishedDate: '28/02/2024', deliveryStatus: 'received', rating: 5 },
    { id: 4, item: 'Suit', finishedDate: '15/02/2024', deliveryStatus: 'received', rating: 4 },
    { id: 5, item: 'Blazer', finishedDate: '10/02/2024', deliveryStatus: 'not-received', rating: 0 }
  ]

  const [orders, setOrders] = useState({ past: pastOrders })

  const handleRating = (orderId, rating) => {
    setOrders(prev => ({
      ...prev,
      past: prev.past.map(order => 
        order.id === orderId ? { ...order, rating } : order
      )
    }))
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const ongoingOrders = [
    { id: 1, item: 'Shirt', orderDate: '15/03/2024', status: 'In Progress' },
    { id: 2, item: 'Pant', orderDate: '18/03/2024', status: 'In Progress' },
    { id: 3, item: 'Blazer', orderDate: '20/03/2024', status: 'In Progress' },
    { id: 4, item: 'Kurta', orderDate: '22/03/2024', status: 'In Progress' }
  ]

  const allOrders = [
    ...ongoingOrders.map(o => ({ ...o, type: 'ongoing' })),
    ...orders.past.map(o => ({ ...o, type: 'past' }))
  ]

  const filteredOrders = allOrders.filter(order => {
    const matchesFilter = filter === 'all' || 
      (filter === 'ongoing' && order.type === 'ongoing') || 
      (filter === 'past' && order.type === 'past')
    const matchesSearch = order.item.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Customer Portal</span>
            </div>
            <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-500/30 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome, {username}!</h1>
          <p className="text-purple-300">Track and manage your tailoring orders</p>
        </div>

        <div className="mb-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by item name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-gray-400"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                All Orders
              </button>
              <button
                onClick={() => setFilter('ongoing')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  filter === 'ongoing'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                Ongoing
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  filter === 'past'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={`${order.type}-${order.id}`}
              className={`relative overflow-hidden bg-gradient-to-br ${
                order.type === 'ongoing'
                  ? 'from-blue-500/10 to-cyan-500/10 border-blue-500/30'
                  : 'from-green-500/10 to-emerald-500/10 border-green-500/30'
              } backdrop-blur-sm border rounded-2xl p-6 shadow-2xl hover:scale-105 transition-all duration-300 group`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-14 h-14 bg-gradient-to-br ${
                      order.type === 'ongoing'
                        ? 'from-blue-500 to-cyan-500'
                        : 'from-green-500 to-emerald-500'
                    } rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {order.type === 'ongoing' ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        )}
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{order.item}</h3>
                      <p className="text-sm text-gray-400">Order #{order.id}</p>
                    </div>
                  </div>
                  
                  {order.type === 'ongoing' ? (
                    <span className="px-3 py-1 bg-blue-500/30 text-blue-300 text-xs font-semibold rounded-full border border-blue-400/50 animate-pulse">
                      In Progress
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                        order.deliveryStatus === 'received'
                          ? 'bg-green-500/30 text-green-300 border-green-400/50'
                          : 'bg-orange-500/30 text-orange-300 border-orange-400/50'
                      }`}>
                        {order.deliveryStatus === 'received' ? 'Received' : 'Not Received'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-gray-300">
                        {order.type === 'ongoing' ? 'Order Date' : 'Finished'}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {order.type === 'ongoing' ? order.orderDate : order.finishedDate}
                    </span>
                  </div>
                  {order.type === 'past' && order.deliveryStatus === 'received' && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-sm text-gray-400 mb-2">Rate your experience:</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRating(order.id, star)}
                            className="transition-transform hover:scale-125"
                          >
                            <svg
                              className={`w-6 h-6 ${
                                star <= order.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-400 text-lg">No orders found</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search term</p>
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-md border border-blue-500/30 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">{ongoingOrders.length}</div>
            <div className="text-blue-300 font-semibold">Ongoing Orders</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-md border border-green-500/30 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">{orders.past.length}</div>
            <div className="text-green-300 font-semibold">Completed Orders</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">{allOrders.length}</div>
            <div className="text-purple-300 font-semibold">Total Orders</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard
