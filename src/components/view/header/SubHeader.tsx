import type { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowLeftIcon, CloseIcon, KebabIcon } from '../icons/NonActiveIcons'

type SubHeaderProps = {
  title?: string
  type: 'close' | 'edit' | 'complete' | 'null' | 'kebab'
  onClickCancle?: VoidFunction
  onClickClose?: VoidFunction
  onClickKebab?: VoidFunction
  onClickEdit?: VoidFunction
  onClickComplete?: VoidFunction
}
type SubHeaderWithIconType = Omit<SubHeaderProps, 'onClickEdit' | 'onClickComplete'>
type SubHeaderWithoutIconType = Omit<SubHeaderProps, 'onClickClose' | 'onClickKebab'>

const BaseHeader = ({ title, onClickCancle, children }: PropsWithChildren<SubHeaderProps>) => {
  const navigate = useNavigate()
  const handleClickCancle = onClickCancle ? onClickCancle : () => navigate(-1)

  return (
    <div className="flex-between-align relative p-4">
      <button type="button" onClick={handleClickCancle}>
        <ArrowLeftIcon />
      </button>

      <h6 className="absolute left-1/2 w-fit -translate-x-1/2 text-center font-bold text-blue-6">
        {title}
      </h6>

      {children}
    </div>
  )
}

export const SubHeaderWithIcon = ({
  title,
  type,
  onClickCancle,
  onClickClose,
  onClickKebab,
}: SubHeaderWithIconType) => {
  const isCloseType = type === 'close'
  const handleIconClick = isCloseType ? onClickClose : onClickKebab

  return (
    <BaseHeader title={title} type={type} onClickCancle={onClickCancle}>
      <button type="button" onClick={handleIconClick}>
        {isCloseType ? <CloseIcon /> : <KebabIcon />}
      </button>
    </BaseHeader>
  )
}

export const SubHeaderWithoutIcon = ({
  title,
  type,
  onClickCancle,
  onClickEdit,
  onClickComplete,
}: SubHeaderWithoutIconType) => {
  const isEditMode = type === 'edit'
  const isNullType = type === 'null'
  const handleClickButton = isEditMode ? onClickEdit : onClickComplete

  return (
    <BaseHeader title={title} type={type} onClickCancle={onClickCancle}>
      {isNullType ? (
        <span className="w-6" />
      ) : (
        <button type="button" onClick={handleClickButton}>
          <p className="p-medium pr-[2px] font-medium text-grey-4">
            {isEditMode ? '수정' : '완료'}
          </p>
        </button>
      )}
    </BaseHeader>
  )
}
