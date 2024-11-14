import { useQuery } from '@tanstack/react-query'

import { mypageInfo } from './mypageApi'

const queryKeys = {
  all: ['mypage'] as const,
}

export const useMypage = () => {
  return useQuery({
    queryKey: queryKeys.all,
    queryFn: mypageInfo,
  })
}
