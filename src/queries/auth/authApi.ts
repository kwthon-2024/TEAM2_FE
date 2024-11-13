import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  ValidateIdRequest,
  ValidateNicknameRequest,
} from '@/types'

import { instanceWithoutAuth } from '../service'

export const login = async ({ body }: LoginRequest) => {
  return await instanceWithoutAuth.post<LoginResponse>(`/login`, body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

export const signup = async ({ body }: SignupRequest) => {
  return await instanceWithoutAuth.post(`/signup`, body)
}

export const validateId = async ({ body }: ValidateIdRequest) => {
  return await instanceWithoutAuth.post(`/validate-id`, body)
}

export const validateNickname = async ({ body }: ValidateNicknameRequest) => {
  return await instanceWithoutAuth.post(`/validate-nickname`, body)
}
