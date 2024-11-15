import { Link, useNavigate } from 'react-router-dom'

import {
  BottomNav,
  CheckBoxIcon,
  MainHeader,
  PostAdditionButton,
  PostItem,
  SearchWithFilter,
} from '@/components/view'
import { useToggle } from '@/hooks'
import { useCarpoolPage, useCarpoolRecruitPage } from '@/queries'
import { getSessionStorageItem, SESSION_LOGIN_KEY } from '@/utils'

export const Carpool = () => {
  const navigate = useNavigate()
  const loginSession = getSessionStorageItem(SESSION_LOGIN_KEY)

  const [isChecked, toggleIsChecked] = useToggle()
  const {
    data: carpoolData,
    // isPending: isCarpoolPending,
    // isError: isCarpoolError,
  } = useCarpoolPage()

  const {
    data: carpoolRecruitData,
    // isPending: isCarpoolRecruitPending,
    // isError: isCarpoolRecruitError,
    refetch,
  } = useCarpoolRecruitPage()

  const textStyle = isChecked ? 'text-blue-5' : 'text-grey-5'

  const handleClickAdditionButton = () => {
    navigate('/carpool/create')
  }

  const handleClickRecruit = () => {
    refetch()
    toggleIsChecked()
  }

  const showingData = isChecked ? carpoolRecruitData : carpoolData

  return (
    <div className="flex-column h-full">
      <MainHeader />

      <Link to={'/carpool/search'}>
        <SearchWithFilter kebabMap={[]} onClickSearchButton={() => {}} />
      </Link>

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
