import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'

const AddCustomer = () => {
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    category: 'Men'
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (formData.phone.length !== 10) {
      alert('Phone number must be 10 digits')
      return
    }

    // Get existing customers
    const customers = JSON.parse(localStorage.getItem('customers') || '[]')
    
    // Check for duplicate phone
    if (customers.some(c => c.phone === formData.phone)) {
      alert('Customer with this phone number already exists!')
      return
    }

    const newCustomer = {
      id: Date.now(),
      ...formData,
      orders: [],
      createdAt: new Date().toISOString()
    }

    customers.push(newCustomer)
    localStorage.setItem('customers', JSON.stringify(customers))
    
    setShowSuccess(true)
    setFormData({ name: '', address: '', phone: '', category: 'Men' })
    
    setTimeout(() => {
      setShowSuccess(false)
      navigate('/admin/customers')
    }, 2000)
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Add New Customer</h1>
          <p className="text-purple-300 mt-1">Register a new customer in the system</p>
        </div>

        {showSuccess && (
          <div className="mb-6 bg-green-500/20 border border-green-500/50 text-green-300 px-6 py-4 rounded-lg animate-pulse">
            ✓ Customer added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-8 max-w-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-gray-400"
                placeholder="Enter customer name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{10}"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-gray-400"
                placeholder="10 digit phone number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-gray-400"
                placeholder="Enter address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">For Whom Stitching? *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              >
                <option value="Men" className="bg-gray-800">Men</option>
                <option value="Women" className="bg-gray-800">Women</option>
                <option value="Boys" className="bg-gray-800">Boys</option>
                <option value="Girls" className="bg-gray-800">Girls</option>
                <option value="Children" className="bg-gray-800">Children</option>
                <option value="Baby" className="bg-gray-800">Baby</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition duration-200 shadow-lg hover:shadow-xl"
          >
            Add Customer
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}

export default AddCustomer
