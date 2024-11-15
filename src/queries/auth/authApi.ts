import axios from 'axios'

import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  ValidateIdRequest,
  ValidateNicknameRequest,
} from '@/types'

const BASE_URL = import.meta.env.VITE_PUBLIC_SERVER_DOMAIN

export const login = async ({ body }: LoginRequest) => {
  return await axios.post<LoginResponse>(`${BASE_URL}/login`, body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

export const signup = async ({ body }: SignupRequest) => {
  return await axios.post(`${BASE_URL}/signup`, body)
}

export const validateId = async ({ body }: ValidateIdRequest) => {
  return await axios.post(`${BASE_URL}/validate-id`, body)
}

export const validateNickname = async ({ body }: ValidateNicknameRequest) => {
  return await axios.post(`${BASE_URL}/validate-nickname`, body)
}

export const reIssue = async () => {
  return await axios.post(`${BASE_URL}/reissue`)
}
