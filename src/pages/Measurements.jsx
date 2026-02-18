import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const dummyCustomers = [
  {
    id: 1,
    name: 'John Doe',
    phone: '9876543210',
    email: 'john@example.com',
    address: '123 Main St, City',
    measurements: [
      { id: 1, clothType: 'Shirt', status: 'In Progress', chest: '38', waist: '32', shoulder: '16', length: '28' },
      { id: 2, clothType: 'Pant', status: 'In Progress', waist: '32', hip: '36', length: '40', thigh: '22' }
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    phone: '9123456789',
    email: 'jane@example.com',
    address: '456 Oak Ave, Town',
    measurements: [
      { id: 3, clothType: 'Blouse', status: 'In Progress', bust: '36', waist: '28', shoulder: '14', length: '24' },
      { id: 4, clothType: 'Skirt', status: 'In Progress', waist: '28', hip: '38', length: '32' }
    ]
  }
]

const Measurements = () => {
  const navigate = useNavigate()
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [showMeasurements, setShowMeasurements] = useState(false)

  const handleCustomerSelect = (e) => {
    const customerId = parseInt(e.target.value)
    const customer = dummyCustomers.find(c => c.id === customerId)
    setSelectedCustomer(customer)
    setShowMeasurements(false)
  }

  const handleShowMeasurements = () => {
    setShowMeasurements(true)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Measurements</h1>
          <button onClick={() => navigate('/admin/dashboard')} className="bg-white text-blue-600 px-4 py-2 rounded">
            Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Select Customer</label>
            <select 
              onChange={handleCustomerSelect}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue=""
            >
              <option value="" disabled>Choose a customer...</option>
              {dummyCustomers.map(customer => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
            </select>
          </div>

          {selectedCustomer && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Customer Details</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Name:</p>
                    <p className="font-semibold">{selectedCustomer.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone:</p>
                    <p className="font-semibold">{selectedCustomer.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email:</p>
                    <p className="font-semibold">{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Address:</p>
                    <p className="font-semibold">{selectedCustomer.address}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleShowMeasurements}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Show Measurements
              </button>

              {showMeasurements && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-800">In Progress Measurements</h3>
                  <div className="space-y-4">
                    {selectedCustomer.measurements.map(measurement => (
                      <div key={measurement.id} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-bold text-lg text-blue-600">{measurement.clothType}</h4>
                          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {measurement.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          {Object.entries(measurement).map(([key, value]) => {
                            if (key !== 'id' && key !== 'clothType' && key !== 'status') {
                              return (
                                <div key={key}>
                                  <p className="text-gray-600 text-sm capitalize">{key}:</p>
                                  <p className="font-semibold">{value}"</p>
                                </div>
                              )
                            }
                            return null
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Measurements
