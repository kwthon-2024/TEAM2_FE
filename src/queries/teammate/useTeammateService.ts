import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { TeammateDetailRequest, TeammateSearchRequest } from '@/types/teammate'

import {
  teammateCheckFull,
  teammateCreate,
  teammateDelete,
  teammateDetail,
  teammateEdit,
  teammatePage,
  teammateRecruit,
  teammateSearch,
} from './teammateApi'

const queryKeys = {
  all: ['carpool'] as const,
  search: (urls: TeammateSearchRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
  detail: (urls: TeammateDetailRequest['urls']) =>
    [...queryKeys.all, ...Object.values(urls)] as const,
  recruit: () => [...queryKeys.all, 'recruit'] as const,
}

export const useTeammatePage = () => {
  return useQuery({
    queryKey: queryKeys.all,
    queryFn: teammatePage,
    gcTime: 0,
    staleTime: 0,
  })
}

export const useTeammateRecruitPage = () => {
  return useQuery({
    queryKey: queryKeys.recruit(),
    queryFn: teammateRecruit,
    gcTime: 0,
    staleTime: 0,
    enabled: false,
  })
}

export const useTeammateSearchPage = (request: TeammateSearchRequest) => {
  return useQuery({
    queryKey: queryKeys.search(request.urls),
    queryFn: () => teammateSearch(request),
  })
}

export const useTeammateDetailPage = (request: TeammateDetailRequest) => {
  return useQuery({
    queryKey: queryKeys.detail(request.urls),
    queryFn: () => teammateDetail(request),
  })
}

export const useTeammateCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: teammateCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useTeammateEdit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: teammateEdit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useTeammateDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: teammateDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}

export const useTeammateCheckFull = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: teammateCheckFull,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
