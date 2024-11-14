type UserType = {
  nickname: string
  dischargeYear: number
  militaryChaplain: string
}

type PasswordType = {
  password: string
  newPassword: string
}

type CarpoolBoardType = {
  carpoolBoardId: number
  title: string
  createdAt: string
  trainingDate: string
  departPlace: string
  departTime: string
  full: boolean
}

type TeammateBoardType = {
  teamBoardId: number
  title: string
  createdAt: string
  trainingDate: string
  meetingPlace: string
  meetingTime: string
  isFull: boolean
}

export type AccountFormType = UserType
export type NewPasswordFormType = PasswordType & { confirm: string }

export type MypageInfoResponse = Pick<UserType, 'nickname' | 'dischargeYear'>

export type MypageAccountResponse = UserType

export type MypageAccountEditRequest = {
  body: UserType
}

export type MypagePasswordRequest = {
  body: PasswordType
}

export type MypageCarpoolResponse = {
  body: {
    result: CarpoolBoardType[]
  }
}

export type MypageTeammateResponse = {
  body: {
    result: TeammateBoardType[]
  }
}
