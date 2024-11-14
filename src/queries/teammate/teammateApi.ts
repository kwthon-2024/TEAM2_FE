import type {
  TeammateCreateRequest,
  TeammateCreateResponse,
  TeammateDeleteRequest,
  TeammateDetailRequest,
  TeammateDetailResponse,
  TeammateEditPageRequest,
  TeammateEditRequest,
  TeammateEditResponse,
  TeammateIsFullRequest,
  TeammateResponse,
  TeammateSearchRequest,
} from '@/types'

import { api } from '..'

export const teammatePage = async () => {
  return await api.get<TeammateResponse>(`/view/team`)
}

export const teammateSearch = async ({ urls }: TeammateSearchRequest) => {
  return await api.get<TeammateResponse>(
    `/view/team?category=${urls.category}&keyword=${urls.keyword}`,
  )
}

export const teammateDetail = async ({ urls }: TeammateDetailRequest) => {
  return await api.get<TeammateDetailResponse>(`/view/team/${urls.teamBoardId}`)
}

export const teammateCreate = async ({ body }: TeammateCreateRequest) => {
  return await api.post<TeammateCreateResponse>(`/team`, body)
}

export const teammateEditPage = async ({ urls }: TeammateEditPageRequest) => {
  return await api.get<TeammateEditResponse>(`/team/edit/${urls.teamBoardId}`)
}

export const teammateEdit = async ({ body, urls }: TeammateEditRequest) => {
  return await api.put(`/team/${urls.teamBoardId}`, body)
}

export const teammateDelete = async ({ urls }: TeammateDeleteRequest) => {
  return await api.delete(`/team/${urls.teamBoardId}`)
}

export const teammateCheckFull = async ({ body, urls }: TeammateIsFullRequest) => {
  return await api.put(`/team/check/${urls.teamBoardId}`, body)
}
