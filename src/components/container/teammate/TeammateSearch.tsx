import { useForm } from 'react-hook-form'

import { PostItem, SearchIcon, SubHeaderWithoutIcon } from '@/components/view'
import { useTeammateSearchPage } from '@/queries'

export const TeammateSearch = () => {
  const formMethod = useForm({ defaultValues: { search: '' } })
  const { handleSubmit, watch, register } = formMethod
  const watchField = watch('search')

  const { data: searchData, refetch } = useTeammateSearchPage({
    urls: { category: 'title', keyword: watchField },
  })

  return (
    <div className="flex-column h-full">
      <SubHeaderWithoutIcon type="null" title="검색" />

      <section className="p-medium flex-align mx-4 mt-2 gap-2 rounded-lg border border-grey-2 py-[10px] pl-4 pr-[10px] font-regular">
        <p className="p-small pr-1 text-grey-6">제목</p>

        <input
          type="text"
          {...register('search')}
          className="focus: flex-1 text-grey-7 outline-none placeholder:text-grey-4"
          placeholder="제목을 입력해주세요."
        />
        <button type="button" onClick={handleSubmit(() => refetch())}>
          <SearchIcon />
        </button>
      </section>

      <section className="scroll grow">
        {searchData &&
          searchData.result.map(
            ({ teamBoardId, title, createdAt, trainingDate, meetingPlace, meetingTime, full }) => (
              <PostItem
                key={teamBoardId}
                title={title}
                createdAt={createdAt}
                trainingDate={trainingDate}
                place={meetingPlace}
                time={meetingTime}
                isFull={full}
                to={`/carpool/detail/${teamBoardId}`}
              />
            ),
          )}
      </section>
    </div>
  )
}
