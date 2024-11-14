import type {
  MypageAccountEditRequest,
  MypageAccountResponse,
  MypageCarpoolResponse,
  MypageInfoResponse,
  MypagePasswordRequest,
  MypageTeammateResponse,
} from '@/types'

import { api } from '..'

export const mypageInfo = async () => {
  return await api.get<MypageInfoResponse>(`/mypage`)
}

export const mypageAccount = async () => {
  return await api.get<MypageAccountResponse>(`/mypage/info`)
}

export const mypageCarpool = async () => {
  return await api.get<MypageCarpoolResponse>(`/mypage/carpool`)
}

export const mypageTeammate = async () => {
  return await api.get<MypageTeammateResponse>(`/mypage/team`)
}

export const mypageAccountEdit = async ({ body }: MypageAccountEditRequest) => {
  return await api.put(`/mypage/info`, body)
}

export const mypagePassword = async ({ body }: MypagePasswordRequest) => {
  return await api.post(`/mypage/password`, body)
}

export const mypageExit = async () => {
  return await api.post(`/mypage/exit`)
}

export const mypageLogout = async () => {
  return await api.post(`/mypage/logout`)
}
