import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  ArrowBottomIcon,
  Kebab,
  PostItem,
  SearchIcon,
  SubHeaderWithoutIcon,
} from '@/components/view'
import { useToggle } from '@/hooks'
import { useCarpoolSearchPage } from '@/queries'
import type { FilterNameType, KebabMapType } from '@/types'
import { KEBAB_LIST } from '@/utils'

const kebabMap: KebabMapType = [
  {
    label: '제목',
    type: 'text',
    placeholder: '제목을 입력해주세요.',
  },
  {
    label: '출발 장소',
    type: 'text',
    placeholder: '출발 장소를 입력해주세요.',
  },
]

export const CarpoolSearch = () => {
  const formMethod = useForm({ defaultValues: { search: '' } })
  const { handleSubmit, watch, register } = formMethod
  const watchField = watch('search')

  const [isShow, toggleIsShow] = useToggle(false)
  const [filterName, setFilterName] = useState<FilterNameType>('제목')

  const placeholder = kebabMap.find((item) => item.label === filterName)?.placeholder || undefined

  const kebabList = kebabMap.map((item) => ({
    ...item,
    onClick: () => {
      setFilterName(item.label)
      toggleIsShow()
    },
  }))

  const { data: searchData, refetch } = useCarpoolSearchPage({
    urls: {
      category: Object.keys(KEBAB_LIST).find(
        (key) => KEBAB_LIST[key as keyof typeof KEBAB_LIST] === filterName,
      ) as keyof typeof KEBAB_LIST,
      keyword: watchField,
    },
  })

  return (
    <div className="flex-column h-full">
      <SubHeaderWithoutIcon type="null" title="검색" />

      <section className="p-medium flex-align mx-4 mt-2 gap-2 rounded-lg border border-grey-2 py-[10px] pl-4 pr-[10px] font-regular">
        <button type="button" className="flex-align shrink-0 gap-1" onClick={toggleIsShow}>
          <p className="p-small text-grey-6">{filterName}</p>
          <ArrowBottomIcon />
        </button>

        <input
          type="text"
          {...register('search')}
          size={7}
          className="focus: flex-1 text-grey-7 outline-none placeholder:text-grey-4"
          placeholder={placeholder ? placeholder : '검색어를 입력해주세요.'}
        />
        <button type="button" onClick={handleSubmit(() => refetch())}>
          <SearchIcon />
        </button>
      </section>
      {isShow && <Kebab list={kebabList} location="left-4 top-[125px]" />}

      <section className="scroll grow">
        {searchData &&
          searchData.result.map(
            ({ carpoolBoardId, title, createdAt, trainingDate, departPlace, departTime, full }) => (
              <PostItem
                key={carpoolBoardId}
                title={title}
                createdAt={createdAt}
                trainingDate={trainingDate}
                place={departPlace}
                time={departTime}
                isFull={full}
                to={`/carpool/detail/${carpoolBoardId}`}
              />
            ),
          )}
      </section>
    </div>
  )
}
