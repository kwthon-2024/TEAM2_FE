type ChattingRoomType = {
  chatRoomId: string
  authorId: string
  participantId: string
  opponentNickname: string
  lastMessage: string
  lastMessageDaysAgo: number
  read: boolean
}

type CarpoolChattingRoomType = ChattingRoomType & {
  carpoolBoardTitle: string
  carpoolBoardId: string
}

type TeammateChattingRoomType = ChattingRoomType & {
  teamBoardTitle: string
  teamBoardId: string
}

export type CarpoolChattingListResponse = Omit<CarpoolChattingRoomType, 'carpoolBoardId'>[]

export type CarpoolChattingIdRequest = {
  urls: Pick<CarpoolChattingRoomType, 'carpoolBoardId'>
}
export type CarpoolChattingIdResponse = Omit<CarpoolChattingRoomType, 'carpoolBoardId'>

export type CarpoolExitChattingRoomRequest = {
  urls: Pick<CarpoolChattingRoomType, 'chatRoomId'>
}

export type TeammateChattingListResponse = Omit<TeammateChattingRoomType, 'teamBoardId'>[]

export type TeammateChattingIdRequest = {
  urls: Pick<TeammateChattingRoomType, 'teamBoardId'>
}
export type TeammateChattingIdResponse = Omit<TeammateChattingRoomType, 'teamBoardId'>

export type TeammateExitChattingRoomRequest = {
  urls: Pick<TeammateChattingRoomType, 'chatRoomId'>
}
