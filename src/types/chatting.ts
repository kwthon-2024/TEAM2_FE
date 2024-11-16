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

export type MessegeType = {
  senderName: string
  content: string
  createdAt: string
}

type ChattingType = {
  opponentNickname: string
  yearsSinceDischarge: number
  militaryChaplain: string
  previousMessages: MessegeType[]
}

export type CarpoolChattingListResponse = {
  result: (Omit<CarpoolChattingRoomType, 'carpoolBoardId'> &
    Pick<ChattingType, 'militaryChaplain'>)[]
}

export type CarpoolChattingIdRequest = {
  urls: Pick<CarpoolChattingRoomType, 'carpoolBoardId'>
}
export type CarpoolChattingIdResponse = Omit<CarpoolChattingRoomType, 'carpoolBoardId'>

export type CarpoolExitChattingRoomRequest = {
  urls: Pick<CarpoolChattingRoomType, 'chatRoomId'>
}

export type CarpoolChattingRoomRequest = {
  urls: Pick<ChattingRoomType, 'chatRoomId'>
}
export type CarpoolChattingRoomResponse = ChattingType &
  Pick<CarpoolChattingRoomType, 'carpoolBoardTitle'>

export type TeammateChattingListResponse = {
  result: (Omit<TeammateChattingRoomType, 'teamBoardId'> & Pick<ChattingType, 'militaryChaplain'>)[]
}

export type TeammateChattingIdRequest = {
  urls: Pick<TeammateChattingRoomType, 'teamBoardId'>
}
export type TeammateChattingIdResponse = Omit<TeammateChattingRoomType, 'teamBoardId'>

export type TeammateExitChattingRoomRequest = {
  urls: Pick<TeammateChattingRoomType, 'chatRoomId'>
}

export type TeammateChattingRoomRequest = {
  urls: Pick<ChattingRoomType, 'chatRoomId'>
}
export type TeammateChattingRoomResponse = ChattingType &
  Pick<TeammateChattingRoomType, 'teamBoardTitle'>

export type SendingMessageRequset = {
  chatRoomId: string
  content: string
  senderId: string
}
