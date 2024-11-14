import { Route, Routes } from 'react-router-dom'

import {
  AccountInfo,
  Home,
  LoginPage,
  Mypage,
  SignupCompletePage,
  SignupPage,
} from '@/components/container'

import { LoginPrivateRoute, PrivateRoute } from './PrivateRouter'

export const RouterComponent = () => {
  return (
    <Routes>
      <Route element={<LoginPrivateRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-up/complete" element={<SignupCompletePage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        {/* home */}
        <Route path="/home" element={<Home />} />

        {/* mypage */}
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/account-info" element={<AccountInfo />} />
      </Route>
    </Routes>
  )
}
