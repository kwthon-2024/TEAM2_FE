import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { CarpoolChattingRoomRequest, TeammateChattingRoomRequest } from '@/types'

import {
  carpoolChattingId,
  carpoolChattingRoomInfo,
  carpoolChattingRoomList,
  carpoolExitChattingRoom,
  teammateChattingId,
  teammateChattingRoomInfo,
  teammateChattingRoomList,
  teammateExitChattingRoom,
} from './chattingApi'

const queryKeys = {
  all: ['chatting'] as const,
  carpoolList: () => [...queryKeys.all, 'carpool', 'chatting-list'] as const,
  carpoolRoom: (urls: CarpoolChattingRoomRequest['urls']) =>
    [...queryKeys.all, 'carpool', ...Object.values(urls)] as const,
  teammateList: () => [...queryKeys.all, 'teammate', 'chatting-list'] as const,
  teammateRoom: (urls: TeammateChattingRoomRequest['urls']) =>
    [...queryKeys.all, 'teammate', ...Object.values(urls)] as const,
}

export const useCarpoolChattingRoomList = () => {
  return useQuery({
    queryKey: queryKeys.carpoolList(),
    queryFn: carpoolChattingRoomList,
    gcTime: 0,
    staleTime: 0,
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

export const useCarpoolChattingRoom = (request: CarpoolChattingRoomRequest) => {
  return useQuery({
    queryKey: queryKeys.carpoolRoom(request.urls),
    queryFn: () => carpoolChattingRoomInfo(request),
  })
}

export const useTeammateChattingRoomList = () => {
  return useQuery({
    queryKey: queryKeys.teammateList(),
    queryFn: teammateChattingRoomList,
    gcTime: 0,
    staleTime: 0,
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

export const useTeammateChattingRoom = (request: TeammateChattingRoomRequest) => {
  return useQuery({
    queryKey: queryKeys.teammateRoom(request.urls),
    queryFn: () => teammateChattingRoomInfo(request),
  })
}
