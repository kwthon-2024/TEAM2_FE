import type {
  CarpoolChattingIdRequest,
  CarpoolChattingIdResponse,
  CarpoolChattingListResponse,
  CarpoolExitChattingRoomRequest,
  TeammateChattingIdRequest,
  TeammateChattingIdResponse,
  TeammateChattingListResponse,
  TeammateExitChattingRoomRequest,
} from '@/types'

import { api } from '..'

export const carpoolChattingRoomList = async () => {
  return await api.get<CarpoolChattingListResponse>(`/carpool/chat/room/list`)
}

export const carpoolChattingId = async ({ urls }: CarpoolChattingIdRequest) => {
  return await api.post<CarpoolChattingIdResponse>(
    `/carpool/chat/room/create/${urls.carpoolBoardId}`,
  )
}

export const carpoolExitChattingRoom = async ({ urls }: CarpoolExitChattingRoomRequest) => {
  return await api.delete(`/carpool/chat/room/list/${urls.chatRoomId}`)
}

export const teammateChattingRoomList = async () => {
  return await api.get<TeammateChattingListResponse>(`/team/chat/room/list`)
}

export const teammateChattingId = async ({ urls }: TeammateChattingIdRequest) => {
  return await api.post<TeammateChattingIdResponse>(`/team/chat/room/create/${urls.teamBoardId}`)
}

export const teammateExitChattingRoom = async ({ urls }: TeammateExitChattingRoomRequest) => {
  return await api.delete(`/team/chat/room/list/${urls.chatRoomId}`)
}
