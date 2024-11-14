import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button, InputGroup, ModalWithOneButton, SubHeaderWithoutIcon } from '@/components/view'
import { useBoolean } from '@/hooks'

export const ReserveCreate = () => {
  const formMethod = useForm()
  const navigate = useNavigate()
  const { handleSubmit, reset } = formMethod

  const [modalState, openModal, closeModal] = useBoolean(false)

  const handleClickCancle = () => {
    reset()
    navigate(-1)
  }

  const handleSubmitInfo = () => {
    // 폼 제출
    openModal()
  }

  const handleClickCloseModal = () => {
    reset()
    closeModal()
    navigate(-1)
  }

  return (
    <div className="flex-column h-svh">
      <SubHeaderWithoutIcon type="null" onClickCancle={handleClickCancle} />
      <h4 className="mx-4 mb-[65px] mt-6 font-bold text-grey-7">예약 정보 입력</h4>

      <FormProvider {...formMethod}>
        <form className="flex-column scroll mx-4 mb-2 grow gap-7">
          <InputGroup>
            <InputGroup.Label section="name">이름</InputGroup.Label>
            <InputGroup.Input section="name" placeholder="이름을 입력해주세요." />
          </InputGroup>

          <InputGroup>
            <InputGroup.Label section="id">학번</InputGroup.Label>
            <InputGroup.Input section="id" type="number" placeholder="학번을 입력해주세요." />
          </InputGroup>

          <InputGroup>
            <InputGroup.Label section="phoneNumber">연락처</InputGroup.Label>
            <InputGroup.Input
              section="phoneNumber"
              type="number"
              placeholder="-를 제외한 숫자만 입력해주세요."
            />
          </InputGroup>
        </form>
      </FormProvider>

      <Button size="lg" classname="mt-2 mb-10 mx-4" onClick={handleSubmit(handleSubmitInfo)}>
        예약하기
      </Button>

      <ModalWithOneButton
        isOpen={modalState}
        closeModal={closeModal}
        content="성공적으로 예약되었습니다."
        buttonLabel="완료"
        onClick={handleClickCloseModal}
      />
    </div>
  )
}
