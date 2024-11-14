import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'

import { carpoolEditPage, mypageAccount } from '@/queries'
import type {
  AccountFormType,
  CarpoolEditPageRequest,
  CarpoolFormType,
  LoginFormType,
  SignupFormType,
  TeammateFormType,
} from '@/types'
import { accountSchema, carpoolSchema, loginSchema, signupSchema, teammateSchema } from '@/utils'

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

export const useCarpoolEditForm = (request: CarpoolEditPageRequest) => {
  const getDefaultValues = async () => {
    const { departTime, trainingDate, ...rest } = await carpoolEditPage(request)
    const hour = parseInt(departTime.split(':')[0], 10)
    const minute = parseInt(departTime.split(':')[1], 10)
    const date = dayjs(trainingDate).format('YYYYMMDD')

    return { hour, minute, trainingDate: date, ...rest }
  }

  const formMethod = useForm<CarpoolFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(carpoolSchema),
    defaultValues: getDefaultValues,
  })

  return formMethod
}

export const useTeammateCreateForm = () => {
  const formMethod = useForm<TeammateFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(teammateSchema),
  })

  return formMethod
}
