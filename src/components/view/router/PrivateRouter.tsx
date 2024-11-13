import { Outlet } from 'react-router-dom'

import { getSessionStorageItem, SESSION_LOGIN_KEY } from '@/utils'

export const LoginPrivateRoute = () => {
  const session = getSessionStorageItem(SESSION_LOGIN_KEY)
  // return session ? <Navigate to="/home" /> : <Outlet />
  return <Outlet />
}

export const PrivateRoute = () => {
  const session = getSessionStorageItem(SESSION_LOGIN_KEY)
  // return session ? <Outlet /> : <Navigate to="/login" />
  return <Outlet />
}
