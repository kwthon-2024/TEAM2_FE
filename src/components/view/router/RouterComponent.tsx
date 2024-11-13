import { Route, Routes } from 'react-router-dom'

import { Home } from '@/components/container'

import { LoginPrivateRoute, PrivateRoute } from './PrivateRouter'

export const RouterComponent = () => {
  return (
    <Routes>
      <Route element={<LoginPrivateRoute />}>
        <Route path="/login" element={<div>login</div>} />
      </Route>

      <Route element={<PrivateRoute />}>
        {/* home */}
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  )
}
