import type {
  TeammateCreateRequest,
  TeammateCreateResponse,
  TeammateDeleteRequest,
  TeammateDetailRequest,
  TeammateEditPageRequest,
  TeammateEditRequest,
  TeammateEditResponse,
  TeammateIsFullRequest,
  TeammateResponse,
  TeammateSearchRequest,
} from '@/types'

import { api } from '..'

export const teammatePage = async () => {
  return await api.get<TeammateResponse>(`/view/teammate`)
}

export const teammateSearch = async ({ urls }: TeammateSearchRequest) => {
  return await api.get<TeammateResponse>(
    `/view/teammate?category=${urls.category}&keyword=${urls.keyword}`,
  )
}

export const teammateDetail = async ({ urls }: TeammateDetailRequest) => {
  return await api.get<TeammateResponse>(`/view/teammate/${urls.teamBoardId}`)
}

export const teammateCreate = async ({ body }: TeammateCreateRequest) => {
  return await api.post<TeammateCreateResponse>(`/teammate`, body)
}

export const teammateEditPage = async ({ urls }: TeammateEditPageRequest) => {
  return await api.get<TeammateEditResponse>(`/teammate/edit/${urls.teamBoardId}`)
}

export const teammateEdit = async ({ body, urls }: TeammateEditRequest) => {
  return await api.put(`/teammate/${urls.teamBoardId}`, body)
}

export const teammateDelete = async ({ urls }: TeammateDeleteRequest) => {
  return await api.delete(`/teammate/${urls.teamBoardId}`)
}

export const teammateCheckFull = async ({ body, urls }: TeammateIsFullRequest) => {
  return await api.put(`/teammate/check/${urls.teamBoardId}`, body)
}
