import { useNavigate } from 'react-router-dom'

import {
  BottomNav,
  CheckBoxIcon,
  MainHeader,
  PostAdditionButton,
  PostItem,
  SearchWithFilter,
} from '@/components/view'
import { useToggle } from '@/hooks'
import { useTeammatePage, useTeammateRecruitPage } from '@/queries'
import type { KebabMapType } from '@/types'
import { getSessionStorageItem, SESSION_LOGIN_KEY } from '@/utils'

const kebabMap: KebabMapType = [
  {
    label: '제목',
    type: 'text',
    placeholder: '제목을 입력해주세요.',
  },
  {
    label: '훈련 날짜',
    type: 'number',
    placeholder: 'ex) 20240521',
  },
]

export const Teammate = () => {
  const navigate = useNavigate()
  const loginSession = getSessionStorageItem(SESSION_LOGIN_KEY)

  const [isChecked, toggleIsChecked] = useToggle()
  const {
    data: teammateData,
    isPending: isTeammatePending,
    isError: isTeammateError,
  } = useTeammatePage()

  const {
    data: teammateRecruitData,
    isPending: isTeammateRecruitPending,
    isError: isTeammateRecruitError,
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
      <SearchWithFilter kebabMap={kebabMap} onClickSearchButton={() => {}} />

      <div className="border-b border-b-grey-2">
        <button
          type="button"
          className="flex-align mx-4 ml-auto gap-1 py-3"
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
                key={teamBoardId}
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
