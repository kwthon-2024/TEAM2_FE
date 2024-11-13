import type { ValidateIdRequest, ValidateNicknameRequest } from '@/types'

import { instanceWithoutAuth } from '../service'

export const validateId = async ({ body }: ValidateIdRequest) => {
  return await instanceWithoutAuth.post(`/validate-id`, body)
}

export const validateNickname = async ({ body }: ValidateNicknameRequest) => {
  return await instanceWithoutAuth.post(`/validate-nickname`, body)
}
