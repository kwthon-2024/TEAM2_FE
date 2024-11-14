import { FormProvider } from 'react-hook-form'

import { Button, InputGroup, ModalWithOneButton, SubHeaderWithoutIcon } from '@/components/view'
import { useAccountForm, useBoolean } from '@/hooks'
import { useMypageAccountEdit } from '@/queries'
import type { AccountFormType } from '@/types'
import { SESSION_MILITARY_CHPLAIN, SESSION_NICKNAME, setSessionStorageItem } from '@/utils'

export const AccountInfo = () => {
  const formMethod = useAccountForm()
  const { getValues, handleSubmit } = formMethod
  const { mutate: accountMutation } = useMypageAccountEdit()

  const [isEditMode, setIsEditModeTrue, setIsEditModeFalse] = useBoolean(false)
  const [modalState, openModal, closeModal] = useBoolean(false)

  const currentMode = isEditMode ? 'complete' : 'edit'

  console.log(getValues('dischargeYear'), typeof getValues('dischargeYear'))

  const handleClickComplete = (formData: AccountFormType) => {
    // 폼 제출
    accountMutation(
      { body: formData },
      {
        onSuccess: () => {
          setSessionStorageItem(SESSION_MILITARY_CHPLAIN, formData.militaryChaplain)
          setSessionStorageItem(SESSION_NICKNAME, formData.nickname)
          openModal()
          setIsEditModeFalse()
        },
      },
    )
  }

  return (
    <>
      <FormProvider {...formMethod}>
        <SubHeaderWithoutIcon
          type={currentMode}
          title="계정 정보"
          onClickEdit={setIsEditModeTrue}
          onClickComplete={handleSubmit(handleClickComplete)}
        />

        <form className="flex-column scroll mx-4 mb-2 mt-7 grow gap-7">
          <InputGroup>
            <InputGroup.Label section="nickname">닉네임</InputGroup.Label>
            <div className="flex gap-4">
              <InputGroup.Input
                section="nickname"
                readOnly={!isEditMode}
                placeholder="최소 2글자, 최대 8글자"
              />
              {isEditMode && (
                <Button size="md" onClick={() => {}}>
                  중복 확인
                </Button>
              )}
            </div>
          </InputGroup>

          <InputGroup>
            <InputGroup.Label section="dischargeYear">전역연도</InputGroup.Label>
            <InputGroup.Input
              section="dischargeYear"
              type="number"
              readOnly={!isEditMode}
              placeholder="숫자 4자리"
            />
          </InputGroup>

          <InputGroup>
            <InputGroup.Label section="militaryChaplain">복무했던 군종</InputGroup.Label>
            <InputGroup.SortOfArmy section="militaryChaplain" disabled={!isEditMode} />
          </InputGroup>
        </form>
      </FormProvider>

      <ModalWithOneButton
        isOpen={modalState}
        closeModal={closeModal}
        content="계정 정보가 수정되었습니다."
        buttonLabel="완료"
        onClick={closeModal}
      />
    </>
  )
}
