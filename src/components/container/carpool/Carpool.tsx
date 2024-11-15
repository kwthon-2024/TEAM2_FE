import { Link, useNavigate } from 'react-router-dom'

import {
  ArrowBottomIcon,
  BottomNav,
  CheckBoxIcon,
  MainHeader,
  PostAdditionButton,
  PostItem,
  SearchIcon,
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
        <div className="p-medium flex-align mx-4 gap-2 rounded-lg border border-grey-2 py-[10px] pl-4 pr-[10px] font-regular">
          <div className="flex-align shrink-0 gap-1">
            <p className="p-small shrink-0 text-grey-6">제목</p>
            <ArrowBottomIcon />
          </div>

          <input
            className="focus: flex-1 text-grey-7 outline-none placeholder:text-grey-4"
            size={7}
            placeholder="검색어를 입력해주세요."
          />
          <SearchIcon />
        </div>
      </Link>

      <div className="border-b border-b-grey-2">
        <button
          type="button"
          className="flex-align mx-4 ml-auto gap-1 py-3 "
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
                key={`carpool-${carpoolBoardId}`}
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
