import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button, InputGroup, SubHeaderWithoutIcon } from '@/components/view'
import { useBusReserveInfoForm } from '@/hooks'
import { useBusReserveInfo } from '@/queries'

const stateObj = {
  '신청 완료': 'text-blue-5',
  '정보 없음': 'text-red-2',
  '조회 전': 'text-grey-5',
} as const

type StateType = keyof typeof stateObj

export const ReserveInfo = () => {
  const formMethod = useBusReserveInfoForm()
  const navigate = useNavigate()
  const { handleSubmit, reset, watch } = formMethod

  const [state, setState] = useState<StateType>('조회 전')
  const studentId = watch('studentId')
  const { refetch } = useBusReserveInfo({ urls: { studentId } })

  const handleClickCloseButton = () => {
    reset()
    navigate(-1)
  }
  const handleSubmitInfo = async () => {
    const { data, isSuccess, isError } = await refetch()
    if (isSuccess) setState(data.reserved ? '신청 완료' : '정보 없음')
    if (isError) setState('정보 없음')
  }

  return (
    <>
      <SubHeaderWithoutIcon type="null" onClickCancle={handleClickCloseButton} />
      <div className="mx-4">
        <h4 className="mb-[65px] mt-6 font-bold text-grey-7">예약 내역 조회</h4>

        <FormProvider {...formMethod}>
          <form onSubmit={handleSubmit(handleSubmitInfo)}>
            <InputGroup>
              <InputGroup.Label section="studentId">학번</InputGroup.Label>
              <div className="flex gap-4">
                <InputGroup.Input section="studentId" placeholder="학번을 입력해주세요." />
                <Button size="md" type="submit">
                  조회하기
                </Button>
              </div>
            </InputGroup>
          </form>
        </FormProvider>

        <div className="mt-5 grid grid-cols-2 border-y border-y-grey-2 text-center">
          <p className="px-4 py-[10px] text-grey-7">신청 여부</p>
          <p className={`px-4 py-[10px] font-medium ${stateObj[state]}`}>{state}</p>
        </div>

        <div className="flex-column mt-5">
          <p className="p-xsmall text-grey-5">개인 정보 보호를 위해 신청 여부만 확인 가능합니다.</p>
          <p className="p-xsmall text-grey-5">
            기타 문의사항이 있다면 공지사항의 연락수단을 확인해주세요.
          </p>
        </div>
      </div>
    </>
  )
}
