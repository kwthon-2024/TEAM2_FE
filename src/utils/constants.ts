export const SESSION_LOGIN_KEY = 'login' as const
export const SESSION_NICKNAME = 'user_nickname' as const
export const SESSION_MILITARY_CHPLAIN = 'user_chplain' as const
export const SESSION_ROOM_TYPE = 'room_type' as const

export const TAB_LIST = ['승차 공유', '팀원 모집'] as const
export const TAB_LIST_EN = ['carpool', 'team']

export const NOTICE_ARR = [
  '예비군 버스 대절 추첨 인원 선정',
  '예비군 버스 대절 추첨 인원 선정',
  '예비군 버스 대절 추첨 인원 선정',
  '예비군 버스 대절 추첨 인원 선정',
] as const

export const MILITARY_BRANCHES = {
  육군: 'ARMY',
  해군: 'NAVY',
  해병대: 'MARINE',
  공군: 'AIRFORCE',
  기타: 'ETC',
} as const

export const KEBAB_LIST = {
  title: '제목',
  trainingDate: '훈련 날짜',
  departPlace: '출발 장소',
} as const
