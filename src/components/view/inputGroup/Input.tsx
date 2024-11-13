import type { ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'

import { useToggle } from '@/hooks'

import { EyeCloseIcon, EyeIcon } from '../icons/NonActiveIcons'

type InputProps = {
  type?: string
  section: string
  readOnly?: boolean
  placeholder?: string
}
type TimeInputProps = {
  hourSection: string
  minuteSection: string
  readOnly?: boolean
}
type UnitInputProps = InputProps & { unitLabel: string; isPrice?: boolean }
type TextAreaProps = Omit<InputProps, 'type'>

export const Input = ({ type = 'text', section, readOnly = false, placeholder }: InputProps) => {
  const { register } = useFormContext()
  const isIdField = type === 'id'
  const isPasswordField = type === 'password'
  const [isShow, setIsShow] = useToggle(false)

  return (
    <div className="flex-align p-medium w-full gap-3 rounded-lg border border-blue-3 px-4 py-[10px]">
      <input
        type={isPasswordField && isShow ? 'text' : type}
        {...register(section)}
        readOnly={readOnly}
        className="w-full py-1 placeholder:text-grey-5 focus:outline-none"
        placeholder={placeholder}
        autoComplete={isIdField ? 'username' : isPasswordField ? 'current-password' : 'off'}
      />
      {isPasswordField && !readOnly && (
        <button type="button" className="shrink-0" onClick={() => setIsShow()}>
          {isShow ? <EyeIcon /> : <EyeCloseIcon />}
        </button>
      )}
    </div>
  )
}

export const UnitInput = ({
  type = 'text',
  section,
  isPrice = false,
  readOnly = false,
  unitLabel,
  placeholder,
}: UnitInputProps) => {
  const { register, setValue } = useFormContext()

  const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
    let formattedValue = event.target.value.replace(/[^0-9]/g, '')
    if (formattedValue) formattedValue = parseInt(formattedValue, 10).toLocaleString('ko-KR')

    setValue(section, formattedValue)
  }

  return (
    <div className="flex-align p-medium w-full gap-3 rounded-lg border border-blue-3 px-4 py-[10px]">
      <input
        type={type}
        size={5}
        {...register(section, { onChange: isPrice ? handleCurrencyChange : undefined })}
        readOnly={readOnly}
        className="min-w-0 grow text-right placeholder:text-grey-5 focus:outline-none"
        placeholder={placeholder}
      />
      <p className="shrink-0 py-1 text-grey-7">{unitLabel}</p>
    </div>
  )
}

export const TimeInput = ({ readOnly = false, hourSection, minuteSection }: TimeInputProps) => {
  const { register, setValue } = useFormContext()

  const handleHourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value, 10)
    if (isNaN(value) || value < 0) value = 0
    else if (value > 23) value = 23
    setValue(hourSection, value)
  }

  const handleMinuteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value, 10)
    if (isNaN(value) || value < 0) value = 0
    else if (value > 59) value = 59
    setValue(minuteSection, value)
  }

  return (
    <div className="flex-align p-medium w-full gap-3 rounded-lg border border-blue-3 px-4 py-[10px]">
      <input
        type="number"
        {...register(hourSection, { onChange: handleHourChange })}
        readOnly={readOnly}
        size={2}
        className="w-full grow text-center placeholder:text-grey-5 focus:outline-none"
        placeholder="00"
      />
      <span className="shrink-0 py-1 text-grey-7">:</span>
      <input
        type="number"
        {...register(minuteSection, { onChange: handleMinuteChange })}
        readOnly={readOnly}
        size={2}
        className="w-full grow text-center placeholder:text-grey-5 focus:outline-none"
        placeholder="00"
      />
    </div>
  )
}

export const TextArea = ({ section, readOnly = false, placeholder }: TextAreaProps) => {
  const { register } = useFormContext()
  return (
    <textarea
      {...register(section)}
      readOnly={readOnly}
      className="p-medium h-[104px] resize-none rounded-lg border border-blue-3 px-4 py-[10px] placeholder:text-grey-5 focus:outline-none"
      placeholder={placeholder}
    />
  )
}
