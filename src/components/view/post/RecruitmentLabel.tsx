import { useToggle } from '@/hooks'

import { CheckBoxIcon } from '../icons/ActiveIcons'

type RecruitmentLabelProps = {
  onClick: VoidFunction
}

export const RecruitmentLabel = ({ onClick }: RecruitmentLabelProps) => {
  const [isChecked, toggleIsChecked] = useToggle()
  const textStyle = isChecked ? 'text-blue-5' : 'text-grey-5'

  const handleClick = () => {
    onClick()
    toggleIsChecked()
  }

  return (
    <div className="border-b border-b-grey-2">
      <button type="button" className="flex-align mx-4 ml-auto gap-1 py-3" onClick={handleClick}>
        <CheckBoxIcon active={isChecked} />
        <p className={`p-small ${textStyle}`}>모집 중인 글만 보기</p>
      </button>
    </div>
  )
}
