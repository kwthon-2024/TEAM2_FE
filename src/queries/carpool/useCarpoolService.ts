import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { CarpoolDetailRequest, CarpoolSearchRequest } from '@/types/carpool'

import {
  carpoolCheckFull,
  carpoolCreate,
  carpoolDelete,
  carpoolDetail,
  carpoolEdit,
  carpoolPage,
  carpoolSearch,
} from './carpoolApi'

const queryKeys = {
  all: ['carpool'] as const,
  search: (urls: CarpoolSearchRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
  detail: (urls: CarpoolDetailRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
}

export const useCarpoolPage = () => {
  return useQuery({
    queryKey: queryKeys.all,
    queryFn: carpoolPage,
    gcTime: 0,
    staleTime: 0,
  })
}

export const useCarpoolSearchPage = (request: CarpoolSearchRequest) => {
  return useQuery({
    queryKey: queryKeys.search(request.urls),
    queryFn: () => carpoolSearch(request),
  })
}

export const useCarpoolDetailPage = (request: CarpoolDetailRequest) => {
  return useQuery({
    queryKey: queryKeys.detail(request.urls),
    queryFn: () => carpoolDetail(request),
  })
}

export const useCarpoolCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: carpoolCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useCarpoolEdit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: carpoolEdit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useCarpoolDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: carpoolDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useCarpoolCheckFull = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: carpoolCheckFull,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
