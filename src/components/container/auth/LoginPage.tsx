import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Button, InputGroup } from '@/components/view'
import { useLoginForm } from '@/hooks'
import { useLogin } from '@/queries'
import { instance } from '@/queries/service'
import type { LoginFormType } from '@/types'
import {
  SESSION_LOGIN_KEY,
  SESSION_MILITARY_CHPLAIN,
  SESSION_NICKNAME,
  setSessionStorageItem,
} from '@/utils'

export const LoginPage = () => {
  const navigate = useNavigate()
  const formMethod = useLoginForm()

  const { handleSubmit } = formMethod
  const { mutate: loginMutation } = useLogin()

  const [isLoginFailed, setIsLoginFailed] = useState<boolean>(false)

  const handleSubmitLoginForm = (formData: LoginFormType) => {
    loginMutation(
      { body: { userId: formData.userId, password: formData.password } },
      {
        onSuccess: ({ headers, data: { militaryChaplain, nickname } }) => {
          instance.defaults.headers.common['Authorization'] = headers.authorization
          setIsLoginFailed(false)
          setSessionStorageItem(SESSION_LOGIN_KEY, 'true')
          setSessionStorageItem(SESSION_NICKNAME, nickname)
          setSessionStorageItem(SESSION_MILITARY_CHPLAIN, militaryChaplain)
          navigate('/home', { replace: true })
        },
        onError: () => setIsLoginFailed(true),
      },
    )
  }

  return (
    <div className="flex-column">
      <h1 className="mt-[20svh] text-center font-jalnan text-6xl leading-[44px] text-blue-6">
        BROOM
      </h1>

      <FormProvider {...formMethod}>
        <form
          className="flex-column mx-4 mt-[15svh] gap-[22px]"
          onSubmit={handleSubmit(handleSubmitLoginForm)}
        >
          <InputGroup>
            <InputGroup.Label section="userId">아이디</InputGroup.Label>
            <InputGroup.Input section="userId" placeholder="아이디를 입력해주세요." />
          </InputGroup>

          <InputGroup>
            <InputGroup.Label section="password">비밀번호</InputGroup.Label>
            <InputGroup.Input
              section="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
            />
          </InputGroup>

          <Button size="lg" type="submit">
            로그인
          </Button>
        </form>
      </FormProvider>

      <div
        className={`mx-4 mt-[22px] ${isLoginFailed ? 'flex-between-align' : 'flex justify-end'}`}
      >
        {isLoginFailed && (
          <p className="p-xsmall text-red-2">* 아이디 또는 비밀번호가 일치하지 않습니다.</p>
        )}
        <Link to={'/sign-up'} className=" inline-block border-b border-b-grey-5 pb-1 text-grey-5">
          회원가입
        </Link>
      </div>
    </div>
  )
}
