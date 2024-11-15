import { Link, useNavigate } from 'react-router-dom'

import {
  BottomNav,
  CheckBoxIcon,
  MainHeader,
  PostAdditionButton,
  PostItem,
  SearchIcon,
} from '@/components/view'
import { useToggle } from '@/hooks'
import { useTeammatePage, useTeammateRecruitPage } from '@/queries'
import { getSessionStorageItem, SESSION_LOGIN_KEY } from '@/utils'

export const Teammate = () => {
  const navigate = useNavigate()
  const loginSession = getSessionStorageItem(SESSION_LOGIN_KEY)

  const [isChecked, toggleIsChecked] = useToggle()
  const {
    data: teammateData,
    // isPending: isTeammatePending,
    // isError: isTeammateError,
  } = useTeammatePage()

  const {
    data: teammateRecruitData,
    // isPending: isTeammateRecruitPending,
    // isError: isTeammateRecruitError,
    refetch,
  } = useTeammateRecruitPage()

  const textStyle = isChecked ? 'text-blue-5' : 'text-grey-5'

  const handleClickAdditionButton = () => {
    navigate('/teammate/create')
  }

  const handleClickRecruit = () => {
    refetch()
    toggleIsChecked()
  }

  const showingData = isChecked ? teammateRecruitData : teammateData

  return (
    <div className="flex-column h-full">
      <MainHeader />

      <Link to={'/teammate/search'}>
        <div className="p-medium flex-align mx-4 gap-2 rounded-lg border border-grey-2 py-[10px] pl-4 pr-[10px] font-regular">
          <p className="p-small shrink-0 pr-1 text-grey-6">제목</p>

          <input
            className="focus: flex-1 text-grey-7 outline-none placeholder:text-grey-4"
            size={7}
            placeholder="검색어를 입력해주세요."
          />
          <SearchIcon />
        </div>
      </Link>

      <div className="mx-4 border-b border-b-grey-2">
        <button
          type="button"
          className="flex-align ml-auto gap-1 py-3"
          onClick={handleClickRecruit}
        >
          <CheckBoxIcon active={isChecked} />
          <p className={`p-small ${textStyle}`}>모집 중인 글만 보기</p>
        </button>
      </div>

      <div className="scroll grow">
        {showingData &&
          showingData.result.map(
            ({ teamBoardId, title, createdAt, trainingDate, meetingPlace, meetingTime, full }) => (
              <PostItem
                key={`teammate-${teamBoardId}`}
                title={title}
                createdAt={createdAt}
                trainingDate={trainingDate}
                place={meetingPlace}
                time={meetingTime}
                isFull={full}
                to={`/teammate/detail/${teamBoardId}`}
              />
            ),
          )}
      </div>

      {loginSession && <PostAdditionButton onClick={handleClickAdditionButton} />}
      <BottomNav />
    </div>
  )
}
