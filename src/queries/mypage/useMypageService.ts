import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { mypageAccount, mypageAccountEdit, mypageInfo } from './mypageApi'

const queryKeys = {
  all: ['mypage'] as const,
  account: () => [...queryKeys.all, 'account'] as const,
}

export const useMypage = () => {
  return useQuery({
    queryKey: queryKeys.all,
    queryFn: mypageInfo,
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
