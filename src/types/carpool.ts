import type { KEBAB_LIST } from '@/utils'

type CarpoolType = {
  carpoolBoardId: number
  title: string
  createdAt: string
  trainingDate: string
  departPlace: string
  departTime: string
  full: boolean
}

type AuthorType = {
  userId: string
  nickname: string
  dischargeYear: number
  militaryChaplain: string
}

type CarpoolSearchType = {
  category: keyof typeof KEBAB_LIST
  keyword: string
}

type CarpoolDetailType = {
  personnel: number
  price: number
  content: string
}

export type CarpoolFormType = Pick<CarpoolType, 'title' | 'trainingDate' | 'departPlace'> &
  CarpoolDetailType & { hour: number; minute: number }

export type CarpoolResponse = {
  result: CarpoolType[]
}

export type CarpoolSearchRequest = {
  urls: CarpoolSearchType
}
export type CarpoolSearchResponse = CarpoolResponse

export type CarpoolDetailRequest = {
  urls: Pick<CarpoolType, 'carpoolBoardId'>
}
export type CarpoolDetailResponse = CarpoolType &
  CarpoolDetailType & {
    author: AuthorType
  }

export type CarpoolCreateRequest = {
  body: Pick<CarpoolType, 'title' | 'trainingDate' | 'departPlace'> & CarpoolDetailType
}
export type CarpoolCreateResponse = Pick<CarpoolType, 'carpoolBoardId'>

export type CarpoolEditPageRequest = {
  urls: Pick<CarpoolType, 'carpoolBoardId'>
}

export type CarpoolEditRequest = {
  body: Omit<CarpoolDetailType, 'createdAt'>
  urls: Pick<CarpoolType, 'carpoolBoardId'>
}
export type CarpoolEditResponse = Omit<CarpoolType, 'createdAt' | 'full'> & CarpoolDetailType

export type CarpoolDeleteRequest = {
  urls: Pick<CarpoolType, 'carpoolBoardId'>
}

export type CarpoolIsFullRequest = {
  body: Pick<CarpoolType, 'full'>
  urls: Pick<CarpoolType, 'carpoolBoardId'>
}
