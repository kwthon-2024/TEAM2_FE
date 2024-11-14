import { useMutation, useQuery } from '@tanstack/react-query'

import type { BusReserveInfoReqeust } from '@/types'

import { busReserve, busReserveInfo } from './busApi'

const queryKeys = {
  all: ['bus'] as const,
  reserveInfo: (urls: BusReserveInfoReqeust['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
}

export const useBusReserveInfo = (request: BusReserveInfoReqeust) => {
  return useQuery({
    queryKey: queryKeys.reserveInfo(request.urls),
    queryFn: () => busReserveInfo(request),
  })
}

export const useBuseReserve = () => {
  return useMutation({
    mutationFn: busReserve,
  })
}
