import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import AddCustomer from './pages/AddCustomer'
import CustomersDB from './pages/CustomersDB'
import MeasurementPage from './pages/MeasurementPage'
import CustomerDashboard from './pages/CustomerDashboard'

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem('role')
  return role === 'admin' ? children : <Navigate to="/login" />
}

const CustomerRoute = ({ children }) => {
  const role = localStorage.getItem('role')
  return role === 'customer' ? children : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/customers" element={<AdminRoute><CustomersDB /></AdminRoute>} />
        <Route path="/admin/add-customer" element={<AdminRoute><AddCustomer /></AdminRoute>} />
        <Route path="/admin/measurement" element={<AdminRoute><MeasurementPage /></AdminRoute>} />
        <Route path="/customer/dashboard" element={<CustomerRoute><CustomerDashboard /></CustomerRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
