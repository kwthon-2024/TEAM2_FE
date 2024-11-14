import type {
  CarpoolCreateRequest,
  CarpoolCreateResponse,
  CarpoolDeleteRequest,
  CarpoolDetailRequest,
  CarpoolDetailResponse,
  CarpoolEditPageRequest,
  CarpoolEditRequest,
  CarpoolEditResponse,
  CarpoolIsFullRequest,
  CarpoolRecruitResponse,
  CarpoolResponse,
  CarpoolSearchRequest,
} from '@/types'

import { api } from '..'

export const carpoolPage = async () => {
  return await api.get<CarpoolResponse>(`/view/carpool`)
}

export const carpoolRecruit = async () => {
  return await api.get<CarpoolRecruitResponse>(`/view/carpool/recruiting`)
}

export const carpoolSearch = async ({ urls }: CarpoolSearchRequest) => {
  return await api.get<CarpoolResponse>(
    `/view/carpool?category=${urls.category}&keyword=${urls.keyword}`,
  )
}

export const carpoolDetail = async ({ urls }: CarpoolDetailRequest) => {
  return await api.get<CarpoolDetailResponse>(`/view/carpool/${urls.carpoolBoardId}`)
}

export const carpoolCreate = async ({ body }: CarpoolCreateRequest) => {
  return await api.post<CarpoolCreateResponse>(`/carpool`, body)
}

export const carpoolEditPage = async ({ urls }: CarpoolEditPageRequest) => {
  return await api.get<CarpoolEditResponse>(`/carpool/edit/${urls.carpoolBoardId}`)
}

export const carpoolEdit = async ({ body, urls }: CarpoolEditRequest) => {
  return await api.put(`/carpool/edit/${urls.carpoolBoardId}`, body)
}

export const carpoolDelete = async ({ urls }: CarpoolDeleteRequest) => {
  return await api.delete(`/carpool/${urls.carpoolBoardId}`)
}

export const carpoolCheckFull = async ({ body, urls }: CarpoolIsFullRequest) => {
  return await api.put(`/carpool/check/${urls.carpoolBoardId}`, body)
}
