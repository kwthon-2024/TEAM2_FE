import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { mypageAccount } from '@/queries'
import type { AccountFormType, CarpoolFormType, LoginFormType, SignupFormType } from '@/types'
import { accountSchema, carpoolSchema, loginSchema, signupSchema } from '@/utils'

export const useLoginForm = () => {
  const formMethod = useForm<LoginFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  })

  return formMethod
}

export const useSignupForm = () => {
  const formMethod = useForm<SignupFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(signupSchema),
  })

  return formMethod
}

export const useAccountForm = () => {
  const getDefaultValues = async () => {
    const { nickname, dischargeYear, militaryChaplain } = await mypageAccount()
    return { nickname, dischargeYear, militaryChaplain }
  }

  const formMethod = useForm<AccountFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(accountSchema),
    defaultValues: getDefaultValues,
  })

  return formMethod
}

export const useCarpoolCreateForm = () => {
  const formMethod = useForm<CarpoolFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(carpoolSchema),
  })

  return formMethod
}
