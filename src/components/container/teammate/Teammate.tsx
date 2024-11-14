import { useNavigate } from 'react-router-dom'

import {
  BottomNav,
  MainHeader,
  PostAdditionButton,
  PostItem,
  RecruitmentLabel,
  SearchWithFilter,
} from '@/components/view'
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

  const handleClickAdditionButton = () => {
    navigate('/teammate/create')
  }

  return (
    <div className="flex-column h-full">
      <MainHeader />
      <SearchWithFilter kebabMap={kebabMap} onClickSearchButton={() => {}} />
      <RecruitmentLabel onClick={() => {}} />

      <div className="scroll">
        {[...Array(7)].map((_, index) => (
          <PostItem
            key={index}
            title="소프트 카풀 구해요"
            createdAt="12:43"
            trainingDate="05/21"
            place="종로3가 1번 출구"
            time="07:30"
            isFull={false}
            to={`/teammate/detail/${index}`}
          />
        ))}
      </div>

      {loginSession && <PostAdditionButton onClick={handleClickAdditionButton} />}
      <BottomNav />
    </div>
  )
}
