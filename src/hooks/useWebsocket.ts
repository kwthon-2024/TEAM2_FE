import { useEffect, useRef } from 'react'
import { Client } from '@stomp/stompjs'

import { api } from '@/queries'
import { getSessionStorageItem, SESSION_NICKNAME } from '@/utils'

const SERVER = import.meta.env.VITE_PUBLIC_SERVER
// import { useMessageActions } from 'store/chatData'

export const useWebSocket = (roomId: string | undefined, type: 'carpool' | 'team') => {
  const client = useRef<Client | null>(null)
  // const { addMessage } = useMessageActions()

  const token = api.getAccessToken() as string

  const connectHandler = () => {
    console.log('WebSocket 연결 시도')

    client.current = new Client({
      brokerURL: `wss://${SERVER}/chat`,
      connectHeaders: {
        host: '/',
        Authorization: token,
      },
      onConnect: () => {
        console.log('WebSocket 연결 성공.')
        client.current?.subscribe(
          `/exchange/chat.${type}.exchange/chat.${type}.room.${roomId}`,
          (message) => {
            console.log('받은 메세지 :', message)
            // addMessage(JSON.parse(message.body))
          },
          { 'Content-Type': 'application/json' },
        )
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message'])
        console.error('Additional details: ' + frame.body)
      },
      debug: (str) => {
        console.log('STOMP debug:', str)
      },
    })

    client.current.activate()
  }

  const sendMessage = (content: string) => {
    if (client.current && client.current.connected) {
      client.current.publish({
        destination: `/pub/chat.${type}.message`,
        headers: { Authorization: token },
        body: JSON.stringify({
          chatRoomId: roomId,
          content: content,
          senderId: getSessionStorageItem(SESSION_NICKNAME),
        }),
      })
    }
  }

  useEffect(() => {
    connectHandler()
    return () => {
      client.current?.deactivate()
      console.log('WebSocket 연결 해제')
    }
  }, [roomId, token])

  return { client, sendMessage }
}
