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
import { useBoolean, useScrollToBottom, useWebSocket } from '@/hooks'
import { useCarpoolChattingRoom, useCarpoolExitChattingRoom } from '@/queries'
import { useMessageActions, useMessageData } from '@/stores/message'
import type { IconType } from '@/types'

export const CarpoolChattingRoom = () => {
  const navigate = useNavigate()
  const { id: roomId } = useParams()

  const { client, sendMessage } = useWebSocket(roomId, 'carpool')
  const [kebabState, setKebabTrue, setKebabFalse] = useBoolean(false)
  const [message, setMessage] = useState<string>('')
  const { initialMessage } = useMessageActions()
  const messageList = useMessageData()
  const ref = useScrollToBottom(messageList)

  const { mutate: exitCarpoolMutation } = useCarpoolExitChattingRoom()

  const {
    data: carpoolRoomData,
    isPending,
    isError,
  } = useCarpoolChattingRoom({
    urls: { chatRoomId: roomId as string },
  })

  const kebabMap = [
    {
      label: '채팅방 나가기',
      onClick: () => {
        exitCarpoolMutation({ urls: { chatRoomId: roomId as string } })
        navigate('/chatting')
      },
    },
    { label: '차단하기', onClick: () => console.log('차단하기') },
  ]

  const handleClcikSendButton = () => {
    if (message.length !== 0) {
      if (client.current && client.current.connected) {
        sendMessage(message)
        setMessage('')
      } else {
        console.log('WebSocket is not connected')
      }
    }
  }

  useEffect(() => {
    if (carpoolRoomData) initialMessage(carpoolRoomData.previousMessages)
  }, [carpoolRoomData])

  if (isPending || isError) return <Loading />

  const { opponentNickname, yearsSinceDischarge, carpoolBoardTitle, militaryChaplain } =
    carpoolRoomData

  return (
    <div className="flex-column h-full">
      <SubHeaderWithIcon type={'kebab'} onClickKebab={kebabState ? setKebabFalse : setKebabTrue} />
      <PostProfile
        name={opponentNickname}
        year={yearsSinceDischarge.toString()}
        subText={carpoolBoardTitle}
        iconType={militaryChaplain as IconType}
      />

      {kebabState && <Kebab list={kebabMap} location="right-4 top-12" redIndex={1} />}

      <main className="scroll flex-column mx-4 grow gap-4 py-4" ref={ref}>
        {messageList?.map(({ senderName, content, createdAt }, index) => {
          const isMyMessage = senderName !== opponentNickname
          const layoutStyle = isMyMessage ? 'flex flex-row-reverse items-center' : 'flex-align'
          return (
            <div key={index} className={`${layoutStyle} gap-3`}>
              {!isMyMessage && <ProfileImage size="sm" iconType={militaryChaplain as IconType} />}
              <Bubble isMyMessage={isMyMessage} message={content} />
              <span className="p-xsmall shrink-0 self-end text-grey-5">{createdAt}</span>
            </div>
          )
        })}
      </main>

      <div className="flex-align gap-2 bg-white px-4 pb-8 pt-3">
        <div className="shrink-0">
          <AdditionIcon />
        </div>
        <div className="flex-align grow gap-1 rounded-full bg-grey-1 py-2 pl-4 pr-2">
          <input
            type="text"
            size={8}
            value={message}
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
