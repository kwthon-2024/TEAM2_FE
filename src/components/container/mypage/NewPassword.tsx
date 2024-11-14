import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import type { AxiosError } from 'axios'

import { InputGroup, ModalWithOneButton, SubHeaderWithoutIcon } from '@/components/view'
import { useBoolean, useNewPasswordForm } from '@/hooks'
import { useMypageNewPassword } from '@/queries'
import type { NewPasswordFormType } from '@/types'

export const NewPassword = () => {
  const formMethod = useNewPasswordForm()
  const { handleSubmit } = formMethod

  const [modalState, openModal, closeModal] = useBoolean(false)
  const [modalText, setModalText] = useState('')
  const { mutate: newPasswordMutation } = useMypageNewPassword()

  const handleClickComplete = (formData: NewPasswordFormType) => {
    newPasswordMutation(
      { body: { password: formData.password, newPassword: formData.newPassword } },
      {
        onSuccess: (res) => {
          setModalText(res)
          openModal()
        },
        onError: (error) => {
          const errorMessage =
            ((error as AxiosError).response?.data as string) === '기존 비밀번호가 일치하지 않습니다'
              ? '기존 비밀번호가 일치하지 않습니다.'
              : '네트워크 오류가 발생했습니다.'
          setModalText(errorMessage)
          openModal()
        },
      },
    )
  }

  return (
    <>
      <FormProvider {...formMethod}>
        <SubHeaderWithoutIcon
          type="complete"
          title="비밀번호 재설정"
          onClickComplete={handleSubmit(handleClickComplete)}
        />

        <form className="flex-column scroll mx-4 mb-2 mt-7 grow gap-7">
          <InputGroup>
            <InputGroup.Label section="password">기존 비밀번호</InputGroup.Label>
            <InputGroup.Input
              section="password"
              type="password"
              placeholder="기존 비밀번호를 입력해주세요."
            />
          </InputGroup>

          <InputGroup>
            <InputGroup.Label section="newPassword">새로운 비밀번호</InputGroup.Label>
            <InputGroup.Input
              section="newPassword"
              type="password"
              placeholder="최소 8글자, 최대 16글자"
            />
          </InputGroup>

          <InputGroup>
            <InputGroup.Label section="confirm">새로운 비밀번호 확인</InputGroup.Label>
            <InputGroup.Input
              section="confirm"
              type="password"
              placeholder="최소 8글자, 최대 16글자"
            />
          </InputGroup>
        </form>
      </FormProvider>

      <ModalWithOneButton
        isOpen={modalState}
        closeModal={closeModal}
        content={modalText}
        buttonLabel="완료"
        onClick={closeModal}
      />
    </>
  )
}
