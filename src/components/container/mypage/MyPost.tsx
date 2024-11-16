import { useState } from 'react'

import { PostItem, SubHeaderWithoutIcon } from '@/components/view'
import { useMyCarpoolPost, useMyTeammatePost } from '@/queries'
import { getSessionStorageItem, setSessionStorageItem, TAB_LIST } from '@/utils'

type TabType = (typeof TAB_LIST)[number]

export const MyPost = () => {
  const storageName = `current-post-tab`
  const initialTab = (getSessionStorageItem(storageName) || TAB_LIST[0]) as TabType
  const [currentTab, setCurrentTab] = useState<TabType>(initialTab)

  const { data: carpoolPostData, refetch: carpoolRefetch } = useMyCarpoolPost()
  const { data: TeammatePostData, refetch: teammateRefetch } = useMyTeammatePost()

  const handleClickTab = (tab: TabType) => {
    if (tab === TAB_LIST[0]) carpoolRefetch()
    else teammateRefetch()
    setSessionStorageItem(storageName, tab)
    setCurrentTab(tab)
  }

  return (
    <div className="flex-column h-full">
      <SubHeaderWithoutIcon type="null" title="내가 올린 게시물" />
      <div className="p-medium flex px-4 py-3 font-medium">
        {TAB_LIST.map((tab) => {
          const tabStyle =
            currentTab === tab
              ? 'text-blue-6 border-b-[2px] border-b-blue-5'
              : 'text-grey-6 border-b-[2px] border-b-grey-2'

          return (
            <button
              key={tab}
              className={`grow pb-3 ${tabStyle}`}
              onClick={() => handleClickTab(tab)}
            >
              {tab}
            </button>
          )
        })}
      </div>

      <div className="scroll grow">
        {currentTab === TAB_LIST[0] &&
          carpoolPostData &&
          carpoolPostData.result.map(
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
        {currentTab === TAB_LIST[1] &&
          TeammatePostData &&
          TeammatePostData.result.map(
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
    </div>
  )
}
