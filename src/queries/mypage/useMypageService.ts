import { useQuery } from '@tanstack/react-query'

import { mypageAccount, mypageInfo } from './mypageApi'

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
