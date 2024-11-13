import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

const sortOfArmy = ['육군', '공군', '해군', '해병대', '기타']

type SortOfArmyProps = {
  section: string
  disabled?: boolean
}

export const SortOfArmy = ({ section, disabled = false }: SortOfArmyProps) => {
  const [selectedSort, setSelectedSort] = useState('')
  const { setValue } = useFormContext()

  const handleClickButton = (sort: string) => {
    setSelectedSort(sort)
    setValue(section, sort)
  }

  return (
    <div className="flex-between gap-2">
      {sortOfArmy.map((sort, index) => {
        const buttonStyle =
          selectedSort === sortOfArmy[index]
            ? 'bg-blue-5 border-none text-grey-1'
            : 'bg-white border-blue-3 text-grey-7'
        return (
          <button
            key={sort}
            type="button"
            disabled={disabled}
            className={`p-medium h-[52px] grow rounded-xl border px-3 ${buttonStyle}`}
            onClick={() => handleClickButton(sort)}
          >
            {sort}
          </button>
        )
      })}
    </div>
  )
}
