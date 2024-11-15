type CarpoolChattingRoomType = {
  chatRoomId: string
  authorId: string
  participantId: string
  opponentNickname: string
  carpoolBoardTitle: string
  lastMessage: string
  lastMessageDaysAgo: number
  read: boolean
  carpoolBoardId: string
}

export type CarpoolChattingListResponse = Omit<CarpoolChattingRoomType, 'carpoolBoardId'>[]

export type CarpoolChattingIdRequest = {
  urls: Pick<CarpoolChattingRoomType, 'carpoolBoardId'>
}
export type CarpoolChattingIdResponse = Omit<CarpoolChattingRoomType, 'carpoolBoardId'>

export type CarpoolExitChattingRoomRequest = {
  urls: Pick<CarpoolChattingRoomType, 'chatRoomId'>
}
