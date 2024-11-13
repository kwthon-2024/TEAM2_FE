import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { MILITARY_BRANCHES } from '@/utils'

type SortOfArmyProps = {
  section: string
  disabled?: boolean
}

export const SortOfArmy = ({ section, disabled = false }: SortOfArmyProps) => {
  const [selectedSort, setSelectedSort] = useState('')
  const { setValue } = useFormContext()

  const handleClickButton = (sort: keyof typeof MILITARY_BRANCHES) => {
    setSelectedSort(sort)
    setValue(section, MILITARY_BRANCHES[sort])
  }

  return (
    <div className="flex-between gap-2">
      {Object.keys(MILITARY_BRANCHES).map((sort) => {
        const typedSort = sort as keyof typeof MILITARY_BRANCHES
        const buttonStyle =
          selectedSort === typedSort
            ? 'bg-blue-5 border-none text-grey-1'
            : 'bg-white border-blue-3 text-grey-7'
        return (
          <button
            key={typedSort}
            type="button"
            disabled={disabled}
            className={`p-medium h-[52px] grow rounded-xl border px-3 ${buttonStyle}`}
            onClick={() => handleClickButton(typedSort)}
          >
            {sort}
          </button>
        )
      })}
    </div>
  )
}
