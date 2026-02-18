import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, requiredRole }) => {
  const role = localStorage.getItem('role')
  const isLoggedIn = localStorage.getItem('isLoggedIn')

  if (!isLoggedIn || !role) {
    return <Navigate to="/" replace />
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return children
}

export default PrivateRoute
