import type { KEBAB_LIST } from '@/utils'

type TeammateType = {
  teamBoardId: number
  title: string
  createdAt: string
  trainingDate: string
  meetingPlace: string
  meetingTime: string
  full: boolean
}

type AuthorType = {
  userId: string
  nickname: string
  dischargeYear: number
  militaryChaplain: string
}

type TeammateSearchType = {
  category: keyof typeof KEBAB_LIST
  keyword: string
}

type TeammateDetailType = {
  personnel: number
  content: string
}

export type TeammateFormType = Pick<TeammateType, 'title' | 'trainingDate' | 'meetingPlace'> &
  TeammateDetailType & { hour: number; minute: number }

export type TeammateResponse = {
  result: TeammateType[]
}

export type TeammateSearchRequest = {
  urls: TeammateSearchType
}
export type TeammateSearchResponse = {
  result: TeammateType[]
}

export type TeammateRecruitResponse = {
  result: TeammateType[]
}

export type TeammateDetailRequest = {
  urls: Pick<TeammateType, 'teamBoardId'>
}
export type TeammateDetailResponse = TeammateType &
  TeammateDetailType & {
    author: AuthorType
  }

export type TeammateCreateRequest = {
  body: Pick<TeammateType, 'title' | 'trainingDate' | 'meetingPlace'> & TeammateDetailType
}
export type TeammateCreateResponse = Pick<TeammateType, 'teamBoardId'>

export type TeammateEditPageRequest = {
  urls: Pick<TeammateType, 'teamBoardId'>
}

export type TeammateEditRequest = {
  body: Omit<TeammateDetailType, 'createdAt'>
  urls: Pick<TeammateType, 'teamBoardId'>
}
export type TeammateEditResponse = Omit<TeammateType, 'createdAt' | 'full'> & TeammateDetailType

export type TeammateDeleteRequest = {
  urls: Pick<TeammateType, 'teamBoardId'>
}

export type TeammateIsFullRequest = {
  body: Pick<TeammateType, 'full'>
  urls: Pick<TeammateType, 'teamBoardId'>
}
