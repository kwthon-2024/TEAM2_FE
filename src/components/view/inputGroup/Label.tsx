import type { PropsWithChildren } from 'react'
import { useFormContext } from 'react-hook-form'

type LabelProps = {
  section: string
}

export const Label = ({ section, children }: PropsWithChildren<LabelProps>) => {
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex-align gap-3">
      <p className="p-large font-medium text-grey-7">{children}</p>
      {errors && errors[section] && errors[section].message && (
        <p className="p-xsmall text-red-2">* {errors[section].message.toString()}</p>
      )}
    </div>
  )
}
