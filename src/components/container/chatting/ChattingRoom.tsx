import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Bubble } from '@/components/domain'
import {
  AdditionIcon,
  Kebab,
  Loading,
  PostProfile,
  ProfileImage,
  SendingIcon,
  SubHeaderWithIcon,
} from '@/components/view'
import { useBoolean, useWebSocket } from '@/hooks'
import {
  useCarpoolChattingRoom,
  useCarpoolExitChattingRoom,
  useTeammateChattingRoom,
  useTeammateExitChattingRoom,
} from '@/queries'
import type { IconType } from '@/types'
import { getSessionStorageItem, SESSION_ROOM_TYPE } from '@/utils'

export const ChattingRoom = () => {
  const navigate = useNavigate()
  const { id: roomId } = useParams()
  const roomType = getSessionStorageItem(SESSION_ROOM_TYPE)

  if (!roomType) navigate(-1)

  const { client, sendMessage } = useWebSocket(roomId, roomType as 'carpool' | 'team')
  const [kebabState, setKebabTrue, setKebabFalse] = useBoolean(false)
  const [message, setMessage] = useState<string>('')

  const { mutate: exitCarpoolMutation } = useCarpoolExitChattingRoom()
  const { mutate: exitTeammateMutation } = useTeammateExitChattingRoom()

  const {
    data: carpoolRoomData,
    refetch: carpoolRoomRefetch,
    isPending: carpoolPending,
    isError: carpoolError,
  } = useCarpoolChattingRoom({
    urls: { chatRoomId: roomId as string },
  })
  const {
    data: teammateRoomData,
    refetch: teammateRoomRefetch,
    isPending: teammatePending,
    isError: teammateError,
  } = useTeammateChattingRoom({
    urls: { chatRoomId: roomId as string },
  })

  useEffect(() => {
    if (roomType === 'carpool') carpoolRoomRefetch()
    else teammateRoomRefetch()
  }, [])

  const kebabMap = [
    {
      label: '채팅방 나가기',
      onClick: () => {
        if (roomType === 'carpool') exitCarpoolMutation({ urls: { chatRoomId: roomId as string } })
        else exitTeammateMutation({ urls: { chatRoomId: roomId as string } })
        navigate('/chatting')
      },
    },
    { label: '차단하기', onClick: () => console.log('차단하기') },
  ]

  const handleClcikSendButton = () => {
    console.log('clicked')
    if (client.current && client.current.connected) {
      sendMessage(message)
      // setInputValue('');
    } else {
      console.log('WebSocket is not connected')
    }
  }

  if (roomType === 'carpool' && (carpoolError || carpoolPending)) return <Loading />
  if (roomType === 'team' && (teammateError || teammatePending)) return <Loading />

  const { opponentNickname, yearsSinceDischarge, boardTitle, militaryChaplain, previousMessages } =
    roomType === 'carpool'
      ? { ...carpoolRoomData, boardTitle: carpoolRoomData?.carpoolBoardTitle || '' }
      : { ...teammateRoomData, boardTitle: teammateRoomData?.teamBoardTitle || '' }

  return (
    <div className="flex-column h-full">
      <SubHeaderWithIcon type={'kebab'} onClickKebab={kebabState ? setKebabFalse : setKebabTrue} />
      <PostProfile
        name={opponentNickname as string}
        year={(yearsSinceDischarge as number).toString()}
        subText={boardTitle}
        iconType={militaryChaplain as IconType}
      />

      {kebabState && <Kebab list={kebabMap} location="right-4 top-12" redIndex={1} />}

      <main className="scroll flex-column mx-4 grow gap-4 py-4">
        {previousMessages?.map(({ senderName, content, createdAt }, index) => {
          const isMyMessage = senderName !== opponentNickname
          const layoutStyle = isMyMessage ? 'flex flex-row-reverse items-center' : 'flex-align'
          return (
            <div key={index} className={`${layoutStyle} gap-3`}>
              {!isMyMessage && <ProfileImage size="sm" iconType="NAVY" />}
              <Bubble isMyMessage={isMyMessage} message={content} />
              <span className="p-xsmall shrink-0 self-end text-grey-5">{createdAt}</span>
            </div>
          )
        })}
      </main>

      <div className="flex-align gap-2 bg-white px-4 pb-8 pt-3">
        <AdditionIcon />
        <div className="flex-align grow gap-1 rounded-full bg-grey-1 py-2 pl-4 pr-2">
          <input
            type="text"
            placeholder="메세지를 입력해주세요."
            onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
            className="grow bg-transparent text-grey-7 placeholder:text-grey-4 focus:outline-none"
          />

          <button className="shrink-0" onClick={handleClcikSendButton}>
            <SendingIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
