import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import { dressOptions, measurementFields } from '../utils/dressOptions'

const MeasurementPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [customers, setCustomers] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [category, setCategory] = useState('')
  const [dressType, setDressType] = useState('')
  const [measurements, setMeasurements] = useState({})
  const [customFields, setCustomFields] = useState([])
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const loadedCustomers = JSON.parse(localStorage.getItem('customers') || '[]')
    setCustomers([dummyCustomer, ...loadedCustomers])
    
    if (location.state?.selectedCustomer) {
      setSelectedCustomer(location.state.selectedCustomer)
      setCategory(location.state.selectedCustomer.category)
    }
  }, [location])

  const handleCustomerChange = (e) => {
    const customerId = parseInt(e.target.value)
    const customer = customers.find(c => c.id === customerId)
    setSelectedCustomer(customer)
    setCategory(customer?.category || '')
    setDressType('')
    setMeasurements({})  }

  const handleDressTypeChange = (e) => {
    setDressType(e.target.value)
    setMeasurements({})  }

  const handleMeasurementChange = (field, value) => {
    setMeasurements({ ...measurements, [field]: value })
  }

  const addCustomField = () => {
    setCustomFields([...customFields, { name: '', value: '' }])
  }

  const updateCustomField = (index, field, value) => {
    const updated = [...customFields]
    updated[index][field] = value
    setCustomFields(updated)
  }

  const removeCustomField = (index) => {
    setCustomFields(customFields.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!selectedCustomer || !dressType) {
      alert('Please select customer and dress type')
      return
    }

    const customMeasurements = {}
    customFields.forEach(field => {
      if (field.name && field.value) {
        customMeasurements[field.name] = field.value
      }
    })

    const order = {
      id: Date.now(),
      dressType,
      category,
      measurements: { ...measurements, ...customMeasurements },
      status: 'Pending',
      orderDate: new Date().toISOString(),
      deliveryDate: null
    }

    const updatedCustomers = customers.map(c => {
      if (c.id === selectedCustomer.id) {
        return {
          ...c,
          orders: [...(c.orders || []), order]
        }
      }
      return c
    })

    localStorage.setItem('customers', JSON.stringify(updatedCustomers))
    setShowSuccess(true)
    
    setTimeout(() => {
      setShowSuccess(false)
      navigate('/admin/customers')
    }, 2000)
  }

  const [showMeasurements, setShowMeasurements] = useState(false)

  const dummyCustomer = {
    id: 999,
    name: 'Demo Customer',
    phone: '9876543210',
    category: 'Men',
    orders: [
      {
        id: 1,
        dressType: 'Shirt',
        category: 'Men',
        status: 'In Progress',
        measurements: { Chest: '38', Waist: '32', Shoulder: '16', Length: '28' }
      },
      {
        id: 2,
        dressType: 'Pant',
        category: 'Men',
        status: 'In Progress',
        measurements: { Waist: '32', Hip: '36', Length: '40', Thigh: '22' }
      }
    ]
  }

  const pendingOrders = selectedCustomer?.orders?.filter(o => o.status === 'Pending') || []
  const inProgressOrders = selectedCustomer?.orders?.filter(o => o.status === 'In Progress') || []

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Measurement Page</h1>
          <p className="text-purple-300 mt-1">Add measurements for customer orders</p>
        </div>

        {showSuccess && (
          <div className="mb-6 bg-green-500/20 border border-green-500/50 text-green-300 px-6 py-4 rounded-lg animate-pulse">
            ✓ Measurement saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Select Customer</h2>
            <select
              value={selectedCustomer?.id || ''}
              onChange={handleCustomerChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            >
              <option value="" className="bg-gray-800">-- Select Existing Customer --</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id} className="bg-gray-800">
                  {customer.name} - {customer.phone}
                </option>
              ))}
            </select>
          </div>

          {selectedCustomer && (
            <>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Customer Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
                  <div>
                    <span className="text-gray-400">Name:</span> <span className="text-white font-semibold">{selectedCustomer.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Phone:</span> <span className="text-white font-semibold">{selectedCustomer.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Category:</span> <span className="text-white font-semibold">{selectedCustomer.category}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowMeasurements(!showMeasurements)}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition"
                >
                  {showMeasurements ? 'Hide Measurements' : 'Show Measurements'}
                </button>
              </div>

              {showMeasurements && inProgressOrders.length > 0 && (
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-md border border-green-500/30 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    In Progress Measurements
                  </h2>
                  <div className="space-y-4">
                    {inProgressOrders.map((order, index) => (
                      <div key={order.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-white">{order.dressType}</h3>
                            <p className="text-sm text-gray-400">Order #{index + 1} - {order.category}</p>
                          </div>
                          <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs font-semibold rounded-full border border-green-400/50">
                            {order.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {Object.entries(order.measurements).map(([key, value]) => (
                            <div key={key} className="bg-white/5 rounded p-2">
                              <p className="text-xs text-gray-400">{key}</p>
                              <p className="text-sm font-semibold text-white">{value}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!showMeasurements && pendingOrders.length > 0 && (
                <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-md border border-orange-500/30 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Pending Orders - Measurements for Cutting/Stitching
                  </h2>
                  <div className="space-y-4">
                    {pendingOrders.map((order, index) => (
                      <div key={order.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-white">{order.dressType}</h3>
                            <p className="text-sm text-gray-400">Order #{index + 1} - {order.category}</p>
                          </div>
                          <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs font-semibold rounded-full border border-orange-400/50">
                            {order.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {Object.entries(order.measurements).map(([key, value]) => (
                            <div key={key} className="bg-white/5 rounded p-2">
                              <p className="text-xs text-gray-400">{key}</p>
                              <p className="text-sm font-semibold text-white">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">For Whom Stitching?</h2>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value)
                    setDressType('')
                    setMeasurements({})                  }}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  required
                >
                  <option value="" className="bg-gray-800">-- Select Category --</option>
                  <option value="Men" className="bg-gray-800">Men</option>
                  <option value="Women" className="bg-gray-800">Women</option>
                  <option value="Boys" className="bg-gray-800">Boys</option>
                  <option value="Girls" className="bg-gray-800">Girls</option>
                  <option value="Children" className="bg-gray-800">Children</option>
                  <option value="Baby" className="bg-gray-800">Baby</option>
                </select>
              </div>

              {category && (
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Select Dress Type</h2>
                  <select
                    value={dressType}
                    onChange={handleDressTypeChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    required
                  >
                    <option value="" className="bg-gray-800">-- Select Dress --</option>
                    {dressOptions[category]?.map(dress => (
                      <option key={dress} value={dress} className="bg-gray-800">{dress}</option>
                    ))}
                  </select>
                </div>
              )}

              {dressType && (
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Measurements for {dressType}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {measurementFields[dressType]?.map(field => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-300 mb-2">{field}</label>
                        <input
                          type="text"
                          value={measurements[field] || ''}
                          onChange={(e) => handleMeasurementChange(field, e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400"
                          placeholder={`Enter ${field.toLowerCase()}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {dressType && (
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Manual Measurements (Optional)</h2>
                    <button
                      type="button"
                      onClick={addCustomField}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition text-sm"
                    >
                      + Add Custom Field
                    </button>
                  </div>
                  
                  {customFields.length > 0 && (
                    <div className="space-y-3">
                      {customFields.map((field, index) => (
                        <div key={index} className="flex gap-3">
                          <input
                            type="text"
                            value={field.name}
                            onChange={(e) => updateCustomField(index, 'name', e.target.value)}
                            placeholder="Field name"
                            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400"
                          />
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) => updateCustomField(index, 'value', e.target.value)}
                            placeholder="Value"
                            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400"
                          />
                          <button
                            type="button"
                            onClick={() => removeCustomField(index)}
                            className="px-4 py-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-500/30 transition"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {dressType && (
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition duration-200 shadow-lg hover:shadow-xl"
                >
                  Save Measurement
                </button>
              )}
            </>
          )}
        </form>
      </div>
    </AdminLayout>
  )
}

export default MeasurementPage
