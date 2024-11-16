import axios from 'axios'

import type {
  LoginRequest,
  SignupRequest,
  ValidateIdRequest,
  ValidateNicknameRequest,
} from '@/types'
import { getSessionStorageItem, SESSION_REFRESH } from '@/utils'

const BASE_URL = import.meta.env.VITE_PUBLIC_SERVER_DOMAIN

export const login = async ({ body }: LoginRequest) => {
  return await axios.post(`${BASE_URL}/login`, body, {
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
  return await axios.post(`${BASE_URL}/reissue`, undefined, {
    headers: {
      refresh: getSessionStorageItem(SESSION_REFRESH),
    },
  })
}
