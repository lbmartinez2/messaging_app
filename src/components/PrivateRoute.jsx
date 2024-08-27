import React from 'react'
import { getAuthHeaders } from '../helpers/functions'
import { Navigate } from 'react-router-dom'

function PrivateRoute({children}) {
  const headers = getAuthHeaders();

  if (!headers) {
    return <Navigate to='/login' />
  }
  return (
    children
  )

    
}

export default PrivateRoute