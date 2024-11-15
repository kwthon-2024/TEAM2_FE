import { Route, Routes } from 'react-router-dom'

import {
  AccountInfo,
  Bookmark,
  BusReserve,
  Carpool,
  CarpoolCreate,
  CarpoolDetail,
  CarpoolEdit,
  CarpoolSearch,
  Chatting,
  ChattingRoom,
  Home,
  LoginPage,
  Mypage,
  MyPost,
  NewPassword,
  Onboarding,
  ReserveCreate,
  ReserveInfo,
  SignupCompletePage,
  SignupPage,
  Teammate,
  TeammateCreate,
  TeammateDetail,
  TeammateEdit,
  TeammateSearch,
} from '@/components/container'

import { LoginPrivateRoute, PrivateRoute } from './PrivateRouter'

export const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/home" element={<Home />} />

      <Route path="/carpool" element={<Carpool />} />
      <Route path="/carpool/detail/:id" element={<CarpoolDetail />} />

      <Route path="/teammate" element={<Teammate />} />
      <Route path="/teammate/detail/:id" element={<TeammateDetail />} />

      <Route path="/bus-reserve" element={<BusReserve />} />
      <Route path="/bus-reserve/create" element={<ReserveCreate />} />
      <Route path="/bus-reserve/info" element={<ReserveInfo />} />

      <Route element={<LoginPrivateRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-up/complete" element={<SignupCompletePage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/carpool/create" element={<CarpoolCreate />} />
        <Route path="/carpool/edit/:id" element={<CarpoolEdit />} />
        <Route path="/carpool/search" element={<CarpoolSearch />} />

        <Route path="/teammate/create" element={<TeammateCreate />} />
        <Route path="/teammate/edit/:id" element={<TeammateEdit />} />
        <Route path="/teammate/search" element={<TeammateSearch />} />

        <Route path="/chatting" element={<Chatting />} />
        <Route path="/chatting/chatting-room/:id" element={<ChattingRoom />} />

        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/account-info" element={<AccountInfo />} />
        <Route path="/mypage/password" element={<NewPassword />} />
        <Route path="/mypage/myboard" element={<MyPost />} />
        <Route path="/mypage/bookmark" element={<Bookmark />} />
      </Route>
    </Routes>
  )
}
