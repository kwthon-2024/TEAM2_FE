import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import { Button, InputGroup, SubHeaderWithoutIcon } from '@/components/view'
import { useCarpoolCreateForm } from '@/hooks'
import { useCarpoolCreate } from '@/queries'
import type { CarpoolFormType } from '@/types'

export const CarpoolCreate = () => {
  const navigate = useNavigate()
  const formMethod = useCarpoolCreateForm()
  const { handleSubmit, setValue } = formMethod
  const { mutate: carpoolMutation } = useCarpoolCreate()

  const handleSubmitForm = (formData: CarpoolFormType) => {
    const { hour, minute, trainingDate, ...rest } = formData
    const sendingFormData = {
      trainingDate: dayjs(trainingDate, 'YYYYMMDD').format('YYYY-MM-DD'),
      departTime: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      ...rest,
    }

    carpoolMutation(
      { body: sendingFormData },
      {
        onSuccess: ({ carpoolBoardId }) =>
          navigate(`/carpool/detail/${carpoolBoardId}`, { replace: true }),
      },
    )
  }

  return (
    <div className="flex-column h-svh">
      <FormProvider {...formMethod}>
        <SubHeaderWithoutIcon
          type="complete"
          title="카풀 모집 등록"
          onClickComplete={handleSubmit(handleSubmitForm)}
        />

        <form className="flex-column scroll mb-4 mt-5 gap-5 px-4">
          <InputGroup>
            <InputGroup.Label section="title">제목</InputGroup.Label>
            <InputGroup.Input section="title" placeholder="제목을 입력해주세요." />
          </InputGroup>

          <InputGroup>
            <InputGroup.Label section="trainingDate">훈련 날짜</InputGroup.Label>
            <InputGroup.Input section="trainingDate" type="number" placeholder="ex)20240521" />
          </InputGroup>

          <InputGroup>
            <InputGroup.Label section="departPlace">출발 장소</InputGroup.Label>
            <InputGroup.Input section="departPlace" placeholder="출발 장소를 입력해주세요." />
          </InputGroup>

          <div className="grid grid-cols-2 gap-5">
            <InputGroup>
              <InputGroup.Label section="personnel">모집 인원</InputGroup.Label>
              <InputGroup.UnitInput
                section="personnel"
                type="number"
                unitLabel="명"
                placeholder="0"
              />
            </InputGroup>

            <InputGroup>
              <InputGroup.Label section="hour">시간</InputGroup.Label>
              <InputGroup.TimeInput hourSection="hour" minuteSection="minute" />
            </InputGroup>
          </div>

          <InputGroup>
            <InputGroup.Label section="price">금액</InputGroup.Label>
            <div className="flex gap-5">
              <InputGroup.UnitInput section="price" unitLabel="원" isPrice placeholder="0" />
              <Button size="md" onClick={() => setValue('price', 0)}>
                무료로 설정
              </Button>
            </div>
          </InputGroup>

          <InputGroup>
            <InputGroup.Label section="content">메모</InputGroup.Label>
            <InputGroup.TextArea section="content" placeholder="원하시는 메모 내용을 적어주세요." />
          </InputGroup>
        </form>
      </FormProvider>
    </div>
  )
}
