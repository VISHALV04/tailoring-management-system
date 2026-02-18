import { useState, useEffect } from 'react'
import AdminLayout from '../layouts/AdminLayout'

const AdminDashboard = () => {
  const [customers, setCustomers] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [searchName, setSearchName] = useState('')
  const [searchPhone, setSearchPhone] = useState('')

  useEffect(() => {
    let loadedCustomers = JSON.parse(localStorage.getItem('customers') || '[]')
    
    // Add dummy data if no customers exist
    if (loadedCustomers.length === 0) {
      loadedCustomers = [{
        id: 1,
        name: 'John Doe',
        phone: '9876543210',
        address: '123 Main Street',
        category: 'Men',
        orders: [
          {
            id: 1,
            dressType: 'Shirt',
            category: 'Men',
            status: 'Pending',
            orderDate: new Date().toISOString(),
            measurements: { Chest: '38', Waist: '32', Shoulder: '16', Length: '28' }
          },
          {
            id: 2,
            dressType: 'Pant',
            category: 'Men',
            status: 'Completed',
            orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            measurements: { Waist: '32', Hip: '36', Length: '40' }
          }
        ]
      }]
    }
    setCustomers(loadedCustomers)
  }, [])

  const allOrders = customers.flatMap(customer => 
    (customer.orders || []).map(order => ({
      ...order,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerId: customer.id
    }))
  )

  const pendingOrders = allOrders.filter(o => o.status === 'Pending')
  const completedOrders = allOrders.filter(o => o.status === 'Completed')

  const filteredOrders = allOrders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    const matchesCategory = filterCategory === 'all' || order.category === filterCategory
    const matchesName = order.customerName.toLowerCase().includes(searchName.toLowerCase())
    const matchesPhone = order.customerPhone.includes(searchPhone)
    return matchesStatus && matchesCategory && matchesName && matchesPhone
  })

  const stats = [
    { 
      title: 'Total Customers', 
      value: customers.length, 
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      title: 'Total Orders', 
      value: allOrders.length, 
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      title: 'Pending Orders', 
      value: pendingOrders.length, 
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      gradient: 'from-orange-500 to-yellow-500'
    },
    { 
      title: 'Completed Orders', 
      value: completedOrders.length, 
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      gradient: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-purple-300 mt-1">Welcome back, Admin! Here's your overview.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition duration-300 p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                </div>
                <div className={`bg-gradient-to-br ${stat.gradient} p-4 rounded-xl shadow-lg text-white`}>{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Filter Orders</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all" className="bg-gray-800">All Status</option>
                <option value="Pending" className="bg-gray-800">Pending</option>
                <option value="Completed" className="bg-gray-800">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all" className="bg-gray-800">All Categories</option>
                <option value="Men" className="bg-gray-800">Men</option>
                <option value="Women" className="bg-gray-800">Women</option>
                <option value="Boys" className="bg-gray-800">Boys</option>
                <option value="Girls" className="bg-gray-800">Girls</option>
                <option value="Children" className="bg-gray-800">Children</option>
                <option value="Baby" className="bg-gray-800">Baby</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Search Name</label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Customer name..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Search Phone</label>
              <input
                type="text"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                placeholder="Phone number..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Orders List</h2>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No orders found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Dress</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/5">
                      <td className="px-4 py-4 text-sm text-white">{order.customerName}</td>
                      <td className="px-4 py-4 text-sm text-gray-300">{order.customerPhone}</td>
                      <td className="px-4 py-4 text-sm text-gray-300">{order.dressType}</td>
                      <td className="px-4 py-4">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/50">
                          {order.category}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                          order.status === 'Completed' 
                            ? 'bg-green-500/20 text-green-300 border-green-400/50' 
                            : 'bg-orange-500/20 text-orange-300 border-orange-400/50'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
