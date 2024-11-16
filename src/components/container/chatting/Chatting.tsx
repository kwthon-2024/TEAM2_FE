import { useState } from 'react'
import { Link } from 'react-router-dom'

import { BottomNav, ChattingProfile, MainHeader } from '@/components/view'
import { useCarpoolChattingRoomList, useTeammateChattingRoomList } from '@/queries'
import type { IconType } from '@/types'
import {
  getSessionStorageItem,
  SESSION_ROOM_TYPE,
  setSessionStorageItem,
  TAB_LIST,
  TAB_LIST_EN,
} from '@/utils'

type TabType = (typeof TAB_LIST)[number]

export const Chatting = () => {
  const storageName = `current-chatting-tab`
  const initialTab = (getSessionStorageItem(storageName) || TAB_LIST[0]) as TabType
  const [currentTab, setCurrentTab] = useState<TabType>(initialTab)

  const { data: carpoolRoomList, refetch: carpoolRoomRefetch } = useCarpoolChattingRoomList()
  const { data: teammateRoomList, refetch: teammateRoomRefetch } = useTeammateChattingRoomList()

  const handleClickTab = (tab: TabType) => {
    if (tab === TAB_LIST[0]) {
      carpoolRoomRefetch()
      setSessionStorageItem(SESSION_ROOM_TYPE, TAB_LIST_EN[0])
    } else {
      teammateRoomRefetch()
      setSessionStorageItem(SESSION_ROOM_TYPE, TAB_LIST_EN[1])
    }
    setSessionStorageItem(storageName, tab)
    setCurrentTab(tab)
  }

  console.log(carpoolRoomList)

  return (
    <div className="flex-column h-full">
      <MainHeader />

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

      <main className="flex-column scroll mb-2 mt-[30px] grow gap-4">
        {currentTab === TAB_LIST[0] &&
          carpoolRoomList &&
          carpoolRoomList.result.map(
            ({
              chatRoomId,
              opponentNickname,
              carpoolBoardTitle,
              lastMessage,
              lastMessageDaysAgo,
              militaryChaplain,
            }) => (
              <Link to={`/chatting/chatting-room/carpool/${chatRoomId}`} key={chatRoomId}>
                <ChattingProfile
                  name={opponentNickname}
                  title={carpoolBoardTitle}
                  message={lastMessage}
                  time={lastMessageDaysAgo.toString()}
                  iconType={militaryChaplain as IconType}
                />
              </Link>
            ),
          )}
        {currentTab === TAB_LIST[1] &&
          teammateRoomList &&
          teammateRoomList.result.map(
            ({
              chatRoomId,
              opponentNickname,
              teamBoardTitle,
              lastMessage,
              lastMessageDaysAgo,
              militaryChaplain,
            }) => (
              <Link to={`/chatting/chatting-room/teammate/${chatRoomId}`} key={chatRoomId}>
                <ChattingProfile
                  name={opponentNickname}
                  title={teamBoardTitle}
                  message={lastMessage}
                  time={lastMessageDaysAgo.toString()}
                  iconType={militaryChaplain as IconType}
                />
              </Link>
            ),
          )}
      </main>

      <BottomNav />
    </div>
  )
}
