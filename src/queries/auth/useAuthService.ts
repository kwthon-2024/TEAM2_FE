import { useMutation } from '@tanstack/react-query'

import { login, signup, validateId, validateNickname } from './authApi'

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (res) => console.log(res),
  })
}

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
