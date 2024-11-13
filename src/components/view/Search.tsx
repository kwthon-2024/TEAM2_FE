import { useState } from 'react'

import { useToggle } from '@/hooks'
import type { FilterNameType, KebabMapType } from '@/types'

import { ArrowBottomIcon, SearchIcon } from './icons/NonActiveIcons'
import { Kebab } from './Kebab'

type SearchProps = {
  placeholder?: string
  onClickSearchButton: VoidFunction
}

type SearchWithFilterProps = SearchProps & {
  kebabMap: KebabMapType
  onClickSearchButton: VoidFunction
}

export const Search = ({ placeholder, onClickSearchButton }: SearchProps) => {
  return (
    <div className="p-medium flex-align mx-4 gap-2 rounded-lg border border-grey-2 py-[10px] pl-4 pr-[10px] font-regular shadow-sm">
      <input
        className="focus: flex-1 text-grey-7 outline-none placeholder:text-grey-4"
        placeholder={placeholder ? placeholder : '검색어를 입력해주세요.'}
      />
      <button type="button" onClick={onClickSearchButton}>
        <SearchIcon />
      </button>
    </div>
  )
}

export const SearchWithFilter = ({ kebabMap, onClickSearchButton }: SearchWithFilterProps) => {
  const [isShow, toggleIsShow] = useToggle(false)
  const [filterName, setFilterName] = useState<FilterNameType>('제목')

  const placeholder = kebabMap.find((item) => item.label === filterName)?.placeholder || undefined
  const searchType = kebabMap.find((item) => item.label === filterName)?.type || 'text'

  const kebabList = kebabMap.map((item) => ({
    ...item,
    onClick: () => {
      setFilterName(item.label)
      toggleIsShow()
    },
  }))

  return (
    <>
      <div className="p-medium flex-align mx-4 gap-2 rounded-lg border border-grey-2 py-[10px] pl-4 pr-[10px] font-regular">
        <button type="button" className="flex-align gap-1" onClick={toggleIsShow}>
          <p className="p-small text-grey-6">{filterName}</p>
          <ArrowBottomIcon />
        </button>

        <input
          type={searchType}
          className="focus: flex-1 text-grey-7 outline-none placeholder:text-grey-4"
          placeholder={placeholder ? placeholder : '검색어를 입력해주세요.'}
        />
        <button type="button" onClick={onClickSearchButton}>
          <SearchIcon />
        </button>
      </div>
      {isShow && <Kebab list={kebabList} location="left-4 top-[125px]" />}
    </>
  )
}
