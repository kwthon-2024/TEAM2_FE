import { useNavigate } from 'react-router-dom'

import {
  BottomNav,
  MainHeader,
  PostAdditionButton,
  PostItem,
  RecruitmentLabel,
  SearchWithFilter,
} from '@/components/view'
import { useTeammatePage } from '@/queries'
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

  const { data: teammateData, isPending, isError } = useTeammatePage()

  const handleClickAdditionButton = () => {
    navigate('/teammate/create')
  }

  if (isPending || isError) return <div>loading</div>

  return (
    <div className="flex-column h-full">
      <MainHeader />
      <SearchWithFilter kebabMap={kebabMap} onClickSearchButton={() => {}} />
      <RecruitmentLabel onClick={() => {}} />

      <div className="scroll grow">
        {teammateData.result.map(
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
      </div>

      {loginSession && <PostAdditionButton onClick={handleClickAdditionButton} />}
      <BottomNav />
    </div>
  )
}
