import type { PropsWithChildren } from 'react'

import type { SizeType } from '@/types'

type ButtonType = 'submit' | 'reset' | 'button' | undefined

type ButtonProps = {
  size: SizeType
  type?: ButtonType
  disabled?: boolean
  secondary?: boolean
  classname?: string
  onClick?: VoidFunction
}

const sizeMap = {
  lg: {
    padding: 'px-5 py-4',
    font: 'p-medium font-bold',
  },
  md: {
    padding: 'px-4 py-[15px]',
    font: 'p-small font-bold',
  },
  sm: {
    padding: 'px-3 py-[14px]',
    font: 'p-xsmall font-bold',
  },
} as const

export const Button = ({
  size,
  classname,
  disabled = false,
  onClick,
  type = 'button',
  secondary = false,
  children,
}: PropsWithChildren<ButtonProps>) => {
  const bgStyle = disabled || secondary ? 'bg-grey-2 text-grey-5' : 'bg-blue-5 text-grey-1'
  const buttonStyle = `${sizeMap[size].padding} ${sizeMap[size].font} ${bgStyle} ${classname}`

  return (
    <button
      type={type}
      className={`w-auto shrink-0 rounded-xl text-grey-1 ${buttonStyle}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
