import type { BusReserveInfoReqeust, BusReserveInfoResponse, BusReserveReqeust } from '@/types'

import { api } from '..'

export const busReserveInfo = async ({ urls }: BusReserveInfoReqeust) => {
  return await api.get<BusReserveInfoResponse>(`/bus/reservation/${urls.studentId}`)
}

export const busReserve = async ({ body }: BusReserveReqeust) => {
  return await api.post(`/bus/reservation`, body)
}
