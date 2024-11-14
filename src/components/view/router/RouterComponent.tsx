import { Route, Routes } from 'react-router-dom'

import {
  AccountInfo,
  BusReserve,
  Carpool,
  CarpoolCreate,
  CarpoolDetail,
  CarpoolEdit,
  Home,
  LoginPage,
  Mypage,
  NewPassword,
  ReserveCreate,
  ReserveInfo,
  SignupCompletePage,
  SignupPage,
  Teammate,
  TeammateCreate,
  TeammateDetail,
  TeammateEdit,
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

        {/* teammate */}
        <Route path="/teammate" element={<Teammate />} />
        <Route path="/teammate/detail/:id" element={<TeammateDetail />} />
        <Route path="/teammate/create" element={<TeammateCreate />} />
        <Route path="/teammate/edit/:id" element={<TeammateEdit />} />

        {/* mypage */}
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/account-info" element={<AccountInfo />} />
        <Route path="/mypage/password" element={<NewPassword />} />

        {/* bus */}
        <Route path="/bus-reserve" element={<BusReserve />} />
        <Route path="/bus-reserve/create" element={<ReserveCreate />} />
        <Route path="/bus-reserve/info" element={<ReserveInfo />} />
      </Route>
    </Routes>
  )
}
