import { useMutation } from '@tanstack/react-query'

import { signup, validateId, validateNickname } from './authApi'

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  })
}

export const useValidateId = () => {
  return useMutation({
    mutationFn: validateId,
  })
}

export const useValidateNickname = () => {
  return useMutation({
    mutationFn: validateNickname,
    onSuccess: (message) => message,
    onError: (message) => message,
  })
}
