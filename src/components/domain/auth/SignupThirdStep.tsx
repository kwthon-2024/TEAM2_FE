import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import {
  AllCheckIcon,
  Button,
  CheckIcon,
  LabelWithStep,
  SubHeaderWithIcon,
} from '@/components/view'
import { useStepsActions, useTotalStep } from '@/stores'
import type { StepProps } from '@/types'

type AgreementStatusType = {
  personalConsent: boolean
  serviceConsent: boolean
}

const agreementTexts = {
  personalConsent: '(필수) 개인정보 이용 약관 동의',
  serviceConsent: '(필수) 서비스 이용 약관 동의',
} as const

export const SignupThirdStep = ({ label }: StepProps) => {
  const navigate = useNavigate()
  const totalStep = useTotalStep()

  const { reset } = useFormContext()
  const { goPreviousStep } = useStepsActions()

  const [agreementStatus, setAgreementStatus] = useState<AgreementStatusType>({
    personalConsent: false,
    serviceConsent: false,
  })
  const isAllAgreed = Object.values(agreementStatus).every((isAgreed) => isAgreed)

  const toggleAgreement = (type: keyof AgreementStatusType) => {
    setAgreementStatus((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const toggleAllAgreements = () => {
    const newStatus = !isAllAgreed
    setAgreementStatus({
      personalConsent: newStatus,
      serviceConsent: newStatus,
    })
  }

  const handleClickCloseButton = () => {
    navigate('/login')
    reset()
  }

  return (
    <>
      <SubHeaderWithIcon
        type="close"
        onClickCancle={goPreviousStep}
        onClickClose={handleClickCloseButton}
      />

      <LabelWithStep currentStep={3} totalStep={totalStep}>
        {label}
      </LabelWithStep>

      <div className="flex-column scroll mx-4 mb-2 mt-[65px] grow gap-7">
        <button type="button" onClick={toggleAllAgreements} className="flex-align gap-2">
          <AllCheckIcon active={isAllAgreed} />
          <h4 className={`font-bold ${isAllAgreed ? 'text-blue-5' : 'text-grey-5'}`}>
            모두 동의합니다.
          </h4>
        </button>

        <div className="flex-column gap-6">
          {Object.keys(agreementStatus).map((type) => {
            const isAgreed = agreementStatus[type as keyof AgreementStatusType]
            const textStyle = isAgreed ? 'text-blue-5 font-bold' : 'text-grey-5 font-medium'

            return (
              <div key={type} className="flex-align">
                <button
                  type="button"
                  className="flex-align gap-2"
                  onClick={() => toggleAgreement(type as keyof AgreementStatusType)}
                >
                  <CheckIcon active={isAgreed} />
                  <p className={`p-large ${textStyle}`}>
                    {agreementTexts[type as keyof AgreementStatusType]}
                  </p>
                </button>

                <button
                  type="button"
                  className="p-small ml-auto border-b border-b-grey-4 text-grey-4"
                >
                  보기
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <Button size="lg" type="submit" disabled={!isAllAgreed} classname="mt-2 mb-10 mx-4">
        회원가입 완료
      </Button>
    </>
  )
}
