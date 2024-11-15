import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  carpoolChattingId,
  carpoolChattingRoomList,
  carpoolExitChattingRoom,
  teammateChattingId,
  teammateChattingRoomList,
  teammateExitChattingRoom,
} from './chattingApi'

const queryKeys = {
  all: ['chatting'] as const,
  carpoolList: () => [...queryKeys.all, 'carpool', 'chatting-list'] as const,
  teammateList: () => [...queryKeys.all, 'teammate', 'chatting-list'] as const,
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
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: carpoolExitChattingRoom,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.all }),
  })
}

export const useTeammateChattingRoomList = () => {
  return useQuery({
    queryKey: queryKeys.teammateList(),
    queryFn: teammateChattingRoomList,
    gcTime: 0,
    staleTime: 0,
    select: (res) => {
      return { result: res }
    },
  })
}

export const useTeammateChattingId = () => {
  return useMutation({
    mutationFn: teammateChattingId,
  })
}

export const useTeammateExitChattingRoom = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: teammateExitChattingRoom,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.all }),
  })
}
