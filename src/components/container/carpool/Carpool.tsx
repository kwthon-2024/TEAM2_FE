import { useNavigate } from 'react-router-dom'

import {
  BottomNav,
  MainHeader,
  PostAdditionButton,
  PostItem,
  RecruitmentLabel,
  SearchWithFilter,
} from '@/components/view'
import { useCarpoolPage } from '@/queries'
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
  {
    label: '출발 장소',
    type: 'text',
    placeholder: '출발 장소를 입력해주세요.',
  },
]

export const Carpool = () => {
  const navigate = useNavigate()
  const loginSession = getSessionStorageItem(SESSION_LOGIN_KEY)

  const { data: carpoolData, isPending, isError } = useCarpoolPage()

  const handleClickAdditionButton = () => {
    navigate('/carpool/create')
  }

  if (isPending || isError) return <div>loading</div>

  return (
    <div className="flex-column h-full">
      <MainHeader />

      <SearchWithFilter kebabMap={kebabMap} onClickSearchButton={() => {}} />
      <RecruitmentLabel onClick={() => {}} />

      <div className="scroll grow">
        {carpoolData.result.map(
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
      </div>

      {loginSession && <PostAdditionButton onClick={handleClickAdditionButton} />}
      <BottomNav />
    </div>
  )
}
