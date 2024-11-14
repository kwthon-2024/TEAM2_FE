import { FormProvider, useForm } from 'react-hook-form'

import { InputGroup, SubHeaderWithoutIcon } from '@/components/view'

export const TeammateEdit = () => {
  const formMethod = useForm()
  const { handleSubmit } = formMethod
  const handleSubmitForm = () => {}

  return (
    <div className="flex-column h-svh">
      <FormProvider {...formMethod}>
        <SubHeaderWithoutIcon type="complete" title="팀원 모집 등록" />
        <form
          className="flex-column scroll mb-4 mt-5 gap-5 px-4"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
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
            <InputGroup.Label section="memo">메모</InputGroup.Label>
            <InputGroup.TextArea section="memo" placeholder="원하시는 메모 내용을 적어주세요." />
          </InputGroup>
        </form>
      </FormProvider>
    </div>
  )
}
