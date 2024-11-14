import { Route, Routes } from 'react-router-dom'

import {
  AccountInfo,
  Carpool,
  CarpoolCreate,
  CarpoolDetail,
  CarpoolEdit,
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

        {/* carpool */}
        <Route path="/carpool" element={<Carpool />} />
        <Route path="/carpool/detail/:id" element={<CarpoolDetail />} />
        <Route path="/carpool/create" element={<CarpoolCreate />} />
        <Route path="/carpool/edit/:id" element={<CarpoolEdit />} />

        {/* mypage */}
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/account-info" element={<AccountInfo />} />
      </Route>
    </Routes>
  )
}
