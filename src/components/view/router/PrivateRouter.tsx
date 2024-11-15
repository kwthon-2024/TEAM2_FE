import { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

import { getSessionStorageItem, SESSION_LOGIN_KEY } from '@/utils'

export const LoginPrivateRoute = () => {
  const session = getSessionStorageItem(SESSION_LOGIN_KEY)
  return session ? <Navigate to="/home" /> : <Outlet />
}

export const PrivateRoute = () => {
  const navigate = useNavigate()
  const session = getSessionStorageItem(SESSION_LOGIN_KEY)

  useEffect(() => {
    if (!session) {
      navigate('/login', { replace: true })
    }
  }, [session, navigate])

  return session ? <Outlet /> : null
}
