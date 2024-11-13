import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button, InputGroup, LabelWithStep, SubHeaderWithIcon } from '@/components/view'
import { useStepsActions, useTotalStep } from '@/stores'
import type { StepProps } from '@/types'

export const SignupTwoStep = ({ label }: StepProps) => {
  const navigate = useNavigate()
  const { trigger } = useFormContext()

  const totalStep = useTotalStep()
  const { goNextStep, goPreviousStep } = useStepsActions()

  const handleClickCloseButton = () => {
    navigate('/login')
    // 폼 초기화
  }

  const handleClickNextButton = async () => {
    const isValid = await trigger(['nickname', 'dischargeYear', 'militaryChaplain'])
    if (isValid) goNextStep()
  }

  return (
    <>
      <SubHeaderWithIcon
        type="close"
        onClickCancle={goPreviousStep}
        onClickClose={handleClickCloseButton}
      />

      <LabelWithStep currentStep={2} totalStep={totalStep}>
        {label}
      </LabelWithStep>

      <div className="flex-column scroll mx-4 mb-2 mt-[65px] grow gap-7">
        <InputGroup>
          <InputGroup.Label section="nickname">닉네임</InputGroup.Label>
          <div className="flex gap-4">
            <InputGroup.Input section="nickname" placeholder="최소 2글자, 최대 8글자" />
            <Button size="md" onClick={() => {}}>
              중복 확인
            </Button>
          </div>
        </InputGroup>

        <InputGroup>
          <InputGroup.Label section="dischargeYear">전역연도</InputGroup.Label>
          <InputGroup.Input section="dischargeYear" type="number" placeholder="숫자 4자리" />
        </InputGroup>

        <InputGroup>
          <InputGroup.Label section="militaryChaplain">복무했던 군종</InputGroup.Label>
          <InputGroup.SortOfArmy section="militaryChaplain" />
        </InputGroup>
      </div>

      <Button size="lg" onClick={handleClickNextButton} classname="mt-2 mb-10 mx-4">
        다음으로
      </Button>
    </>
  )
}
