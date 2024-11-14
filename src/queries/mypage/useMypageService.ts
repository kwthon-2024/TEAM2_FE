import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  mypageAccount,
  mypageAccountEdit,
  mypageCarpool,
  mypageExit,
  mypageInfo,
  mypageLogout,
  mypagePassword,
  mypageTeammate,
} from './mypageApi'

const queryKeys = {
  all: ['mypage'] as const,
  account: () => [...queryKeys.all, 'account'] as const,
  myCarpoolPost: () => [...queryKeys.all, 'carpool'] as const,
  myTeammatePost: () => [...queryKeys.all, 'teammate'] as const,
}

export const useMypage = () => {
  return useQuery({
    queryKey: queryKeys.all,
    queryFn: mypageInfo,
  })
}

export const useMyCarpoolPost = () => {
  return useQuery({
    queryKey: queryKeys.myCarpoolPost(),
    queryFn: mypageCarpool,
    gcTime: 0,
    staleTime: 0,
  })
}

export const useMyTeammatePost = () => {
  return useQuery({
    queryKey: queryKeys.myTeammatePost(),
    queryFn: mypageTeammate,
    gcTime: 0,
    staleTime: 0,
  })
}

export const useMypageAccount = () => {
  return useQuery({
    queryKey: queryKeys.account(),
    queryFn: mypageAccount,
  })
}

export const useMypageAccountEdit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: mypageAccountEdit,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.all }),
  })
}

export const useMypageNewPassword = () => {
  return useMutation({
    mutationFn: mypagePassword,
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: mypageLogout,
  })
}

export const useExitUser = () => {
  return useMutation({
    mutationFn: mypageExit,
  })
}
