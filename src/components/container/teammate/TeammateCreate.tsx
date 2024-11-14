import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import { InputGroup, SubHeaderWithoutIcon } from '@/components/view'
import { useTeammateCreateForm } from '@/hooks'
import { useTeammateCreate } from '@/queries'
import type { TeammateFormType } from '@/types'

export const TeammateCreate = () => {
  const navigate = useNavigate()
  const formMethod = useTeammateCreateForm()
  const {
    handleSubmit,
    formState: { errors },
  } = formMethod
  const { mutate: teammateMutation } = useTeammateCreate()

  const handleSubmitForm = (formData: TeammateFormType) => {
    const { hour, minute, trainingDate, ...rest } = formData
    const sendingFormData = {
      trainingDate: dayjs(trainingDate, 'YYYYMMDD').format('YYYY-MM-DD'),
      meetingTime: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      ...rest,
    }

    teammateMutation(
      { body: sendingFormData },
      {
        onSuccess: ({ teamBoardId }) =>
          navigate(`/teammate/detail/${teamBoardId}`, { replace: true }),
      },
    )
  }

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <div className="flex-column h-svh">
      <FormProvider {...formMethod}>
        <SubHeaderWithoutIcon
          type="complete"
          title="팀원 모집 등록"
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
            <InputGroup.Label section="meetingPlace">만날 장소</InputGroup.Label>
            <InputGroup.Input section="meetingPlace" placeholder="출발 장소를 입력해주세요." />
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
            <InputGroup.Label section="content">메모</InputGroup.Label>
            <InputGroup.TextArea section="content" placeholder="원하시는 메모 내용을 적어주세요." />
          </InputGroup>
        </form>
      </FormProvider>
    </div>
  )
}
