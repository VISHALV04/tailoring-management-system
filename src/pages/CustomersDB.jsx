import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'

const CustomersDB = () => {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchPhone, setSearchPhone] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

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

  const filteredCustomers = customers.filter(customer => {
    const matchesName = customer.name.toLowerCase().includes(searchName.toLowerCase())
    const matchesPhone = customer.phone.includes(searchPhone)
    const matchesCategory = filterCategory === 'all' || customer.category === filterCategory
    return matchesName && matchesPhone && matchesCategory
  })

  const handleCustomerClick = (customer) => {
    navigate('/admin/measurement', { state: { selectedCustomer: customer } })
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Customers Database</h1>
          <p className="text-purple-300 mt-1">View and manage all customers</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Search by Name</label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Enter name..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Search by Phone</label>
              <input
                type="text"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                placeholder="Enter phone..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Filter by Category</label>
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
          </div>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="text-center py-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-400 text-lg">No customers found</p>
          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">Address</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">Total Orders</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-white/5 transition">
                      <td className="px-6 py-4 text-sm font-medium text-white">{customer.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{customer.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{customer.address || '-'}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/50">
                          {customer.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{customer.orders?.length || 0}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleCustomerClick(customer)}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition"
                        >
                          Add Measurement
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default CustomersDB
