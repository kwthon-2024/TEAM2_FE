import { FormProvider } from 'react-hook-form'

import { Button, InputGroup, ModalWithOneButton, SubHeaderWithoutIcon } from '@/components/view'
import { useAccountForm, useBoolean } from '@/hooks'

export const AccountInfo = () => {
  const formMethod = useAccountForm()
  const { handleSubmit } = formMethod

  const [isEditMode, setIsEditModeTrue, setIsEditModeFalse] = useBoolean(false)
  const [modalState, openModal, closeModal] = useBoolean(false)

  const currentMode = isEditMode ? 'complete' : 'edit'

  // const { data: accountData, isError, isPending } = useMypageAccount()

  // if (isPending || isError) return <div>loading</div>

  const handleClickComplete = () => {
    // 폼 제출
    openModal()
    setIsEditModeFalse()
  }

  const handleSubmitAccountInfo = () => {}

  return (
    <>
      <SubHeaderWithoutIcon
        type={currentMode}
        title="계정 정보"
        onClickEdit={setIsEditModeTrue}
        onClickComplete={handleClickComplete}
      />

      <FormProvider {...formMethod}>
        <form
          className="flex-column scroll mx-4 mb-2 mt-7 grow gap-7"
          onSubmit={handleSubmit(handleSubmitAccountInfo)}
        >
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
