import { useMutation, useQuery } from '@tanstack/react-query'

import { carpoolChattingId, carpoolChattingRoomList } from './chattingApi'

const queryKeys = {
  all: ['chatting'] as const,
  carpoolList: () => [...queryKeys.all, 'carpool', 'chatting-list'] as const,
}

export const useCarpoolChattingRoomList = () => {
  return useQuery({
    queryKey: queryKeys.carpoolList(),
    queryFn: carpoolChattingRoomList,
    gcTime: 0,
    staleTime: 0,
    select: (res) => {
      return { result: res }
    },
  })
}

export const useCarpoolChattingId = () => {
  return useMutation({
    mutationFn: carpoolChattingId,
  })
}

export const useCarpoolExitChattingRoom = () => {
  return useMutation({
    mutationFn: carpoolChattingId,
  })
}
