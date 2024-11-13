import type { PropsWithChildren } from 'react'

type LabelWithStepProps = {
  currentStep: number
  totalStep: number
}

export const LabelWithStep = ({
  currentStep,
  totalStep,
  children,
}: PropsWithChildren<LabelWithStepProps>) => {
  return (
    <div className="flex-between mx-4 mt-6 items-end">
      <h4 className="font-bold text-grey-7">{children}</h4>
      <p className="p-small font-medium text-blue-4">
        {currentStep} / {totalStep}
      </p>
    </div>
  )
}
