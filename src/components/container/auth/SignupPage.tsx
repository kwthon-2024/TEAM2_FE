import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'

import { SignupOneStep, SignupThirdStep, SignupTwoStep } from '@/components/domain'
import { useSignupForm } from '@/hooks'
import { useCurrentStep, useStepsActions } from '@/stores'

const signupMap = {
  1: '계정 정보 기입',
  2: '회원 정보 기입',
  3: '약관 동의',
} as const

export const SignupPage = () => {
  const formMethod = useSignupForm()
  const currentStep = useCurrentStep()
  const { setCurrentStep, setTotalStep } = useStepsActions()

  useEffect(() => {
    setCurrentStep(1)
    setTotalStep(Object.keys(signupMap).length)
  }, [])

  const { handleSubmit } = formMethod

  const handleSubmitSignupForm = () => {}

  return (
    <FormProvider {...formMethod}>
      <form onSubmit={handleSubmit(handleSubmitSignupForm)} className="flex-column h-svh">
        {currentStep === 1 && <SignupOneStep label={signupMap[1]} />}
        {currentStep === 2 && <SignupTwoStep label={signupMap[2]} />}
        {currentStep === 3 && <SignupThirdStep label={signupMap[3]} />}
      </form>
    </FormProvider>
  )
}
